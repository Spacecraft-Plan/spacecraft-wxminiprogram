// pages/profile/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

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
    onShareAppMessage(o) {
            return {
                from: "button",
                title: '未知思考',
                // imageUrl: '' // 图片 URL
                path: '/pages/index/index?userId='+Constant.userId+'&share=true',
            }
    },
    onShareTimeline(){
        return {
            title:"乐玩",
            imageUrl:''
        }
    },
    onClick(e) {
        wx.setClipboardData({
            data: '未知思考',
            success (res) {
                wx.showModal({
                    content: '“未知思考”公众号名称已复制到剪切板，去微信搜索关注吧',   //这个地方会提示报错改成string格式就行
                    showCancel:false,
                    cancelColor: '#8799a3', //取消文字的颜色
                    confirmText: "知道了", //默认是“确定”
                    confirmColor: '#3385FF', //确定文字的颜色
                  })
            }
          })
    },
    onJump(e){
        wx.showModal({
            title:'"未知思考"公众号',
            content: '大前端老司机聚焦大前端，关注性能优化，分享大前端技术、摄影、股票、人生感悟，理性地尝试与这个世界建立感性的连接。',   //这个地方会提示报错改成string格式就行
            showCancel:false,
            confirmText: "认识了", //默认是“确定”
            confirmColor: '#3385FF', //确定文字的颜色
          })
    }
})