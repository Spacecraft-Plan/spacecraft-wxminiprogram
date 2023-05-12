import {cloudId} from 'config'
App({
    onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //初始化custom所需配置信息
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
    //初始化云服务 / ESC
    wx.cloud.init({
        env: cloudId,
        traceUser: true
      })
  },
  globalData: {
    userInfo: null
  },
})
