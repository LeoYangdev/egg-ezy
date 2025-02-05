const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
// pages/admin/feedback/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedback: {
    }
  },
  onInputChange(e){
    this.setData({
      replyContent: e.detail.value
    })
  },

  confirmHandle() {
    // 获取回复内容
    const replyContent = this.data.replyContent;
    if (!replyContent) {
      wx.showToast({
        title: '请填写回复内容',
        icon: 'none'
      });
      return;
    }
    // 在这里添加处理用户确认操作的逻辑，比如向服务器发送回复内容等
    let data = {
      feedback_id: this.data.feedback.feedback_id,
      remarks: replyContent,
    }
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/feedback/handle',
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      data: data,
      success: (res) => {
        if(res.data.data.status==true){
          wx.showToast({
            title: '处理成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack();
          }, 2000);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: config.host + '/api/user/feedback/detail?feedback_id=' + options.id,
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