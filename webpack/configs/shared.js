const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const paths = require('../utils/paths');

module.exports = env => ({
  mode: env.mode,
  context: paths.SRC_DIR,
  entry: './index.js',
  output: {
    path: paths.BUILD_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.SRC_DIR,
        use: ['babel-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 8192,
              esModule: false,
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new WebpackBar()],
});

// This code is a webpack configuration file that sets up the build process for a web application. It defines various settings and rules to process and bundle different types of assets:

// 1. **Import Statements**:
//    - `CleanWebpackPlugin`: This plugin is used to clean the output directory (usually the `BUILD_DIR`) before each build to ensure a clean and up-to-date output.
//    - `WebpackBar`: This plugin displays a progress bar during the webpack build process to provide a visual indication of the build status.
//    - `paths`: This is an object containing paths to various directories, likely defined in a separate `paths.js` file.

// 2. **Module Export**:
//    - The `module.exports` statement exports a function that takes an `env` parameter. This function returns an object containing webpack configuration options.

// 3. **Mode**:
//    - `mode: env.mode` sets the build mode based on the value of the `mode` parameter passed to the function. This could be either `'development'` or `'production'`.

// 4. **Context**:
//    - `context: paths.SRC_DIR` sets the base directory for resolving entry points. All relative paths defined in the configuration are relative to this context.

// 5. **Entry**:
//    - `entry: './index.js'` specifies the entry point of the application, which is typically the main JavaScript file.

// 6. **Output**:
//    - `path: paths.BUILD_DIR` sets the output directory for the bundled files.
//    - `filename: '[name].js'` specifies the naming pattern for the output JavaScript files.
//    - `publicPath: '/'` defines the public URL prefix for the assets. This is important for correctly resolving asset URLs in the generated HTML and other files.

// 7. **Module/Rules**:
//    - Various rules are defined to process different types of files using loaders:
//      - JavaScript files are processed using `babel-loader`.
//      - Image files (gif, png, jpeg, svg) are processed using `url-loader` and `img-loader` for optimization.
//      - Font files (woff, ttf, eot) are processed using `url-loader` and `file-loader`.
//      - HTML files are processed using `html-loader`.
//      - Handlebars templates (hbs) are processed using `handlebars-loader`.

// 8. **Plugins**:
//    - `CleanWebpackPlugin` is used to clean the output directory before each build.
//    - `WebpackBar` displays a progress bar during the build process.

// Overall, this configuration file sets up the webpack build process, handling assets like JavaScript, images, fonts, HTML, and handlebars templates, and applying necessary loaders and plugins for processing and bundling. It's a comprehensive setup to prepare your application for deployment.
