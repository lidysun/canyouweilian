// miniprogram/pages/detail/detail.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    yearCurr:new Date().getFullYear(),
    // 是否显示弹窗
    dialogShow: false,
    // 弹窗按钮
    dialogBtns:[{text:'复制到剪贴板'}],
    // 是否显示预览图
    showPreviewImage:false,
    // 当前预览图索引
    viewIndex:0
  },
  onShow:function(){
    this.setData({
      readRules:app.globalData.readRules
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({...app.globalData.basicData});
    this.setData({
      'id':options.id || 'a9bfcffc5ebb6b770082832e030a9388'
    })
    this.getUserData(this.data.id);
  },
  // 获取数据
  getUserData:function(id){
    var that = this;
    db.collection('users').doc(id).get({
      success:res=>{
        that.setData({...res.data});
        that.setData({
          isLoading:false
        })
        console.log(that.data)
      }
    })
  },
  getUserContact:function(e){
    var that = this;
    var readRules = this.data.readRules;
    if(!readRules){
      wx.navigateTo({
        url:'../rules/rules?id='+that.data.id
      })
    }else{
      this.setData({
        dialogShow:true
      })
    }    
  },
  // 复制到剪贴板
  tapDialogButton:function(e){
    var that =this;
    wx.setClipboardData({
      data: that.data.contact,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data)
          }
        })
      },
      complete:function(){
        that.setData({
          dialogShow:false
        })
      }
    })
  },
  // tapImg
  vewImg:function(e){
    var index = parseInt(e.currentTarget.id.replace('picture_',''));
    this.setData({
      viewIndex:index,
      showPreviewImage:true
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    // pages/detail/detail?id=6af880a55ebbeadc00b24ac55654d009
    var data = this.data;
    var basic = data.name+'/'+data.sexRange[data.sex]+'/'+(data.yearCurr - data.year)+'岁'+'/'+data.disabilityRange[0][data.disability[0]]+ '正在残友微恋相亲交友，详情速戳';
    return{
      title: basic,
      path: '/pages/detail/detail?id='+data.id,
      imageUrl:data.pictures[0]
    }
  },
})