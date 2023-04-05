import {baseUrl } from '../config'
export function sendReq(d) {
    return new Promise(function (resolve, reject) {
        let {path,data,method} = d
        if(!method){
            method = 'GET'
        }
        wx.request({
            url: `${baseUrl}${path}`,
            data: data,
            method: method,
            success: res => resolve(res.data),
            fail: res => reject(res.data),
        })
    })

}