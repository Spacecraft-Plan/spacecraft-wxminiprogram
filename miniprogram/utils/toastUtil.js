export function showMessage(msg,duration = 1500){
    wx.showToast({
        title:msg,
        icon: 'none',
        duration: duration
    })
}