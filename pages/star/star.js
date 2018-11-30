// pages/star/star.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
    array2:['今天','明天','本周','本月','本年'],
    index: 0,                                      
    index2: 0,
    starValue:'白羊座',
    timeValue:'今天'
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.setData({
      starValue: this.data.array[parseInt(this.data.index)]
    })
    console.log(this.data.starValue)
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
    this.setData({
      timeValue: this.data.array2[parseInt(this.data.index2)]
    })
    console.log(this.data.timeValue)
  },
  // 获取星座信息
  getStar: function () {
    let consName = this.data.starValue
    let type = this.data.timeValue

    if (type =='今天'){
      type = 'today'
    } else if (type == '明天'){
      type = 'tomorrow'
    } else if (type == '本周'){
      type = 'week'
    } else if (type == '本月'){
      type = 'month'
    } else if (type == '本年'){
      type = 'year'
    }
    console.log(consName)
    consName = encodeURI(consName)
    wx.BaaS.invokeFunction('getStar', { consName: consName, type:type}).then(res => {
      console.log(res.data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})