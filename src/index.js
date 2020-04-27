#!/usr/bin/env node

const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const buildPage = require('./build-page');

const HOT_RELOAD = !process.argv.includes('--no-hot');
const RTL = !!process.argv.includes('--rtl');

const MASTER_PAGE = (() => {
  const arg = process.argv.find((arg) => arg.startsWith('--master-page='));
  return arg ? arg.replace('--master-page=', '') : 'Blank';
})();

const main = async () => {
  console.clear();
  const getDisplayContext = await buildPage(MASTER_PAGE);

  const compiler = webpack({
    mode: 'development',
    devtool: 'eval-source-map',

    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },

    entry: HOT_RELOAD
      ? [
          path.resolve(__dirname, '../node_modules/react-hot-loader'),
          path.resolve(__dirname, 'app.js'),
        ]
      : [path.resolve(__dirname, 'app.js')],

    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      pathinfo: false,
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
              plugins: HOT_RELOAD
                ? [
                    '@babel/plugin-proposal-export-namespace-from',
                    '@babel/plugin-proposal-class-properties',
                    path.resolve(
                      __dirname,
                      '../node_modules/react-hot-loader/babel.js',
                    ),
                  ]
                : [
                    '@babel/plugin-proposal-export-namespace-from',
                    '@babel/plugin-proposal-class-properties',
                  ],
            },
          },
        },

        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require(path.resolve(
                  __dirname,
                  '../node_modules/sass',
                )),
                sassOptions: {
                  fibers: require(path.resolve(
                    __dirname,
                    '../node_modules/fibers',
                  )),
                },
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HTMLWebpackPlugin({
        templateContent: fs.readFileSync(
          path.resolve(__dirname, './mock/index.html'),
          'utf-8',
        ),
      }),

      new webpack.DefinePlugin({
        'process.env.HOT_RELOAD': JSON.stringify(HOT_RELOAD),
        'process.env.RTL': JSON.stringify(RTL),
      }),

      new WebpackBar({
        color: '#00c0d1',
      }),
    ],

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
        'react-hot-loader': path.resolve(
          __dirname,
          '../node_modules/react-hot-loader',
        ),
        react: path.resolve('../../../node_modules/react/index.js'),
        'react-dom': HOT_RELOAD
          ? path.resolve(__dirname, '../node_modules/@hot-loader/react-dom')
          : path.resolve('../../../node_modules/react-dom/index.js'),
        '@clayui/icon': path.resolve(
          '../../../node_modules/@clayui/icon/lib/index.js',
        ),
        'atlas-variables': path.resolve(
          __dirname,
          '../node_modules/@clayui/css/src/scss/atlas-variables.scss',
        ),
        PageEditorApp$: path.resolve(
          './src/main/resources/META-INF/resources/page_editor/app/index.js',
        ),
        PageEditorStyles$: path.resolve(
          './src/main/resources/META-INF/resources/page_editor/app/components/App.scss',
        ),
        PageEditorMock$: path.resolve(path.join(__dirname, '/mock/index.js')),
      },
    },
  });

  console.log('Starting server at http://localhost:8090');

  const server = new WebpackDevServer(compiler, {
    open: false,
    clientLogLevel: 'info',
    overlay: true,
    noInfo: true,
    hot: HOT_RELOAD,
    stats: {
      all: false,
      colors: true,
      warnings: true,
      errors: true,
    },
    before: function (app) {
      app.get('/get-page-editor-display-context', async function (req, res) {
        res.json({ displayContext: await getDisplayContext() });
      });
    },
    proxy: [
      {
        context: ['/documents', '/group', '/web', '/o'],
        target: 'http://localhost:8080',
        logLevel: 'silent',
        headers: {
          Authorization: `Basic ${Buffer.from('test@liferay.com:test').toString(
            'base64',
          )}`,
        },
      },
    ],
  });

  server.listen(8090, 'localhost', () => {});
};

main();
