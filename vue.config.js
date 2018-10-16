const merge = require("webpack-merge");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const GitRevisionPlugin = new require("git-revision-webpack-plugin");
const fs = require("fs");
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

let isLegacyBuilt = false;

let httpsOptions;
if (fs.existsSync("key.pem") && fs.existsSync("cert.pem")) {
  httpsOptions = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
  };
} else {
  httpsOptions = true;
}

module.exports = {
  runtimeCompiler: false,
  pwa: {
    name: "vTyoob",
    themeColor: "#cb0000",
    msTileColor: "#cb0000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png"
    },
    workboxOptions: {
      skipWaiting: true,
      exclude: [/^_redirects$/, /\.map$/, /^manifest.*\.js(?:on)?$/]
    }
  },
  devServer: {
    open: true,
    https: httpsOptions
  },
  configureWebpack: {
    resolve: {
      alias: {
        "lodash.merge": path.resolve("./node_modules/lodash/merge.js"),
        "circular-json": path.resolve("./node_modules/lodash/noop.js")
      }
    }
  },

  chainWebpack: config => {
    config.plugins.delete("prefetch");

    config
      .plugin("moment-locale-ignore")
      .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]);

    config.performance.hints(false);

    config.plugin("git-hash").use(webpack.DefinePlugin, [
      {
        __COMMITHASH__: JSON.stringify(new GitRevisionPlugin().commithash())
      }
    ]);

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

    if (isProd) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
          defaultSizes: "gzip",
          generateStatsFile: false,
          get reportFilename() {
            if (isLegacyBuilt) {
              return "report-modern.html";
            } else {
              isLegacyBuilt = true;
              return "report-legacy.html";
            }
          }
        }
      ]);
    }
  },

  pluginOptions: {
    enableInSFC: false
  }
};
