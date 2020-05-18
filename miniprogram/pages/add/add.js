// miniprogram/pages/add/add.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 错误提示
    error:'',
    formData:{
      // 姓名
      name:'',
      // 性别
      sex:1,
      // 出生日期
      birthday:'1990-10-27',
      year:1990,
      //残障状况
      disability:[1,2],
      // 籍贯
      address_origin:['江西省','吉安市','泰和县'],
      // 现居住地
      address_now:['广东省','深圳市','龙岗区'],
      //身高
      high:null,
      //体重
      weight:null,
      // 学历
      education:1,
      // 月收入
      salary:null,
      // 住房状况
      housing:0,
      // 车辆状况
      car:3,
      // 婚姻状况
      marital:0,
      // 联系方式
      contact:'',
      // 自我介绍
      hope:'',
      // 照片
      pictures:[]
    },
    // 介绍最大字段
    hopeMax:200,
    hopeCount:0,
    // 个人照片最大
    maxPictureCount:3
    
  },
  // 输入框
  formInputChange:function(e){
    const {field} = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]:e.detail.value
    });
    if(field==='hope'){
      this.setData({
        hopeCount:e.detail.value.length
      })
    }
  },
  // 选择器
  formPickerChange:function(e){
    const field = e.currentTarget.id.replace('prop_','');
    const val = e.detail.value;
    this.setData({
      [`formData.${field}`]:val
    });
    if(field==='birthday'){
      const year = parseInt(val.split('-',1));
      this.setData({
        ['formData.year']:year
      });
    }
  },

  // 上传照片
  chooseImage :function(file) {
    var that = this;
    wx.chooseImage({
      count:that.data.maxPictureCount,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:function(res){
        wx.showLoading({title:'上传中'});
        var filePaths = res.tempFilePaths;
        var length = filePaths.length;
        for(var i=0;i<length;i++){
          var filePath = filePaths[i];
          // var openid = app.globalData.openid;
          // var cloudPath = 'img/' + openid + '__img__'+ (i+1) + filePath.match(/\.[^.]+?$/)[0];
          var newName = new Date().getTime();
          var cloudPath = 'img/' + newName + '__img__'+ (i+1) + filePath.match(/\.[^.]+?$/)[0];
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success:function(uploader){
              wx.showToast({
                title: '上传成功',
                icon:'success',
                duration:1000
              })
              that.setData({
                ['formData.pictures']:that.data.formData.pictures.concat([uploader.fileID])
              })
            },
            fail: e => {
              console.error('[上传文件] 失败：', e);
              wx.showToast({
                icon: 'none',
                title: '上传失败!',
              })
            },
            complete: () => {
              wx.hideLoading();
            }
          })
        }
      },
      complete:function(){
        wx.hideLoading();
      }
    })
  },
  // 表单校验
  formCheck:function(data){
    var that = this;
    if(!data.name){
      that.setData({
        error:'用户名不能为空！'
      })
      return false;
    }
    if(data.name.length>6){
      that.setData({
        error:'用户名最多6个字符！'
      })
      return false;
    }
    if(!data.contact){
      that.setData({
        error:'联系方式不能为空！'
      })
      return false;
    }
    if(data.hope.length<20){
      that.setData({
        error:'介绍不能少于20个字符！'
      })
      return false;
    }
    if(data.pictures.length<1){
      that.setData({
        error:'请至少上传一张个人照片！'
      })
      return false;
    }
    return true;
  },
  // 提交表单
  formSubmit:function(e){
    var that = this;
    that.setData({
      ['formData.createTime']:new Date().getTime()
    })
    var data = that.data.formData;
    if(that.formCheck(data)){
      db.collection('users').add({
        data:data,
      }).then(res=>{
        wx.showToast({
          title: '提交报名成功！',
          icon:'success',
          duration:1000,
          complete:function(){
            wx.redirectTo({
              url:'../index/index'
            })
          }
        })
      }).catch(err=>{
        console.log(err);
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 提交先先阅读协议
    var readRules = app.globalData.readRules;
    if(!readRules){
      wx.navigateTo({
        url:'../rules/rules?from=add'
      })
    }
    // 获取共享数据
    this.setData({...app.globalData.basicData});
    // uploadPic为属性绑定，属性则应写在data中，但data中不能直接获取this(当前Page),因此需要借助bind或者call/apply来改变this指向
    // 但call/apply会立即执行函数，所以只能用bind返回函数本身，供触发事件时才调用。
    // this.setData({
    //   uploadPic:this.uploadPic.bind(this)
    // })
  },
  // 分享
  onShareAppMessage: function (res) {
    return{
      title: '不要等幸福来敲你的门，你要主动去敲幸福的门！',
      path: '/pages/add/add',
      imageUrl:'cloud://xcx-yun-hs8sg.7863-xcx-yun-hs8sg-1301905347/files/logo_500_400.jpg'
    }
  },
})