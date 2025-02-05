const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    checked: false,
    type: 0,
    feedbacks: [{
        title: '系统报名问题反馈',
        content: '我报名但是没有通知',
        time: '2024-04-15',
        status: '已处理'
      },
      {
        title: '建议一下改一下首页',
        content: 'UI不够好看',
        time: '2024-04-25',
        status: '未处理'
      }
    ],
    currentTitle: '',
    currentContent: '',
  },
  handleChange(e) {
    this.setData({
      checked: e.detail.checked,
    });
  },
  onInputTitle(e) {
    this.setData({
      currentTitle: e.detail.value,
    });
  },
  onInput(e) {
    this.setData({
      currentContent: e.detail.value,
    });
  },
  onTypeChange(e) {
    this.setData({
      type: e.detail.value,
    });
  },
  submitFeedback() {
    if (!this.data.currentContent | !this.data.currentTitle) {
      wx.showToast({
        title: '请填写标题和内容',
        icon: 'none'
      });
      return;
    }
    const feedbackType = this.data.type;
    let data = {
      feedback_title: this.data.currentTitle,
      feedback_content: this.data.currentContent,
      feedback_type: feedbackType
    }
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/feedback/add',
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      data: data,
      success: (res) => {
        if(res.data.data.status==true){
          wx.showToast({
            title: '提交成功',
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
  navigateToDetail(e) {
    wx.navigateTo({
      url: './feedbackdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/feedback/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          feedbacks: res.data.data
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
});