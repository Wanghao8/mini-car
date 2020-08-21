// pages/reservation/reservation.js
var req = require('../../utils/requestCommon.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //tabbar部分
    active: 2,
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
    fromdetail: false,
    // swiper部分
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    date: 1 //今日1，昨日2，本月3，上月4
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
      date: 1
    })
    this.setData({
      currentTab: e.detail.current
    });
    this.setData({
      oreId: this.data.oreList[this.data.currentTab].oreId
    })
    this.getleaveInfo(this.data.date)
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
    let option = options
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          height1 = res.statusBarHeight,
          rpxR = 750 / clientWidth;
        console.log(height1);

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
    const pages = getCurrentPages()
    const currPage = pages[pages.length - 1] // 当前页
    if (!currPage.data.fromdetail) {
      this.setData({
        active: 2, //tabbar位置
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        date: 1 //今日1，昨日2，本月3，上月4
      })
    }
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
          oreId: this.data.oreList[this.data.currentTab].oreId
        })
        this.getleaveInfo(this.data.date)
      }, 100);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      fromdetail: false
    })
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
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    const data = {
      modeCode: 'VJLUz1JW9I7crGvw4LWYqqUeMMxKq9mo', //功能码
      sessionId: wx.getStorageSync('sessionId'),
      pageIndex: 1,
      pageSize: 50,
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
        let all = 0
        for (let i in resdata.oreCountMap) {
          console.log(resdata.oreCountMap[i]);
          all += resdata.oreCountMap[i]
        }
        that.setData({
          list: list,
          count: resdata.count,
          countList: resdata.oreCountMap,
          countall: all
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
  },
})