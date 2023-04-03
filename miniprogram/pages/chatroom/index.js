import {
    userRegister,
    checkLoginState
} from '../../services/passport'
import {
    sendTxt,
    sendImg
} from '../../services/message'
import {
    showMessage
} from '../../utils/toastUtil'
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
        try {
            wx.showLoading({
                title: '信息发送',
                mask: true
            })
            res = await sendImg({
                roomId: that.data.roomId,
                content: bufferData
            });
            console.log(res)
            if (res.result.code == 300) {
                that.setData({
                    errMsg: res.result.msg
                })
            }
        } catch (res) {
            showMessage('网络出现问题')
            console.log(res)
        } finally {
            this.setData({
                content: ''
            })
            wx.hideLoading();
        }

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
            try {
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
                }else if(res.result.code == 200){
                    //todo:返回机器人的回复
                    that.setData({
                    })  
                }
            } catch (error) {
                showMessage('发送文字失败，网络出现问题')
                console.log(error)
            } finally {
                this.setData({
                    content: ''
                })
                wx.hideLoading();
            }
        } else {
            const res = await wx.getUserProfile({
                desc: '获取用户聊天头像',
            })
            try {
                wx.showLoading({
                    title: '获取用户信息',
                })
                const r = await userRegister(res.userInfo);
                console.log(r)
                that.setData({
                    login: true
                }, () => {
                    that.submit();
                })
            } catch (r) {
                showMessage('网络出现问题')
                console.log(r)
            } finally {
                wx.hideLoading();
            }
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
        }).catch(res => {
            showMessage('网络出现问题')
            console.log(res, '--未登录--');
            this.setData({
                login: false
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
        showMessage('该功能未上线！')
    }
})