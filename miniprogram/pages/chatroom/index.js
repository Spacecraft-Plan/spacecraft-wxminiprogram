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
import {
    TimeCode
} from '../../utils/timeUtil'
// 获取全局APP
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        login: false,
        //输入框距离
        InputBottom: 0,
        roomId: 1,
        chatMsg: {},
        userInfo: {},
        content: '',
        groups: [{
            text: '点歌',
            value: 1
        }],
        voice: false,
        showKeyboard: false,
        sendout: false,
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
    /**
     * 获取input输入的消息
     */
    moninput: function (e) {
        this.setData({
            sendout: e.detail.value ? true : false,
            content: e.detail.value
        })
    },
    InputFocus(e) {
        this.setData({
            InputBottom: e.detail.height,
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
        if (!this.data.content) {
            showMessage('请输入问题')
            return
        }
        var that = this;
        if (this.data.login) {
            //已登录用户
            try {
                that.setData({
                    chatMsg: {
                        openid: app.globalData.openid || wx.getStorageSync('openid'),
                        msgType: 'text',
                        userInfo: {
                            avatarUrl: wx.getStorageSync('avatarUrl'),
                            nickName: wx.getStorageSync('nickName')
                        },
                        content: that.data.content,
                        _createTime: TimeCode(),
                    }
                })
                wx.showLoading({
                    title: '接受信息...',
                })
                const res = await sendTxt({
                    roomId: that.data.roomId,
                    content: that.data.content
                })
                console.log(res)
                if (res.result.code == 300) {
                    that.setData({
                        errMsg: res.result.msg
                    })
                } else if (res.result.code == 200) {
                    //todo:返回机器人的回复
                    that.setData({
                        chatMsg: {
                            openid: "chatgptbot",
                            msgType: 'text',
                            userInfo: {
                                avatarUrl: '/assets/robot.png',
                                nickName: 'ChatAi'
                            },
                            content: res.result.msg,
                            _createTime: TimeCode(),
                        }
                    })
                }
            } catch (error) {
                showMessage('发送失败，网络出现问题')
                console.log(error)
                // this.setData({
                //     login: false
                // })
            } finally {
                this.setData({
                    content: ''
                })
                wx.hideLoading();
            }
        } else {
            try {
                const res = await wx.getUserProfile({
                    desc: '获取用户聊天头像',
                })
                wx.showLoading({
                    title: '获取用户信息',
                })
                wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
                wx.setStorageSync('nickName', res.userInfo.nickName)
                console.log(res)
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
            const l = res.result.code == 200;
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
    },
    selectAdd() {
        showMessage('该功能未上线！')
    }
})