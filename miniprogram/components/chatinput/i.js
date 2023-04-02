var app = getApp()
Page({
  data: {
    // 全局变量，控制全局显示样式
    globalData:{
      StatusBar:'',
      Custom:'',
      CustomBar:'',
    },
    // 消息列表（存在缓存中）
    newsList:[],
    // 用户唯一标识
    openid:'',
    // 头像
    figureurl_wx:'',
    // 是否显示加载图标
    animation:false,
    // 是否是发送声音
    voice:false,
    // 是否发送完成
    sendout:false,
    // 是否发送照片
    camera:false,
    // 新消息
    news:'',
    // 表情数组
    pression:[],
    // 是否是发送表情
    emojis:false,
    // 聊天列表高度
    curra:0,
    // 功能相册图标
    feature:[
      { src: '/images/album.png', name: '相册' }
    ],
    // 软键盘是否关闭
    alcur:false,
    // 视野（软键盘高度）
    vision:'',
    // 定时器对象
    time:'',
    // 期间
    duration:'',
    // 是否被正在播放录音
    playing:false,
    // 
    cuindex:'',
    // ai回答
    aiAnswer:'',
  
  },
  /**
   * 自定义导航栏，返回上一级
   */
  fanhui:function(e){
    // 清除聊天缓存
    wx.removeStorage({
      key: 'newsList',
      success: function(res) {
         
      },
    });
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 监听页面底部输入框
   */
  cuinbut:function(e){
    let that = this
    setTimeout(function () {
      wx.createSelectorQuery().select('#chat-height').boundingClientRect(function (rect) {
        that.setData({
          // 底部输入框的高度
          chatheight: parseFloat(rect.height) + parseFloat(that.data.curra),
          // 当前最后一条信息
          curr: 'jump' + JSON.stringify(that.data.newsList.length - 1)
        })
      }).exec()
    }, 100);
    console.log(wx.getStorageSync('newsList'));
  },
  /**
   * 生命周期----显示页面
   */
  onShow:function(e){
    // 页面赋值，最新一条数据索引标识
    this.setData({
      curr: 'jump' + JSON.stringify(this.data.newsList.length-1)
    })
  },
  /**
   * 生命周期加载页面
   */
  onLoad: function (options) {
    let that = this;
    that.getUseridFromStorage();
    // 获取系统信息
    wx.getSystemInfo({
      success: e => {
        that.data.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          that.data.globalData.Custom = capsule;
          that.data.globalData.CustomBar = capsule.bottom + capsule.top - (e.statusBarHeight + 15);
        } else {
          that.data.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    });
    that.data.figureurl_wx = options.figureurl_wx;
    that.setData({
      // 用户唯一标识（这里是用户名）
      openid:options.openid,
      // 全局变量
      globalData: that.data.globalData,
      // 聊天记录存储在缓存中
      newsList: wx.getStorageSync('newsList'),
      // 表情列表
      pression: app.emoji.pression,
      // 录音
      vision: wx.getRecorderManager(),
    });
  },
    /**
   * 从缓存中获取用户信息
   */
  getUseridFromStorage:function()
  {
    var self = this;
    // 从缓存中获取用户id
    wx.getStorage({
      key: 'userinfo',
      success (res) {
        self.data.user_id = res.data.id;
        self.data.figureurl_wx = res.data.figureurl_wx;
        self.data.openid = res.data.nickname;
      }
    });
  },
  /**
   * 失去焦点事件
   */
  getkey:function(e){
    // 这个setdata的值没有用，wxml中无应用
    this.setData({
      curra: e.detail.height,
      emojis: false,
      camera: false
    })
    this.cuinbut();
  },
/**
 * 获取焦点事件
 */
  getblur:function(e){
    this.setData({
      curra: 0,
      emojis: false,
      camera: false
    })
    this.cuinbut();
  },
  /**
   * 获取input输入的消息
   */
  moninput:function(e){
    let that = this
    that.cuinbut();
    this.setData({
      sendout: e.detail.value?true:false,
      news: e.detail.value,
    })
  },
  /**
   * 滚动条开始滚动，收起表情列表以及功能列表
   */
  scrollstart:function(e){
    this.setData({
      emojis: false,
      camera: false,
    })
    this.cuinbut();
  },
  /**
   * 点击语音图标时（收起功能栏）
   */
  speak:function(e){
    this.setData({
      voice: !this.data.voice,
      emojis:false,
      camera:false,
    })
    this.cuinbut();
  },
  /**
   * 点击表情栏时（收起功能栏）
   */
  emoji:function(e){
    this.setData({
      emojis: !this.data.emojis,
      voice:false,
      camera:false,
    })
    this.cuinbut();
  },
  /**
   * 点击功能栏时，收起声音和表情 
   */
  camerax:function(e){
    this.setData({
      camera: !this.data.camera,
      voice: false,
      emojis: false,
    })
    this.cuinbut();
  },
  /**
   * 上传图片
   */
  upload:function(e){
    const that = this
    // 微信选择图片
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 这是临时文件路径
        const src = res.tempFilePaths[0];
        // 获取图片信息
        wx.getImageInfo({
          src,
          success: function (res) {
            const { width, height } = res
            const newChatList = [...that.data.newsList,{
              news_type: 'image',
              news_centent: { src, width, height },
              openid: that.data.openid,
              logo:that.data.figureurl_wx
            }];
            // 用户消息发送完成，调用接口，等待AI回话
            that.aiChat('');
            that.setData({
              animation: true,
              newsList: newChatList,
            });
            // 同步设置缓存
            wx.setStorageSync('newsList', newChatList);
            that.cuinbut();
            // 用户消息发送完成，调用接口，等待AI回话
            that.aiChat();
          }
        })
      }
    })
  },
  /**
   * 点击看大图
   */
  picture:function(e){
    let src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  /**
   * 发送消息接口
   */
  message:function(e){
    let that = this
    const newChatList = [...that.data.newsList, {
      news_type: 'text',
      news_centent: that.data.news,
      openid: that.data.openid,
      logo:that.data.figureurl_wx
    }];
    // 用户消息发送完成，调用接口，等待AI回话
    that.aiChat(that.data.news);
  
    that.setData({
      animation: true,
      newsList: newChatList,
      sendout:false,
      news: '',
    })
    wx.setStorageSync('newsList', newChatList);
    that.cuinbut();
  },
  /**
   * 选择表情
   */
  expression:function(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      sendout: true,
      news: this.data.news+=item,
    })
  },
  /**
   * 点击功能图标
   */
  featch:function(e){
    let that = this
    let index = e.currentTarget.dataset.index
    if(index == 0){
      that.upload();
    }
  },
  /**
   * 按住说话
   */
  touchdown: function (e) {
    let that = this
    wx.stopVoice();
    that.setData({
      alcur: true,
      playing: false,
      cuindex: ''
    })
    that.data.duration = 0
    that.data.time = setInterval(function () {
      that.setData({
        duration: that.data.duration+1
      })
    },1000);
    // 开始录音
    wx.startRecord({
      success: function (res) {
        const newChatList = [...that.data.newsList, {
          news_type: 'voice',
          news_centent: { voice: res.tempFilePath, dimen: that.data.duration},
          openid: that.data.openid,
          logo:that.data.figureurl_wx
        }];
        // 用户消息发送完成，调用接口，等待AI回话
        that.aiChat('');
        that.setData({
          newsList: newChatList,
        })
        wx.setStorageSync('newsList', newChatList);
        that.cuinbut();
        // 用户消息发送完成，调用接口，等待AI回话
        that.aiChat();
      },
      fail:function(e){
        that.touchup();
      }
    });
    console.log(wx.getStorageSync('newsList'));
  },
  /**
   * 录音完成
   */
  touchup: function (e) {
    let that = this
    wx.stopRecord()
    clearInterval(that.data.time)
    that.setData({
      alcur:false
    })
  },
  /**
   * 播放录音
   */
  play: function (e) {
    console.log('123456');
    let that = this
    let voice = e.currentTarget.dataset.voice
    var index = e.currentTarget.dataset.index
    if (!that.data.playing){
      that.setData({
        playing:true,
        cuindex:index
      })
      wx.playVoice({
        filePath: voice,
        success: function () {
          that.setData({
            playing: false,
            cuindex:''
          })
        },
      })
    }
  },
  /**
   * 暂停录音
   */
  suspend:function(e){
    wx.stopVoice();
    this.setData({
      playing: false,
      cuindex: ''
    })
  },
  /**
   * 聊天接口
   * @param str 用户发的消息
   */
  aiChat:function(str)
  {
    var self = this;
    // 请求后台接口获取文章列表
    wx.request({
      // 请求连接
      url: 'https://guanchao.site/index/im/tencentAI',
      // 请求所需要的的参数
      data: {
        'str':str
      },
      success(result){
        self.data.aiAnswer = result.data.data.answer;
        if(result.data.msg != 'ok')
        {
          self.data.aiAnswer = "你的问题太深奥了，我没有办法回答~";
        }
        const newChatList = [...self.data.newsList, {
          news_type: 'text',
          news_centent: self.data.aiAnswer,
          openid: 'ai',
          logo:'https://guanchao.site/uploads/atricle/5c0a66cac42cb.jpeg'
        }];
        self.setData({
          animation: true,
          newsList: newChatList,
          sendout:false,
          news: '',
        })
        wx.setStorageSync('newsList', newChatList);
        self.cuinbut();
      }
    });
  },
  clicks:function(){
    console.log('12345');
  }
})