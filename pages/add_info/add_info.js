//add_info.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var app = getApp()
var personalInfo = [];
Page({
  data: {
    userInfo: {},
    person_name: '',
    person_city: '',
    person_industry: '',
    result_data: ''
  },
  bindInputName: function (e) {
    this.setData({
      person_name: e.detail.value
    })
  },
  bindInputCity: function (e) {
    this.setData({
      person_city: e.detail.value
    })
  },
  bindInputIndustry: function (e) {
    this.setData({
      person_industry: e.detail.value
    })
  },
  submit: function (e) {
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 1000
    })
    var Alumdb = Bmob.Object.extend("NewAlumData");
    var newInfo = new Alumdb();

    newInfo.set("Name",this.data.person_name);
    newInfo.set("City",this.data.person_city);
    newInfo.set("Industry", this.data.person_industry);
    newInfo.save(null, {
      success: function (result) {
        console.log("创建成功, objectId:" + result.id);
        wx.navigateTo({
          url: '../search/search',
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建新记录失败');

      }
    });

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../search_result/detail'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }

})
