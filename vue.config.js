const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
// const Timestamp = new Date().getTime();

module.exports = {
  publicPath: "./",
  lintOnSave: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  outputDir: process.env.NODE_ENV === "production" ? "monthly-gift" : "test",
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true);
    config.plugin("html").tap((args) => {
      args[0].title = "月月金至";
      if (process.env.NODE_ENV === "production") {
        console.log("生产环境");
        console.log("活动号", process.env.VUE_APP_ActId);
        console.log("生态码", process.env.VUE_APP_AUTH_CD);
        console.log("url码", process.env.VUE_APP_AUTH_URL_CD);
        args[0].url =
          "https://cdn.yxzt.ccb.com/cnmsmp/h5/hdzx/auth/JDstr.stable.js";
      } else {
        console.log("测试环境");
        console.log("活动号", process.env.VUE_APP_ActId);
        console.log("生态码", process.env.VUE_APP_AUTH_CD);
        console.log("url码", process.env.VUE_APP_AUTH_URL_CD);
        args[0].url =
          "https://www.ccbjrxd.cn/cnmsmp/h5/hdzx/auth/JDstr.stable.js";
      }
      return args;
    });

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
