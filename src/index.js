#!/usr/bin/env node

const fs = require('fs');
const stream = require('stream');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const buildPage = require('./build-page');

const RTL = !!process.argv.includes('--rtl');

const MASTER_PAGE = (() => {
  const arg = process.argv.find((arg) => arg.startsWith('--master-page='));
  return arg ? arg.replace('--master-page=', '') : 'Blank';
})();

/** @return {string} Path located in page-editor-dev-server */
const getLocalFile = (file) => path.resolve(__dirname, file);
/** @return {string} Dependency located in page-editor-dev-server */
const getLocalDep = (dep) => getLocalFile(`../node_modules/${dep}`);
/** @return {string} Path located in page-editor project */
const getRemoteFile = (file) => path.resolve(file);

const BABEL_PLUGINS = [
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-class-properties',
  getLocalDep('react-refresh/babel'),
];

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

    entry: getLocalFile('app.js'),

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
              plugins: BABEL_PLUGINS,
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
                implementation: require(getLocalDep('sass')),
                sassOptions: { fibers: require(getLocalDep('fibers')) },
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HTMLWebpackPlugin({
        templateContent: fs.readFileSync(
          getLocalFile('mock/index.html'),
          'utf-8',
        ),
      }),

      new webpack.DefinePlugin({
        'process.env.RTL': JSON.stringify(RTL),
      }),

      new WebpackBar({
        color: '#00c0d1',
      }),

      new ReactRefreshWebpackPlugin(),
    ],

    resolve: {
      alias: {
        'frontend-js-components-web': getRemoteFile(
          '../../frontend-js/frontend-js-components-web/src/main/resources/META-INF/resources/index.js',
        ),
        'frontend-js-web$': getRemoteFile(
          '../../frontend-js/frontend-js-web/src/main/resources/META-INF/resources/index.es.js',
        ),
        'frontend-js-react-web$': getRemoteFile(
          '../../frontend-js/frontend-js-react-web/src/main/resources/META-INF/resources/js/index.es.js',
        ),
        '@clayui/icon': getRemoteFile(
          '../../../node_modules/@clayui/icon/lib/index.js',
        ),
        react: getRemoteFile('../../../node_modules/react/index.js'),
        'page_editor/plugins': getRemoteFile(
          'src/main/resources/META-INF/resources/page_editor/plugins',
        ),
        PageEditorApp$: getRemoteFile(
          'src/main/resources/META-INF/resources/page_editor/app/index.js',
        ),
        PageEditorStyles$: getRemoteFile(
          'src/main/resources/META-INF/resources/page_editor/app/components/App.scss',
        ),

        'react-dom': getRemoteFile('../../../node_modules/react-dom/index.js'),

        atlas: getLocalDep('@clayui/css/src/scss/atlas.scss'),
        'atlas-variables': getLocalDep(
          '@clayui/css/src/scss/atlas-variables.scss',
        ),
        PageEditorMock$: getLocalFile('mock/index.js'),
      },
    },
  });

  console.log('Starting server at http://localhost:8090');

  const server = new WebpackDevServer(compiler, {
    open: false,
    clientLogLevel: 'info',
    hot: true,
    overlay: true,
    noInfo: true,
    stats: {
      all: false,
      colors: true,
      warnings: true,
      errors: true,
    },
    before: function (app) {
      app.get('/favicon.ico', async function (req, res) {
        const passThrough = new stream.PassThrough();
        const readStream = fs.createReadStream(
          getLocalFile('mock/favicon.ico'),
        );

        stream.pipeline(readStream, passThrough, (error) => {
          if (error) {
            console.log(error);
            return res.sendStatus(400);
          }
        });

        passThrough.pipe(res);
      });

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
