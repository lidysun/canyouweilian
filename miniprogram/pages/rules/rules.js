// miniprogram/pages/rules/rules.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    clearInterval(t);
    var t = setInterval(function(){
      var count = that.data.count;
      that.setData({
        count:count-1
      })
      if(count<=1){
        that.setData({
          disabled:false
        });
        clearInterval(t);
      }
    },1000)
  },

  // 已认真阅读条款
  readedRules:function(e){
    app.globalData.readRules = true;
    wx.navigateBack();
  },
  //分享
  onShareAppMessage: function () {
    return{
      title: '请认真阅读《残友微恋服务协议》',
      path: '/pages/rules/rules',
      imageUrl:'cloud://xcx-yun-hs8sg.7863-xcx-yun-hs8sg-1301905347/files/logo_500_400.jpg'
    }
  }
})