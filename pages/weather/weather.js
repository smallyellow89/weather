// pages/weather/weather.js
let util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sts: true,
    cnty: '', //国家    
    parent_city: '', //城市   
    location: '', //地址
    feel: '', //体感温度
    tmp: '', //实际温度
    cond_txt: '', //天气描述
    cond_code: '', //天气代码
    hum: '', //相对湿度
    week: '', //星期几
    month: '', //月份
    date: '', //日期
    qlty: '', //空气质量
    forecast: [] //3天天气
  },
  // 获取坐标
  getCity: function() {
    let _this = this;
    var gloLat = app.globalData.lat;
    var gloLon = app.globalData.lon;
    // console.log(gloLat)
    // console.log(gloLon)
    if (gloLat.length == 0 && gloLon.length == 0) {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          _this.getWeather(longitude, latitude)
          _this.getForecast(longitude, latitude)
        }
      })
    }else{
      _this.getWeather(gloLon, gloLat)
      _this.getForecast(gloLon, gloLat)
    }
  },
  // 获取实时天气
  getWeather: function(j, w) {
    let _this = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now?location=' + j + ',' + w + '&key=243afdc0b453418c892ea5ebc2ca0cce', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let d = new Date();
        let weekday = new Array(7)
        weekday[0] = "星期天"
        weekday[1] = "星期一"
        weekday[2] = "星期二"
        weekday[3] = "星期三"
        weekday[4] = "星期四"
        weekday[5] = "星期五"
        weekday[6] = "星期六"

        // console.log(weekday[d.getDay()]);
        // console.log(d.getMonth()+1);
        // console.log(d.getDate());
        // console.log(res);
        _this.setData({
          cnty: res.data.HeWeather6[0].basic.cnty
        });
        _this.setData({
          parent_city: res.data.HeWeather6[0].basic.parent_city
        });
        _this.setData({
          location: res.data.HeWeather6[0].basic.location
        });
        _this.setData({
          feel: res.data.HeWeather6[0].now.fl
        });
        _this.setData({
          tmp: res.data.HeWeather6[0].now.tmp
        });
        _this.setData({
          cond_txt: res.data.HeWeather6[0].now.cond_txt
        });
        _this.setData({
          cond_code: '/images/cond-icon-heweather/' + res.data.HeWeather6[0].now.cond_code + '.png'
        });
        _this.setData({
          hum: res.data.HeWeather6[0].now.hum
        });
        _this.setData({
          week: weekday[d.getDay()]
        });
        _this.setData({
          month: d.getMonth() + 1
        });
        _this.setData({
          date: d.getDate()
        });
        _this.setData({
          qlty: res.data.HeWeather6[0].now.cond_code
        });
      }
    })
  },
  // 获取空气质量
  getAir: function(j, w) {
    let _this = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/air/now?location=' + j + ',' + w + '&key=243afdc0b453418c892ea5ebc2ca0cce', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          qlty: res.data.HeWeather6[0].air_now_city.qlty
        });
      }
    })
  },
  // 3天天气
  getForecast: function(j, w) {
    let _this = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast?location=' + j + ',' + w + '&key=243afdc0b453418c892ea5ebc2ca0cce',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res)
        _this.setData({
          forecast: res.data.HeWeather6[0].daily_forecast
        });
        // _this.setData({
        //   sts: false
        // })
      }
    })
  },
  // 跳转
  jump:function(){
    wx.navigateTo({
      url: '/pages/city/city'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCity();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})