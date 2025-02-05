const config = require("../../../config");
const _ = require('../../../utils/lodash.js');
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    activityLogs: [],
    systemLogs: [],
    currenTab: 0,
    currenPage: 1,
    currenTotal: 1,
  },
  onTabChange(event) {
    this.setData({
      currenTab: event.detail.value
    })    
    this.fetchLogs();
  },
  onLoad() {
    // 页面加载时获取初始日志数据
    this.fetchLogs();
  },
  fetchLogs() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.currenTab == 1) {
      // 获取syslog数据
      wx.request({
        url: config.host + '/api/admin/syslog/get',
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          // 定义不同 operation_type 对应的类型
          const typeMap = {
            1: '新增操作',
            2: '更新操作',
            3: '删除操作',
          };
          // 处理 operation_type 字段，根据数字定义类型
          const modifiedResdata = resdata.map(item => {
            return {
              ...item,
              operation_type_desc: typeMap[item.operation_type]
            };
          });
          this.setData({
            currenPage: 1,
            currenTotal: res.data.data.total,
            systemLogs: modifiedResdata
          });
          wx.hideLoading();
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
      // 获取actlog数据
      wx.request({
        url: config.host + '/api/admin/actlog/get',
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          // 定义不同 operation_type 对应的类型
          const typeMap = {
            1: '审核操作',
            2: '用户操作',
            3: '活动操作',
            4: '其它',
          };

          // 处理 operation_type 字段，根据数字定义类型
          const modifiedResdata = resdata.map(item => {
            return {
              ...item,
              operation_type_desc: typeMap[item.operation_type]
            };
          });
          this.setData({
            currenPage: 1,
            currenTotal: res.data.data.total,
            activityLogs: modifiedResdata
          });
          wx.hideLoading();
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
  // 搜索
  search: _.debounce(function (e) {
    const key = e.detail.value;
    // 判断当前所属tab
    if (this.data.currenTab == 0) {
      wx.request({
        url: config.host + '/api/admin/actlog/search?key=' + key,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          // 定义不同 operation_type 对应的类型
          const typeMap = {
            1: '审核操作',
            2: '用户操作',
            3: '活动操作',
            4: '其它',
          };

          // 处理 operation_type 字段，根据数字定义类型
          const modifiedResdata = resdata.map(item => {
            return {
              ...item,
              operation_type_desc: typeMap[item.operation_type]
            };
          });
          this.setData({
            currenPage: 1,
            currenTotal: res.data.data.total,
            activityLogs: modifiedResdata
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
        url: config.host + '/api/admin/syslog/search?key=' + key,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          let resdata = res.data.data.data;
          // 定义不同 operation_type 对应的类型
          const typeMap = {
            1: '新增操作',
            2: '更新操作',
            3: '删除操作',
          };
          // 处理 operation_type 字段，根据数字定义类型
          const modifiedResdata = resdata.map(item => {
            return {
              ...item,
              operation_type_desc: typeMap[item.operation_type]
            };
          });
          this.setData({
            currenPage: 1,
            currenTotal: res.data.data.total,
            systemLogs: modifiedResdata
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

  // 到达页面底部
  onReachBottom() {
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
      return;
    }
    const page = data.currenPage + 1;
    // 判断当前所属tab
    if (this.data.currenTab == 0) {
      wx.request({
        url: host + '/api/admin/actlog/get?page=' + page,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          // 定义不同 operation_type 对应的类型
          const typeMap = {
            1: '审核操作',
            2: '用户操作',
            3: '活动操作',
            4: '其它',
          };

          // 处理 operation_type 字段，根据数字定义类型
          const modifiedResdata = resdata.map(item => {
            return {
              ...item,
              operation_type_desc: typeMap[item.operation_type]
            };
          });
          this.setData({
            currenPage: res.data.data.page,
            currenTotal: res.data.data.total,
            activityLogs: this.data.activityLogs.concat(modifiedResdata)
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
        url: host + '/api/admin/syslog/get?page=' + page,
        method: 'get',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          // 定义不同 operation_type 对应的类型
          const typeMap = {
            1: '新增操作',
            2: '更新操作',
            3: '删除操作',
          };
          // 处理 operation_type 字段，根据数字定义类型
          const modifiedResdata = resdata.map(item => {
            return {
              ...item,
              operation_type_desc: typeMap[item.operation_type]
            };
          });
          this.setData({
            currenPage: res.data.data.page,
            currenTotal: res.data.data.total,
            systemLogs: this.data.systemLogs.concat(modifiedResdata)
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
});