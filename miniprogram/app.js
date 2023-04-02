// app.js
const config = require('config');
const Cloud = require('utils/cloud-call');
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    this.InitCustom(); //初始化custom所需配置信息
    this.InitCloud(); //初始化云服务 / ESC
  },
  InitCloud() {
    var that = this;
    wx.cloud.init({
      env: config.CloudID,
      traceUser: true
    })
    Cloud.GetOpenData().then(res => {
      console.log(res)
      that.globalData.openid = res.result.openid;
      //异步配置缓存
      wx.setStorageSync('openid', res.result.openid);
    })
  },
  InitCustom() {
    wx.getSystemInfo({
      success: e => {
        //console.log(e)
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        // console.log(custom)
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  },
  config,
  Cloud,
})
