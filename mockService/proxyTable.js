// 这里只提供基本用法 , 更多配置请参考 http-proxy-middleware readme:http://www.voidcn.com/article/p-etuniecs-bqr.html
module.exports = {
    '/proxy-api/workflow': {
        target: 'http://plat-gw.jd.com',
        changeOrigin: true,
        changeOrigin: true,
        withCredentials: true,
        pathRewrite: function (path, req) { 
            //console.log('current request api : ' + path)
            return path.replace('/proxy-api', '') 
        }
    },
    '/proxy-api/mac': {
        target: 'http://mac.jd.com',
        changeOrigin: true,
        changeOrigin: true,
        withCredentials: true,
        pathRewrite: function (path, req) { 
            //http://mac.jd.com/common/doc/upload
            //console.log('current request proxy-api : ' + path)
            return path.replace('/proxy-api/mac', '') 
        }
    },
    '/proxy-api': {
        target: 'http://newseckill.jd.com',
        changeOrigin: true,
        changeOrigin: true,
        withCredentials: true,
        pathRewrite: function (path, req) { 
            //console.log('current request proxy-api : ' + path)
            return path.replace('/proxy-api', '') 
        }
    },
    '/mock-api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: function (path, req) { 
            //console.log('current request api : ' + path)
            return path.replace('/mock-api', '/api') 
        }
    },
    '/rand-api': {
        target: 'https://randomuser.me',
        changeOrigin: true,
        pathRewrite: function (path, req) { 
            //console.log('current request api : ' + path)
            return path.replace('/rand-api', '/api') 
        }
    }, 
}

// // rewrite path 
// pathRewrite: {'^/old/api' : '/new/api'}

// // remove path 
// pathRewrite: {'^/remove/api' : ''}

// // add base path 
// pathRewrite: {'^/' : '/basepath/'}

// // custom rewriting 
// pathRewrite: function (path, req) { return path.replace('/api', '/base/api') }