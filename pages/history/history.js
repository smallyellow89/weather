// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  // 获取历史上的今天
  getHistory: function () {
    var date=new Date()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let _this=this
    wx.BaaS.invokeFunction('historyToday', { month: month, day: day}).then(res => {
      console.log(res.data.result) 
      _this.setData({
        list: res.data.result
      });
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
   this.getHistory()
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