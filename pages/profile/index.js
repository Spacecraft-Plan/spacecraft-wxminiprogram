// pages/profile/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
   

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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
            return {
                from: "button",
                title: '转发标题',
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
            data: '电解质思考',
            success (res) {
                wx.showModal({
                    content: '“电解质思考”公众号名称已复制到剪切板，去微信搜索关注吧',   //这个地方会提示报错改成string格式就行
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
            title:'"电解质思考"公众号',
            content: 'Android老司机聚焦大前端，关注性能优化，分享大前端技术、摄影、股票、人生感悟，理性地尝试与这个世界建立感性的连接。',   //这个地方会提示报错改成string格式就行
            showCancel:false,
            confirmText: "认识了", //默认是“确定”
            confirmColor: '#3385FF', //确定文字的颜色
          })
    }
})