import {baseUrl } from '../config'
let retry = true

const db = {
    user:'root',
    pwd:'RjY3uJG3'
}
export function sendReq(d) {
    return new Promise(async (resolve,reject)=>{
        let {path,data,method} = d
        if(!method){method = 'GET'}
        try {
            //session_key 未过期，并且在本生命周期一直有效
            const ret = await wx.checkSession()
            console.log("checkSession有效",ret)
        } catch (error) {
            // session_key 已经失效，需要重新执行登录流程
            const ret = await wx.login() //重新登录
            console.log("checkSession失效",ret)
        }
        try {
            console.log('sendReq >>',d)
            const res = await wx.cloud.callContainer({
                config: {
                  env: "prod-1gj8r0g67f17c052"
                },
                service: 'flask-c8d3',
                path,
                header: {
                //   "X-WX-SERVICE": "flask-c8d3",
                  'wx-auth-code': wx.getStorageSync('auth_code')
                },
                method,
                data
              })
              console.log('sendReq<<',res)
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
        } catch (error) {
            console.log(error)
            reject({result:{code:400,msg:'微信登录失败'}})
        }
    })
}
  