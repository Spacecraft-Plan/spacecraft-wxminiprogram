export function showMessage(msg){
    wx.showToast({
        title:msg,
        icon: 'none',
        duration: 1500
    })
}