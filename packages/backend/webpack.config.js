/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = ({ mode }) => {
  return {
    mode,
    devtool:
      mode === 'development' ? 'eval-cheap-module-source-maps' : 'sourcemap',
    entry: {
      index: './src/index.ts',
      generateSchema: './src/generateSchema.ts',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    target: 'node',
    externals: [
      nodeExternals({
        modulesDir: path.resolve(__dirname, '../../node_modules'),
      }),
    ],
    plugins: [
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 10,
                    },
                  },
                ],
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
        {
          test: /\.mjml$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.ts', '.js'],
    },
  };
};
