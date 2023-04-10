export function getOne({
    success,
    fail
}) {
    // return wx.request({
    //     url: 'http://api.yoke0104.com/api/ian?type=json&ci=wx', //仅为示例，并非真实的接口地址
    //     success,
    //     fail,
    //   })
    // console.log(wx.getAccountInfoSync().miniProgram.appId)
    return wx.serviceMarket.invokeService({
        service: 'wxcae50ba710ca29d3', // 'wx_mp_appid',
        api: 'jokebot',
        data: {
            "mode": 2, // 返回普通笑话
        },
    }).then(res => {
        success(res);
    }).catch(err => {
        fail(err);
    })
}