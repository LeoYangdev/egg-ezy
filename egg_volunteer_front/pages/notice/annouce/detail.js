// pages/notification/detail.js
const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    notification: {
      article_id: 1,
      category: "系统消息",
      title: "系统更新通知",
      content: "尊敬的用户，系统将于本周五进行更新维护，请您提前做好准备。",
      status: 1,
      author_id: 1001,
      published_time: "2024-05-10 08:00:00",
      create_time: "2024-05-09 10:30:00",
      update_time: "2024-05-09 15:45:00"
    },
  },

  onLoad(option){
    this.setData({
      id: option.id
    })
    wx.request({
      url: config.host + '/api/user/annouce/detail?id=' + option.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          notification: res.data.data
        })
        if (res.data.data.is_read==false) {
          wx.request({
            url: config.host + '/api/user/annouce/read?announcement_id=' + option.id,
            method: 'GET',
            header: {
              'Authorization': wx.getStorageSync('token'),
            }
          })
        }
      },
      fail: (err) => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '网络错误，请重试',
          theme: 'error',
          direction: 'column',
        });
      },
    });
  }
});