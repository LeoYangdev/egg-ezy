// pages/user/messages/list.js
const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    messages: [
      // 添加更多消息对象...
    ]
  },
  onLoad() {
        // 发起请求提交
        wx.request({
          url: config.host + '/api/user/approval/message',
          method: 'GET',
          header: {
            'Authorization': wx.getStorageSync('token'),
          },
          success: (res) => {
            const messages = res.data.data.map(item => {
              let statusText, statusClass;
              switch (item.approval_result) {
                case 0:
                  statusText = '待审核';
                  statusClass = 'status-pending';
                  break;
                case 1:
                  statusText = '通过';
                  statusClass = 'status-approved';
                  break;
                case 2:
                  statusText = '拒绝';
                  statusClass = 'status-rejected';
                  break;
                default:
                  statusText = '未知';
                  statusClass = '';
              }
              return { ...item, statusText, statusClass };
            });
            this.setData({ messages });
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
