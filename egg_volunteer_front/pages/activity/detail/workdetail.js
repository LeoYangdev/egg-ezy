
const config = require("../../../config");

Page({
  data: {
    canSign: false,
    signMsg: ''
  },

  init() {

  },

  onLoad(options) {
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   //console.log(data)
    // })
    wx.request({
      url: config.host + '/api/admin/work/search?id=' + options.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res => {
        let data = res.data.data;
        this.setData({
          info: data
        })
      }
    })
    wx.request({
      url: config.host + '/api/work/check?work_study_id=' + options.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res => {
        let data = res.data;
        if (data.code != 200) {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          });
          this.setData({
            signMsg: data.msg,
          })
          return;
        } else {
          this.setData({
            canSign: true
          })
        }
      }
    })
  },

  handleSignUp() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要报名【' + this.data.info.job_name + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/work/sign',
            data: {
              work_study_id: that.data.info.work_study_id
            },
            method: 'post',
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            success: res => {
              let data = res.data;
              if (data.data != "报名成功") {
                wx.showToast({
                  title: data.data,
                  icon: "error",
                  duration: 3000
                })
                return;
              }
            }
          })
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            canSign: false,
            signMsg: "已报名"
          })
        } else if (res.cancel) {
          //console.log('取消报名');
        }
      }
    });

  }

});