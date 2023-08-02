const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../utils/paths');

module.exports = env => ({
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/', // Add publicPath here to set the root URL for assets
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 4040,
    open: true,
  },
});

// This code is a configuration file for webpack, a popular build tool commonly used in modern web development to bundle and manage assets (JavaScript, CSS, images, etc.) for web applications. Webpack takes your source code and compiles it into optimized bundles that can be efficiently loaded by the browser.

// 1. `const HtmlWebpackPlugin = require('html-webpack-plugin');`: This line imports the `html-webpack-plugin` package, which is a webpack plugin used to generate an HTML file that includes references to the bundled JavaScript and CSS files. This is useful because it automatically injects the correct `<script>` and `<link>` tags into the HTML for your bundled assets.

// 2. `const paths = require('../utils/paths');`: This line imports a module from the `../utils/paths` file. This module likely contains paths and configuration settings related to your project's file structure.

// 3. `module.exports = env => ({ ... })`: This is the main configuration object exported by the webpack configuration file. It exports a function that takes an environment object (`env`) as an argument and returns an object containing various webpack configuration options.

//    - `devtool: 'eval-cheap-module-source-map'`: This sets the devtool option, which controls how source maps are generated. Source maps are used to map the bundled code back to the original source code for easier debugging. `'eval-cheap-module-source-map'` is a type of source map that focuses on fast build times and is suitable for development.

//    - `output`: This section configures the output options for the bundled files.
//      - `filename: '[name].js'`: This sets the naming pattern for the output JavaScript files. `[name]` will be replaced with the name of the entry point.
//      - `publicPath: '/'`: This sets the root URL path where the bundled assets will be served from. This is useful for configuring the base URL for assets when your application is deployed to a specific location.

//    - `module`: This section defines how different types of files should be processed.
//      - `rules`: This is an array of rules that define how specific file types should be handled.
//        - For `.css` files: When a `.css` file is imported in your code, it will be processed using the listed loaders: `style-loader`, `css-loader`, and `postcss-loader`. These loaders handle tasks like converting CSS into JavaScript modules and injecting styles into the DOM.
//        - For `.scss` files: Similarly, when a `.scss` file is imported, it will be processed using the listed loaders, including `sass-loader` to handle SCSS syntax.

//    - `plugins`: This section configures webpack plugins.
//      - Here, a single instance of `HtmlWebpackPlugin` is created with the `template` option set to `'./index.html'`. This means that the generated HTML file will be based on the `index.html` template and will automatically include the necessary script and link tags for the bundled assets.

//    - `devServer`: This section configures the development server options.
//      - `historyApiFallback: true`: This enables fallback to `index.html` when a requested URL can't be found. This is commonly used in single-page applications (SPAs) to handle routing on the client side.
//      - `compress: true`: This enables gzip compression for serving files.
//      - `port: 4040`: This sets the port number on which the development server will listen.
//      - `open: true`: This option automatically opens the default web browser when the development server starts.

// In summary, this webpack configuration file sets up various build and development options for thr project, including how assets should be processed, how the output bundles should be named, and how the development server should behave. It also includes the `html-webpack-plugin` to generate an HTML file that includes references to the bundled assets. This configuration is tailored for a development environment.
