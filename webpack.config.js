const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`)

const jsLoaders = () => {
  const loaders = []

  if (isProd) {
    loaders.push({
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { targets: 'defaults' }]],
      },
    },)
  }

  return loaders
}

const getPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      removeComments: isProd,
      collapseWhitespace: isProd,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ]

  if (isDev) {
    plugins.push(
        new ESLintPlugin({
          context: path.resolve(__dirname, 'src'),
          fix: true,
        })
    )
  } else {
    plugins.push(new MiniCssExtractPlugin({
      filename: '../src/assets/styles.css',
    }))
  }

  return plugins
}

const getEntry = () => {
  const entry = ['./index.js']

  if (isProd) {
    entry.unshift('@babel/polyfill')
  }

  return entry
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: getEntry(),
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev,
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
