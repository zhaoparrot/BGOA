var ppp=Page({
  data: {
    region: {'loc0':['辽宁省', '沈阳市', '浑南新区'],
     'loc1':['未选择', '未选择', '未选择'],
     'loc2':['未选择', '未选择', '未选择']},
    customItem: '未选择',
    loading:false
  },
  onLoad: function () {
      wx.openSetting()
    var stord = wx.getStorageSync('region')
    if (stord != null &&  wx.getStorageSync('region') != '')
    {
      this.setData({ region:stord })
    }
    wx.request({
        url: 'https://specialrobot.siasun.com/aspnet_client/system_web/4_5/GetHandler.ashx',
      data: {
        x: getApp().globalData.userInfo,
        y: [Date()],
        s: wx.getSystemInfoSync()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  bindRegionChange0: function (e) {
    console.log('picker发送选择改变，携带值为',
      e.detail.value)
      var region=this.data.region
      region.loc0=e.detail.value
    this.setData({
      region: region
    })
  },
  bindRegionChange1: function (e) {
    console.log('picker发送选择改变，携带值为',
      e.detail.value)
    var region = this.data.region
    region.loc1 = e.detail.value
    this.setData({
      region: region
    })
  },
  bindRegionChange2: function (e) {
    console.log('picker发送选择改变，携带值为',
      e.detail.value)
    var region = this.data.region
    region.loc2 = e.detail.value
    this.setData({
      region: region
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      loading:true
    })
    return
    wx.request({
      url: 'https://special.applinzi.com/weixin.php', //仅为示例，并非真实的接口地址
      data: {
        x: getApp().globalData.userInfo,
        y: e.detail.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.substr(0,7)=="success")
        wx.showToast({
          title: '保存成功！',
          icon:'success'
        })
        
        
      
      },
      fail: function (par) {
        console.log(par.errMsg)
        if (par.errMsg="requset:fail response data convert to UTF8 fail")
          wx.showToast({
            title: '保存成功！',
            icon: 'success'
          })
          else
          wx.showToast({
            title: '提交失败！',
            icon: 'loading'
          })

        
      },
      complete:function(){
        getCurrentPages()[1].setData({
          loading: false
        })
      }
    })
    wx.setStorageSync('region', e.detail.value)
  }
})