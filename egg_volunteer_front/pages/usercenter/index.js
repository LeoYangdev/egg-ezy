// pages/usercenter/index.js
var config = require("../../config.js");
var centerconfig = require("./centerconfig.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAvatarUrl: 'https://cdn-we-retail.ym.tencent.com/miniapp/usercenter/icon-user-center-avatar@2x.png',
    userInfo: {
      'avatarUrl': "https://tdesign.gtimg.com/mobile/demos/avatar1.png",
      'nickName': null
    },
    cells: centerconfig.usercells,
    isadmin: false
  },

  navigateToDetail(e) {
    if (e.currentTarget.dataset.id == 2) {
      wx.scanCode({
        success: (res) => {
          //console.log('扫码结果：', res.result);
          wx.navigateTo({
            url: './scancode/scancode?code=' + res.result,
          })
        },
        fail: (err) => {
          console.error('扫码失败：', err);
        }
      });
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  },

  init() {
    // 获取用户详细信息
    wx.request({
      url: config.host + '/api/user/getuserinfo',
      method: "get",
      header: {
        'Authorization': wx.getStorageSync('token'), // 设置自定义的 Authorization Header
      },
      success: res => {
        const userInfo = res.data.data;
        // 入口仅管理员可见
        let isadmin;
        if (userInfo.profile.role == 1 || userInfo.profile.role == 2) {
          isadmin = true
        } else {
          isadmin = false
        }
        // 更新页面数据
        this.setData({
          userInfo: userInfo,
          isadmin: isadmin
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})