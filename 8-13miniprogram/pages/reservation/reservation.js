// pages/reservation/reservation.js
var app = getApp();
var req = require('../../utils/requestCommon.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper部分
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    date: 1, //今日1，明日2，本周3，本月4
    list: [],
    countcar: 0, //预约车次
    countweight: 0 //预约重量
  },

  //切换今日明日按钮
  choosedate: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'today':
        this.setData({
          date: 1
        })
        this.getOreInfo(1)
        break;
      case 'tomorrow':
        this.setData({
          date: 2
        })
        this.getOreInfo(2)
        break;
      case 'week':
        this.setData({
          date: 3
        })
        this.getOreInfo(3)
        break;
      case 'month':
        this.setData({
          date: 4
        })
        this.getOreInfo(4)
        break;

      default:
        break;
    }
  },


  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
    });
    this.setData({
      oreId: this.data.oreList[this.data.currentTab].oreId
    })
    this.getOreInfo(this.data.date)
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 135;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      oreList: wx.getStorageSync('userOreList')
    })
    setTimeout(() => {
      this.setData({
        oreId: this.data.oreList[0].oreId
      })
      this.getOreInfo(1)
    }, 100);
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

  },
  //接口部分
  getOreInfo: function (timeType) {
    let that = this
    const data = {
      modeCode: 'M8lg6eIzfft06WbtqrJlpWuAeqraZA9X', //功能码
      sessionId: wx.getStorageSync('sessionId'),
      pageIndex: 1,
      pageSize: 20,
      oreId: that.data.oreId,
      oreIds: 'ede62421-816b-0872-a09f-cbd5d5a96b75,4492f52e-6b41-bddc-ab82-d3f461fcddfc',
      timeType: timeType
    }
    req.requestAll(data).then(res => {
      if (res.data.code == 1) {
        console.log(res.data.data);
        let resdata = res.data.data
        let list = resdata.list
        list.forEach((item) => {
          item.hour = parseInt(parseInt(item.minutes) / 60)
          item.minute = parseInt(item.minutes) % 60
        })
        that.setData({
          list: list,
          countcar: resdata.countWeight.COUNT,
          countweight: resdata.countWeight.WEIGHT
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    })
  }
})