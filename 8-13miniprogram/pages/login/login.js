// pages/login/login.js
var req = require('../../utils/requestCommon.js');

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    loginActive: false,
    passwordfocus: false,
    usernamefocus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检测sessionId
    let that = this
    if (options.changePass) {
      that.setData({
        username: wx.getStorageSync('userName')
      })
    }
    let interval = setInterval(() => {
      if (that.data.username && that.data.password) {
        that.setData({
          loginActive: true
        })
      } else {
        that.setData({
          loginActive: false
        })
      }
    }, 100);
  },

  accountval: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  pwordval: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  clickpassword: function (e) {

    this.setData({
      usernamefocus: false,
      passwordfocus: true,

    })

  },
  blurpassword: function (e) {
    this.setData({
      passwordfocus: false
    })
  },
  clickusername: function (e) {

    this.setData({
      passwordfocus: false,
      usernamefocus: true,
    })

  },

  the_login: function () {
    var that = this
    if (!that.data.username && !that.data.password) {
      wx.showToast({
        title: '请输入账号或密码',
        duration: 1000,
        icon: 'none',
      })
    } else {
      wx.getSystemInfo({
        success(res) {
          that.modelpnone = res.model
        }
      })

      // wx.getLocation({
      //   type: 'wgs84',
      //   success: (res) => {
      //     // var latitude = res.latitude
      //     var longitude = res.longitude
      //   }
      // })

      const data = {
        modeCode: 'FdQRnJS8dCYP1lqxLdMg6bdRzzTOAUci', //功能码
        userName: that.data.username,
        passWord: that.data.password,
        deviceType: that.modelpnone, //手机设备型号
        // location: that.latitude, //位置信息(‘经度’,’经度’)
        location: '111,111',
      }
      console.log("参数", data);
      req.requestAll(data).then(res => {
        if (res.data.code == 1) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 2000
          })
          console.log(res);
          wx.setStorageSync('sessionId', res.data.data.sessionId)
          wx.setStorageSync('userOreList', res.data.data.userOreList)
          wx.setStorageSync('userName', res.data.data.userName)
          wx.setStorageSync('realName', res.data.data.userCode)
          // return
          setTimeout(function () {
            wx.switchTab({
              url: '../../pages/index/index',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      })
    }
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