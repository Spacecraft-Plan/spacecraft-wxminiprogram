import {baseUrl } from '../config'
let retry = true
export function sendReq(d) {
    return new Promise((resolve,reject)=>{
        let {path,data,method} = d
        if(!method){method = 'GET'}
        wx.request({
            header: {'wx-auth-code': wx.getStorageSync('auth_code')},
            url: `${baseUrl}${path}`,
            data: data,
            method: method,
            success :async (res) =>{
                try {
                    console.log('success',res.data,retry)
                    //402登录失败，重新授权登录
                    if(res.data.result.code == 402 && retry){
                            retry = false
                            // 发送 res.code 到后台换取 openId, sessionKey, unionId
                            wx.setStorageSync('auth_code',(await wx.login()).code)
                            sendReq(d)
                    } else{
                        resolve(res.data)
                    }
                } catch (res) {
                    console.log(res)
                    reject({result:{code:400,msg:'微信登录失败'}})
                }
            },
            fail:(res)=>{
                console.log(res)
                reject({result:{code:400,msg:'微信登录失败'}})
            }
        })
    })
}