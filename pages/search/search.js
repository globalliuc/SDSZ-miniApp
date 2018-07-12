//search.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var app = getApp()
var people=[];
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    history:"",
    show_letter:"none",
    show_list:"block",
    target_name: '',
    target_city: '',
    target_industry: '',
    result_data:'' 
  },
  bindInputName:function(e){
    this.setData({
      target_name: e.detail.value
    })
  },
  bindInputCity: function (e) {
    this.setData({
      target_city: e.detail.value
    })
  },
  bindInputIndustry: function (e) {
    this.setData({
      target_industry: e.detail.value
    })
  },
  login:function(e){
    wx.showToast({
      title: '搜索中',   
      icon: 'loading',
      duration: 1000
    })
    var Alumdb = Bmob.Object.extend("alumdata");
    var query = new Bmob.Query(Alumdb)
    query.equalTo("City", this.data.target_city);
    var that = this
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 保存搜索结果
        that.setData({
          result_data: results
        }) 
        console.log(results)
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('Name'));
        }
        wx.setStorageSync('people',results)
        wx.navigateTo({
          // url: "../logs/logs"
          url:"../search/result"
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function () {
    var context = wx.createContext();
    context.setStrokeStyle("#00ff00")
      context.moveTo(0,0);
      context.lineTo(40000,11);
      context.stroke();
  

    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'first-canvas',
      actions: context.getActions() //获取绘图动作数组
    })


    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  bindInputChange:function(e){
    // var self = this;
    // var text = e.detail.value.toUpperCase();

    // if(text==""){
      
    //     this.setData({
    //   show_letter:"block",
    // });
      
    // }else{
    //   this.setData({
    //   show_letter:"none",
    // });
    // }
    
    // for(var i=0;i<this.novels.length;i++){
    //   if(novels[i].title!=null&& novels[i].indexOf(text)!=-1){
    //     novels[i]["display"]="block";
    //   }else{
    //     novels[i]["display"]="none";
    //   }
    // }


    this.setData({
      history:"    " + e.detail.value
    })
  }
  
})
