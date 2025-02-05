// app.js
var config=require("./config.js");
App({
  onLaunch() {
    wx.setStorageSync('config', config)//全局缓存起来
    // 登录
    wx.login({
      success: res => {
        wx.request({
          method: 'GET',
          url: config.host+'/login?code=' + res.code,
          success: res => {
            wx.setStorageSync('token', res.data.data.token)
          }
        })
      }
    })
  },
})
