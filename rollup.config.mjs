import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { sync } from 'glob';

// 非全平台通用的 npm 需要在这里添加
const external = ['@rollup/plugin-babel'];

const inputs = ['src/index.ts', ...sync('src/functions/*.ts'), ...sync('src/modules/*.ts')];

const inputObj = inputs.reduce((acc, cur) => {
  const name = cur.replace('src/', '').replace('.ts', '');

  acc[name] = cur;

  return acc;
}, {});

// eslint-disable-next-line max-params
function getConfig(format, input, output, tsconfig = './tsconfig.json') {
  const dir = `dist/${output || format}`;

  return {
    input: input || inputObj,
    output: {
      dir,
      format,
      sourcemap: true,
    },
    external,
    plugins: [
      commonjs(),
      resolve({
        preferBuiltins: true,
      }),
      json(),
      typescript({
        outDir: dir,
        declarationDir: dir,
        tsconfig,
      }),
      babel({
        babelHelpers: 'bundled',
      }),
    ],
  };
}

export default [
  getConfig('cjs'),
  getConfig('es'),
  getConfig('cjs', 'plugin/babel-plugin.ts', 'cjs-babel-plugin', 'tsconfig.babel.json'),
  getConfig('es', 'plugin/babel-plugin.ts', 'es-babel-plugin', 'tsconfig.babel.json'),
  getConfig('cjs', 'plugin/index.ts', 'cjs-plugin', 'tsconfig.plugin.json'),
  getConfig('es', 'plugin/index.ts', 'es-plugin', 'tsconfig.plugin.json'),
];
