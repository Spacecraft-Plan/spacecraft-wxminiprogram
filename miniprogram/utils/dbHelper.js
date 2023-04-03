import  {TimeCode} from '../../utils/timeUtil'
const db = wx.cloud.database();
// wx.setStorageSync
// 获取命令行符号
const _ = db.command;
export function creaDbWatcher(where, onChange, onError) {
    return db.collection('chat-msgs').where({...where,_createTime: _.gt(TimeCode())}).watch({
        onChange,
        onError
    })
}