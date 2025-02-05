import { host } from "../../../config";
import Toast from 'tdesign-miniprogram/toast/index';
const _ = require('../../../utils/lodash.js');
var moment = require('../../../utils/moment.js');
// 时间比较器
function compareTime(time){
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
    pageLoading: false,
    tabPanelstyle: 'display:flex;',
    currenTab: 1,
    currenPage: 1,
    currenTotal: 1,
    isLoading: false,
    works : []
  },
  onViewEnrollment(e){
    wx.navigateTo({
      url: './signwork?id=' + e.currentTarget.dataset.id,
    })
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
        url: host+'/activity',
        method: 'get',
        success: res=>{
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
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
            activities: processData
          });
        },
        fail: res=>{
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
        url: host+'/work',
        method: 'get',
        success: res=>{
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
              id: item.work_study_id,
              image: item.job_pic,
              title: item.job_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.job_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
            works: processData
          });
        },
        fail: res=>{
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


  // 搜索栏
  search: _.debounce(function(e) {
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
        url: host+'/api/active/search?key=' + key,
        method: 'get',
        success: res=>{
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
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
            activities: processData
          });
        },
        fail: res=>{
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
        url: host+'/api/work/search?key=' + key,
        method: 'get',
        success: res=>{
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
              id: item.work_study_id,
              image: item.job_pic,
              title: item.job_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.job_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            pageLoading: false,
            currenPage: 1,
            currenTotal: res.data.data.total,
            works: processData
          });
        },
        fail: res=>{
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
  todetail(){
    let that = this;
    wx.navigateTo({
      url: './detail/detail',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.activities })
      }
    })
  },
  onApprovalWork(e){
    wx.navigateTo({
      url: './approval?id=' + e.currentTarget.dataset.id
    })
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
  onReachBottom(){
    this.setData({
      isLoading: true
    })
    const data = this.data
    // 请求page和请求limit,超过totalpage就返回
    if (data.currenPage >= data.currenTotal){
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
      return ;
    }
    const page = data.currenPage+1;
    // 判断当前所属tab
    if (this.data.currenTab == 0) {
      // 获取志愿数据
      wx.request({
        url: host+'/activity?page=' + page,
        method: 'get',
        success: res=>{
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
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            isLoading: false,
            currenPage: res.data.data.page,
            currenTotal: res.data.data.total,
            activities: this.data.activities.concat(processData)
          });
        },
        fail: res=>{
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
        url: host+'/work?page=' + page,
        method: 'get',
        success: res=>{
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
              id: item.work_study_id,
              image: item.job_pic,
              title: item.job_name,
              time: moment(item.deadline).format('YYYY年MM月DD日'),
              location: item.job_place,
              needperson: item.need_person,
              signperson: item.sign_person,
              accessperson: item.access_person,
              status: status.name,
              statusclass: status.class
            };
          });
          this.setData({
            isLoading: false,
            currenPage: res.data.data.page,
            currenTotal: res.data.data.total,
            works: this.data.works.concat(processData)
          });
        },
        fail: res=>{
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
  postwork() {
    wx.navigateTo({
      url: './post',
    })
  },
  onEditWork(e) {
    wx.navigateTo({
      url: './edit?id=' + e.currentTarget.dataset.id,
    })
  },
  onDeleteWork(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除【'+ e.currentTarget.dataset.name +'】吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/admin/work/delete?id=' + e.currentTarget.dataset.id,
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
              }else{
                wx.showToast({
                  title: '失败',
                  icon: 'error'
                });
              }
            },
            fail: res=>{
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
  onApprovalWork(e){
    wx.navigateTo({
      url: './approval?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})