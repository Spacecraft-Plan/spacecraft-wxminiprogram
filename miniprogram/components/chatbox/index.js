import {
    getMessageList
} from '../../services/message';
const app = getApp();
// 配置消息侦听器
// 时间工具类

Component({
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        roomId: {
            type: Number,
            observer: function (newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    // console.log(newVal)
                    this.refreshChatList('')
                }
            }
        },
        chatMsg: {
            type: Object,
            observer: function (newVal, oldVal) {
                if (newVal != undefined && newVal != null) {
                    // console.log(newVal)
                    this.refreshChatList(newVal)
                }
            }
        }
    },
    /**
     * 组件注册页面生命周期
     */
    pageLifetimes: {
        show: function () {
            // 页面被展示
        },
    },
    lifetimes: {
        attached() {
            var that = this;
            that.initMessageHistory();
            wx.getSystemInfo({
                success: function (res) {
                    that.setData({
                        systemInfo: res
                    })
                }
            })
        },
        detached() {
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        openid: app.globalData.openid || wx.getStorageSync('openid'),
        scrollId: '',
        systemInfo: {},
        //消息记录列表
        chatList: [],
        //标记触顶事件
        isTop: false
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 预览图片
        viewImage(e) {
            // console.log(e)
            let url = e.currentTarget.dataset.url;
            wx.previewImage({
                urls: [url],
            })
        },
        //触顶事件
        tapTop() {
            console.log('--触顶--')
            var that = this;
            that.setData({
                isTop: true
            }, () => {
                // this.reqMsgHis();
            })

        },
        //初始化
        initMessageHistory() {
            //初始化消息历史
            var that = this;
            that.setData({
                chatList: []
            }, async () => {
                that.reqMsgHis();
            })
        },
        // 请求聊天记录
        async reqMsgHis() {
            var that = this;
            wx.showLoading({
                title: '获取历史记录',
                mask: true
            })
            try {
                const res = await getMessageList({
                    step: that.data.chatList.length,
                    roomId: that.properties.roomId
                })
                // console.log(res)
                let tarr = res.result.data
                let newsLen = tarr.length
                if (newsLen == 0) {
                    //查无数据
                    setTimeout(function () {
                        wx.showToast({
                            title: '到顶了',
                            icon: 'none'
                        })
                    }, 300)

                }
                tarr = tarr.reverse()
                that.setData({
                    chatList: tarr.concat(that.data.chatList)
                }, () => {
                    let len = that.data.chatList.length
                    if (that.data.isTop) {
                        setTimeout(function () {
                            that.setData({
                                scrollId: 'msg-' + parseInt(newsLen)
                            })
                        }, 100)
                    } else {
                        setTimeout(function () {
                            that.setData({
                                scrollId: 'msg-' + parseInt(len - 1)
                            })
                        }, 100)
                    }

                })
            } catch (err) {
                console.log("获取历史数据：fail")
            } finally {
                console.log("获取历史数据：complete")
                wx.hideLoading();
            }
        },
        refreshChatList(msg) {
            const that = this
            this.data.chatList.push(msg)
            this.setData({
                chatList: this.data.chatList
            }, () => {
                let len = this.data.chatList.length
                setTimeout(function () {
                    that.setData({
                        scrollId: 'msg-' + parseInt(len - 1)
                    })
                }, 100)
            })
        }
    }
})