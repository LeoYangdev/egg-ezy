Page({
  data: {
    deviceModel: '',
    osVersion: '',
    appVersion: '',
    sysversion: 'v0.0.1'
  },
  onLoad: function () {
    const that = this;
    const systemInfo = wx.getSystemInfoSync();
    that.setData({
      deviceModel: systemInfo.model,
      osVersion: systemInfo.system,
      appVersion: systemInfo.version,
    });
  },
});
