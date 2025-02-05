const config = require("../../../config");

Page({
  data: {
    
  },
  onLoad(option) {
    wx.request({
      url: config.host + '/api/user/activity/codesign?code=' + option.code,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        if (res.data.code == 200) {
          if (res.data.data.msg != true) {
            wx.showToast({
              title: res.data.data.msg,
              icon: 'error'
            })
            this.setData({
              info: res.data.data
            })
          } else{
            this.setData({
              info: res.data.data
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 5000
          })
          setTimeout(function(){
            wx.navigateBack();
          }, 5000)
        }
      }
    });
  }
});