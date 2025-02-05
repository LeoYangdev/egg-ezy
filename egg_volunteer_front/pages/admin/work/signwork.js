const config = require('../../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  init(id) {
    wx.request({
      url: config.host + '/api/user/work/signlist?work_study_id=' + id,
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
      work_id: options.id
    })
  },
  onCardClick(e) {
    const member = e.currentTarget.dataset.item;
    //console.log('点击了成员：', member);
  },
  onDetactApproval(e){
    const index = e.currentTarget.dataset.index;
    const userid = e.currentTarget.dataset.id;
    const rid = e.currentTarget.dataset.rid;
    let that = this;
    let data = {
      'rid': rid,
      'type': 2,
      'result': 0,
      'remarks': '审核被撤销！'
    }
    wx.showModal({
      title: '提示',
      content: '确定要撤销【'+ e.currentTarget.dataset.name +'】的报名吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: config.host + '/api/admin/work/approval',
            method: 'POST',
            data: data,
            header: {
              'Authorization': wx.getStorageSync('token')
            },
            success: res => {
              if (res.data.data == 1) {
                wx.showToast({
                  title: '撤销成功',
                  icon: 'success'
                });
                that.setData({
                  [`userlist[${index}].register_status`]: 2
                })
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
          //console.log('取消');
        }
      }
    });
  }

})