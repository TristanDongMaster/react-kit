
process.env.NODE_ENV = 'production'
process.env.HOT = false
let path = require('path')
let webpack = require('webpack')
let publishVersion = (new Date()).getTime() 
var PATHS = require('./PATHS');
var theme = require('./antd-theme.js')
theme = theme.PROD
var htmlplugins = []
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('../package.json')
const publicPath = pkg.publicPath

module.exports = {
  mode: 'production',
  entry: {
    index: PATHS.SRC.join('index'),
  },
  output: {
    path: PATHS.BUILD.join(publicPath),
    filename: `[name].bundle.${publishVersion}.js`,
    chunkFilename: `[name].chunk.${publishVersion}.js`,
    publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        andt: {
          name: 'antd', // 单独将 andt 拆包
          priority: 200, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /(antd)/
        },
        commons: {
          name: 'commons',
          //chunks: 'async',// async,initial
          minChunks: 2,
          priority: -1,
        },
        vendor: {
          test: /node_modules/,
          //chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          priority: 1000,
          reuseExistingChunk: true,
          enforce: true
        },
        iconfont: {
          name: 'iconfont',
          test: /icons/,
          chunks: 'all',
          minChunks: 1,
          priority: 2000,
          reuseExistingChunk: true,
          enforce: true
        },
      }
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          beautify: false,
          compress: false,
          comments: false,
        }
      })
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
    new CleanWebpackPlugin(
      ['dist'],　 // 匹配删除的文件
      {
        root: path.resolve(__dirname, '..'), // 根目录
      }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new CopyWebpackPlugin([
      {
        from: PATHS.ASSETS,
        to: '../',
        force: true,
      },
    ]),
    new HtmlWebpackPlugin({
      template: PATHS.SRC.join('index_prod.html'),
      filename: '../../index.html',
      minify: {
        collapseWhitespace: false,
      },
    }),
    ...htmlplugins
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader?cacheDirectory=false',
          options: {
            cacheDirectory:false,
            presets: [
              'react', 'es2015', 'stage-0'
            ],
            plugins: [
              'transform-decorators-legacy',
              ['import', { libraryName: 'antd', style: true }]
            ]
          }
        },
        exclude: /node_modules/,
        include: PATHS.SRC
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
              sourceMap: false,
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
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            disable: false,
          }
        }],
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      // 自定义路径别名
      ROOT: PATHS.ROOT,
      MOCK: PATHS.MOCK,
      ASSETS: PATHS.SRC.join('assets'),
      COMPONENTS: PATHS.SRC.join('components'),
      MODULES: PATHS.SRC.join('modules'),
      ACTIONS: PATHS.SRC.join('actions'),
      REDUCERS: PATHS.SRC.join('reducers'),
      LIBS: PATHS.SRC.join('libs'),
      SERVICES: PATHS.SRC.join('services'),
      CONSTANTS: PATHS.SRC.join('constants'),
    },
    extensions: ['.js', '.jsx', '.less', '.css'],
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // Keep in sync with .flowconfig and .eslintrc
    modules: ['node_modules', 'src'],
  },
}