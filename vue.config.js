// vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    publicPath: '/',
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true,
// /以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {
            '/subway': {
                target: 'http://127.0.0.1:8101/subway/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/subway': ''
                }
            }
        }
    }
};


