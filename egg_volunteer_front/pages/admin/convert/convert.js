const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    conversionRate: '',
    downloadLink: ''
  },
  OnInputChange(e) {
    this.setData({
      conversionRate: e.detail.value
    })
  },

  generateDownloadLink() {
    const conversionRate = this.data.conversionRate;
    if (conversionRate) {
      // 发起请求提交
      wx.request({
        url: config.host + '/generate-user-profile-excel?rate='+conversionRate,
        method: 'GET',
        header: {
          'Authorization': wx.getStorageSync('token'),
        },
        success: (res) => {
          this.setData({
            downloadLink: res.data.download_link
          });
          // 接受结果
          Toast({
            context: this,
            selector: '#t-toast',
            message: '生成成功',
            theme: 'success',
            direction: 'column',
          });
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
    } else {
      wx.showToast({
        title: '请输入学分转换比例',
        icon: 'none'
      });
    }
  },
  copyDownloadLink() {
    const downloadLink = this.data.downloadLink;
    wx.setClipboardData({
      data: downloadLink,
      success: function () {
        wx.showToast({
          title: '链接已复制',
          icon: 'none'
        });
      }
    });
  }
});