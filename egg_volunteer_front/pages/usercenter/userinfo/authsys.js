// authentication.js
import Toast from 'tdesign-miniprogram/toast/index';
const config = require("../../../config");
Page({
  data: {
    username: '',
    password: '',
    isAuthenticated: false
  },

  inputUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },

  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },

  authenticate() {
    let data = {
      username: this.data.username,
      password: this.data.password
    }
    // 发送账号密码到后端进行认证
    wx.request({
      url: config.host + '/dgut/login.php',
      method: 'post',
      data: data,
      success: (res) => {
        // 接受结果
        if (res.data.code == 200) {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '中央认证通过',
            theme: 'success',
            direction: 'column',
          });
          // 假设后端返回认证成功的标识为 true
          const isAuthenticated = true;
          // 更新页面状态，显示认证成功消息
          this.setData({
            isAuthenticated: isAuthenticated
          });
          // 同步数据到后台
          wx.request({
            url: config.host + '/api/user/dgut/auth',
            method: 'POST',
            header: {
              'Authorization': wx.getStorageSync('token'),
            },
            data: data,
            success: (res) => {
              // 接受结果
              if (res.data.data == true) {
                Toast({
                  context: this,
                  selector: '#t-toast',
                  message: '同步成功',
                  theme: 'success',
                  direction: 'column',
                });
                setTimeout(() => {
                  wx.navigateBack();
                }, 3000);
              }
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
        } else {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '账号或密码错误',
            theme: 'error',
            direction: 'column',
          });
        }
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
  }
});