import {
    TimeCode
} from 'utils/timeUtil'

export const CloudID = 'edu-sdust-0gcxtlev1c3c5887'
export const firstChat = {
    result: {
        data: [{
            openid: 'chatgptbot',
            msgType: 'text',
            userInfo: {
                avatarUrl: '/assets/robot.png',
                nickName: 'ChatAi'
            },
            content: String.raw`哈喽，我是ChatGPT，是目前全球最先进的Ai解答机器人
            我的应用领域非常广泛，列举以下事物：
            1.写策划、写文案、写合同
            2. 写代码、写简历、写论文
            3. 查资料、提供灵感、各种答题
            4. 陪聊倾诉、解忧、讲故事
            【输出字数不够时，就说“继续”】
            可以问我任何问题，请开始提问吧
            
            √如果遇到 【获取回答失败~！ 】请关闭窗口重新进入！
            √服务器不存储任何用户的问答数据，所以退出聊天室数据会丢失，想要保存数据可在输入框点击‘图片保存’`,
            _createTime: TimeCode(),
        }]
    }
}
// export const baseUrl='http://localhost:9000'
// export const baseUrl='https://chatbot-server-production-cf19.up.railway.app'
export const baseUrl = 'https://flask-c8d3-42278-4-1309166807.sh.run.tcloudbase.com'