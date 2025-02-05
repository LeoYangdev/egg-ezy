// pages/notification/detail.js
const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    message: {
      message_id: 1,
      content: '您的申请已通过。',
      sender_id: 1,
      receiver_id: 2,
      is_read: 0,
      sent_time: '2024-05-10 08:00:00',
      message_type: '通知'
    },
  },

  onLoad(options) {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/message/detail?message_id=' + options.id,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data
        this.setData({
          message: data.data,
        })
        if (data.data.is_read==0) {
          wx.request({
            url: config.host + '/api/user/message/read?message_id=' + options.id,
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
  },
});