const timeutil = require('timeutil');
const db = wx.cloud.database();
// 获取命令行符号
const _ = db.command;
export function creaDbWatcher(where, onChange, onError) {
    return db.collection('chat-msgs').where({...where,_createTime: _.gt(timeutil.TimeCode())}).watch({
        onChange,
        onError
    })
}