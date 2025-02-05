
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
      url: config.host + '/api/admin/activity/search?id=' + options.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res => {
        let data = res.data.data;
        this.setData({
          activity_id: data.activity_id,
          activityName: data.activity_name,
          activityPlace: data.activity_place,
          activity_pic: data.activity_pic,
          needperson: data.need_person,
          contactName: data.contact_name,
          contactPhone: data.contact_phone,
          defaultVal: data.limitation == 1 ? true : false,
          guarantee: data.guarantee,
          requirement: data.requirement,
          detailInfo: data.detail_info,
          startTime: data.start_time,
          endTime: data.end_time,
          deadline: data.deadline,
          startTimeText: data.start_time,
          endTimeText: data.end_time,
          deadlineText: data.deadline,
          organizer: data.organizer,
          organizer_department: data.organizer_department,
          access_person: data.access_person,
          sign_person: data.sign_person
        })
      }
    })
    wx.request({
      url: config.host + '/api/activity/check?activity_id=' + options.id,
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
      content: '确定要报名【' + this.data.activityName + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/activity/sign',
            data: {
              activity_id: that.data.activity_id
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