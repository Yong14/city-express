// component/btn/btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choseGood:Object,
    name:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    count:0
  },

  observers:{
    "choseGood,name":function(choseGood,name){
      for(var i=0;i<choseGood.length;i++){
        
        if(choseGood[i].name==name){
          this.setData({
            count:choseGood[i].count
          })
          return;
        }
      }
      this.setData({
        count:0
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add(){
      this.triggerEvent('addCount');
    },
    reduse(){
      let price = 0;
      for(var i=0;i<this.properties.choseGood.length;i++){
        if(this.properties.choseGood[i].name==this.properties.name){
          price = this.properties.choseGood[i].price;
        }
      }
      this.triggerEvent('reduceCount',{name:this.properties.name,price})
    }
  }
})
