// pages/admin/messages/list.js
const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    messages: [
      {
        message_id: 1,
        content: '您的申请已通过。',
        sender_id: 1,
        receiver_id: 2,
        is_read: 0,
        sent_time: '2024-05-10 08:00:00',
        message_type: '通知'
      },
      {
        message_id: 2,
        content: '您的活动审核未通过，请查看。',
        sender_id: 1,
        receiver_id: 2,
        is_read: 1,
        sent_time: '2024-05-09 10:00:00',
        message_type: '通知'
      },
      // 添加更多消息对象...
    ]
  },
  onLoad() {
    // 这里可以根据需要处理数据，例如获取消息列表等
  },
  goToDetail(event) {
    const messageId = event.currentTarget.dataset.id;
    // 点击消息进入详情页的逻辑，您可以根据需求自行实现
    wx.navigateTo({
      url: './detail?id=' + messageId,
    })
  },
  init() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/message/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data
        this.setData({
          messages: data.data,
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
  },
  onLoad(){

  },
  onShow(){
    this.init();
  }
});
