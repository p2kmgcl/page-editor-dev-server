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

const LIFERAY_HOST = (() => {
  const arg = process.argv.find((arg) => arg.startsWith('--liferay-host='));
  return arg ? arg.replace('--liferay-host=', '') : 'localhost:8080';
})();

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

// https://github.com/liferay/liferay-npm-tools/blob/master/packages/liferay-npm-scripts/src/config/babel.json
const BABEL_PLUGINS = [
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-optional-chaining',
  getLocalDep('react-refresh/babel'),
];

const main = async () => {
  console.clear();
  const getDisplayContext = await buildPage(LIFERAY_HOST, MASTER_PAGE);

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
          getLocalFile('assets/index.html'),
          'utf-8',
        ),
      }),

      new webpack.DefinePlugin({
        'process.env.RTL': JSON.stringify(RTL),
        'process.env.LIFERAY_HOST': JSON.stringify(LIFERAY_HOST),
      }),

      new WebpackBar({
        color: '#00c0d1',
      }),

      new ReactRefreshWebpackPlugin(),
    ],

    resolve: {
      alias: {
        '@clayui/icon': getRemoteFile(
          '../../../node_modules/@clayui/icon/lib/index.js',
        ),
        '@welldone-software/why-did-you-render': getLocalDep(
          '@welldone-software/why-did-you-render',
        ),
        'atlas-variables': getLocalDep(
          '@clayui/css/src/scss/atlas-variables.scss',
        ),
        'components/buttons$': getRemoteFile(
          '../../../node_modules/@clayui/css/src/scss/components/_buttons.scss',
        ),
        'components/forms$': getRemoteFile(
          '../../../node_modules/@clayui/css/src/scss/components/_forms.scss',
        ),
        'frontend-js-components-web': getRemoteFile(
          '../../frontend-js/frontend-js-components-web/src/main/resources/META-INF/resources/index.js',
        ),
        'frontend-js-react-web$': getRemoteFile(
          '../../frontend-js/frontend-js-react-web/src/main/resources/META-INF/resources/js/index.es.js',
        ),
        'frontend-js-web$': getRemoteFile(
          '../../frontend-js/frontend-js-web/src/main/resources/META-INF/resources/index.es.js',
        ),
        'page_editor/plugins': getRemoteFile(
          'src/main/resources/META-INF/resources/page_editor/plugins',
        ),
        'react-dom': getRemoteFile('../../../node_modules/react-dom/index.js'),
        PageEditorApp$: getRemoteFile(
          'src/main/resources/META-INF/resources/page_editor/app/index.js',
        ),
        PageEditorMocks$: getLocalFile('mocks/index.js'),
        PageEditorStyles$: getRemoteFile(
          'src/main/resources/META-INF/resources/page_editor/app/components/App.scss',
        ),
        PageEditorTools$: getLocalFile('tools/index.js'),
        atlas: getLocalDep('@clayui/css/src/scss/atlas.scss'),
        react: getRemoteFile('../../../node_modules/react/index.js'),
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
          getLocalFile('assets/favicon.ico'),
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
        target: `http://${LIFERAY_HOST}`,
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
