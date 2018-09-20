//search.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var app = getApp()
var people=[];
Page({
  data: {
    target_name: '',
    target_city: '',
    target_city_disp: '',
    target_city_arr: [],
    target_industry: '',
    name_val: '',
    ins_val: '',
    result_data:'',
    input_field: -1
  },
  
  bindInputName:function(e){
    this.setData({
      input_field :0,
      target_name: e.detail.value
    })
    if (e.detail.value == ''){
      this.setData({
        input_field: -1
      })
    }
  },
  bindInputCity: function (e) {
    var cur_input = e.detail.value;
    this.setData({
      input_field:1,
      target_city: cur_input
    })
    var choices = [];
    if(cur_input!=''){
      for (var city in dict) {
        if(city.indexOf(cur_input)!=-1){
          choices.push(city);
        }
      }
    }
    choices.sort();
    this.setData({
      target_city_arr:choices
    })
    console.log(cur_input);
    if (e.detail.value == '') {
      this.setData({
        input_field: -1
      })
    }
    
  },
  itemtap: function (e) {
    this.setData({
      target_city_disp: e.target.id,
      target_city:dict[e.target.id],
      target_city_arr: []

    })
    console.log("tap");

  },
  bindInputIndustry: function (e) {
    this.setData({
      input_field:2,
      target_industry: e.detail.value
    })
    if (e.detail.value == '') {
      this.setData({
        input_field: -1
      })
    }
  },
  search:function(e){
    wx.showToast({
      title: '搜索中',   
      icon: 'loading',
      duration: 1000
    })
    var Alumdb = Bmob.Object.extend("NewAlumData");
    var query = new Bmob.Query(Alumdb);
    
    if (this.data.target_city){
      console.log("city search")
      query.equalTo("CCity", this.data.target_city);
    }
    if (this.data.target_name){
      console.log("name search")
      query.equalTo("Name", this.data.target_name);
    }
    if (this.data.target_industry) {
      console.log("industry search")
      query.equalTo("Industry", this.data.target_industry);
    }
    var that = this
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 保存搜索结果
        that.setData({
          target_name: '',
          target_city: '',
          target_city_disp: '',
          target_city_arr: [],
          target_industry: '',
          name_val: '',
          ins_val: '',
          input_field:-1,
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
          url:"../search_result/result"
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
      url: '../search_result/detail'
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


    console.log('onLoad');

  },

  
})
var dict = { "安娜堡": "ANN", "巴尔的摩": "BAL", "旧金山": "BAY", "San Mateo, California": "BAY", "三番": "BAY", "San Francisco, California": "BAY", "Mountain View, California": "BAY", "Santa Clara, California": "BAY", "伯克利": "BAY", "Palo Alto, California": "BAY", "San Jose, California": "BAY", "圣何塞": "BAY", "Stanford, California": "BAY", "斯坦福": "BAY", "湾区": "BAY", "Berleley, California": "BAY", "北京": "BEIJ", "Beijing": "BEIJ", "波士顿": "BOS", "芝加哥": "CHI", "Storrs, Connecticut": "CT", "Hartford, Connecticut": "CT", "达拉斯": "DAL", "Hong Kong": "HGKG", "香港": "HGKG", "LA": "LAC", "洛杉矶": "LAC", "蒙特利尔": "MTL", "Buffalo, New York": "NY", "Rochester, New York": "NY", "纽约市": "NYC", "NYC": "NYC", "曼哈顿": "NYC", "克利夫兰": "OH", "费城": "PHA", "匹兹堡": "PIT", "普林斯顿": "PRN", "圣地亚哥": "SDO", "西雅图": "SEA", "圣路易斯": "SLS", "多伦多": "TOR", "不确定": "UNDEF", "温哥华": "VCR", "华盛顿": "WDC", "DC": "WDC", "Alaska": "AK", "Alabama": "AL", "Albuquerque, New Mexico ": "ALB", "Ann Arbor, Michigan ": "ANN", "Arkansas": "AR", "Atlanta, Georgia ": "ATL", "Austin, Texas": "AUS", "Arizona": "AZ", "Baltimore, Maryland ": "BAL", "Bay Area, California": "BAY", "Binghamton, New York": "BHN", "Boston, Massachusetts ": "BOS", "California": "CA", "Charlotte, North Carolina ": "CHA", "Chicago, Illinois": "CHI", "Colorado": "CO", "Columbus, Ohio": "COL", "Colorado Springs , Colorado ": "CSP", "Connecticut": "CT", "Dallas, Texas": "DAL", "Delaware": "DE", "Detroit, Michigan ": "DET", "Denver, Colorado": "DNV", "Raleigh-Durham, North Carolina ": "DUR", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Hanover , New Hampshire": "HNH", "Houston, Texas": "HUS", "Iowa": "IA", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Indianapolis, Indiana ": "IND", "Jacksonville, Florida": "JAC", "Kansas": "KS", "Kansas City, Missouri ": "KSC", "Kentucky": "KY", "Louisiana": "LA", "Los Angeles, California": "LAC", "Louisville, Kentucky ": "LOU", "Little Rock , Arkansas": "LRK", "Massachusetts": "MA", "Maryland": "MD", "Madison , Wisconsin ": "MDS", "Maine": "ME", "Michigan": "MI", "Miami , Florida": "MIA", "Memphis, Tennessee ": "MMP", "Minnesota": "MN", "Missouri": "MO", "Mississippi": "MS", "Minneapolis-Saint Paul, Minnesota ": "MSP", "Montana": "MT", "Montgomery , Alabama ": "MTG", "Milwaukee, Wisconsin ": "MWK", "Nashville, Tennessee ": "NAS", "North Carolina": "NC", "North Dakota": "ND", "Nebraska": "NE", "New Hampshire": "NH", "New Haven, Connecticut": "NHN", "New Jersey": "NJ", "New Mexico": "NM", "New Orleans, Louisiana ": "NOL", "Nevada": "NV", "New York": "NY", "New York City, New York": "NYC", "Ohio": "OH", "Oklahoma": "OK", "Oklahoma City, Oklahoma": "OKL", "Omaha, Nebraska ": "OMA", "Oregon": "OR", "Pennsylvania": "PA", "Philadelphia, Pennsylvania ": "PHA", "Phoenix, Arizona": "PHX", "Pittsburgh, Pennsylvania ": "PIT", "Providence, Rhode Island ": "PRI", "Princeton, New Jersey": "PRN", "Portland, Oregon ": "PTL", "Rhode Island": "RI", "San Antonio, Texas": "SAO", "South Carolina": "SC", "South Dakota": "SD", "San Diego, California": "SDO", "Seattle, Washington ": "SEA", "Salt Lake City , Utah ": "SLC", "St Louis, Missouri ": "SLS", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Virginia": "VA", "Vermont": "VT", "Washington": "WA", "Washington D.C., District of Columbia ": "WDC", "Wisconsin": "WI", "West Virginia": "WV", "Wyoming": "WY", "Toronto, Ontario": "TOR", "Montreal, Quebec": "MTL", "Vancouver, British Columbia": "VCR", "Calgary, Alberta": "CGY", "Ottawa–Gatineau, Ontario/Quebec": "OTG", "Edmonton, Alberta": "EDM", "Quebec City, Quebec": "QBC", "Winnipeg, Manitoba": "WNP", "Hamilton, Ontario": "HMT", "Kitchener–Cambridge–Waterloo, Ontario": "KCW", "London, Ontario": "LON", "St. Catharines – Niagara, Ontario": "SCN", "Halifax, Nova Scotia": "HLF", "Oshawa, Ontario": "OSW", "Victoria, British Columbia": "VIC", "Windsor, Ontario": "WDS", "Saskatoon, Saskatchewan": "SAS", "Regina, Saskatchewan": "REG", "Sherbrooke, Quebec": "SBK", "St. John's, Newfoundland and Labrador": "STJ", "Barrie, Ontario": "BAR", "Kelowna, British Columbia": "KLN", "Abbotsford–Mission, British Columbia": "ABM", "Greater Sudbury, Ontario": "SUD", "Kingston, Ontario": "KIN", "Ontario": "ON", "Quebec": "QC", "Nova Scotia": "NS", "New Brunswick": "NB", "Manitoba": "MB", "British Columbia": "BC", "Prince Edward Island": "PE", "Saskatchewan": "SK", "Alberta": "AB", "Newfoundland and Labrador": "NL"};