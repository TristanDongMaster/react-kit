import NODE_ENV from './ENV'

// 静态资源根目录
const STATIC_PUB_DOMAIN = ''
const ASSETS_ROOT_MAP = {
	'development':'/src/assets', 
	'production':`${STATIC_PUB_DOMAIN }/brandActivity-assets`, 
}
// 图片资源路径
const IMG_ROOT = {
	'development':'/src/assets/img', 
	'production':`${STATIC_PUB_DOMAIN }/brandActivity-assets/img`, 
}
/*eslint-disable */
const ASSETS_ROOT = ASSETS_ROOT_MAP[NODE_ENV]
/* eslint-enable */
export const IMG_SRC_ROOT = IMG_ROOT[NODE_ENV]
export const IMGSRC = {
	'DEFAULT_LOGO':`${IMG_ROOT[NODE_ENV] }/default-logo.png`, 
	'LOGO':`${IMG_ROOT[NODE_ENV] }/logo.jpg`, 
	'ENJOY_STRUCTURAL':`${IMG_ROOT[NODE_ENV] }/structural.png`
}
