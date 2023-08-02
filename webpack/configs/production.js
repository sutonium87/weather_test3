const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = env => ({
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[id].[contenthash].css',
    }),
  ],
});

// This code is a webpack configuration file that sets up a production build for a web application. It includes various settings and plugins to optimize and bundle the application's assets for deployment:

// 1. **Import Statements**:
//    - `MiniCssExtractPlugin`: This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS, supporting the concept of code splitting.
//    - `HtmlWebpackPlugin`: This plugin simplifies the creation of an HTML file to include your application's bundles. It can also minify the HTML for production.
//    - `CssMinimizerPlugin`: This plugin is used to minimize CSS files for production by removing unnecessary whitespace and optimizing the CSS code.

// 2. **Module Export**:
//    - The `module.exports` statement exports a function that takes an `env` parameter. This function returns an object containing webpack configuration options.

// 3. **Mode**:
//    - `mode: 'production'` sets the mode to production, enabling optimizations such as minification and tree shaking.

// 4. **Devtool**:
//    - `devtool: 'source-map'` generates source maps for the production build. Source maps help map the minified/transformed code back to the original source code for easier debugging.

// 5. **Output**:
//    - `filename: '[name].[contenthash].js'` specifies the naming pattern for the output JavaScript files. `[name]` represents the entry point name, and `[contenthash]` is a hash generated based on the file's content to ensure cache busting.

// 6. **Optimization**:
//    - `moduleIds: 'hashed'` ensures that module IDs are generated based on the hashed content, improving long-term caching.
//    - `runtimeChunk: 'single'` creates a separate chunk for the runtime code to optimize caching.
//    - `splitChunks` configures how chunks are split. In this case, a cache group named `vendor` is created to separate third-party dependencies into a `vendors` chunk.
//    - `minimizer: [new CssMinimizerPlugin()]` applies the `CssMinimizerPlugin` to minimize CSS files.

// 7. **Module/Rules**:
//    - Rules for processing CSS and SCSS files using loaders like `MiniCssExtractPlugin.loader`, `css-loader`, `postcss-loader`, and `sass-loader`.

// 8. **Plugins**:
//    - `HtmlWebpackPlugin` is configured to generate an HTML file based on the provided template (`index.html`) and minify the output HTML.
//    - `MiniCssExtractPlugin` extracts CSS into separate files with content hashes to ensure proper caching.

// Overall, this configuration is designed to create a production-ready build of a web application by optimizing and bundling JavaScript and CSS files, generating hashed filenames for cache busting, and applying various minification and optimization techniques.
