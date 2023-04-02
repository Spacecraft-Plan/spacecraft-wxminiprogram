// pages/community/index.js
import {
    getOne
} from '../../services/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backgroundColors: ['#1AAD19', '#2782D7', 'orange', 'purple', 'pink'],
        one: [{
            source: '诗经·周南·关雎·序',
            creator: '小强',
            vhan: '言者无罪，闻者足戒。',
        }, {
            source: '旋风管家',
            creator: 'Kyanite',
            vhan: '我们的学生会长，比高达还强',
        }, {
            source: '遠坂凜',
            creator: '树形图设计者',
            vhan: '最后，士郎……你要去打的話……必须給我贏！你要是死了话……我饶不了你……',
        }, {
            source: '总之就是非常可爱',
            creator: '莉娅碳的骑士',
            vhan: '总之就是非常可爱！',
        }, {
            source: '复活',
            creator: '草生出来了',
            vhan: '要永远宽恕一切人，要无数次地宽恕别人，因为世界上没有一个人是无罪的，没有一个人不需要宽恕，因此也就没有一个人有权力去惩罚或者纠正别人。',
        }, {
            source: '水浒传·第二回',
            creator: 'SL_MC_AW',
            vhan: '窗外日光弹指过，席前花影坐前移。',
        }, {
            source: '海贼王',
            creator: '陈亚',
            vhan: '“像你这样的白痴是怎么活过来的？”“因为我很自信。',
        }],
        source: 'NA',
        creator: 'NA',
        vhan: 'NA',
        list2: [{
                id: 1,
                label: "旅行团建",
                title: "使徒行者 卧底风云】趣味徒步主题团建",
                spans: "1天0晚",
                num: "30-200人",
                img: "https://img2.baidu.com/it/u=1848483831,4021622163&fm=26&fmt=auto&gp=0.jpg",
                money: "464"
            }, {
                id: 2,
                label: "旅行团建",
                title: "使徒行者 卧底风云】趣味徒步主题团建",
                spans: "1天0晚",
                num: "30-200人",
                img: "https://img2.baidu.com/it/u=1848483831,4021622163&fm=26&fmt=auto&gp=0.jpg",
                money: "464"
            }, {
                id: 3,
                label: "旅行团建",
                title: "使徒行者 卧底风云】趣味徒步主题团建",
                spans: "1天0晚",
                num: "30-200人",
                img: "https://img2.baidu.com/it/u=1848483831,4021622163&fm=26&fmt=auto&gp=0.jpg",
                money: "464"
            }, {
                id: 4,
                label: "旅行团建",
                title: "使徒行者 卧底风云】趣味徒步主题团建",
                spans: "1天0晚",
                num: "30-200人",
                img: "https://img2.baidu.com/it/u=1848483831,4021622163&fm=26&fmt=auto&gp=0.jpg",
                money: "464"
            },
            {
                label: "旅行团建",
                id: 5,
                title: "使徒行者 卧底风云】趣味徒步主题团建",
                spans: "1天0晚",
                num: "30-200人",
                img: "https://img2.baidu.com/it/u=1848483831,4021622163&fm=26&fmt=auto&gp=0.jpg",
                money: "464"
            },
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        const oneText = wx.getStorageSync('oneText');
        const oneShowTime = wx.getStorageSync('oneShowTime');
        const delta = Date.now() - oneShowTime;
        // 计算出相差天数
        let days = Math.floor(delta / (24 * 3600 * 1000));
        const residue1 = delta % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
        const hours = Math.floor(residue1 / (3600 * 1000));
        const residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
        const minutes = Math.floor(residue2 / (60 * 1000));
        // 计算相差秒数
        const residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(residue3 / 1000);
        let returnVal =
            ((days == 0) ? "" : days + "天") +
            ((hours == 0) ? "" : days + "时") +
            ((minutes == 0) ? "" : minutes + "分") +
            ((seconds == 0) ? "" : seconds + "秒");
        console.log(oneText, hours, minutes, seconds, returnVal);
        if (!oneText || hours >= 24) {
            getOne({
                success: (res) => {
                    console.log('invokeService success', res)
                    const {
                        err_code,
                        err_msg,
                        data_list
                    } = res.data
                    if (data_list.length > 0) {
                        this.setData({
                            vhan: data_list[0].result,
                            creator: '',
                            source: ''
                        })
                        wx.setStorageSync('oneShowTime', Date.now())
                        wx.setStorageSync('oneText', data_list[0].result)
                    }
                    // console.log(res.data.data.vhan,res.data.data.creator,res.data.data.source)
                    // this.setData({
                    //     vhan: res.data.data.vhan,
                    //     creator: res.data.data.creator,
                    //     source: res.data.data.source,
                    // })
                },
                fail: (err) => {
                    console.error('invokeService fail', err)
                }
            })
        } else {
            // const pos = Math.round(Math.random() * this.data.one.length)
            // this.setData(this.data.one[pos])
            this.setData({
                vhan: oneText,
                creator: '',
                source: ''
            })
        }

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
                from: o.from,
                title: o.title,
                // imageUrl: '' // 图片 URL
                // path: '/pages/index/index?userId='+Constant.userId+'&share=true',
            }
    },
    onCopy(e) {
        const {vhan} = e.currentTarget.dataset
        wx.setClipboardData({data: vhan,})
    }
}) 