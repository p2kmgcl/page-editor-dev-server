#!/usr/bin/node

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const compiler = webpack({
  mode: 'development',
  devtool: 'source-map',

  entry: path.resolve(__dirname, 'run.js'),

  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [new HTMLWebpackPlugin()],

  resolve: {
    alias: {
      atlas: path.resolve(
        __dirname,
        '../node_modules/@clayui/css/src/scss/atlas.scss',
      ),
      'frontend-js-components-web': path.resolve(
        '../../frontend-js/frontend-js-components-web/src/main/resources/META-INF/resources/index.js',
      ),
      'frontend-js-web$': path.resolve(
        '../../frontend-js/frontend-js-web/src/main/resources/META-INF/resources/index.es.js',
      ),
      'frontend-js-react-web$': path.resolve(
        '../../frontend-js/frontend-js-react-web/src/main/resources/META-INF/resources/js/index.es.js',
      ),
      'page_editor/plugins': path.resolve(
        './src/main/resources/META-INF/resources/page_editor/plugins',
      ),
      react: path.resolve('../../../node_modules/react/index.js'),
      'react-dom': path.resolve('../../../node_modules/react-dom/index.js'),
      '@clayui/icon': path.resolve(
        '../../../node_modules/@clayui/icon/lib/index.js',
      ),
      'atlas-variables': path.resolve(
        __dirname,
        '../node_modules/@clayui/css/src/scss/atlas-variables.scss',
      ),
      PageEditor$: path.resolve(
        './src/main/resources/META-INF/resources/page_editor/app/index.js',
      ),
      PageEditorStyles$: path.resolve(
        './src/main/resources/META-INF/resources/page_editor/app/components/App.scss',
      ),
      PageEditorServerData$: path.resolve(__dirname, 'mock.js'),
    },
  },
});

const server = new WebpackDevServer(compiler, {
  open: false,
  clientLogLevel: 'silent',
  overlay: true,
  noInfo: true,
  stats: {
    colors: true,
  },
  proxy: {
    '/web': {
      target: 'http://192.168.50.165:8080',
      headers: {
        Authorization: `Basic ${Buffer.from('test@liferay.com:test').toString(
          'base64',
        )}`,
      },
    },
    '/o/': {
      target: 'http://192.168.50.165:8080',
    },
  },
});

server.listen(8090, 'localhost', () => {
  console.log('Sever on localhost:8090');
});
