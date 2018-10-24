## 上线版本
   none
   
## 介绍

    技术栈：Webpack v4 + React v16.3.2 + React-Route v3 + Antd v3 + Redux + ESLint

    功能模块：

      1. 单页面&支持开发热更新
      2. 提供本地mock服务
      3. 提供proxy代理服务
      4. 自动部署代码
      5. 可生产模式预览
      6. 上线版本控制，可以增量发布
      7. 引入antd，按需加载，支持本地化字体和主题定制
      8. 引入eslint，自动校验开发代码，错误代码无法提交commit


## 开发启动
 
    (c)npm i
  
    npm run dev

## 打包

    npm run build

## 本地生产预览

    npm run preview

## 部署

    
    可支持自动提交打包代码

    test环境 部署

    npm run deployStatic --b 'test' --cm 'this is common s for autp deploy'

    release 环境 部署

    npm run deployStatic --b 'release' --cm 'this is common s for autp deploy'

## 功能使用

### 目录介绍

    COMPONENTS：通用UI组件
    SERVICES：api服务集合
    CONSTANTS：常量配置等
    MODULES：通用方法
    ASSETS:通用资源
    mockService：本地开发模拟服务器
    config:webpack打包&node服务配置
    dist:打包目录

### 页面导航&菜单栏&部署

    import Layout from 'COMPONENTS/Layout'

    export default class App extends React.Component
      render() {
        const { children} = this.props
        var data ={
          userName:'',
          menuList:[],
          currentUrlId:'',
          hideNavList:['/pages/login','/pages/register']
        }
        return (
          <Layout data={data}>
            {children}
          </Layout>
        )
      }
    }

### 通用模块引入

    // webpack已兼容处理，无需引入完整路径
    import Layout from 'COMPONENTS/Layout'
    import * as IndexService from 'SERVICES/index'
    import * as AppConst from 'CONSTANTS/AppConst'
    import * as Modules from 'MODULES/fetch'

### UI组件异步加载

    import Loadable from 'react-loadable';
    import Loading from './my-loading-component';

    const LoadableComponent = Loadable({
      loader: () => import('./my-component/index.js'),
      loading: Loading,
    });

    export default class App extends React.Component {
      render() {
        return <LoadableComponent/>;
      }
    }

### 模块异步加载

    require.ensure([], require =>{
      require("jsbarcode");
      //this.setState({ qrCode: barCode(qrCode) })
    }, "jsbarcode"); 

### 页面跳转

    // 兼容单页面和多页面跳转
    import {locationHref} from 'MODULES/utils'

    // 单页面
    locationHref('/page/home',{test:'002'},['otherParameterInCurrentPage'])

    // 多页面
    locationHref('http://host/page/home',{test:'002'})

## Nginx服务端部署配置（详见配置文件）

    由于是单页面，需要拦截所有请求到一个入口页面，其他静态资源和api请求需要反向代理，参见如下demo：

    说明：由于服务器静态资源目录不同，需要nignx代理转发秒杀静态资源请求，配置如下，_server_path需要更新为服务器真实目录
    ##页面 - 路由代理
    location ~ /brandActivity/   {
        alias _server_path/index.html;
        add_header Accept text/html,application/xhtml+xml,application/xml;
        add_header Content-Type text/html;
        add_header Cache-Control 'no-store';
    }
    # 静态资源 - 路径代理
    location ~ /brandActivity-assets   {
        root _server_path;
    }

## 真实域名预览页面

    npm run build
    启动Nginx服务
    访问http://121221.com


## 问题总结

    1. dynamic-import-webpack webpack@v4中无需引入，否则chunkname无法生成
    2. 暂不升级react-router@v4, 路由手动跳转麻烦：https://github.com/brickspert/blog/issues/3

