// pages/index/index.js
import * as echarts from '../../components/ec-canvas/echarts';
var req = require('../../utils/requestCommon.js');
var time = require('../../utils/util.js');
var app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#34A9FF ', '#F3AC1E'],
    xAxis: [{
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: "#0357A2"
        }
      },
      splitArea: {
        color: '#f00',
        lineStyle: {
          color: '#f00'
        },
      },
      inverse: true,
      axisLabel: {
        lineStyle: {
          color: "#BEE2FB"
        },
        textStyle: {
          color: '#BEE2FB',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#0357A2',
          type: 'solid'
        }
      },
      boundaryGap: false,
      data: [1, 2, 3, 4],
    }],
    yAxis: [{
      type: 'value',
      // nameGap: 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#0357A2',
          type: 'dashed'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#0357A2"
        }
      },
      axisLabel: {
        show: true,
        // margin: 20,
        textStyle: {
          color: '#BEE2FB',
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: "#6c50f3"
        }
      },
    }],
    series: [{
      name: '周比',
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        normal: {
          color: 'rgba(11,120,227,1)',
        },
      },
      itemStyle: {
        color: "#52A0FC",
        borderColor: "#fff",
        borderWidth: 3,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(11,120,227,0.17)'
            },
            {
              offset: 1,
              color: 'rgba(64,161,255,1) '
            }
          ], false),
          shadowColor: 'rgba(11,120,227,0.17)',
          shadowBlur: 20
        }
      },
      data: [1, 2, 3, 4]
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper部分
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    //echarts部分
    ec: {
      onInit: initChart
    },
    // 页面部分
    month: '八月',
    monthIndex: (new Date().getMonth()),
    monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ],
    todaybtn: 0,
    monthbtn: 0,
    needbtn: 0,
    destinationbtn: 0,
  },
  // picker选择月份
  chooseMonth(e) {
    this.setData({
      monthIndex: e.detail.value
    })
  },
  // echart切车次重量按钮
  toggleActive: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'todaycar':
        this.setData({
          todaybtn: 0
        })
        break;
      case 'todayweight':
        this.setData({
          todaybtn: 1
        })
        break;
      case 'monthcar':
        this.setData({
          monthbtn: 0
        })
        break;
      case 'monthweight':
        this.setData({
          monthbtn: 1
        })
        break;
      case 'needcar':
        this.setData({
          needbtn: 0
        })
        break;
      case 'needweight':
        this.setData({
          needbtn: 1
        })
        break;
      case 'destinationcar':
        this.setData({
          destinationbtn: 0
        })
        break;
      case 'destinationweight':
        this.setData({
          destinationbtn: 1
        })
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
    this.getOreInfo()
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
        var calc = clientHeight * rpxR - 130;
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
    app.is_login()
    if (wx.getStorageSync('userOreList')) {
      this.setData({
        year: new Date().getFullYear(),
        oreList: wx.getStorageSync('userOreList')
      })
      setTimeout(() => {
        this.setData({
          oreId: this.data.oreList[0].oreId
        })
        this.getOreInfo()
      }, 100);
    }
    this.setData({
      month: this.data.monthList[this.data.monthIndex],
      year: new Date().getFullYear()
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

  },
  //接口部分
  getOreInfo: function () {
    let that = this
    const data = {
      modeCode: 'lHlw9demqRo5YjzCLl3MYyGBZtLye8rI', //功能码
      sessionId: wx.getStorageSync('sessionId'),
      // oreIds: that.data.password,
      oreId: that.data.oreId,
      month: that.data.year + '-' + (that.data.monthIndex + 1).toString().padStart(2, 0)
    }
    req.requestAll(data).then(res => {
      if (res.data.code == 1) {
        console.log(res);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    })
  }

})