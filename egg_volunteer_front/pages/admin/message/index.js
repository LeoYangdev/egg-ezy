const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  data: {
    notificationList: []
  },
  editNotification(e) {
    // 编辑通知的逻辑处理
    wx.navigateTo({
      url: './edit?id=' + e.currentTarget.dataset.id,
    })
  },
  deleteNotification(e) {
    // 删除通知的逻辑处理
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除通知【' + e.currentTarget.dataset.name + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/admin/annouce/delete?id=' + e.currentTarget.dataset.id,
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
  publishNotification() {
    // 发布通知的逻辑处理
    wx.navigateTo({
      url: './post'
    });
  },
  init() {
    // 发起请求提交
    wx.request({
      url: config.host + '/api/user/annouce/list',
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data
        this.setData({
          notificationList: data.data,
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
      url: config.host + '/api/user/annouce/list?page=' + page,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res => {
        wx.hideLoading();
        let data = res.data.data
        this.setData({
          notificationList: this.data.notificationList.concat(res.data.data.data),
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
    this.init()
  }
});