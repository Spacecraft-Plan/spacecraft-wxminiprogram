import {
    sendReq
} from '../utils/requests'

import {
    firstChat
} from '../config'

function sendTxt(params) {
    // wx.cloud.callFunction({
    //     name: 'cloud-msg-push',
    //     data: {
    //         ...params,
    //         msgType: 'text',
    //     },
    //     success: res => {
    //         resolve(res)
    //     },
    //     fail: res => {
    //         reject(res)
    //     },
    // })
    return sendReq({
        method: 'POST',
        path: '/api/chat/txt', //仅为示例，并非真实的接口地址
        data: params,
    })
}
async function sendImg(params) {
    return wx.cloud.callFunction({
        name: 'cloud-msg-push',
        data: {
            ...params,
            msgType: 'image'
        }
    })
}
async function getMessageList(params) {
    // return wx.cloud.callFunction({
    //     name: 'cloud-msg-his',
    //     data: params
    // })
    return firstChat
}

export {
    sendTxt,
    sendImg,
    getMessageList
}