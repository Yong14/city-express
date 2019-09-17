//index.js

let { seller, goods, ratings } = require('../../data')

//获取应用实例
const app = getApp();

Page({
  data: {
    //商家信息
    seller: {},
    //商品信息+商品评论
    goods: [],
    //商家评论
    ratings: [],
    //展示商家信息
    showStore: false,
    //导航索引
    currentIndex: 1,
    //商品分类索引
    goodsIndex: 0,
    // 商品对应滚动的ID 
    toView: '',
    //商品高度数组
    goodsHeight: [],
    //展示商品详情
    sohwGoodDetail: false,
    //发送给商品详情组件的信息
    GoodDetail: {},
    //已选商品数组
    choseGood: [],
    //总价格
    allPrice: 4,
    //展示购物车列表
    isShowGoodList:true,
    //商家星级
    star:[]
  },
  onLoad: function () {
    this.setData({
      seller,
      goods,
      ratings
    })
    wx.setNavigationBarTitle({
      title: this.data.seller.name
    });
    this.initGoodsHeight();
    this.initStar();
  },
  //初始化商品元素高度
  initGoodsHeight() {
    let height = [];
    let query = wx.createSelectorQuery();
    function selectDom() {
      return new Promise((resolve, reject) => {
        query.selectAll('.commodity-box').boundingClientRect(function (rect) {
          resolve(rect)
        }).exec()
      })
    }
    selectDom().then((rect) => {
      let arr = rect.map(item => Math.round(item.height))
      let p = 0
      height.push(p);
      for (var i = 0; i < arr.length; i++) {
        p += arr[i] -1;
        height.push(p);
      }
      this.setData({
        goodsHeight: height
      })
    })
  },
  //初始化商铺星级
  initStar(){
    let score = this.data.seller.score;
    let starArr = []
    for(var i=1;i<=5;i++){
      if(i<=score){
        starArr.push("../../image/on@2x.png")
      }else if(i>Math.floor(score)&&i<=Math.ceil(score)){
        starArr.push("../../image/half@2x.png")
      }else{
        starArr.push("../../image/off@2x.png")
      }
    }
    this.setData({
      star:starArr
    })
  },
  //显示商铺详情
  headText() {
    this.setData({
      showStore: true
    })
  },
  //关闭商铺详情
  closePop() {
    this.setData({
      showStore: false
    })
  },
  //点击切换导航
  nav(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  //点击选择商品分类
  chooseType(e) {
    this.setData({
      toView: e.currentTarget.dataset.id,
      goodsIndex: e.currentTarget.dataset.i
    })
  },
  //滚动商品
  scroll(e) {
    let scrollTop = e.detail.scrollTop
    let goodsHeight = this.data.goodsHeight;
    for (var i = 0; i < goodsHeight.length; i++) {
      if (scrollTop >= goodsHeight[i] && scrollTop <= goodsHeight[i + 1]) {
        this.setData({
          goodsIndex: i
        });
      }
    }
  },
  //点击展示商品详情
  goodDetail(e) {
    let i = e.currentTarget.dataset.i;
    let j = e.currentTarget.dataset.j;
    this.setData({
      sohwGoodDetail: true,
      GoodDetail: this.data.goods[i].foods[j]
    })
  },
  //商品组件方向传值
  hideGoodDetail() {
    this.setData({
      sohwGoodDetail: false
    })
  },
  //添加购物车
  addCount(e) {
    // let count = e.detail.count;
    // console.log(count);
    if (e.currentTarget.dataset.name) {
      var a = e.currentTarget.dataset.name;
      var price = e.currentTarget.dataset.price
    } else {
      var a = this.data.goods[e.currentTarget.dataset.i].foods[e.currentTarget.dataset.j].name;
      var price = this.data.goods[e.currentTarget.dataset.i].foods[e.currentTarget.dataset.j].price;
    }
    
    //增加总价格
    this.setData({
      allPrice: this.data.allPrice + price
    })
    let arr = this.data.choseGood;
    let index = arr.findIndex((item) => {
      return item.name == a
    })
    if (index == -1) {
      arr.push({ name: a, count: 1, price })
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == a) {
          arr[i].count = arr[i].count + 1
        }
      }
    }
    this.setData({
      choseGood: arr
    })

  },
  //减少商品
  reduceCount(e) {
    let name = e.detail.name;
    //减少总价格
    this.setData({
      allPrice: this.data.allPrice - e.detail.price
    })
    let arr = this.data.choseGood
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name == name) {

        if (arr[i].count > 1) {
          arr[i].count--;
          break;
        } else {
          arr = arr.filter(item =>
            item.name != name
          )
          break;
        }
      }
    }
    this.setData({
      choseGood: arr
    })
  },
  //清空购物车
  clearShopCart(){
    this.setData({
      choseGood:[]
    })
  },
  //展示购物车列表
  showgoods(){
    if(this.data.choseGood.length>0){
      this.setData({
        isShowGoodList: !this.data.isShowGoodList
      })
    }
  },
  //商家页面图片点击事件
  openPic(e){
    wx.previewImage({
      current: e.currentTarget.dataset.img, // 当前显示图片的http链接
      urls: this.data.seller.pics // 需要预览的图片http链接列表
    })
  }
})
