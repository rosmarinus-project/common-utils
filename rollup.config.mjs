import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import fse from 'fs-extra';

const pkg = fse.readJSONSync('./package.json');

// 非全平台通用的 npm 需要在这里添加
const external = Object.keys(pkg.dependencies);

function getConfig(format, banner) {
  return {
    input: 'src/index.ts',
    output: {
      file: `dist/${format}/index.js`,
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
        tsconfig: './tsconfig.json',
      }),
      babel({
        babelHelpers: 'runtime',
      }),
    ],
  };
}

export default [getConfig('cjs'), getConfig('es')];
