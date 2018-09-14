const merge = require("webpack-merge");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const fs = require("fs");

module.exports = {
  runtimeCompiler: false,
  pwa: {
    name: "Youtube Material",
    themeColor: "#ff0000",
    msTileColor: "#ff0000"
  },
  devServer: {
    open: true,
    https: {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
    }
  },

  chainWebpack: config => {
    config
      .plugin("moment-locale-ignore")
      .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]);

    config.performance.hints(false);

    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap(options => {
        return merge(options, {
          fix: true
        });
      });

    config.module
      .rule("images")
      .use("url-loader")
      .tap(options => {
        return merge(options, {
          limit: 10
        });
      });

    if (process.env.NODE_ENV === "development") {
      // config.devtool("eval-source-map");
    }

    if (process.env.NODE_ENV === "production") {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
          defaultSizes: "gzip",
          generateStatsFile: false
        }
      ]);
    }
  },

  pluginOptions: {
    enableInSFC: false
  }
};
