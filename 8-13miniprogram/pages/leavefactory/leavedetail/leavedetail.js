// pages/leavefactory/leavedetail/leavedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showphone: false,
    phonenum: [{
      name: '18340814337',
      color: '#07c160',
      openType: 'getUserInfo'
    }, ]
  },

  onClickLeft: function () {
    wx.navigateBack({
      delta: 0,
    })
  },
  showphoneEvent: function () {
    this.setData({
      showphone: true
    })
  },
  onClose() {
    this.setData({
      showphone: false
    });
  },

  dial(e) {
    console.log(e.detail.name);
    wx.makePhoneCall({
      phoneNumber: e.detail.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      info: JSON.parse(options.info)
    })
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
    this.setData({
      imgurl: wx.getStorageSync('photoBaseUrl')
    })
    let url = this.data.imgurl + this.data.info.DTL_IMG
    this.setData({
      url: url
    })
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