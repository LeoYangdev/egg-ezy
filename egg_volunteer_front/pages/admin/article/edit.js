const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    title: '',
    content: '',
    radiovalue: 0,
  },
  onInputChange(e) {
    //console.log(e);
    const key = e.currentTarget.dataset.key;
    this.setData({
      [`${key}`]: e.detail.value
    })
  },
  OnRadioChange(e) {
    this.setData({
      radiovalue: e.detail.value
    })
  },
  publishArticle() {
    // 发布文章逻辑
    // 提示用户发布成功或失败
    let data = {
      title: this.data.title,
      content: this.data.content,
      category: this.data.radiovalue
    }
    // 遍历 data 对象的键
    for (let key of Object.keys(data)) {
      if (data[key] == null) {
        // 如果值为空，则提示未填写完毕
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
    }
    // 发起请求提交
    wx.request({
      url: config.host + '/api/admin/article/update',
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      data: data,
      success: (res) => {
        // 接受结果
        Toast({
          context: this,
          selector: '#t-toast',
          message: '修改成功',
          theme: 'success',
          direction: 'column',
        });
        setTimeout(function () {
          wx.navigateBack();
        }, 2000)
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
  onLoad(option){
    wx.request({
      url: config.host + '/api/user/article/detail?id=' + option.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          title: res.data.data.title,
          content: res.data.data.content,
          radiovalue: res.data.data.category
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