// pages/reservation/reservation.js
var req = require('../../utils/requestCommon.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper部分
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    date: 1 //今日1，明日2，本周3，本月4
  },

  //切换今日明日按钮
  choosedate: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'today':
        this.setData({
          date: 1
        })
        this.getleaveInfo(this.data.date)
        break;
      case 'tomorrow':
        this.setData({
          date: 2
        })
        this.getleaveInfo(this.data.date)
        break;
      case 'week':
        this.setData({
          date: 3
        })
        this.getleaveInfo(this.data.date)
        break;
      case 'month':
        this.setData({
          date: 4
        })
        this.getleaveInfo(this.data.date)
        break;

      default:
        break;
    }
  },



  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.setData({
      oreId: this.data.oreList[this.data.currentTab].oreId
    })
    this.checkCor();
    this.getleaveInfo(this.data.date)
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

  toDettail: function (e) {
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: './leavedetail/leavedetail?info=' + JSON.stringify(info),
    })
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('userOreList')) {
      let oreList = wx.getStorageSync('userOreList')
      let oreIds = []
      oreList.forEach((item) => {
        oreIds.push(item.oreId)
      })
      oreIds = oreIds.join(',')
      oreList.unshift({
        oreName: '全部'
      })
      this.setData({
        year: new Date().getFullYear(),
        oreList: oreList,
        oreIds: oreIds
      })
      setTimeout(() => {
        this.setData({
          oreId: this.data.oreList[0].oreId
        })
        this.getleaveInfo(this.data.date)
      }, 100);
    }
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
  getleaveInfo: function (type) {
    let that = this
    const data = {
      modeCode: 'VJLUz1JW9I7crGvw4LWYqqUeMMxKq9mo', //功能码
      sessionId: wx.getStorageSync('sessionId'),
      pageIndex: 1,
      pageSize: 20,
      oreId: that.data.oreId,
      timeType: type
    }
    if (that.data.currentTab == 0) {
      data.oreIds = that.data.oreIds
    }
    req.requestAll(data).then(res => {
      if (res.data.code == 1) {
        let resdata = res.data.data
        let list = resdata.list
        that.setData({
          list: list,
          count: resdata.count
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    })
  },
})