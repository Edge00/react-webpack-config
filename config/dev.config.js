const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = str => path.join(__dirname, '..', str)

module.exports = {
  mode: 'development',
  entry: resolve('src/index'),
  output: {
    filename: 'static/js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: resolve('src')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  devServer: {
    hot: true,
    open: true,
    contentBase: resolve('public'),
    stats: 'errors-only',
    proxy: {
      '/v1': {
        target: 'http://invite-growth-center-4a2071.ndev.imdada.cn',
        changeOrigin: true
      }
    }
  },
  devtool: 'inline-source-map'
}
