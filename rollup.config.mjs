import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { sync } from 'glob';

// 非全平台通用的 npm 需要在这里添加
const external = [];

const inputs = ['src/index.ts', ...sync('src/functions/*.ts'), ...sync('src/modules/*.ts')];

const inputObj = inputs.reduce((acc, cur) => {
  const name = cur.replace('src/', '').replace('.ts', '');

  acc[name] = cur;

  return acc;
}, {});

function getConfig(format, banner) {
  return {
    input: inputObj,
    output: {
      dir: `dist/${format}`,
      format,
      banner,
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
        outDir: `dist/${format}`,
        declarationDir: `dist/${format}`,
        tsconfig: './tsconfig.json',
      }),
      babel({
        babelHelpers: 'bundled',
      }),
    ],
  };
}

export default [getConfig('cjs'), getConfig('es')];
