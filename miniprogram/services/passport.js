import {
    sendReq
} from '../utils/requests'
//登入
function userRegister(userInfo) {
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
        data: {
            code:wx.getStorageSync('auth_code'),
            userInfo
        }
    })
}

//身份校验
function checkLoginState() {
    return sendReq({
        path: '/api/user',
        data: {
            code: wx.getStorageSync('auth_code')
        }
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
    userRegister,
    checkLoginState
}