import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';

// types
import { BuildOptionsType } from './build.types';

// plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export function getBuildPlugins(options: BuildOptionsType): Configuration['plugins'] {
  const plugins: Configuration['plugins'] = [
    // інжектнути збілдений js в html, тому що імʼя чанка динамічне
    new HtmlWebpackPlugin({
      template: options.paths.htmlTemplate,
      favicon: path.resolve(options.paths.public, 'favicon.png'),
    }),
    // глобальні змінні в проект, НЕ ENV змінні
    new DefinePlugin({
      __IS_DEV__: options.mode === 'development',
    }),
  ];

  if (options.mode === 'production') {
    plugins.push(
      // css в окремі чанки
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
      }),
    );
    plugins.push(
      // перенесення файлів
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(options.paths.public, 'locales'),
            to: path.resolve(options.paths.output, 'locales'),
          },
        ],
      }),
    );
    // дерево розміру чанків
    // plugins.push(new BundleAnalyzerPlugin());
  }

  if (options.mode === 'development') {
    // перевірка типів в окремому процесі, юзати з transpileOnly: true у ts-loader
    plugins.push(new ForkTsCheckerWebpackPlugin());
    // react hmr
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  return plugins;
}
