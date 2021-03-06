// pages/reservation/reservation.js
var app = getApp();
var req = require('../../utils/requestCommon.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabbar部分
    active: 1,
    icon: {
      index: '../../assets/image/4index.png',
      indexactive: '../../assets/image/4indexactive.png',
      res: '../../assets/image/5yuyue.png',
      resactive: '../../assets/image/5yuyueactive.png',
      leave: '../../assets/image/6leave.png',
      leaveactive: '../../assets/image/6leaveactive.png',
      mine: '../../assets/image/7mine.png',
      mineactive: '../../assets/image/7mineactive.png',
    },
    // swiper部分
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    date: 1, //今日1，明日2，本周3，本月4
    list: [],
    countcar: 0, //预约车次
    countweight: 0 //预约重量
  },

  //tabbar
  onChange(event) {
    switch (event.detail) {
      case 0:
        wx.switchTab({
          url: '../index/index',
        })
        break;
      case 1:
        wx.switchTab({
          url: '../reservation/reservation',
        })
        break;
      case 2:
        wx.switchTab({
          url: '../leavefactory/leavefactory',
        })
        break;
      case 3:
        wx.switchTab({
          url: '../mine/mine',
        })
        break;

      default:
        break;
    }

  },
  //切换今日明日按钮
  choosedate: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'today':
        this.setData({
          date: 1
        })
        this.getOreInfo(this.data.date)
        break;
      case 'tomorrow':
        this.setData({
          date: 2
        })
        this.getOreInfo(this.data.date)
        break;
      case 'week':
        this.setData({
          date: 3
        })
        this.getOreInfo(this.data.date)
        break;
      case 'month':
        this.setData({
          date: 4
        })
        this.getOreInfo(this.data.date)
        break;

      default:
        break;
    }
  },

  // 是否登陆过，若在别的地方登陆，跳转登录页
  isLoged: function (msg) {
    if (msg.indexOf('你') != -1) {
      let timeout1 = setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 2000)
    }
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current,
      date: 1
    });
    this.setData({
      oreId: this.data.oreList[this.data.currentTab].oreId
    })
    this.getOreInfo(this.data.date)
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    this.setData({
      date: 1
    })
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
    // this.getOreInfo(this.data.date)
    // this.checkCor();
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
          height1 = res.statusBarHeight,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - (80 + height1) * 2;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
        if (res.model.indexOf('iPhone') != -1) {
          that.setData({
            brand: 'iphone'
          })
        } else {
          that.setData({
            brand: 'an'
          })
        }
      }
    });
  },
  footerTap: app.footerTap,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          topgap: res.statusBarHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideNavigationBarLoading();
    this.setData({
      active: 1,
      currentTab: 0, //预设当前项的值
      scrollLeft: 0, //tab标题的滚动条位置
      date: 1, //今日1，明日2，本周3，本月4
    })
    this.setData({
      oreList: wx.getStorageSync('userOreList')
    })
    setTimeout(() => {
      this.setData({
        oreId: this.data.oreList[this.data.currentTab].oreId
      })
      this.getOreInfo(this.data.date)
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
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    const data = {
      modeCode: 'M8lg6eIzfft06WbtqrJlpWuAeqraZA9X', //功能码
      sessionId: wx.getStorageSync('sessionId'),
      pageIndex: 1,
      pageSize: 20,
      oreId: that.data.oreId,
      // oreIds: 'ede62421-816b-0872-a09f-cbd5d5a96b75,4492f52e-6b41-bddc-ab82-d3f461fcddfc',
      timeType: timeType
    }
    req.requestAll(data).then(res => {
      if (res.data.code == 1) {
        console.log(res.data.data);
        let resdata = res.data.data
        let list = resdata.list
        list.forEach((item) => {
          if (parseInt(item.minutes) < 0) {
            item.minute = '00'
            item.hour = '00'
          } else {
            item.hour = parseInt(parseInt(item.minutes) / 60).toString().padStart(2, 0)
            item.minute = (parseInt(item.minutes) % 60).toString().padStart(2, 0)
          }
        })

        let wanweight = resdata.countWeight.WEIGHT.toFixed(2) == 0 ? 0 : resdata.countWeight.WEIGHT.toFixed(2)
        that.setData({
          list: list,
          countcar: resdata.countWeight.COUNT,
          countweight: wanweight,
          countList: resdata.oreCountMap
        })
        wx.hideLoading({})
      } else {
        wx.hideLoading({})
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        that.isLoged(res.data.msg)
      }
    })
  }
})