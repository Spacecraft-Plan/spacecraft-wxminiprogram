function sendTxt(params) {
    return new Promise((resolve, reject) => {
        resolve(200)
        wx.cloud.callFunction({
            name: 'cloud-msg-push',
            data: {
                ...params,
                msgType: 'text',
            },
            success: res => {
                resolve(res)
            },
            fail: res => {
                reject(res)
            },
        })
    })
}
async function sendImg(params) {
    resolve(200)
    return wx.cloud.callFunction({
        name: 'cloud-msg-push',
        data: {
            ...params,
            msgType: 'image'
        }
    })
}
async function getMessageList(params) {
    return wx.cloud.callFunction({
        name: 'cloud-msg-his',
        data: params
    })
}

export {
    sendTxt,
    sendImg,getMessageList
}