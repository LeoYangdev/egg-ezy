// pages/admin/index.js
var config = require("./../../config")
var adminconfig = require("./adminconfig")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar: 'https://cdn.shenghao.xyz/upload/avatar/20240429/1714322855595.png', // 用户头像链接，可替换为实际头像链接
    img1: 'https://tdesign.gtimg.com/mobile/demos/example1.png',
    img2: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
    img3: 'https://tdesign.gtimg.com/mobile/demos/example3.png',
    menulist: '',
  },

  onEnterModel(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  init() {
    // 请求用户数据及部门信息
    // 获取用户详细信息
    wx.request({
      url: config.host + '/api/user/getuserinfo',
      method: "get",
      header: {
        'Authorization': wx.getStorageSync('token'), // 设置自定义的 Authorization Header
      },
      success: res=>{
        const userInfo = res.data.data;
        // 入口仅超级管理员可见
        let isadmin;
        if (userInfo.profile.role==1) {
          isadmin = true
        } else {
          isadmin = false
        }
        // 更新页面数据
        this.setData({
          userInfo: userInfo,
          menulist: isadmin ? adminconfig.supermodel:adminconfig.adminmodel,
          adminlevel: isadmin? "超级管理员":"部门管理员"
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