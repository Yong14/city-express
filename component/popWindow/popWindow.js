// component/popWindow/popWindow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    seller:Object
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
    closePop(){
      this.triggerEvent('closePop')
    }
  }
})
