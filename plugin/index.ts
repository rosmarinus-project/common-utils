import { Plugin } from 'vite';
import babel from '@rollup/plugin-babel';

export default function vitePlugin(): Plugin {
  return {
    name: '@rosmarinus/common-utils/vite-plugin',
    config(config) {
      const b = babel({
        plugins: ['@rosmarinus/common-utils/babel-plugin'],
      });

      const index = config.plugins?.findIndex((plugin) => (plugin as any)?.name === b.name);

      if (index !== undefined && index !== -1) {
        throw new Error(
          '此插件不可以和 @rollup/plugin-babel 一起使用，如果你已经配置了 @rollup/plugin-babel， 则自行添加 @rosmarinus/common-utils/babel-plugin',
        );
      }

      if (!config.plugins) {
        config.plugins = [];
      }

      config.plugins?.push(b as any);
    },
  };
}
