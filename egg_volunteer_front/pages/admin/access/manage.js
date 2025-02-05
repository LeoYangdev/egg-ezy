const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    managers: [],
    searchResults: [],
    searchInputValue: '',
    addInputValue: '',
    showSearchDialog: false,
  },

  onAddInput(e) {
    this.setData({
      addInputValue: e.detail.value
    });
  },

  closeSearchDialog() {
    this.setData({
      showSearchDialog: false,
    });
  },  

  searchManager() {
    const searchValue = this.data.addInputValue;
    if (!searchValue) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入要搜索的用户名',
        theme: 'warning',
      });
      return;
    }

    // 发起搜索请求
    wx.request({
      url: config.host + '/api/admin/admin/search?keyword=' + searchValue + '&department_id=' + this.data.departid,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          searchResults: res.data.data,
          showSearchDialog: true,
        });
      },
      fail: (err) => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '网络错误，请重试',
          theme: 'error',
        });
      },
    });
  },

  addManagerFromSearch(e) {
    const userId = e.currentTarget.dataset.id;
    const {
      managers,
      searchResults
    } = this.data;
    const user = searchResults.find(item => item.user_id === userId);

    // 发起添加管理员的请求
    wx.request({
      url: config.host + '/api/admin/admin/add',
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Content-Type': 'application/json',
      },
      data: {
        user_id: userId,
        department_id: this.data.departid,
      },
      success: (res) => {
        if (res.data.data==1) {
          this.setData({
            managers: [...managers, user],
            showSearchDialog: false,
          });
          Toast({
            context: this,
            selector: '#t-toast',
            message: '添加成功',
            theme: 'success',
          });
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '添加失败，请重试',
            theme: 'error',
          });
        }
      },
      fail: (err) => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '网络错误，请重试',
          theme: 'error',
        });
      },
    });
  },

  deleteManager(e) {
    const managerId = e.currentTarget.dataset.id;
    const departId = this.data.departid;
    const {
      managers
    } = this.data;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除用户【' + e.currentTarget.dataset.name + '】权限吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/admin/admin/delete',
            method: 'POST',
            header: {
              'Authorization': wx.getStorageSync('token'),
              'Content-Type': 'application/json',
            },
            data: {
              user_id: managerId,
              department_id: departId
            },
            success: (res) => {
              if (res.data.data==1) {
                that.setData({
                  managers: managers.filter(item => item.user_id !== managerId),
                });
                Toast({
                  context: this,
                  selector: '#t-toast',
                  message: '删除成功',
                  theme: 'success',
                });
              } else {
                Toast({
                  context: this,
                  selector: '#t-toast',
                  message: '删除失败，请重试',
                  theme: 'error',
                });
              }
            },
            fail: (err) => {
              Toast({
                context: this,
                selector: '#t-toast',
                message: '网络错误，请重试',
                theme: 'error',
              });
            },
          });
        } else if (res.cancel) {
          //console.log('取消删除');
        }
      }
    });

  },

  closeSearchDialog() {
    this.setData({
      showSearchDialog: false,
    });
  },

  init() {
    wx.request({
      url: config.host + '/api/admin/admin/list?department_id=' + this.data.departid,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        let data = res.data.data;
        this.setData({
          managers: data,
        });
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

  onLoad(options) {
    this.setData({
      departid: options.id,
      departname: options.name,
    });
    this.init();
  }
});