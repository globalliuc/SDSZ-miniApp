//search.js
//获取应用实例
Page({
  data: {
    people:[]
  },
  onShow: function () {
    var that = this;
    var context = wx.createContext();
    var people = (wx.getStorageSync('people') || []);
    console.log("people")
    console.log(people)
    this.setData({
      people: people
    });
  },
  moreInfo: function(e){
    console.log(e.target.dataset.people)
    wx.setStorageSync('detail',e.target.dataset.people)
    wx.navigateTo({
      url: "../search_result/detail"
    })
  }
})