const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = ({ mode }) => {
  return {
    mode,
    devtool: mode === 'development' ? 'eval-cheap-module-source-maps' : 0,
    entry: './src/index.ts',
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
