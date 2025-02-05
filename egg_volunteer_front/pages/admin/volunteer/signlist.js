const config = require('../../../config');
const QRCode = require('../../../utils/weapp-qrcode'); //根据自己文件实际位置修改

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showcode: false,
    type: 1
  },
  // 点击生成按钮触发事件
  handleGenerate(type) {
    let that = this
    wx.request({
      url: config.host + '/api/admin/activity/qrcode?id=' + this.data.activity_id + '&type=' + type,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        new QRCode('myCanvas', {
          text: res.data.data,
          width: 150, //canvas 画布的宽
          height: 150, //canvas 画布的高
          padding: 10, // 生成二维码四周自动留边宽度，不传入默认为0
          correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
          colorDark: "#0378CC", //分别为两种交替颜色
          colorLight: "white",
          callback: (res) => {
            //工具回调数据
            wx.hideLoading()
            that.setData({
              imagePath: res.path
            })
          }
        })
      }
    });
  },
  generateSignInCode() {
    this.setData({
      showcode: true,
      type: 1
    })
    this.handleGenerate(1);
  },
  generateSignOutCode() {
    this.setData({
      showcode: true,
      type: 2
    })
    this.handleGenerate(2);
  },
  onSignInClick(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定为用户【' + e.currentTarget.dataset.name + '】签到吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/user/activity/checkin?user_id='+ e.currentTarget.dataset.id +'&activity_id=' + that.data.activity_id,
            method: 'GET',
            header: {
              'Authorization': wx.getStorageSync('token'),
            },
            success: (res) => {
              if (res.data.data==true) {
                wx.showToast({
                  title: '签到成功',
                  icon: 'success'
                });
              }else{
                wx.showToast({
                  title: res.data.data,
                  icon: 'error'
                })
              }
            }
          });
        } else if (res.cancel) {
          //console.log('取消签到/签退');
        }
      }
    });
  },
  onSignOutClick(e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定为用户【' + e.currentTarget.dataset.name + '】签退吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/user/activity/checkout?user_id='+ e.currentTarget.dataset.id +'&activity_id=' + that.data.activity_id,
            method: 'GET',
            header: {
              'Authorization': wx.getStorageSync('token'),
            },
            success: (res) => {
              if (res.data.data==true) {
                wx.showToast({
                  title: '签退成功',
                  icon: 'success'
                });
              }else{
                wx.showToast({
                  title: res.data.data,
                  icon: 'error'
                })
              }
            }
          });
        } else if (res.cancel) {
          //console.log('取消签到/签退');
        }
      }
    });
  },
  init(id) {
    wx.request({
      url: config.host + '/api/user/activity/signlist?activity_id=' + id,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          userlist: res.data.data
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init(options.id);
    this.setData({
      activity_id: options.id
    })
  },
  onCardClick(e) {
    const member = e.currentTarget.dataset.item;
    //console.log('点击了成员：', member);
  },
  closemodal() {
    this.setData({
      showcode: false
    })
  }

})