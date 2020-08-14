// pages/mine/mine.js
//获取应用实例
var req = require('../../utils/requestCommon.js');
var time = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },

  modify: function () {
    wx.navigateTo({
      url: '../editpassword/editpassword',
    })
  },

  logout: function () {
    let that = this
    const data = {
      modeCode: 'rC4rL8ZVveud0CjbD2zHUsRlbAsRUXMR', //功能码
      sessionId: wx.getStorageSync('sessionId'),
    }
    req.requestAll(data).then(res => {
      if (res.data.code == 1) {
        console.log(res);
        wx.showToast({
          title: '退出成功',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../login/login',
          })
        }, 2000)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:wx.getStorageSync('userName'),
      realname:wx.getStorageSync('realName'),
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