const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMajorVersion = require('./package.json').version;
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
// const extractCSS = new ExtractTextPlugin('[name]-style.css');
var env = require('minimist')(process.argv.slice(2)).env;
const StyleLintPlugin = require('stylelint-webpack-plugin');

var allowedEnvs = [
  'development',
  'test',
  'production'
];
if (allowedEnvs.indexOf(env) === -1) {
  env = 'development';
}
function toApp(relativePath) {
  return path.resolve(__dirname, 'src/app', relativePath);
}

function cssLoaders(loader) {
  var use = [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        }
      }
    }
  ]
  if (loader) {
    use.push(loader);
  }
  return use;
  // return extractCSS.extract({
  //   fallback: "style-loader",
  //   use
  // });
}

const baseConfig = {
  entry: {
    user: toApp('user'),
    //admin: toApp('admin'),
    "static": toApp('static')
  },
  output: {
    path: path.resolve(__dirname, 'src/build'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].chunk.js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".less", ".scss"],
    alias: {
      components: toApp('components'),
      user: toApp('user'),
      //admin: toApp('admin'),
      models: toApp('models'),
      style: toApp('style'),
      "static": toApp('static')
    }
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: '/user.html',
      rewrites: [
        { from: /\/user/, to: '/user.html' },
        // { from: /\/admin/, to: '/admin.html' },
        // { from: /\/static/, to: '/static.html' }
      ]
    },
    https: false,
    noInfo: false,
    port: 8011
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          silent: true
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.scss/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: '[path][name].[ext]&limit=200000'
        }
      }
    ]
  }
};

var configs = {};
var plugins = [
  new StyleLintPlugin({
    files: ['./src/**/*.css']
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  }),
  new webpack.optimize.CommonsChunkPlugin('common'),
  new webpack.DefinePlugin({
    'process.env.OLAP_ENV': JSON.stringify(env)
  })
];

configs.development = Object.assign({
  cache: true,
  devtool: 'inline-source-map',
  plugins: plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ])
}, baseConfig);

configs.test = Object.assign({
  cache: false,
  devtool: 'sourcemap',
  plugins: plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ])
}, baseConfig);

configs.production = Object.assign({
  cache: false,
  devtool: 'sourcemap',
  plugins: plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ])
}, baseConfig);

module.exports = configs[env];
