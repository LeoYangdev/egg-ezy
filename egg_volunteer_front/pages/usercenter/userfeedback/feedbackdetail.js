const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    feedback: {
      id: 1,
      title: '系统错误了好像',
      type: '反馈',
      time: '2024-04-22 23:56:30',
      content: '我今天在报名活动的时候好像出现了一些问题',
      status: '待处理',
      reply: ''
    }
  },
  onLoad(option){
    wx.request({
      url: config.host + '/api/user/feedback/detail?feedback_id=' + option.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          feedback: res.data.data
        })
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
})
