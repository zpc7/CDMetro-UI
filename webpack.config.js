const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  mode: "development",
  entry: "./src/app.tsx",
  devtool: "cheap-module-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    historyApiFallback: true,
    open: false,
    host: '0.0.0.0',
    port: 8000,
    overlay: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [tsImportPluginFactory([
                {
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true
                }, {
                  style: false,
                  libraryName: 'lodash',
                  libraryDirectory: null,
                  camel2DashComponentName: false
                }
              ])]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true }, sourceMap: true }
          }]
      },
      {
        test: /\.(jpg)|(jpeg)|(png)|(bmp)|(svg)$/,
        loader: "url-loader",
        options: { limit: 0 }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'public/favicon.ico')
    }),
    // new BundleAnalyzerPlugin()
  ]
};
