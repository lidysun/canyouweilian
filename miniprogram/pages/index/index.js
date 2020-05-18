//index.js
const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    users:[],
    year:new Date().getFullYear(),
    isLoading:true
  },

  onLoad: function() {
    this.setData({...app.globalData.basicData});
    this.getOpenId();
    this.getUserData();
  },

  getOpenId: function() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  getUserData:function(){
    const that = this;
    const users = db.collection('users').orderBy('createTime', 'desc');
    users.get({
      success:res=>{
        that.setData({
          users:res.data,
          isLoading:false
        })
        if(!that.data.users.length){
          that.setData({
            usersNone:true
          })
        }
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  gotoDetail:function(e){
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.id,
    })
  },
  gotoAdd:function(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    return{
      title: '残友微恋 - 专注于残级人相亲交友',
      path: '/pages/index/index',
      imageUrl:'cloud://xcx-yun-hs8sg.7863-xcx-yun-hs8sg-1301905347/files/logo_500_400.jpg'
    }
  },

})
