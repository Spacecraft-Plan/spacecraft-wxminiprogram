
export  function getOne({success,fail}) {
    return wx.request({
        url: 'http://api.yoke0104.com/api/ian?type=json&ci=wx', //仅为示例，并非真实的接口地址
        success,
        fail,
      })
    
}