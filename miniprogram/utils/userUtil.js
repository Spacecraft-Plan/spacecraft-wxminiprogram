async function getUser() {
    try {
        let user = wx.getStorageSync('user')
        if (user) return user
        let res = await wx.login()
        const code = res.code
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        try {
            res = await wx.getUserProfile({
                desc: '展示用户信息'
            })
            console.log(res)
            const userInfo = res.userInfo
            this.setData({
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName
            })
        } catch (e) {
            showMessage("获取用户信息失败")
            console.error(e)
            return null
        }
        wx.setStorageSync('user', {})
        //发送用户信息到服务端
        return user
    } catch (e) {
        showMessage("认证失败")
        console.error(e)
    }
}