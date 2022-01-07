const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const env = process.env.NODE_ENV || 'development';

const testVue = {
  test: /\.vue$/,
  loader: 'vue-loader'
};
const testScripts = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: file => (
    /node_modules/.test(file) &&
    !/\.vue\.js/.test(file)
  )
};
const testSass = {
  test: /\.(css|scss)$/i,
  use: [
    'vue-style-loader',
    'css-loader',
    'sass-loader'
  ]
}

module.exports = {
  mode: env,
  entry: path.join(__dirname, 'resources/js/src/index.js'),
  output: {
    filename: 'bundle.app.js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: ''
  },
  module: {
    rules: [testVue, testScripts, testSass]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
