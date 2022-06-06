const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000
  },
  entry: './index.tsx',
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
    }),
  ],
  output:{
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        },
      },
    ]
  },
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js' ],
  }
};
