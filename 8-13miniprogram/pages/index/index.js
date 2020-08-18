// pages/index/index.js
import * as echarts from '../../components/ec-canvas/echarts';
var req = require('../../utils/requestCommon.js');
var app = getApp();
let chartLine;
let chartBar;
let chartPie;
let lineoption = {}
let baroption = {}
let pieoption = {}
let piedata = []

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
    ecLine: {
      onInit: function (canvas, width, height, dpr) {
        chartLine = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chartLine);
        lineoption = {
          grid: {
            top: '10%',
            bottom: '15%',
            right: '5%',
            left: '8%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            inverse: true,
            axisLabel: {
              show: true
            },
            data: [],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
          },
          yAxis: {
            x: 'center',
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
          },
          series: [{
            name: 'A',
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: 'rgba(49,99,232,1)',
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(49,99,232,0.5)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(49,99,232,0)'
                  }
                ], false),
                shadowColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(49,99,232,0.8)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(49,99,232,0)'
                  }
                ], false),
                shadowBlur: 20
              }
            },
            data: []
          }]
        }
        chartLine.setOption(lineoption, true)
        return chartLine;
      }
    },
    ecbar: {
      onInit: function (canvas, width, height, dpr) {
        chartBar = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chartBar);
        baroption = {
          grid: {
            top: '10%',
            bottom: '15%',
            right: '5%',
            left: '15%'
          },
          yAxis: [{
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
          }],
          xAxis: {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: []
          },
          color: ['#3163E8'],
          series: {
            name: '车次',
            type: 'bar',
            // zlevel: 1,
            label: {
              show: false
            },
            barWidth: 10,
            itemStyle: {
              barBorderRadius: 5
            },
            data: [],
          }
        }
        chartBar.setOption(baroption, true)
        return chartBar;
      }
    },
    ecpie: {
      onInit: function (canvas, width, height, dpr) {
        chartPie = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(chartPie);
        pieoption = {
          color: ["#3163E8", "rgba(49,99,232,0.60)", "rgba(49,99,232,0.40)", "rgba(49,99,232,0.20)"],
          series: {
            label: {
              normal: {
                fontSize: 12
              }
            },
            type: 'pie',
            center: ['50%', '50%'],
            radius: [50, 70],
            data: piedata
          }
        }
        chartPie.setOption(pieoption, true)
        return chartPie;
      }
    },
    // 页面部分
    once: 1, //首次初始化图表
    month: '八月',
    monthIndex: (new Date().getMonth()),
    monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ],
    todaybtn: 0, //切换车次吨数（今日）
    monthbtn: 0, //切换车次吨数（本月）
    needbtn: 0, //切换车次吨数（需方）
    destinationbtn: 0, //切换车次吨数（目的地）
    needfold: true, //需方列表展开收起
    destinationfold: true, //目的地列表展开收起
  },
  // picker选择月份
  chooseMonth(e) {
    this.setData({
      monthIndex: e.detail.value
    })
    this.getOreInfo()
  },
  // echart切车次重量按钮
  toggleActive: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'todaycar':
        this.setData({
          todaybtn: 0
        })
        lineoption.series.data = this.data.daycar
        console.log(lineoption.series.data);
        chartLine.setOption(lineoption, true)
        break;
      case 'todayweight':
        this.setData({
          todaybtn: 1
        })
        lineoption.series.data = this.data.dayweight
        console.log(lineoption.series.data);
        chartLine.setOption(lineoption, true)
        break;
      case 'monthcar':
        this.setData({
          monthbtn: 0
        })
        baroption.series.data = this.data.monthcar
        console.log(baroption.series.data);
        chartBar.setOption(baroption, true)
        break;
      case 'monthweight':
        this.setData({
          monthbtn: 1
        })
        baroption.series.data = this.data.monthweight
        console.log(baroption.series.data);
        chartBar.setOption(baroption, true)
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
  //展开收起折叠
  fold: function (e) {
    switch (e.currentTarget.dataset.type) {
      case 'needfold':
        this.setData({
          needfold: true
        })
        break;
      case 'needunfold':
        this.setData({
          needfold: false
        })
        break;
      case 'desfold':
        this.setData({
          destinationfold: true
        })
        break;
      case 'desunfold':
        this.setData({
          destinationfold: false
        })
        break;
      default:
        break;
    }
  },
  // 是否登陆过，若在别的地方登陆，跳转登录页
  isLoged: function (msg) {
    // if (res.data.msg.indexOf('你') != -1) {
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
      this.setData({
        oreId: this.data.oreList[this.data.currentTab].oreId
      })
      this.getOreInfo()
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
  //初始化chart
  initChart: function () {
    lineoption.xAxis.data = this.data.dayx
    lineoption.series.data = this.data.daycar
    baroption.xAxis.data = this.data.monthx
    baroption.series.data = this.data.monthcar
    console.log(lineoption, baroption, 111111);
    chartBar.setOption(baroption, true)
    chartLine.setOption(lineoption, true)
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
        console.log(res.data.code);
        let resdata = res.data.data
        let monthx = []
        let monthcar = []
        let monthweight = []
        resdata.monthsCountWeight.forEach((item) => {
          monthx.push(item.PASSDATE.substr(-2))
          monthcar.push(item.CNT)
          monthweight.push(item.NET_WEIGHT)
        })
        let dayx = []
        let daycar = []
        let dayweight = []
        resdata.DaysCountWeight.forEach((item) => {
          dayx.push(item.PASSDATE.substr(-2))
          daycar.push(item.CNT)
          dayweight.push(item.NET_WEIGHT)
        })
        resdata.oreWeight.forEach((item) => {
          item.name = item.ORENAME
          item.value = item.NETWEIGHT
        })
        that.setData({
          monthCount: resdata.monthCountWeight,
          dayCount: resdata.currentDayCountWeight,
          dayx,
          daycar,
          dayweight,
          monthx,
          monthcar,
          monthweight,
          needcarshort: resdata.tenCountBuyer.slice(0, 4),
          needcarlong: resdata.tenCountBuyer,
          needweightshort: resdata.tenWeightBuyer.slice(0, 4),
          needweightlong: resdata.tenWeightBuyer,
          descarshort: resdata.tenCountDestArea.slice(0, 4),
          descarlong: resdata.tenCountDestArea,
          desweightshort: resdata.tenWeightDestArea.slice(0, 4),
          desweightlong: resdata.tenWeightDestArea
        })
        if (that.data.once == 1) {
          that.initChart()
        }
        pieoption.series.data = resdata.oreWeight
        console.log(pieoption.series, resdata.oreWeight);

        chartPie.setOption(pieoption, true)
        that.setData({
          once: 0
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        that.isLoged(res.data.msg)
      }
    })
  }

})