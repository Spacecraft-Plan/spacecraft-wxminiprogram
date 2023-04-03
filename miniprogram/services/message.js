// const baseUrl='http://chatbot-server-production-cf19.up.railway.app'
const baseUrl='http://localhost:9000'
function sendTxt(params) {
    return new Promise((resolve, reject) => {
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
        
        wx.request({
            url: `${baseUrl}/api/chat/txt`, //仅为示例，并非真实的接口地址
            data: params,
            method:'POST',
            success: res => {
                console.log(res)
                resolve(res.data)
            },
            fail: res => {
                console.log(res)
                reject(res.data)
            },
        })
   
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
    return wx.cloud.callFunction({
        name: 'cloud-msg-his',
        data: params
    })
}

export {
    sendTxt,
    sendImg,
    getMessageList
}