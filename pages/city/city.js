// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    hotList: [],
    searchList: [],
    sts: true
  },
  // 搜索城市
  getCityList: function() {
    let _this = this
    if (_this.data.inputValue.length > 0) {
      wx.request({
        url: 'https://search.heweather.com/find?location=' + _this.data.inputValue + '&key=243afdc0b453418c892ea5ebc2ca0cce', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          _this.setData({
            searchList: res.data.HeWeather6[0].basic
          });
        }
      })
    }
  },
  // 获取热门城市
  getHotList: function() {
    let _this = this
    wx.request({
      url: 'https://search.heweather.com/top?group=cn&key=243afdc0b453418c892ea5ebc2ca0cce',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          hotList: res.data.HeWeather6[0].basic
        });
      }
    })
  },
  // 跳转
  jump: function() {
    wx.switchTab({
      url: '/pages/weather/weather'
    })
  },
  // 绑定数据
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
    if (this.data.inputValue.length) {
      this.setData({
        sts: false
      });
    }else{
      this.setData({
        sts: true
      });
    }
    this.getCityList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotList()
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