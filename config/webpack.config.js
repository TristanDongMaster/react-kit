
process.env.NODE_ENV = 'development';
process.env.HOT = true;
let path = require('path')
var webpack = require('webpack');
var PATHS = require('./PATHS');
var theme = require('./antd-theme.js');
theme = theme.DEV;
const publicPath = '/static/';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: ['webpack-hot-middleware/client', PATHS.SRC.join('index')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'async', //async,initial
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      template: PATHS.SRC.join(`index_dev.html`),
      filename: 'index.html',
      minify: {
        collapseWhitespace: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: [
              'transform-decorators-legacy',
              ['import', { libraryName: 'antd', style: true }]
            ]
          }
        },
        exclude: /node_modules/,
        include: PATHS.ROOT
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader','postcss-loader']
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['base64-font-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        //use: ['url-loader?limit=1']
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      ROOT: PATHS.ROOT,
      // 自定义路径别名
      MOCK: PATHS.MOCK,
      ASSETS: PATHS.SRC.join('assets'),
      COMPONENTS: PATHS.SRC.join('components'),
      MODULES: PATHS.SRC.join('modules'),
      ACTIONS: PATHS.SRC.join('actions'),
      REDUCERS: PATHS.SRC.join('reducers'),
      LIBS: PATHS.SRC.join('libs'),
      SERVICES: PATHS.SRC.join('services'),
      CONSTANTS: PATHS.SRC.join('constants')
    },
    extensions: ['.js', '.jsx', '.less']
  }
};
