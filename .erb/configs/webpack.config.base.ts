/**
 * Base webpack config used across other specific configs
 */

import { execSync } from "child_process";
import Dotenv from "dotenv-webpack";
import moment from "moment";
import path from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

import pkg from "../../release/app/package.json";
import webpackPaths from "./webpack.paths";

const isDevelop = process.env.NODE_ENV === "development";
const buildDate = moment().toISOString();
const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

const configuration: webpack.Configuration = {
  externals: [...Object.keys(pkg.dependencies || {})],

  stats: "errors-only",

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // Whether or not we should disable type-checking
            transpileOnly: isDevelop,
            // By default, ts-loader compiles absolutely everything and we don't want that
            onlyCompileBundledFiles: true,
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: "commonjs2",
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    modules: [webpackPaths.srcPath, "node_modules"],
    plugins: [
      // Ensure our custom paths can be resolved
      new TsconfigPathsPlugin({
        baseUrl: webpackPaths.srcPath,
        configFile: path.join(webpackPaths.rootPath, "tsconfig.json"),
      }),
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),

    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(pkg.version),
      __DATE__: JSON.stringify(buildDate),
      __COMMIT__: JSON.stringify(commitHash),
    }),

    new Dotenv({
      path: path.join(webpackPaths.rootPath, ".env"),
      silent: true,
    }),
  ],
};

export default configuration;
