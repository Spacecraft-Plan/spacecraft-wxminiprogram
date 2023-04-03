//登入
function userRegister(userInfo) {
    return new Promise(function (resolve, reject) {
        resolve(200)
        wx.cloud.callFunction({
            name: 'cloud-user',
            data: {
                userInfo: userInfo
            },
            success: res => {
                resolve(res)
            },
            fail: res => {
                reject(res)
            }
        })
    })
}

//身份校验
function checkLoginState() {
    return new Promise(function (resolve, reject) {
        wx.cloud.callFunction({
            name: 'auth',
            success: res => {
                resolve(res)
            },
            fail: res => {
                reject(res)
            }
        })
    })
}
export {
    userRegister,
    checkLoginState
}