// component/comment/comment.js
const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    ratings:Object
  },

  ready(){
    this.setData({
      comment:[...this.properties.ratings]
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    comment:[],
    des:'all'
  },

  watch:{
    'des'(des){
      if(des=='all'){
        this.setData({
          comment:[...this.properties.ratings]
        })
      }else if(des == 'good'){
        let arr = this.properties.ratings.filter(item=>item.rateType==0)
        this.setData({
          comment:arr
        })
      }else if(des == 'bad'){
        let arr = this.properties.ratings.filter(item=>item.rateType==1)
        this.setData({
          comment:arr
        })
      }else if(des == 'hasContent'){
        let arr = this.properties.ratings.filter(item=>item.text)
        this.setData({
          comment:arr
        })
      }
      
    }
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    chose(e){
      this.setData({
        des:e.currentTarget.dataset.des
      })
    }
  }
})
