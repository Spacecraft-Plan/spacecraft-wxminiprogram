import {
    sendReq
} from '../utils/requests'
//登入
async function addUser(userInfo) {
    // return new Promise(function (resolve, reject) {
    //     resolve(200)
    //     wx.cloud.callFunction({
    //         name: 'cloud-user',
    //         data: {
    //             userInfo: userInfo
    //         },
    //         success: res => {
    //             resolve(res)
    //         },
    //         fail: res => {
    //             reject(res)
    //         }
    //     })
    // })
    return sendReq({
        method:'POST',
        path: '/api/user',
        data: userInfo
    })
}
async function getUser() {
    try {
        let user = wx.getStorageSync('user')
        if (user) return user
        let res = await wx.login()
        const code = res.code
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        res = sendReq({method:'POST',
                path: '/api/code2Session',
                data: code
        })
        try {
            res = await wx.getUserProfile({
                desc: '展示用户信息'
            })
            console.log(res)
            user = {
                ...res.userInfo
            }
            wx.setStorageSync('user', user)
            // this.setData({
            //     avatarUrl: userInfo.avatarUrl,
            //     nickName: userInfo.nickName
            // })
        } catch (e) {
            showMessage("获取用户信息失败")
            console.error(e)
            return null
        }
        return user
    } catch (e) {
        showMessage("认证失败")
        console.error(e)
    }
}

//身份校验
function checkLoginState() {
    return sendReq({
        path: '/api/user'
    })
    // wx.cloud.callFunction({
    //     name: 'auth',
    //     success: res => {
    //         resolve(res)
    //     },
    //     fail: res => {
    //         reject(res)
    //     }
    // })
}
export {
    addUser,getUser,
    checkLoginState
}