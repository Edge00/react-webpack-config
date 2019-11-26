const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const resolve = str => path.join(__dirname, '..', str)

const config = {
  mode: 'production',
  entry: resolve('src/index'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'static/js/[name].[hash:5].js'
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
              name: 'static/media/[name].[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer]
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:5].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ManifestPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  stats: 'errors-only',
  devtool: 'cheap-module-source-map'
}

module.exports = config

// 如果要分析打包耗时，使用 speedMeasure
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const speedMeasure = new SpeedMeasurePlugin()
// module.exports = speedMeasure.wrap(config)
