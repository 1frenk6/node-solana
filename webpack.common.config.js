/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const slsw = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const isDevOrLocal =
  process.env.NODE_ENV === "dev" ||
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "local" ||
  process.env.NODE_ENV === "integration" ||
  typeof process.env.NODE_ENV === "undefined";

const checkCircularDep = process.env.CHECK_CIRCULAR_DEP || false;

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: isDevOrLocal ? "development" : "production",
  devtool: isDevOrLocal ? "inline-source-map" : undefined,
  optimization: !isDevOrLocal
    ? {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false,
                drop_console: false
              },
              output: {
                comments: false
              }
            }
          })
        ]
      }
    : {},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".*", ".ts", ".mjs", ".js"],
    alias: {
      "@components": path.resolve(__dirname, "./components/")
    }
  },
  externals: ["pg", "tedious", "pg-hstore"],
  plugins: [
    process.env.NODE_ENV === "integration" &&
      new webpack.EnvironmentPlugin({
        DATA_WAREHOUSE_API_SERVICE_URL: `${process.env.MOCK_SERVER_BASE_URL}:8080`
        // SQS_URL_TEST: `${process.env.LOCALSTACK_URL}:4566/000000000000/local-sqs-test`
      }),
    checkCircularDep &&
      new CircularDependencyPlugin({
        onStart() {
          console.log("start detecting webpack modules cycles");
        },
        onDetected({ paths, compilation }) {
          console.log("DETECTED CIRCULAR ", paths.join(" -> "));
          compilation.errors.push(new Error(paths.join(" -> ")));
        },
        onEnd() {
          console.log("end detecting webpack modules cycles");
        },
        exclude: /\.js|node_modules|\.model\.ts/
      }),
    /* Suppress webpack warnings: the request of a dependency is an expression */
    new webpack.ContextReplacementPlugin(/aws-crt/, data => {
      data.dependencies.forEach(dep => {
        delete dep.critical;
      });
      return data;
    })
  ].filter(Boolean)
};
