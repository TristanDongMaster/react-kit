// 页面路由访问路径
export const ROUTE_PATH = '/brandActivity'

export const CHANNEL_AND_COLUMN_ID = {
	seckill: {
		channelId: 3,
		columnId: 222601
	}
}

// type
// 11: 秒杀-单品秒杀
// 12: 秒杀-品牌秒杀
// 21: 享惠-单品秒杀
// 21: 享惠-品牌秒杀
export const PATH_TYPE = {
	11: [{
		name: '品牌活动',
		url: '/brandActivity/index'
	}, {
		name: '秒杀',
		url: '/brandActivity/index'
	}, {
		name: '单品秒杀',
		url: '/brandActivity/index'
	}],
	12: [{
		name: '品牌活动',
		url: '/brandActivity/index'
	}, {
		name: '秒杀',
		url: '/brandActivity/index'
	}, {
		name: '拼购',
		url: '/brandActivity/index'
	}],
	21: [{
		name: '品牌活动',
		url: '/brandActivity/index'
	}, {
		name: '享惠',
		url: '/brandActivity/index'
	}, {
		name: '品牌品类',
		url: '/brandActivity/index'
	}]
}

// 页面导航栏数据
export const MENU_LIST = [{
	ext: '',
	id: 7,
	name: '首页',
	parentId: 0,
	subMenuList: [],
	url: '/dist/pages/'
}, {
	ext: '',
	id: 9,
	name: '活动报名',
	parentId: 0,
	url: '/dist/pages/activeEnroll/list'
}, {
	ext: '',
	id: 10,
	name: '活动管理',
	parentId: 0,
	url: '/dist/pages/activeManage/list/'
}, {
	ext: '',
	id: 12,
	name: '品牌活动',
	parentId: 0,
	url: '/brandActivity/index'
}, {
	ext: '',
	id: 36,
	name: '用户设置',
	parentId: 0,
	subMenuList: [],
	url: '/dist/pages/userSetting/topcontract/'
}, {
	ext: '',
	id: 11,
	name: '帮助与反馈',
	parentId: 0,
	url: '/dist/pages/help/'
}]