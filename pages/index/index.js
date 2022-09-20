// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    total: 0,
    inputDatas: [{
      name: 'base',
      placeholder: '年薪',
      unit: ''
    }, {
      name: 'monday',
      placeholder: '一周工作日加班时间',
      unit: '小时'
    }, {
      name: 'sunday',
      placeholder: '一周休息日加班时间',
      unit: '天'
    }, {
      name: 'newYear',
      placeholder: '一年节假日加班时间',
      unit: '天'
    }]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  jump2href(e) {
    wx.navigateTo({
      url: '../w/w'
    })
  },
   getFields(selector) {
    return wx.createSelectorQuery().select(selector).fields({
      properties: ['value']
    }).exec()
  },
  update(e) {
    //1.当前的input value值
    console.log(e,e.detail.value,e.currentTarget.id);
    //2.计算其他input的value值
    let inpD = this.data.inputDatas
    let input = {}
    for (let i = 0; i < inpD.length; i++) {
      if(inpD[i].name === e.currentTarget.id) continue
      let n =this.getFields('#' + inpD[i].name);
      console.log(inpD[i].name,n)
      // console.log('query res: ', res,'#'+inpD[i].name);
      // input[inpD[i].name] = Number(res.value || 0);
    }
    let {
      base,
      monday,
      sunday,
      newYear
    } = input
    let money = base * (1.5 * monday / 40 + 2 * sunday / 5 + 3 * newYear / 261)
    let round = Math.round(money * 100) / 100
    this.setData({
      total: round
    })
  }
})