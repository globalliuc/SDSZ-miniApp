//add_info.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var app = getApp()
var personalInfo = [];
Page({
  data: {
    person_name: '',
    person_city: '',
    person_city_arr: [],
    person_city_input_disp:'',
    person_stage: '',
    person_grad_year: '',
    person_email: '',
    person_WeChatID: '',
    person_visibility: '',
    person_status: '',
    person_college: '',
    person_college_major: '',
    person_grad: '',
    person_grad_major: '',
    person_company: '',
    person_title: '',
    person_industry: '',
    result_data: '',
    stage_index: 0,
    grad_year_index: 0,
    visibility_index: 0,
    status_index: 0,
    stage_arr: ["请选择", "初中", "高中", "初中和高中"],
    grad_year_arr: ["请选择", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990"],
    visibility_arr: ["请选择", "全部显示", "显示微信号", "显示邮箱", "全部隐藏"],
    status_arr: ["请选择", "本科", "硕士", "博士", "工作"]

  },





  bindInputName: function (e) {
    this.setData({
      person_name: e.detail.value
    })
  },
  bindInputCity: function (e) {
    var cur_input = e.detail.value;
    this.setData({
      person_city: cur_input
    })
    var choices = [];
    if (cur_input != '') {
      for (var city in city_dict) {
        if (city.indexOf(cur_input) != -1) {
          choices.push(city);
        }
      }
    }
    choices.sort();
    this.setData({
      person_city_arr: choices
    })
    console.log(cur_input);

  },
  itemtap: function (e) {
    this.setData({
      person_city_input_disp: e.target.id,
      person_city: e.target.id,
      person_city_arr: []

    })
    console.log("tap");

  },

  bindStageChange: function (e) {
    this.setData({
      stage_index: e.detail.value
    })
    this.setData({
      person_stage: this.data.stage_arr[e.detail.value]
    })
  },

  bindGradYearChange: function (e) {
    this.setData({
      grad_year_index: e.detail.value,
      person_grad_year: this.data.grad_year_arr[e.detail.value]
    })
  },

  bindInputEmail: function (e) {
    this.setData({
      person_email: e.detail.value
    })
  },

  bindInputWeChatID: function (e) {
    this.setData({
      person_WeChatID: e.detail.value
    })
  },

  bindVisibilityChange: function (e) {
    this.setData({
      visibility_index: e.detail.value,
      person_visibility: this.data.visibility_arr[e.detail.value]

    })
  },

  bindStatusChange: function (e) {
    this.setData({
      status_index: e.detail.value,
      person_status: this.data.status_arr[e.detail.value]

    })
  },

  bindInputCollege: function (e) {
    this.setData({
      person_college: e.detail.value
    })
  },

  bindInputCollegeMajor: function (e) {
    this.setData({
      person_college_major: e.detail.value
    })
  },

  bindInputGrad: function (e) {
    this.setData({
      person_grad: e.detail.value
    })
  },

  bindInputGradMajor: function (e) {
    this.setData({
      person_grad_major: e.detail.value
    })
  },

  bindInputCompany: function (e) {
    this.setData({
      person_company: e.detail.value
    })
  },

  bindInputTitle: function (e) {
    this.setData({
      person_title: e.detail.value
    })
  },

  bindInputIndustry: function (e) {
    this.setData({
      person_industry: e.detail.value
    })
  },
  reset: function () {
    this.setData({
      person_name: '',
      person_city: '',
      person_city_arr: [],
      person_city_input_disp: '',
      person_stage: '',
      person_grad_year: '',
      person_email: '',
      person_WeChatID: '',
      person_visibility: '',
      person_status: '',
      person_college: '',
      person_college_major: '',
      person_grad: '',
      person_grad_major: '',
      person_company: '',
      person_title: '',
      person_industry: '',
      result_data: '',
      stage_index: 0,
      grad_year_index: 0,
      visibility_index: 0,
      status_index: 0
    });
  },





  submit: function (e) {
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 1000
    })
    var Alumdb = Bmob.Object.extend("NewAlumData");
    var newInfo = new Alumdb();
    var that = this;
    newInfo.set("Name",this.data.person_name);
    newInfo.set("City",this.data.person_city);
    newInfo.set("CCity", city_dict[this.data.person_city]);
    newInfo.set("Stage", this.data.person_stage);
    newInfo.set("GradYear", this.data.person_grad_year);
    newInfo.set("Email", this.data.person_email);
    newInfo.set("WeChatID", this.data.person_WeChatID);
    newInfo.set("Visibility", this.data.person_visibility);
    newInfo.set("Status", this.data.person_status);
    newInfo.set("College", this.data.person_college);
    newInfo.set("CollegeMajor", this.data.person_college_major);
    newInfo.set("GradSchool", this.data.person_grad);
    newInfo.set("GradMajor", this.data.person_grad_major);
    newInfo.set("Company", this.data.person_company);
    newInfo.set("Title", this.data.person_title);
    newInfo.set("Industry", this.data.person_industry);
    newInfo.save(null, {
      success: function (result) {
        console.log("创建成功, objectId:" + result.id);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 400
        });
        that.reset();
        setTimeout(
          function(){wx.switchTab({
            url: '../search/search'
          })
        },500);
        
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建新记录失败');
        wx.showToast({
          title: '提交失败',
          icon: 'loading',
          duration: 1000
        })

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
var city_dict = { "安娜堡": "ANN", "巴尔的摩": "BAL", "旧金山": "BAY", "San Mateo, California": "BAY", "三番": "BAY", "San Francisco, California": "BAY", "Mountain View, California": "BAY", "Santa Clara, California": "BAY", "伯克利": "BAY", "Palo Alto, California": "BAY", "San Jose, California": "BAY", "圣何塞": "BAY", "Stanford, California": "BAY", "斯坦福": "BAY", "湾区": "BAY", "Berleley, California": "BAY", "北京": "BEIJ", "Beijing": "BEIJ", "波士顿": "BOS", "芝加哥": "CHI", "Storrs, Connecticut": "CT", "Hartford, Connecticut": "CT", "达拉斯": "DAL", "Hong Kong": "HGKG", "香港": "HGKG", "LA": "LAC", "洛杉矶": "LAC", "蒙特利尔": "MTL", "Buffalo, New York": "NY", "Rochester, New York": "NY", "纽约市": "NYC", "NYC": "NYC", "曼哈顿": "NYC", "克利夫兰": "OH", "费城": "PHA", "匹兹堡": "PIT", "普林斯顿": "PRN", "圣地亚哥": "SDO", "西雅图": "SEA", "圣路易斯": "SLS", "多伦多": "TOR", "不确定": "UNDEF", "温哥华": "VCR", "华盛顿": "WDC", "DC": "WDC", "Alaska": "AK", "Alabama": "AL", "Albuquerque, New Mexico ": "ALB", "Ann Arbor, Michigan ": "ANN", "Arkansas": "AR", "Atlanta, Georgia ": "ATL", "Austin, Texas": "AUS", "Arizona": "AZ", "Baltimore, Maryland ": "BAL", "Bay Area, California": "BAY", "Binghamton, New York": "BHN", "Boston, Massachusetts ": "BOS", "California": "CA", "Charlotte, North Carolina ": "CHA", "Chicago, Illinois": "CHI", "Colorado": "CO", "Columbus, Ohio": "COL", "Colorado Springs , Colorado ": "CSP", "Connecticut": "CT", "Dallas, Texas": "DAL", "Delaware": "DE", "Detroit, Michigan ": "DET", "Denver, Colorado": "DNV", "Raleigh-Durham, North Carolina ": "DUR", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Hanover , New Hampshire": "HNH", "Houston, Texas": "HUS", "Iowa": "IA", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Indianapolis, Indiana ": "IND", "Jacksonville, Florida": "JAC", "Kansas": "KS", "Kansas City, Missouri ": "KSC", "Kentucky": "KY", "Louisiana": "LA", "Los Angeles, California": "LAC", "Louisville, Kentucky ": "LOU", "Little Rock , Arkansas": "LRK", "Massachusetts": "MA", "Maryland": "MD", "Madison , Wisconsin ": "MDS", "Maine": "ME", "Michigan": "MI", "Miami , Florida": "MIA", "Memphis, Tennessee ": "MMP", "Minnesota": "MN", "Missouri": "MO", "Mississippi": "MS", "Minneapolis-Saint Paul, Minnesota ": "MSP", "Montana": "MT", "Montgomery , Alabama ": "MTG", "Milwaukee, Wisconsin ": "MWK", "Nashville, Tennessee ": "NAS", "North Carolina": "NC", "North Dakota": "ND", "Nebraska": "NE", "New Hampshire": "NH", "New Haven, Connecticut": "NHN", "New Jersey": "NJ", "New Mexico": "NM", "New Orleans, Louisiana ": "NOL", "Nevada": "NV", "New York": "NY", "New York City, New York": "NYC", "Ohio": "OH", "Oklahoma": "OK", "Oklahoma City, Oklahoma": "OKL", "Omaha, Nebraska ": "OMA", "Oregon": "OR", "Pennsylvania": "PA", "Philadelphia, Pennsylvania ": "PHA", "Phoenix, Arizona": "PHX", "Pittsburgh, Pennsylvania ": "PIT", "Providence, Rhode Island ": "PRI", "Princeton, New Jersey": "PRN", "Portland, Oregon ": "PTL", "Rhode Island": "RI", "San Antonio, Texas": "SAO", "South Carolina": "SC", "South Dakota": "SD", "San Diego, California": "SDO", "Seattle, Washington ": "SEA", "Salt Lake City , Utah ": "SLC", "St Louis, Missouri ": "SLS", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Virginia": "VA", "Vermont": "VT", "Washington": "WA", "Washington D.C., District of Columbia ": "WDC", "Wisconsin": "WI", "West Virginia": "WV", "Wyoming": "WY", "Toronto, Ontario": "TOR", "Montreal, Quebec": "MTL", "Vancouver, British Columbia": "VCR", "Calgary, Alberta": "CGY", "Ottawa–Gatineau, Ontario/Quebec": "OTG", "Edmonton, Alberta": "EDM", "Quebec City, Quebec": "QBC", "Winnipeg, Manitoba": "WNP", "Hamilton, Ontario": "HMT", "Kitchener–Cambridge–Waterloo, Ontario": "KCW", "London, Ontario": "LON", "St. Catharines – Niagara, Ontario": "SCN", "Halifax, Nova Scotia": "HLF", "Oshawa, Ontario": "OSW", "Victoria, British Columbia": "VIC", "Windsor, Ontario": "WDS", "Saskatoon, Saskatchewan": "SAS", "Regina, Saskatchewan": "REG", "Sherbrooke, Quebec": "SBK", "St. John's, Newfoundland and Labrador": "STJ", "Barrie, Ontario": "BAR", "Kelowna, British Columbia": "KLN", "Abbotsford–Mission, British Columbia": "ABM", "Greater Sudbury, Ontario": "SUD", "Kingston, Ontario": "KIN", "Ontario": "ON", "Quebec": "QC", "Nova Scotia": "NS", "New Brunswick": "NB", "Manitoba": "MB", "British Columbia": "BC", "Prince Edward Island": "PE", "Saskatchewan": "SK", "Alberta": "AB", "Newfoundland and Labrador": "NL" };
