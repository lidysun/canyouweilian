//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    var basicData = {
        // 性别区间
        sexRange:['女','男'],
        // 学历区间
        educationRange:['小学及以下','初中','高中','中专','大专','大学本科','研究生','博士及以上'],
        // 残障区间
        disabilityRange:[
          ['视力残障','听力残障','言语残障','肢体残障','智力残障','精神残障','多重残障'],
          ['1级','2级','3级','4级','未办证未知']
        ],
        // 住房状况区间
        housingRange:['无房自己租住','无房和家人同住','有房有房贷','有房无房贷'],
        // 车辆状况区间
        carRange:['已购车','无车（身体残障限制）','无车（其它原因限制）','有需要随时购车'],
        // 婚姻状况区间
        maritalRange:['未婚单身','离异/丧偶单身(无孩子)','离异/丧偶单身(带孩子)']
    }

    this.globalData = {
      basicData:basicData,
      readRules:false
    }
  }
})
