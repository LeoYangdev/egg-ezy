// pages/notice/index.js
const config = require("../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: true,
    content: ['志愿活动管理规范（试行）', '勤工俭学管理规范（试行）', '系统使用手册'],
    img1: 'https://cdn.shenghao.xyz/resource/sysmsg.png',
    img2: 'https://cdn.shenghao.xyz/resource/news.png',
    img3: 'https://cdn.shenghao.xyz/resource/adminmsg.png',
    border: {
      color: 'var(--td-border-level-1-color, #E7E7E7)',
    },
    notificationList: [],
  },
  // 刷新获取页面内容
  pageLoad() {
    // 停止下拉刷新动作
    wx.stopPullDownRefresh();

    // 设置数据，将 pageLoading 属性设置为 true
    this.setData({
      pageLoading: true,
    });
  },
  navigateToDetail(e) {
    wx.navigateTo({
      url: './annouce/detail?id='+e.currentTarget.dataset.id,
    })
  },
  navigateToNotice() {
    wx.navigateTo({
      url: './annouce/index',
    })
  },
  navigateToSystemMessages() {
    wx.navigateTo({
      url: './sysinfo/index',
    })
  },
  navigateToAdminMessages() {
    wx.navigateTo({
      url: './adminmsg/index',
    })
  },
  init() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/annouce/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          notificationList: data.data,
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
      url: config.host + '/api/user/annouce/list?page=' + page,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res => {
        wx.hideLoading();
        let data = res.data.data
        this.setData({
          notificationList: this.data.notificationList.concat(res.data.data.data),
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
  onLoad() {

  },
  onShow() {
    this.getTabBar().init();
    this.init();
  }
})