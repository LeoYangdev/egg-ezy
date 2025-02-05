import {
  host
} from "../../../config";
import Toast from 'tdesign-miniprogram/toast/index';
const _ = require('../../../utils/lodash.js');
var moment = require('../../../utils/moment.js');
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

// pages/activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageLoading: false,
    tabPanelstyle: 'display:flex;',
    currenTab: 0,
    currenPage: 1,
    currenTotal: 1,
    isLoading: false,
    toTopHeight: 60,
    activities: [
      // 添加更多活动数据...
    ],
    works: []
  },

  // tabbar实现切换
  onTabsChange(event) {
    const myComponent = this.selectComponent('.search');
    myComponent.setData({
      value: ''
    })
    this.setData({
      currenTab: `${event.detail.value}`,
    });
    this.pageLoad();
  },

  onTabsClick(event) {
    // //console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },

  // 刷新获取页面内容
  pageLoad() {
    wx.stopPullDownRefresh();
    this.setData({
      pageLoading: true,
    });
    // 判断当前所属tab
    if (this.data.currenTab == 0) {
      // 获取志愿数据
      wx.request({
        url: host + '/api/user/activity/myactivity',
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: '',
              cancancle: '',
              canscanTime: ''
            };
            if (item.registerStatus == 1) {
              status.name = "审核通过";
              status.class = "";
              status.cancancle = false;
              status.canscanTime = true;
              if (compareTime(item.deadline) == 1) {
                status.name = "已结束";
                status.class = "status-end";
                status.cancancle = false;
                status.canscanTime = false;
              } else {
                status.name = "进行中";
                status.class = "";
                status.cancancle = false;
                status.canscanTime = true;
              }
            } else {
              if (item.registerStatus == 0) {
                status.name = "待审核";
                status.class = "status-max";
                status.cancancle = true;
                status.canscanTime = false;
                if (compareTime(item.deadline) == 1) {
                  status.name = "已结束";
                  status.class = "status-end";
                  status.cancancle = false;
                  status.canscanTime = false;
                }
              } else {
                status.name = "已驳回";
                status.class = "status-alert";
                status.cancancle = false;
                status.canscanTime = false;
              }
            }


            return {
              id: item.activity_id,
              image: item.activity_pic,
              title: item.activity_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.activity_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class,
              cancancle: status.cancancle,
              canscan: status.canscanTime
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
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
    } else {
      // 获取work数据
      wx.request({
        url: host + '/api/user/work/myactivity',
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: '',
              cancancle: '',
              canscanTime: ''
            };
            if (item.registerStatus == 1) {
              status.name = "审核通过";
              status.class = "";
              status.cancancle = false
              if (compareTime(item.deadline) == 1) {
                status.name = "已结束";
                status.class = "status-end";
                status.cancancle = false;
                status.canscanTime = false;
              } else {
                status.name = "进行中";
                status.class = "";
                status.cancancle = false;
                status.canscanTime = true;
              }
            } else {
              if (item.registerStatus == 0) {
                status.name = "待审核";
                status.class = "status-max";
                status.cancancle = true
                if (compareTime(item.deadline) == 1) {
                  status.name = "已结束";
                  status.class = "status-end";
                  status.cancancle = false
                }
              } else {
                status.name = "已驳回";
                status.class = "status-alert";
                status.cancancle = false
              }
            }
            return {
              id: item.work_study_id,
              image: item.job_pic,
              title: item.job_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.job_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class,
              cancancle: status.cancancle
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
            works: processData
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
    }

  },

  // 初始化函数
  init() {
    this.pageLoad();
  },

  // 顶部页面距离
  getheight() {
    // 获取胶囊按钮位置信息
    const rect = wx.getMenuButtonBoundingClientRect();
    this.setData({
      toTopHeight: rect
    });
  },

  // 搜索栏
  search: _.debounce(function (e) {
    const key = e.detail.value;
    Toast({
      context: this,
      selector: '#t-toast',
      message: '加载中',
      theme: 'loading',
      direction: 'column',
      duration: 200
    });
    // 判断当前所属tab
    if (this.data.currenTab == 0) {
      // 获取志愿数据
      wx.request({
        url: host + '/api/user/activity/search?key=' + key,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: '',
              cancancle: '',
              canscanTime: ''
            };
            if (item.registerStatus == 1) {
              status.name = "审核通过";
              status.class = "";
              status.cancancle = false;
              status.canscanTime = true;
              if (compareTime(item.deadline) == 1) {
                status.name = "已结束";
                status.class = "status-end";
                status.cancancle = false;
                status.canscanTime = false;
              } else {
                status.name = "进行中";
                status.class = "";
                status.cancancle = false;
                status.canscanTime = true;
              }
            } else {
              if (item.registerStatus == 0) {
                status.name = "待审核";
                status.class = "status-max";
                status.cancancle = true;
                status.canscanTime = false;
                if (compareTime(item.deadline) == 1) {
                  status.name = "已结束";
                  status.class = "status-end";
                  status.cancancle = false;
                  status.canscanTime = false;
                }
              } else {
                status.name = "已驳回";
                status.class = "status-alert";
                status.cancancle = false;
                status.canscanTime = false;
              }
            }
            return {
              id: item.activity_id,
              image: item.activity_pic,
              title: item.activity_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.activity_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class,
              canscan: status.canscanTime
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
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
    } else {
      // 获取work数据
      wx.request({
        url: host + '/api/user/work/search?key=' + key,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: '',
              cancancle: '',
              canscanTime: ''
            };
            if (item.registerStatus == 1) {
              status.name = "审核通过";
              status.class = "";
              status.cancancle = false;
              if (compareTime(item.deadline) == 1) {
                status.name = "已结束";
                status.class = "status-end";
                status.cancancle = false;
                status.canscanTime = false;
              } else {
                status.name = "进行中";
                status.class = "";
                status.cancancle = false;
                status.canscanTime = true;
              }
            } else {
              if (item.registerStatus == 0) {
                status.name = "待审核";
                status.class = "status-max";
                status.cancancle = true
                if (compareTime(item.deadline) == 1) {
                  status.name = "已结束";
                  status.class = "status-end";
                  status.cancancle = false
                }
              } else {
                status.name = "已驳回";
                status.class = "status-alert";
                status.cancancle = false
              }
            }
            return {
              id: item.work_study_id,
              image: item.job_pic,
              title: item.job_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.job_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class,
              cancancle: status.cancancle
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
            works: processData
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
    }
  }, 500),

  //跳转详情页面
  todetail(e) {
    let that = this;
    //console.log(e);
    wx.navigateTo({
      url: '../../activity/detail/detail?id=' + e.currentTarget.dataset.id,
      success: function (res) {
        // // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.activities })
      }
    })
  },
  workDetail(e) {
    let that = this;
    wx.navigateTo({
      url: '../../activity/detail/workdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 扫码计时
  scanTime() {
    wx.scanCode({
      success: (res) => {
        //console.log('扫码结果：', res.result);
        wx.navigateTo({
          url: '../scancode/scancode?code=' + res.result,
        })
      },
      fail: (err) => {
        console.error('扫码失败：', err);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
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
    this.getheight();
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
    this.init();
  },


  // 到达页面底部
  onReachBottom() {
    this.setData({
      isLoading: true
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
      this.setData({
        isLoading: false
      })
      return;
    }
    const page = data.currenPage + 1;
    // 判断当前所属tab
    if (this.data.currenTab == 0) {
      // 获取志愿数据
      wx.request({
        url: host + '/api/user/activity/myactivity?page=' + page,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: '',
              cancancle: '',
              canscanTime: ''
            };
            if (item.registerStatus == 1) {
              status.name = "审核通过";
              status.class = "";
              status.cancancle = false;
              status.canscanTime = true;
              if (compareTime(item.deadline) == 1) {
                status.name = "已结束";
                status.class = "status-end";
                status.cancancle = false;
                status.canscanTime = false;
              } else {
                status.name = "进行中";
                status.class = "";
                status.cancancle = false;
                status.canscanTime = true;
              }
            } else {
              if (item.registerStatus == 0) {
                status.name = "待审核";
                status.class = "status-max";
                status.cancancle = true;
                status.canscanTime = false;
                if (compareTime(item.deadline) == 1) {
                  status.name = "已结束";
                  status.class = "status-end";
                  status.cancancle = false;
                  status.canscanTime = false;
                }
              } else {
                status.name = "已驳回";
                status.class = "status-alert";
                status.cancancle = false;
                status.canscanTime = false;
              }
            }

            return {
              id: item.activity_id,
              image: item.activity_pic,
              title: item.activity_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.activity_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class,
              cancancle: status.cancancle,
              canscan: status.canscanTime
            };
          });
          this.setData({
            isLoading: false,
            currenPage: res.data.data.page,
            currenTotal: res.data.data.total,
            activities: this.data.activities.concat(processData)
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
    } else {
      wx.request({
        url: host + '/api/user/work/myactivity?page=' + page,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          let processData = resdata.map(item => {
            //返回-1 是当前时间早于ddl 报名中
            let status = {
              name: '',
              class: '',
              cancancle: '',
              canscanTime: ''
            };
            if (item.registerStatus == 1) {
              status.name = "审核通过";
              status.class = "";
              status.cancancle = false;
              status.canscanTime = true;
              if (compareTime(item.deadline) == 1) {
                status.name = "已结束";
                status.class = "status-end";
                status.cancancle = false;
                status.canscanTime = false;
              } else {
                status.name = "进行中";
                status.class = "";
                status.cancancle = false;
                status.canscanTime = true;
              }
            } else {
              if (item.registerStatus == 0) {
                status.name = "待审核";
                status.class = "status-max";
                status.cancancle = true;
                status.canscanTime = false;
                if (compareTime(item.deadline) == 1) {
                  status.name = "已结束";
                  status.class = "status-end";
                  status.cancancle = false;
                  status.canscanTime = false;
                }
              } else {
                status.name = "已驳回";
                status.class = "status-alert";
                status.cancancle = false;
                status.canscanTime = false;
              }
            }
            return {
              id: item.work_study_id,
              image: item.job_pic,
              title: item.job_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.job_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class,
              cancancle: status.cancancle
            };
          });
          this.setData({
            isLoading: false,
            currenPage: res.data.data.page,
            currenTotal: res.data.data.total,
            works: this.data.works.concat(processData)
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
    }
  },
  cancelSign(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '提示',
      content: '确定要取消【' + name + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: host + '/api/activity/sign/cancel?activity_id=' + id,
            method: 'get',
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            success: res => {
              let data = res.data;
              if (data.data != true) {
                wx.showToast({
                  title: data.data,
                  icon: "error",
                  duration: 3000
                })
                return;
              }
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
              });
            }
          })

        } else if (res.cancel) {
          //console.log('取消取消报名');
        }
      }
    });
  },
  cancelSignWork(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '提示',
      content: '确定要取消【' + name + '】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: host + '/api/work/sign/cancel?work_study_id=' + id,
            method: 'get',
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            success: res => {
              let data = res.data;
              if (data.data != true) {
                wx.showToast({
                  title: data.data,
                  icon: "error",
                  duration: 3000
                })
                return;
              }
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
              });
            }
          })

        } else if (res.cancel) {
          //console.log('取消取消报名');
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})