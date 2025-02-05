const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    departments: [],
    readySent: {},
  },
  showModal() {
    this.setData({
      showModal: true
    });
  },
  hideModal() {
    this.setData({
      showModal: false
    });
  },
  inputRemark(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  confirmRemark(event) {
    //console.log('备注信息：', this.data.remark);

    // 拒绝在这里请求
    const id = this.data.readySent.id;
    let that = this;
    let data = {
      'department_id': id,
      'department_name': this.data.remark
    }
    // 清空备注信息并隐藏模态框
    this.setData({
      remark: '',
      showModal: false
    });
    wx.request({
      url: config.host + '/api/admin/department/update',
      method: 'POST',
      data: data,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res => {
        if (res.data.data == true) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
          that.init();
        } else {
          wx.showToast({
            title: '失败',
            icon: 'error'
          });
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'error'
        });
      }
    })
  },

  checkDepartment(e) {
    // 跳转到部门详情页面的逻辑
    wx.navigateTo({
      url: './user?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
    })
  },

  editDepartment(event) {
    const id = event.currentTarget.dataset.id;
    const name = event.currentTarget.dataset.name;
    this.setData({
      readySent: {
        id: id,
        name: name
      },
      remark: name
    })
    this.showModal();
  },

  deleteDepartment(e) {
    // 删除部门的逻辑
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除部门【' + e.currentTarget.dataset.name + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/admin/department/delete?department_id=' + e.currentTarget.dataset.id,
            method: 'DELETE',
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            success: res => {
              if (res.data.data == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                that.init();
              } else {
                wx.showToast({
                  title: '失败',
                  icon: 'error'
                });
              }
            },
            fail: res => {
              wx.showToast({
                title: '网络错误，请重试',
                icon: 'error'
              });
            }
          })
        } else if (res.cancel) {
          //console.log('取消删除');
        }
      }
    });
  },

  addDepartment() {
    // 新增部门的逻辑
    wx.navigateTo({
      url: './add',
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