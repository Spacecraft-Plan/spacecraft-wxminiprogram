import {
    sendReq
} from '../utils/requests'
//登入
async function userRegister(userInfo) {
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
    userRegister,
    checkLoginState
}