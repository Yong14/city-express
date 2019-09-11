// component/goodDetail/goodDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    GoodDetail:Object
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
    close(){
      this.triggerEvent('close');
    }
  }
})
