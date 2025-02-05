// pages/index/index.js
import {
  host
} from "../../config";
import Toast from 'tdesign-miniprogram/toast/index';
var moment = require('../../utils/moment.js');
// 时间比较器
function compareTime(time) {
  var currentTime = moment();
  var targetTime = moment(time);
  if (currentTime.isBefore(targetTime)) {
    return -1;
  } else if (currentTime.isAfter(targetTime)) {
    return 1;
  } else {
    return 0;
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ban: false,
    cells: [{
        'id': 1,
        'name': "志愿活动",
        'img': 'https://cdn.cookcode.xyz/resource/zy.png',
      },
      {
        'id': 2,
        'name': "勤工助学",
        'img': 'https://cdn.cookcode.xyz/resource/work.png',
      },
      {
        'id': 3,
        'name': "通知公告",
        'img': 'https://cdn.cookcode.xyz/resource/news.png',
      },
      {
        'id': 4,
        'name': "往期活动",
        'img': 'https://cdn.cookcode.xyz/resource/his.png',
      }
    ],
  },

  // 首页cell组件点击跳转事件
  OnClickCell({
    currentTarget
  }) {
    const index = currentTarget.dataset.index;
    let navigateurl = '';
    switch (index) {
      case 1:
        navigateurl = '../activity/index'
        wx.switchTab({
          url: navigateurl,
        })
        break;
      case 2:
        navigateurl = '../activity/index'
        wx.switchTab({
          url: navigateurl,
        })
        break;
      case 3:
        navigateurl = '../notice/index'
        wx.switchTab({
          url: navigateurl,
        })
        break;
      case 4:
        navigateurl = '../activity/last/article'
        wx.navigateTo({
          url: navigateurl,
        })
        break;
      default:
        wx.switchTab({
          url: '../index/index'
        });
    }
  },
  //跳转详情页面
  todetail(e) {
    let that = this;
    //console.log(e);
    wx.navigateTo({
      url: '../activity/detail/detail?id=' + e.currentTarget.dataset.id,
      success: function (res) {
        // // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.activities })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(() => {
      // 获取志愿数据
      wx.request({
        url: host + '/activity?limit=4',
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          if (res.data.code == 402) {
            this.setData({
              ban: true
            })
            wx.showToast({
              title: res.data.msg,
              icon: "error",
              duration: 5000,
              mask: true
            })
          }
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: ''
            };
            if (compareTime(item.deadline) == -1) {
              status.name = "报名中";
              status.class = ""
              if (item.access_person < item.need_person) {
                status.name = "报名中";
                status.class = ""
              } else {
                status.name = "已满员";
                status.class = "status-max"
              }
            } else {
              status.name = "已结束";
              status.class = "status-end"
            }

            return {
              id: item.activity_id,
              image: item.activity_pic,
              title: item.activity_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.activity_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            activities: processData
          });
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
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})