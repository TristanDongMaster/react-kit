var role = require('./common/role.js');
var data = [
  role,
];

function getApiData(api) {
  var r = data.filter(item => {
    if (api.indexOf(item.api) > -1) {
      return true;
    }
  });
  if (r && r.length) {
    return r[0].response;
  } else {
    return {
      code: 500,
      data: {},
      msg: '无匹配api'
    };
  }
}

module.exports = getApiData;