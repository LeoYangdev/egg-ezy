const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    userList: [],
    currenPage: 1,
    currenTotal: 0,
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

    // 在这里请求
    const id = this.data.readySent.id;
    let that = this;
    let data = {
      'receiver_id': id,
      'content': this.data.remark
    }
    // 清空备注信息并隐藏模态框
    this.setData({
      remark: '',
      showModal: false
    });
    wx.request({
      url: config.host + '/api/admin/message/add',
      method: 'POST',
      data: data,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res => {
        if (res.data.data == true) {
          wx.showToast({
            title: '发送成功',
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

  init() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/admin/user/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          userList: data.data,
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
      url: config.host + '/api/admin/user/list?page=' + page,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res => {
        wx.hideLoading();
        let data = res.data.data
        this.setData({
          userList: this.data.userList.concat(res.data.data.data),
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
    // 页面加载完成
    this.init();
  },

  searchUser(event) {
    const keyword = event.detail.value;
    wx.request({
      url: config.host + '/api/admin/user/search?keyword=' + keyword,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res => {
        let data = res.data.data
        this.setData({
          userList: data.data
        })
      },
      fail: res => {
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

  viewUserDetail(event) {
    const userId = event.currentTarget.dataset.id;
    // 根据用户ID查看用户详情
    wx.navigateTo({
      url: './userindex?id=' + userId
    })
  },

  toggleUserStatus: function (event) {
    const userId = event.currentTarget.dataset.id;
    const userIndex = this.data.userList.findIndex(user => user.user_id == userId);
    const user = this.data.userList[userIndex];
    let tip = user.status == 1 ? "禁用" : "启用";
    const message = user.status == 1 ? '用户已禁用' : '用户已启用';
    let that = this;
    let status;
    if (user.status == 1) {
      status = -1;
    } else {
      status = 1;
    }
    wx.showModal({
      title: '提示',
      content: '确定要' + tip + '【' + event.currentTarget.dataset.name + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/admin/user/status?user_id=' + userId + '&status=' + status,
            method: 'GET',
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            success: res => {
              if (res.data.data == 1) {
                that.setData({
                  [`userList[${userIndex}].status`]: status
                })
                wx.showToast({
                  title: message,
                  mask: true,
                })
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
          //console.log('取消');
        }
      }
    });
  },

  sendMessage(event) {
    const id = event.currentTarget.dataset.id;
    const name = event.currentTarget.dataset.name;
    this.setData({
      readySent: {
        id: id,
        name: name
      }
    })
    this.showModal();
    // 根据用户ID发送消息
  },
});