Page({
    data: {
        a:[
            "年薪(RMB)🔽",
            "一周工作日加班时间(小时)🔽",
            "一周休息日加班时间(单位天)🔽",
            "一年节假日加班时间(单位天)🔽",
        ],
        total: 0,
        value0:0,
        value1:0,
        value2:0,
        value3:0,
    },
    onInput(e) {
        
        let {value, cursor, keyCode} =e.detail;
        console.log(value)
        value = value.length != 0 ?parseInt(value):0;
        const pos = parseInt(e.currentTarget.id);
        switch(pos){
            case 0: this.data.value0 = value; break;
            case 1: this.data.value1 = value; break;
            case 2: this.data.value2 = value; break;
            case 3: this.data.value3 = value; break;
        };
        let money = this.data.value0 * (1.5 * this.data.value1 / 40 + 2 * this.data.value2 / 5 + 3 * this.data.value3 / 261);
        let round = Math.round(money * 100) / 100;
        this.setData({
            total: round
        });
    },
})