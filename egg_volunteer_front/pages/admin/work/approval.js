const config = require("../../../config");

Page({
  data: {
    showModal: false,
    remark: '',
    readySent: {},
  },
  showModal() {
    this.setData({
      showModal: true
    });
  },
  hideModal() {
    this.setData({
      showModal: false
    });
  },
  inputRemark(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  confirmRemark(event) {
    //console.log('备注信息：', this.data.remark);
    // 拒绝在这里请求
    const index = this.data.readySent.index;
    const userid = this.data.readySent.userid;
    const rid = this.data.readySent.rid;
    let that = this;
    let data = {
      'rid': rid,
      'type': 2,
      'result': 2,
      'remarks': this.data.remark
    }    
    // 清空备注信息并隐藏模态框
    this.setData({
      remark: '',
      showModal: false
    });
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
            title: '审核拒绝',
            icon: 'success'
          });
          that.setData({
            [`signlist[${index}].register_status`]: 2
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
  },
  onLoad(option){
    this.setData({
      id: option.id
    })
    wx.request({
      url: config.host + '/api/admin/work/signlist?id=' + option.id,
      method: 'GET',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      success: res=>{
        this.setData({
          info: res.data.data,
          signlist: res.data.data.signlist
        })
      }
    })
  },
  approveApplicant(event) {
    const index = event.currentTarget.dataset.index;
    const userid = event.currentTarget.dataset.id;
    const rid = event.currentTarget.dataset.rid;
    let that = this;
    let data = {
      'rid': rid,
      'type': 2,
      'result': 1
    }
    wx.showModal({
      title: '提示',
      content: '确定要通过【'+ event.currentTarget.dataset.name +'】报名吗？',
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
                  title: '审核通过',
                  icon: 'success'
                });
                that.setData({
                  [`signlist[${index}].register_status`]: 1
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
  },
  rejectApplicant(event) {
    const index = event.currentTarget.dataset.index;
    const userid = event.currentTarget.dataset.id;
    const rid = event.currentTarget.dataset.rid;
    this.setData({
      readySent: {
        index: index,
        userid: userid,
        rid: rid
      }
    })
    this.showModal();
  }
});
