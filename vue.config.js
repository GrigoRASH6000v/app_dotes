const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  devServer: {
    disableHostCheck: true,
  },
  filenameHashing: false,
  productionSourceMap: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/assets/style/imports/*.scss")],
    },
  },
};
