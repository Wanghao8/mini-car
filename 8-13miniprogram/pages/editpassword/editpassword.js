// pages/editpassword/editpassword.js
var req = require('../../utils/requestCommon.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: "",
    newword: "",
    Confirmword: "",
    btn_active: false,
    oldpassword: false,
    newpassword: false,
    newconfirm: false,
  },
  onClickLeft:function(){
    wx.navigateBack({
      delta: 0,
    })
  },
  blurconfirm: function () {
    this.setData({
      newconfirm: false,
    })
  },
  clickconfirm: function () {
    // setTimeout(() => {
      this.setData({
        oldpassword: false,
        newpassword: false,
        newconfirm: true,
      })
    // }, 500)
  },
  blurnew: function () {
    this.setData({
      newpassword: false,
    })
  },
  clicknew: function () {
    this.setData({
      oldpassword: false,
      newconfirm: false,
      newpassword: true,
    })
  },
  blurold: function () {
    this.setData({
      oldpassword: false,
    })
  },
  clickold: function () {
    this.setData({
      newpassword: false,
      newconfirm: false,
      oldpassword: true,
    })
  },

  originalval: function (e) {
    this.setData({
      password: e.detail.value,
    })

  },
  newpassword: function (e) {
    this.setData({
      newword: e.detail.value,
    })

  },
  Confirmpassword: function (e) {
    this.setData({
      Confirmword: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //修改密码
  btnapp: function () {
    let that = this
    if (!that.data.password) {
      wx.showToast({
        title: '请输入原密码',
        icon: 'none',
      })
    } else if (!that.data.newword && !that.data.Confirmword) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none',
      })
    } else if (that.data.newword.length < 6) {
      wx.showToast({
        title: '密码不少于6位',
        icon: 'none',
      })
    } else if (that.data.newword.length > 16) {
      wx.showToast({
        title: '密码不超过16位',
        icon: 'none',
      })
    } else if (that.data.newword !== that.data.Confirmword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
      })
    } else {
      that.debounce(that.editPassword(), 5000)
    }
  },
  editPassword: function () {
    let that = this
    const data = {
      sessionId: wx.getStorageSync('sessionId'),
      modeCode: "MNiKI0fbqzdtMmeQCYfUJiZ5wgsjxm04",
      oldPassWord: that.data.password,
      newPassWord: that.data.Confirmword,
    }

    req.requestAll(data).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          title: "修改成功",
          icon: 'none',
        })
        //登录成功后跳转页面延时
        setTimeout(function () {
          wx.navigateTo({
            url: '../../pages/login/login?changePass=1',
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
  debounce: function (func, wait) {
    let timer;
    return function () {
      let context = this; // 这边的 this 指向谁?
      let args = arguments; // arguments中存着e
      if (timer) clearTimeout(timer);
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)

      if (callNow) func.apply(context, args);
    }
  },
  back: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let interval = setInterval(() => {
      let that = this
      if (that.data.password && that.data.newword && that.data.Confirmword) {
        that.setData({
          btn_active: true
        })
      } else {
        that.setData({
          btn_active: false
        })
      }
    }, 100);
    this.setData({
      interval: interval
    })
  },

  onHide: function () {
    clearInterval(this.interval)
  }

})