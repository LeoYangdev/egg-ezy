const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    departments: [
    ],
  },

  goToDepartmentDetail(e) {
    // 跳转到部门详情页面的逻辑
    wx.navigateTo({
      url: './manage?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
    })
  },
  init() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/admin/department/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          departments: data,
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
  onLoad() {
    this.init();
  }
});
