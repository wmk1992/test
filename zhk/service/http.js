var address = "http://api-app.zhaohuake.com/iosInfomationList?size=10&page=1&userId=0";
//var address = "https://baidu.com"
function req(url, data,cb) {
  wx.request({
    url: address,//address+url,
    method: 'get',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }  
  })
}
module.exports = {
  req: req
}  