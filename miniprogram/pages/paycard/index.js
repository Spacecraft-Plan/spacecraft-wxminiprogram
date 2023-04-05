// pages/paycard/index.js
Page({

    /**
     * 页面的初始数据
     */
    /**
     * 页面的初始数据
     */
    data: {
        activeIndex: 0, //默认选中第一个
        numArray: [20, 30, 50,
            80, 100, 200,
            // 'm'
        ]
    },
    activethis: function (event) { //点击选中事件
        var thisindex = event.currentTarget.dataset.thisindex; //当前index
        this.setData({
            activeIndex: thisindex
        })
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

    },
    onPay() {
        const selected = this.data.numArray[this.data.activeIndex]
        console.log(selected)
        wx.requestPayment({
            "timeStamp": "1414561699",
            "nonceStr": "5K8264ILTKCH16CQ2502SI8ZNMTM67VS",
            "package": "prepay_id=wx201410272009395522657a690389285100",
            "signType": "RSA",
            "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==",
            "success": function (res) {
                console.log(res)
            },
            "fail": function (res) {console.log(res)},
            "complete": function (res) {console.log(res)}
        })
    }
})