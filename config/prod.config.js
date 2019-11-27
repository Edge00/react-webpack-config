// 添加环境变量
require('dotenv').config()
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const HappyPack = require('happypack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = str => path.join(__dirname, '..', str)

const config = {
  mode: 'production',
  entry: resolve('src/index'),
  output: {
    path: resolve('build'),
    publicPath: process.env.PUBLIC_URL,
    filename: 'static/js/[name].[contenthash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader',
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 80
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.8, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
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
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:5].css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true
        }
      }
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ManifestPlugin(),
    new HappyPack({
      loaders: ['babel-loader']
    }),
    new HardSourceWebpackPlugin(),
    new CopyPlugin([
      {
        from: resolve('public/**/*'),
        to: '[name].[ext]',
        ignore: ['index.html']
      }
    ])
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
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
