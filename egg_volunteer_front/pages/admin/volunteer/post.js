const moment = require("../../../utils/moment");
const config = require("../../../config");
import Toast from 'tdesign-miniprogram/toast/index';
const qiniuUploader = require('../../../utils/qiniuUploader')
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
  data: {
    activity_pic: '',
    activityName: '',
    activityPlace: '',
    needperson: '',
    contactName: '',
    contactPhone: '',
    detailInfo: '',
    requirement: '',
    guarantee: '',
    pickerMode: '',
    pickerVisible: false,
    pickerValue: new Date().getTime(),
    startTimeText: '',
    endTimeText: '',
    deadlineText: '',
    // switch开关
    defaultVal: false,
    date: new Date().getTime(),
    uploaddate: moment().format('YYYYMMDD')
  },
  // switch开关
  handleChange(e) {
    this.setData({
      defaultVal: e.detail.value,
    });
  },
  showPicker(e) {
    const {
      mode
    } = e?.currentTarget?.dataset;
    this.setData({
      pickerMode: mode,
      pickerVisible: true,
    });
  },
  hidePicker() {
    this.setData({
      pickerVisible: false,
    });
  },
  onConfirm(e) {
    const {
      value
    } = e?.detail;
    const {
      pickerMode
    } = this.data;

    // 验证开始时间不得晚于结束时间
    if (pickerMode === 'startTime' && moment(value).isAfter(moment(this.data.endTime ? this.data.endTime : '2099-12-31'))) {
      wx.showToast({
        title: '开始时间不得晚于结束时间',
        icon: 'none',
      });
      return;
    }

    // 验证结束时间不得早于开始时间
    if (pickerMode === 'endTime' && moment(value).isBefore(moment(this.data.startTime))) {
      wx.showToast({
        title: '结束时间不能早于开始时间',
        icon: 'none',
      });
      return;
    }

    // 验证截止时间不得晚于结束时间
    if (pickerMode === 'deadline' && moment(value).isAfter(moment(this.data.endTime))) {
      wx.showToast({
        title: '截止时间不能晚于结束时间',
        icon: 'none',
      });
      return;
    }

    this.setData({
      pickerValue: value,
      [`${pickerMode}Text`]: value,
      [`${pickerMode}`]: value,
    });

    this.hidePicker();
  },
  onColumnChange(e) {
    //console.log('pick', e?.detail?.value);
  },
  onInputChange(e) {
    //console.log(e);
    const key = e.currentTarget.dataset.key;
    this.setData({
      [`${key}`]: e.detail.value
    })
  },
  uploadimage() {
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFiles[0].tempFilePath;
        // 文件上传
        var filePath = tempFilePaths;
        var name = new Date().getTime() + '.' + filePath.substr(filePath.lastIndexOf('.') + 1);
        //文件名（文件名里添加路径，加以区分）
        var fileName = 'upload/image/' + that.data.uploaddate + '/' + name;
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
          wx.hideLoading();
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 3000
          });
          // 更新页面数据
          this.setData({
            'activity_pic': img.url,
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
  onLoad() {

  },
  onSubmit() {
    // 更新同步信息
    let data = {
      activity_name: this.data.activityName,
      activity_place: this.data.activityPlace,
      activity_pic: this.data.activity_pic,
      need_person: this.data.needperson,
      contact_name: this.data.contactName,
      contact_phone: this.data.contactPhone,
      limitation: this.data.defaultVal,
      guarantee: this.data.guarantee,
      requirement: this.data.requirement,
      detail_info: this.data.detailInfo,
      start_time: this.data.startTime,
      end_time: this.data.endTime,
      deadline: this.data.deadline
    }
    // 遍历 data 对象的键
    for (let key of Object.keys(data)) {
      if (data[key]==null) {
        // 如果值为空，则提示未填写完毕
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none'
        });
        return;
      }
    }
    // 发起请求提交
    wx.request({
      url: config.host + '/api/admin/activity/post',
      method: 'POST',
      header: {
        'Authorization': wx.getStorageSync('token'),
      },
      data: data,
      success: (res) => {
        // 接受结果
        Toast({
          context: this,
          selector: '#t-toast',
          message: '发布成功',
          theme: 'success',
          direction: 'column',
        });
        setTimeout(function() {
          wx.navigateBack();
        }, 2000)
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