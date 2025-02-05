// pages/notification/detail.js

const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {

  },

  onLoad(option) {
    this.setData({
      article_id: option.id
    })
    wx.request({
      url: config.host + '/api/user/article/detail?id=' + option.id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        this.setData({
          title: res.data.data.title,
          content: res.data.data.content,
          category: res.data.data.category,
          organizer: res.data.data.organizer,
          organizer_department: res.data.data.organizer_department,
          published_time: res.data.data.published_time,
          update_time: res.data.data.update_time,
          likeCount: res.data.data.like_count,
          liked: res.data.data.liked,
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
  toggleLike() {
    // 如果已经点赞，则取消点赞；如果未点赞，则点赞
    const newLikeStatus = !this.data.liked;
    const newLikeCount = newLikeStatus ? this.data.likeCount + 1 : this.data.likeCount - 1;

    wx.request({
      url: config.host + '/api/user/article/like?id=' + this.data.article_id,
      method: 'get',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: (res) => {
        if (res.data.data == 1 || res.data.data == true) {
          // 更新页面上的点赞状态和数量
          this.setData({
            liked: newLikeStatus,
            likeCount: newLikeCount,
          });
        } else {
          wx.showToast({
            title: '未知错误',
          })
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
  },
});