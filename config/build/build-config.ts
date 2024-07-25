import webpack from 'webpack';

// types
import { BuildOptionsType } from './build.types';

// config parts
import { getBuildResolve } from './build-resolve';
import { getBuildDevServer } from './build-dev-server';
import { getBuildLoaders } from './build-loaders';
import { getBuildPlugins } from './build-plugins';

export function getBuildConfig(options: BuildOptionsType): webpack.Configuration {
  const isDev = options.mode === 'development';

  return {
    mode: options.mode,

    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[hash][ext]',
      clean: true,
    },

    module: {
      rules: getBuildLoaders(options),
    },
    resolve: getBuildResolve(options),

    plugins: getBuildPlugins(options),

    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? getBuildDevServer(options) : undefined,
  };
}
