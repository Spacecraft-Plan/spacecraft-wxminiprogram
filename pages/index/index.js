// index.js
Page({
    data: {
        banner: {
            urls: ['http://rkulit06s.hn-bkt.clouddn.com/experiment.jpeg',
                'http://rkulit06s.hn-bkt.clouddn.com/qrcode.jpeg'
            ],
            indicatorDots: true,
            vertical: false,
            autoplay: false,
            interval: 2000,
            duration: 500,
        },
        tool: {
            backgroundColors: ['#1AAD19', '#2782D7', 'orange', 'purple','pink'],
            modules: [{
                    icon: '/assets/calculate.png',
                    text: '加班计算器',
                    path: '/pages/overtime/index'
                },
                {
                    icon: '/assets/log.png',
                    text: '启动日志',
                    path: '/pages/logs/index'
                },
                {
                    icon: '/assets/github.png',
                    text: 'My Github',
                    path: '/pages/webview/index?url=https://github.com/electrolyteJ'
                },
                {
                    icon: '/assets/blogger.png',
                    text: 'My Blog',
                    path: '/pages/webview/index?url=https://electrolyteJ.github.io/blog'
                },
                // {
                //     icon: '',
                //     text: '一日一句',
                //     path: ''
                // },
                // {
                //     icon: '',
                //     text: '加班计算器',
                //     path: ''
                // },
            ]
        }


    },
    onLoad: function (options) {

    },
    onPreview(e) {
        const pos = e.currentTarget.id
        wx.previewImage({
            current: this.data.banner.urls[pos], // 当前显示图片的 http 链接
            urls: this.data.banner.urls, // 需要预览的图片 http 链接列表
        })
    },
    onJump(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.path,
        })

    }
})