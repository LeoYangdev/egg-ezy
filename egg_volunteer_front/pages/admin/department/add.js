const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    departmentname: ''
  },
  onInputChange(e) {
    //console.log(e);
    const key = e.currentTarget.dataset.key;
    this.setData({
      [`${key}`]: e.detail.value
    })
  },
  addDepartment() {
    let data = {
      department_name: this.data.departmentname
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
      url: config.host + '/api/admin/department/add',
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
          message: '新增成功',
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
  }
});