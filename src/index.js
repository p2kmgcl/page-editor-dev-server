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

const getDevelopmentServerFile = (file) => path.resolve(__dirname, file);
const getDevelopmentServerDependency = (dependency) =>
  getDevelopmentServerFile(`../node_modules/${dependency}`);
const getPageEditorFile = (file) => path.resolve(file);
const getPageEditorDependency = (dependency) =>
  getPageEditorFile(`../../../node_modules/${dependency}`);

const main = async () => {
  console.clear();
  const getDisplayContext = await buildPage(LIFERAY_HOST, MASTER_PAGE);

  const compiler = webpack({
    mode: 'development',
    devtool: 'eval-source-map',

    entry: {
      index: getDevelopmentServerFile('app.js'),
    },

    output: {
      filename: '[name].bundle.js',
    },

    stats: {
      all: false,
      colors: true,
      warnings: true,
      errors: true,
    },

    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: getDevelopmentServerDependency('babel-loader'),
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-typescript',
                '@babel/preset-env',
              ],
              plugins: [
                getDevelopmentServerDependency(
                  '@babel/plugin-proposal-export-namespace-from',
                ),
                getDevelopmentServerDependency(
                  '@babel/plugin-proposal-class-properties',
                ),
                getDevelopmentServerDependency(
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                ),
                getDevelopmentServerDependency(
                  '@babel/plugin-proposal-object-rest-spread',
                ),
                getDevelopmentServerDependency(
                  '@babel/plugin-proposal-optional-chaining',
                ),
                getDevelopmentServerDependency('react-refresh/babel'),
              ],
            },
          },
        },

        {
          test: /\.(scss|css)$/,
          use: [
            getDevelopmentServerDependency('style-loader'),
            getDevelopmentServerDependency('css-loader'),
            {
              loader: getDevelopmentServerDependency('sass-loader'),
              options: {
                implementation: require(getDevelopmentServerDependency(
                  'node-sass',
                )),
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new HTMLWebpackPlugin({
        templateContent: fs.readFileSync(
          getDevelopmentServerFile('assets/index.html'),
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

      // new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({ overlay: false }),
    ],

    resolve: {
      extensions: ['.js', '.ts', '.tsx'],

      alias: {
        atlas: getPageEditorDependency('@clayui/css/src/scss/atlas.scss'),
        'atlas-variables': getPageEditorDependency(
          '@clayui/css/src/scss/atlas-variables.scss',
        ),
        cadmin: getPageEditorDependency('@clayui/css/src/scss/cadmin.scss'),
        'cadmin-variables': getPageEditorDependency(
          '@clayui/css/src/scss/_cadmin-variables.scss',
        ),

        '@clayui/icon': getPageEditorDependency('@clayui/icon/lib/index.js'),
        'components/buttons$': getPageEditorDependency(
          '@clayui/css/src/scss/components/_buttons.scss',
        ),
        'components/forms$': getPageEditorDependency(
          '@clayui/css/src/scss/components/_forms.scss',
        ),

        'frontend-js-components-web': getPageEditorFile(
          '../../frontend-js/frontend-js-components-web/src/main/resources/META-INF/resources/index.js',
        ),
        '@liferay/frontend-js-react-web$': getPageEditorFile(
          '../../frontend-js/frontend-js-react-web/src/main/resources/META-INF/resources/js/index.ts',
        ),
        '@liferay/frontend-js-state-web$': getPageEditorFile(
          '../../frontend-js/frontend-js-state-web/src/main/resources/META-INF/resources/index.ts',
        ),
        'frontend-js-web$': getPageEditorFile(
          '../../frontend-js/frontend-js-web/src/main/resources/META-INF/resources/index.es.js',
        ),
        'item-selector-taglib$': getPageEditorFile(
          '../../item-selector/item-selector-taglib/src/main/resources/META-INF/resources/index.es.js',
        ),

        react: getPageEditorDependency('react/index.js'),
        'react-dom': getPageEditorDependency('react-dom/index.js'),

        PageEditorMocks$: getDevelopmentServerFile('mocks/index.js'),
        PageEditorApp$: getPageEditorFile(
          'src/main/resources/META-INF/resources/page_editor/app/index.js',
        ),
        PageEditorStyles$: getPageEditorFile(
          'src/main/resources/META-INF/resources/page_editor/app/components/App.scss',
        ),
        'page_editor/plugins': getPageEditorFile(
          'src/main/resources/META-INF/resources/page_editor/plugins',
        ),
      },
    },
  });

  console.log('Starting server at http://localhost:8090');

  const server = new WebpackDevServer(
    {
      open: false,
      hot: true,
      port: 8090,
      setupMiddlewares: function (middlewares, devServer) {
        middlewares.unshift({
          name: 'favicon',
          path: '/favicon.ico',
          middleware: async (req, res) => {
            const passThrough = new stream.PassThrough();
            const readStream = fs.createReadStream(
              getDevelopmentServerFile('assets/favicon.ico'),
            );

            stream.pipeline(readStream, passThrough, (error) => {
              if (error) {
                console.log(error);
                return res.sendStatus(400);
              }
            });

            passThrough.pipe(res);
          },
        });

        middlewares.unshift({
          name: 'display-context',
          path: '/get-page-editor-display-context',
          middleware: async (req, res) => {
            res.json({ displayContext: await getDisplayContext() });
          },
        });

        return middlewares;
      },
      proxy: [
        {
          context: ['/documents', '/group', '/image', '/web', '/o'],
          target: `http://${LIFERAY_HOST}`,
          logLevel: 'silent',
          headers: {
            Authorization: `Basic ${Buffer.from(
              'test@liferay.com:test',
            ).toString('base64')}`,
          },
        },
      ],
    },
    compiler,
  );

  await server.start();
};

main();
