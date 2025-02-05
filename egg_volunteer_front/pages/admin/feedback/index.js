const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    feedbacks: [
    ],
    currenPage: 1,
    currenTotal: 0,
  },

  deleteFeedback(id) {
    // 删除反馈的逻辑
    //console.log('删除反馈，ID：', id);
  },

  editFeedback(e) {
    // 处理反馈的逻辑
    wx.navigateTo({
      url: './detail?id=' + e.currentTarget.dataset.id
    })
  },

  onLoad() {

  },
  init() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/feedback/adminlist',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          feedbacks: res.data.data.data,
          currenPage: 1,
          currenTotal: res.data.data.total,
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
  onShow() {
    this.init();
  },
  // 到达页面底部
  onReachBottom() {
    wx.showLoading({
      title: '加载中...',
    })
    const data = this.data
    // 请求page和请求limit,超过totalpage就返回
    if (data.currenPage >= data.currenTotal) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '已加载全部',
        theme: 'success',
        direction: 'column',
      });
      wx.hideLoading();
      return;
    }
    const page = data.currenPage + 1;
    wx.request({
      url: config.host + '/api/user/feedback/adminlist?page=' + page,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res => {
        wx.hideLoading();
        let data = res.data.data
        this.setData({
          feedbacks: this.data.feedbacks.concat(res.data.data.data),
          currenPage: res.data.data.page,
          currenTotal: res.data.data.total,
        })
      },
      fail: res => {
        wx.hideLoading();
        Toast({
          context: this,
          selector: '#t-toast',
          message: '网络错误，请重试',
          theme: 'error',
          direction: 'column',
        });
      }
    })
  },
});