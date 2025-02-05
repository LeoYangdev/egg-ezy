const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
// pages/notification/list.js
Page({
  data: {
    notificationList: [{
        article_id: 1,
        category: '公告',
        title: '关于系统维护的通知',
        content: '系统将于本周六进行维护，请各位用户做好准备。',
        status: 1,
        author_id: 123,
        published_time: '2024-05-15 10:00:00',
        create_time: '2024-05-15 09:00:00',
        update_time: '2024-05-15 09:30:00'
      },
      {
        article_id: 2,
        category: '活动',
        title: '公司年会通知',
        content: '公司年会将于下周五晚上举行，请各位员工准时参加。',
        status: 1,
        author_id: 456,
        published_time: '2024-05-10 09:00:00',
        create_time: '2024-05-09 14:00:00',
        update_time: '2024-05-10 08:30:00'
      },
    ]
  },
  goToDetail(event) {
    const articleId = event.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: `./detail?id=${articleId}`
    });
  },
  onLoad() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/article/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          articles: data.data,
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
      url: config.host + '/api/user/article/list?page=' + page,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res => {
        wx.hideLoading();
        let data = res.data.data
        this.setData({
          articles: this.data.articles.concat(res.data.data.data),
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