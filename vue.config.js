const port = process.env.port || process.env.npm_config_port || 8080
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/getLocation': {
        target: 'https://geoapi.qweather.com/v2/city/lookup',
        ws: true,
        secure: false,  // https接口
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/getLocation': ''
        }
      },
      '^/getNews': {
        target: 'http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html',
        ws: true,
        secure: false,  // https接口
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/getNews': ''
        }
      },
    },
    host: 'localhost',
    port: port
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  }
}
