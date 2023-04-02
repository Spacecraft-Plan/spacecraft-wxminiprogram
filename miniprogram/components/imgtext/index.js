// components/card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        name: {
            type: String,
            value: ""
          },
          // 描述文案
          title: {
            type: String,
            value: ""
          },
          // 滚动数据来源
          list: {
            type: Array,
            value: []
          }
      
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        getopendetail:function(item) {
            this.triggerEvent('getopendetail', { param:item.currentTarget.dataset.id});
          }
    }
})
