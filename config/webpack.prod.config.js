/**
 * Production webpack config.
 */
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const prodConfiguration = () =>
  merge([
    {
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            // Uncomment lines below for cache invalidation correctly
            cache: true,
            cacheKeys(defaultCacheKeys) {
              delete defaultCacheKeys['uglify-js'];

              return {
                ...defaultCacheKeys,
                'uglify-js': require('uglify-js/package.json').version
              };
            },
            minify(file, sourceMap) {
              // https://github.com/mishoo/UglifyJS2#minify-options
              const uglifyJsOptions = {
                /* your `uglify-js` package options */
              };

              if (sourceMap) {
                uglifyJsOptions.sourceMap = {
                  content: sourceMap
                };
              }

              return require('terser').minify(file, uglifyJsOptions);
            }
          })
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html',
          inject: true,
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyURLs: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true
          }
        }),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: './statistics.html' })
      ]
    }
  ]);

module.exports = env => merge(baseConfig(env), prodConfiguration(env));
