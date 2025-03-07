const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
// const Timestamp = new Date().getTime();

module.exports = {
  publicPath: "./",
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  outputDir: process.env.NODE_ENV === "production" ? "temp1" : "test",
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);


    config.resolve.alias.set("@", resolve("src"));
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "src/assets/scss/_public.scss";
        `,
      },
    },
  },
  // configureWebpack: {
  //   // webpack 配置
  //   devtool: "source-map",
  //   output: {
  //     // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
  //     filename: `[name].${Timestamp}.js`,
  //     chunkFilename: `[name].${Timestamp}.js`,
  //   },
  // },
};
