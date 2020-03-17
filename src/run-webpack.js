#!/usr/bin/node

const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPage = require('./build-page');

const main = async () => {
  const getDisplayContext = await buildPage();

  const compiler = webpack({
    mode: 'development',
    devtool: 'source-map',

    entry: path.resolve(__dirname, 'index.js'),

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

    plugins: [
      new HTMLWebpackPlugin({
        templateContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .toolbar {
                display: flex;
                align-items: center;
                border-bottom: solid #ddd thin;
              }

              .toolbar > .container-fluid {
                display: flex;
                justify-content: space-between;
              }

              body {
                background: white !important;
              }

              .page-editor__sidebar {
                top: 0 !important;
              }

              .page-editor__sidebar,
              .page-editor__sidebar__buttons,
              .page-editor__sidebar__content {
                height: 100vh !important;
              }
            </style>
          </head>
          <body>
            <div class="control-menu control-menu-container">
              <div class="lfr-control-menu-panel" id="ControlMenu"></div>
              <div class="toolbar management-bar navbar navbar-expand-md page-editor__toolbar" id="_com_liferay_layout_content_page_editor_web_internal_portlet_ContentPageEditorPortlet_pageEditorToolbar"></div>
            </div>

            <div id="wrapper">
              <main class="layout-content" id="layoutContent"></main>
            </div>

            <script>
              var CKEDITOR_BASEPATH = '/alloy-editor/assets/';
            </script>
          </body>
          </html>
        `,
      }),
    ],

    resolve: {
      alias: {
        'alloy-editor/assets': path.resolve(
          __dirname,
          '../node_modules/alloyeditor/dist/alloy-editor',
        ),
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

  const server = new WebpackDevServer(compiler, {
    open: false,
    clientLogLevel: 'silent',
    overlay: true,
    noInfo: false,
    stats: {
      colors: true,
    },
    before: function(app) {
      app.get('/get-page-editor-display-context', async function(req, res) {
        res.json({ displayContext: await getDisplayContext() });
      });

      app.get('/alloy-editor/assets/*', (req, res) => {
        try {
          res.send(
            fs.readFileSync(
              path.resolve(
                __dirname,
                '../node_modules/alloyeditor/dist/alloy-editor',
                new URL(`http://localhost:8080${req.url}`).pathname.replace(
                  '/alloy-editor/assets/',
                  '',
                ),
              ),
              'utf-8',
            ),
          );
        } catch (error) {
          res.sendStatus(404);
        }
      });
    },
    proxy: [
      {
        context: ['/web', '/o'],
        target: 'http://localhost:8080',
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
