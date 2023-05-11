export async function getOne() {
    // return wx.request({
    //     url: 'http://api.yoke0104.com/api/ian?type=json&ci=wx', //仅为示例，并非真实的接口地址
    //     success,
    //     fail,
    //   })
    // console.log(wx.getAccountInfoSync().miniProgram.appId)
    return await wx.serviceMarket.invokeService({
        service: 'wxcae50ba710ca29d3', // 'wx_mp_appid',
        api: 'jokebot',
        data: {
            "mode": 2, // 返回普通笑话
        },
    })
}