// pages/usercenter/userinfo/userindex.js
import Toast from 'tdesign-miniprogram/toast/index';
import moment from '../../../utils/moment';
const config = require("../../../config");
const qiniuUploader = require('../../../utils/qiniuUploader')

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: config.Region, // 所属地址
    uptokenURL: config.uptokenURL, //后端获取token
    domain: config.domain, //空间域名（融合CDN域名）
  };
  qiniuUploader.init(options);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userTypeText: '普通用户'
    },
    userInfoDelay:{
    },
    sexText: '男',
    sexValue: [],
    sexTitle: '选择性别',
    sexs: [
      { label: '男', value: '0' },
      { label: '女', value: '1' },
    ],
    departText: '无',
    departValue: [],
    departTitle: '选择部门',
    departs: [
      { label: '计算机科学与技术学院', value: '0' },
      { label: '文学与传媒学院', value: '1' },
    ],
    // 信息是否允许修改
    canEdit: true,
    // 时间选择器
    mode: '',
    dateVisible: false,
    date: new Date().getTime(), // 支持时间戳传入
    dateText: '',

    // 指定选择区间起始值
    start: '1900-01-01',
    end: getDate(),
    uploaddate: moment().format('YYYYMMDD')
  },
  /**
   * 信息修改前检查
   */
  checkEditStatus(){
    if (this.data.canEdit){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请先编辑',
        theme: 'error',
        direction: 'column',
      });
      return true;
    } else {
      return false;
    }
  },
   
  // 选择器
  onTitlePicker() {
    if(this.checkEditStatus()) return;
    this.setData({ sexVisible: true, sexTitle: '选择性别'});
  },
  ondepartPicker(){
    if(this.checkEditStatus()) return;
    this.setData({ departVisible: true, departTitle: '选择部门'});
  },
  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    // //console.log(e, '取消');
    // //console.log('picker1 cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },
  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    const label = e.detail.label.join(' ');
    this.setData({
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: label,
      [`userInfo.${key}`]: e.detail.value[0],
    });
  },
  onDataInit(key, value, label) {
    this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: value,
        [`${key}Text`]: label,
    });
  },

  // 时间选择器代码
  showPicker(e) {
    if(this.checkEditStatus()) return;
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hidePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    const { mode } = this.data;

    // //console.log('confirm', value);

    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
      [`userInfo.birthday`]: value 
    });

    this.hidePicker();
  },
  // 时间选择器结束

  // 点击修改头像
  onChangeAvatar() {
    if(this.checkEditStatus()) return;
    // 添加修改头像的逻辑
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType:['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFiles[0].tempFilePath;
        // 文件上传
        var filePath = tempFilePaths;
        var name = new Date().getTime() + '.' + filePath.substr(filePath.lastIndexOf('.') + 1);
        //文件名（文件名里添加路径，加以区分）
        var fileName = 'upload/avatar/' + that.data.uploaddate + '/' + name;
        wx.showLoading({
          title: '上传中...',
        })
        //上传图片到对象存储中
        initQiniu();
        qiniuUploader.upload(filePath, fileName, (res) => {
          var key = res.key;
          var imageURL = res.imageURL;
          //添加到预览中
          var img = {
            url: imageURL,
            key: key
          }
          //存入缓存
          wx.setStorageSync('avatar', img);
          wx.hideLoading();
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000
          });        
          // 更新页面数据
          this.setData({
            'userInfo.profile.avatar': img.url,
          });
        }, (error) => {
          wx.hideLoading();
          wx.showModal({
            title: 'Error',
            content: '请求失败,状态码：' + JSON.stringify(error),
            showCancel: false
          });
        });
      },
    });
  },
  // 更改编辑状态
  onEditChange(){
    this.setData({
      canEdit: !this.data.canEdit
    });
  },
  // 其他输入框改变
  onInputChange: function(e) {
    const { field } = e.currentTarget.dataset;
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    // 更新页面数据
    this.setData({
      [`userInfoDelay.${key}`]: value,
    });
  },
  // 提交用户信息,保存更改,修改编辑状态为false
  onSubmit: function() {
    // 更新同步信息
    this.setData({
      [`userInfoDelay.avatar`]: this.data.userInfo.profile.avatar,
      [`userInfoDelay.gender`]: this.data.sexValue[0],
      [`userInfoDelay.department_id`]: this.data.departValue[0],
      [`userInfoDelay.birthday`]: this.data.date,
    })
    const userInfo = this.data.userInfoDelay;
    // 发起请求提交用户信息
    wx.request({
      url: config.host + '/api/admin/user/update?user_id=' + this.data.userId,
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      data: userInfo,
      success: (res) => {
        // 接受结果 判断后才提示修改结果
        Toast({
          context: this,
          selector: '#t-toast',
          message: '修改成功',
          theme: 'success',
          direction: 'column',
        });
        this.setData({
          canEdit: !this.data.canEdit
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

  init(){
    // 获取部门信息
    wx.request({
      url: config.host + '/api/user/depart',
      method: "get",
      header: {
        'Authorization': wx.getStorageSync('token'), // 设置自定义的 Authorization Header
      },
      success: res=>{
        const resdata = res.data.data;
        const departs = resdata.map(item => {
          return {
            label: item.department_name,
            value: item.department_id.toString()
          };
        });
        this.setData({
          departs: departs
        });
      }
    });
    // 获取用户详细信息
    wx.request({
      url: config.host + '/api/admin/user/getuserinfo?user_id=' + this.data.userId,
      method: "get",
      header: {
        'Authorization': wx.getStorageSync('token'), // 设置自定义的 Authorization Header
      },
      success: res=>{
        const userInfo = res.data.data;
        const gender = userInfo.profile.gender === 0 ? '男' : '女';
        this.onDataInit('sex', [userInfo.profile.gender], gender);
        // userInfo.profile.gender
        let departid = userInfo.profile.department_id;
        if (departid!=null){
          // 非空就去map找部门
          const depart = this.data.departs.find(item => item.value == departid);
          this.onDataInit('depart', [userInfo.profile.department_id], depart.label);
        } else {
          this.onDataInit('depart', [0], "无");
        }
        // userInfo.profile.department_id
        // userInfo.profile.birthday
        let birthday;
        if (userInfo.profile.birthday) {
          birthday = moment(userInfo.profile.birthday).format('YYYY-MM-DD');
        } else {
          birthday = "请设置生日"
        }
        this.setData({
          date: birthday,
          dateText: birthday
        })
        // 用户类型展示
        let usertype;
        if (userInfo.profile.user_type==1) {
          usertype = '学生'
        } else if(userInfo.profile.user_type==2){
          usertype = '老师'
        } else {
          usertype = '其它'
        }
        // 更新页面数据
        this.setData({
          userInfo: userInfo,
          userTypeText: usertype
        });
      }
    })
  },
  // 跳转中央认证页面 
  navigateToAuth(){
    wx.showToast({
      title: '非用户不可修改',
      icon: 'error'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var formattedDate = moment().format('YYYYMMDD');
    this.setData({
      date: formattedDate,
      userId: options.id
    })
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