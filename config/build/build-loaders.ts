import { ModuleOptions } from 'webpack';

// plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { removeAttributePlugin } from '../babel/remove-attr-plugin';

// types
import { BuildOptionsType } from './build.types';

export function getBuildLoaders(options: BuildOptionsType): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const babelPlugins = [
    !isDev
      ? [
          removeAttributePlugin,
          {
            props: ['data-testId'],
          },
        ]
      : null,
  ].filter(Boolean);

  return [
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,

      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // дозволяє міняти розмір, по дефолту розмір 1em
            icon: true,
          },
        },
      ],
    },
    // {
    //   test: /\.tsx?$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: 'ts-loader',
    //       options: {
    //         // hmr for react
    //         getCustomTransformers: () => ({
    //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //         }),
    //         // вимикає перевірку типів, тільки транспілює код
    //         transpileOnly: isDev,
    //       },
    //     },
    //   ],
    // },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
            plugins: babelPlugins,
          },
        },
      ],
    },
    {
      test: /\.css$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: isDev ? '[path][name]__[local]' : '[hash:64:8]',
            },
          },
        },
        'postcss-loader',
      ],
    },
  ];
}
