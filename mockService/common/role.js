var json = {
	api: '/common/userrole',
	response: {
		"isSuccess": true,
		"modelKey": "isOperatorErpPin",
        "code": "200",
        data:{
            roleId:0,
            roleName:"超级管理员",
            userName:'admin',
            erp:'dongguoyang',
            erpType: 0, //0：普通erp，1：商家运营 2：采销
            roleType:0,//用户角色 0 ：超级管理员 1：频道运营2：一级审核组 3：二级审核组 4：普通用户
        },
		"message": "成功",
	}
}

module.exports = json