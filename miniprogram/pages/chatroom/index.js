import {
    userRegister,
    checkLoginState
} from '../../services/passport'
import {
    sendTxt,
    sendImg
} from '../../services/message'
// 获取全局APP
const app = getApp();
// 转发
const db = wx.cloud.database();
// 聊天侦听器
var chatWatcher = null
// 获取计时器函数
Page({
    /**
     * 页面的初始数据
     */
    data: {
        login: false,
        //输入框距离
        InputBottom: 0,
        roomId: 1,
        userInfo: {},
        content: '',
        groups: [{
            text: '点歌',
            value: 1
        }],
        voice: false,
        showKeyboard: false,
    },
    async selectImg() {
        var that = this;
        let res = await wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera']
        })
        console.log(res)
        res = await wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
        })
        var bufferData = res.data;
        res = sendImg({
            roomId: that.data.roomId,
            content: bufferData
        });
        wx.showLoading({
            title: '信息发送',
            mask: true
        })
        console.log(res)
        if (res.result.code == 300) {
            that.setData({
                errMsg: res.result.msg
            })
        }
        console.log(res)
        this.setData({
            content: ''
        })
        wx.hideLoading();
    },
    InputFocus(e) {
        this.setData({
            InputBottom: e.detail.height
        })
    },
    InputBlur(e) {
        this.setData({
            InputBottom: 0
        })
    },
    showAction() {
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success(res) {
                console.log(res.tapIndex)
            },
            fail(res) {
                console.log(res.errMsg)
            }
        })
    },
    async submit() {
        var that = this;
        if (this.data.login) {
            //已登录用户
            wx.showLoading({
                title: '信息发送',
            })
            const res = await sendTxt({
                roomId: that.data.roomId,
                content: that.data.content
            })
            console.log(res)
            if (res?.result?.code ?? -1 == 300) {
                that.setData({
                    errMsg: res.result.msg
                })
            }
            this.setData({
                content: ''
            })
            wx.hideLoading();
        } else {
            const res = await wx.getUserProfile({
                desc: '获取用户聊天头像',
            })
            // console.log(res)
            wx.showLoading({
                title: '获取用户信息',
            })
            const r = await userRegister(res.userInfo);
            console.log(r)
            wx.hideLoading();
            that.setData({
                login: true
            }, () => {
                that.submit();
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        checkLoginState().then(res => {
            const l = res?.result?.errCode ?? -1 != -1
            console.log(res, l ? '--已登录--' : '--未登录--');
            this.setData({
                login: l
            })
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
 
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    selectVoice() {
        wx.showToast({
            title: '该功能未上线！',
            icon: 'none',
            duration: 1500

        })
    }
})