// pages/index/index.js
import * as echarts from '../../ec-canvas/echarts';
var req = require('../../utils/requestCommon.js');
var app = getApp();
let chartLine1;
let chartLine2;
let chartLine3;
let chartLine4;
let chartLine5;
let chartBar1;
let chartBar2;
let chartBar3;
let chartBar4;
let chartBar5;
let chartPie1;
let chartPie2;
let chartPie3;
let chartPie4;
let chartPie5;
let lineoption = {
    grid: {
        top: '10%',
        bottom: '15%',
        right: '5%',
        left: '10%'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // inverse: true,
        axisLabel: {
            show: true,
        },
        splitNumber: 6,
        // data: ['14', '08'],
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
    series: {
        name: 'A',
        type: 'line',
        smooth: true,
        showSymbol: false,
        // showSymbol: true,
        label: {
            show: true,
            position: 'top'
        },
        lineStyle: {
            normal: {
                color: 'rgba(49,99,232,1)',
            },
        },
        // areaStyle: {
        //   normal: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: 'rgba(49,99,232,0.5)'
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgba(49,99,232,0)'
        //       }
        //     ], false),
        //     shadowColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //         offset: 0,
        //         color: 'rgba(49,99,232,0.8)'
        //       },
        //       {
        //         offset: 1,
        //         color: 'rgba(49,99,232,0)'
        //       }
        //     ], false),
        //     shadowBlur: 20
        //   }
        // },
        // data: [100, 1]
        data: []
    }
}
let baroption = {
    grid: {
        top: '12%',
        bottom: '12%',
        right: '5%',
        left: '10%'
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
        // inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        // data: ['08', '07']
        data: []
    },
    series: {
        name: '车次',
        type: 'bar',
        // zlevel: 1,
        label: {
            show: true,
            position: 'top'
        },
        barWidth: 10,
        itemStyle: {
            barBorderRadius: 5,
            color: 'rgba(49,99,232,1)'
        },
        // data: [2, 1],
        data: [],
    }
}
let pieoption = {
    tooltip: {
        show: false,
        trigger: 'none',
    },
    color: ["#3163E8", "rgba(49,99,232,0.60)", "rgba(49,99,232,0.40)", "rgba(49,99,232,0.20)"],
    series: {
        // label: {
        //   normal: {
        //     fontSize: 12
        //   }
        // },
        startAngle: 120,
        grid: {
            top: '10%',
            bottom: '0',
            left: '',
            right: '',
            height: '90%'
        },
        label: {
            formatter: '{b} {d}%',
            show: true,
            position: 'top',
            fontStyle: 'normal',
            fontSize: 8
        },
        type: 'pie',
        center: ['50%', '52%'],
        radius: [45, 60],
        data: []
    }
}


Page({

    /**
     * 页面的初始数据
     */
    data: {
        //tabbar部分
        active: 0,
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
        //echarts部分
        ecline: [{
                onInit: function(canvas, width, height, dpr) {
                    chartLine1 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine1);

                    chartLine1.setOption(lineoption, true)
                    return chartLine1;
                }
            }, {
                onInit: function(canvas, width, height, dpr) {
                    chartLine2 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine2);

                    chartLine2.setOption(lineoption, true)
                    return chartLine2;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartLine3 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine3);

                    chartLine3.setOption(lineoption, true)
                    return chartLine3;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartLine4 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine4);

                    chartLine4.setOption(lineoption, true)
                    return chartLine4;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartLine5 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine5);

                    chartLine5.setOption(lineoption, true)
                    return chartLine5;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartLine6 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine6);

                    chartLine6.setOption(lineoption, true)
                    return chartLine6;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartLine7 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartLine7);

                    chartLine7.setOption(lineoption, true)
                    return chartLine7;
                }
            },
        ],
        ecbar: [{
                onInit: function(canvas, width, height, dpr) {
                    chartBar1 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartBar1);

                    chartBar1.setOption(baroption, true)
                    return chartBar1;
                }
            }, {
                onInit: function(canvas, width, height, dpr) {
                    chartBar2 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartBar2);

                    chartBar2.setOption(baroption, true)
                    return chartBar2;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartBar3 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartBar3);

                    chartBar3.setOption(baroption, true)
                    return chartBar3;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartBar4 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartBar4);

                    chartBar4.setOption(baroption, true)
                    return chartBar4;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartBar5 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartBar5);

                    chartBar5.setOption(baroption, true)
                    return chartBar5;
                }
            },
        ],
        ecpie: [{
                onInit: function(canvas, width, height, dpr) {
                    chartPie1 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartPie1);

                    chartPie1.setOption(pieoption, true)
                    return chartPie1;
                }
            }, {
                onInit: function(canvas, width, height, dpr) {
                    chartPie2 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartPie2);

                    chartPie2.setOption(pieoption, true)
                    return chartPie2;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartPie3 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartPie3);

                    chartPie3.setOption(pieoption, true)
                    return chartPie3;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartPie4 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartPie4);

                    chartPie4.setOption(pieoption, true)
                    return chartPie4;
                }
            },
            {
                onInit: function(canvas, width, height, dpr) {
                    chartPie5 = echarts.init(canvas, null, {
                        width: width,
                        height: height,
                        devicePixelRatio: dpr // new
                    });
                    canvas.setChart(chartPie5);

                    chartPie5.setOption(pieoption, true)
                    return chartPie5;
                }
            },
        ],

        // 页面部分
        once: 1, //首次初始化图表
        month: '一月',
        monthIndex: (new Date().getMonth()),
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ],
        todaybtn: 0, //切换车次吨数（今日）
        monthbtn: 0, //切换车次吨数（本月）
        needbtn: 0, //切换车次吨数（需方）
        destinationbtn: 0, //切换车次吨数（目的地）
        needfold: true, //需方列表展开收起
        destinationfold: true, //目的地列表展开收起
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
    // picker选择月份
    chooseMonth(e) {
        this.setData({
            monthIndex: e.detail.value
        })
        this.getOreInfo(this.data.currentTab)
    },
    // echart切车次重量按钮
    toggleActive: function(e) {
        wx.showLoading({
            title: '加载中',
        })
        switch (e.currentTarget.dataset.type) {
            case 'todaycar':
                this.setData({
                    todaybtn: 0
                })


                lineoption.series.lineStyle.normal.color = 'rgba(49,99,232,1)'
                lineoption.series.data = this.data.daycar
                if (this.data.currentTab == 0) {
                    chartLine1.setOption(lineoption, true)
                } else if (this.data.currentTab == 1) {
                    chartLine2.setOption(lineoption, true)
                } else if (this.data.currentTab == 2) {
                    chartLine3.setOption(lineoption, true)
                } else if (this.data.currentTab == 3) {
                    chartLine4.setOption(lineoption, true)
                } else if (this.data.currentTab == 4) {
                    chartLine5.setOption(lineoption, true)
                } else if (this.data.currentTab == 5) {
                    chartLine6.setOption(lineoption, true)
                } else if (this.data.currentTab == 6) {
                    chartLine7.setOption(lineoption, true)
                }
                wx.hideLoading({})
                break;
            case 'todayweight':
                this.setData({
                    todaybtn: 1
                })

                lineoption.series.lineStyle.normal.color = "#F5A623"
                lineoption.series.data = this.data.dayweight
                if (this.data.currentTab == 0) {
                    chartLine1.setOption(lineoption, true)
                } else if (this.data.currentTab == 1) {
                    chartLine2.setOption(lineoption, true)
                } else if (this.data.currentTab == 2) {
                    chartLine3.setOption(lineoption, true)
                } else if (this.data.currentTab == 3) {
                    chartLine4.setOption(lineoption, true)
                } else if (this.data.currentTab == 4) {
                    chartLine5.setOption(lineoption, true)
                } else if (this.data.currentTab == 5) {
                    chartLine6.setOption(lineoption, true)
                } else if (this.data.currentTab == 6) {
                    chartLine7.setOption(lineoption, true)
                }
                wx.hideLoading({})
                break;
            case 'monthcar':
                this.setData({
                    monthbtn: 0
                })
                baroption.series.itemStyle.color = 'rgba(49,99,232,1)'
                baroption.series.data = this.data.monthcar
                if (this.data.currentTab == 0) {
                    chartBar1.setOption(baroption, true)
                } else if (this.data.currentTab == 1) {
                    chartBar2.setOption(baroption, true)
                } else if (this.data.currentTab == 2) {
                    chartBar3.setOption(baroption, true)
                } else if (this.data.currentTab == 3) {
                    chartBar4.setOption(baroption, true)
                } else if (this.data.currentTab == 4) {
                    chartBar5.setOption(baroption, true)
                } else if (this.data.currentTab == 5) {
                    chartBar5.setOption(baroption, true)
                } else if (this.data.currentTab == 6) {
                    chartBar5.setOption(baroption, true)
                }
                wx.hideLoading({})
                break;
            case 'monthweight':
                this.setData({
                    monthbtn: 1
                })
                baroption.series.itemStyle.color = '#F5A623'
                baroption.series.data = this.data.monthweight
                if (this.data.currentTab == 0) {
                    chartBar1.setOption(baroption, true)
                } else if (this.data.currentTab == 1) {
                    chartBar2.setOption(baroption, true)
                } else if (this.data.currentTab == 2) {
                    chartBar3.setOption(baroption, true)
                } else if (this.data.currentTab == 3) {
                    chartBar4.setOption(baroption, true)
                } else if (this.data.currentTab == 4) {
                    chartBar5.setOption(baroption, true)
                } else if (this.data.currentTab == 5) {
                    chartBar5.setOption(baroption, true)
                } else if (this.data.currentTab == 6) {
                    chartBar5.setOption(baroption, true)
                }
                wx.hideLoading({})
                break;
            case 'needcar':
                this.setData({
                    needbtn: 0
                })
                wx.hideLoading({})
                break;
            case 'needweight':
                this.setData({
                    needbtn: 1
                })
                wx.hideLoading({})
                break;
            case 'destinationcar':
                this.setData({
                    destinationbtn: 0
                })
                wx.hideLoading({})
                break;
            case 'destinationweight':
                this.setData({
                    destinationbtn: 1
                })
                wx.hideLoading({})
                break;
            default:
                wx.hideLoading({})
                break;
        }
    },
    //展开收起折叠
    fold: function(e) {
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
    isLoged: function(msg) {
        if (msg.indexOf('你') != -1) {
            let timeout1 = setTimeout(function() {
                wx.navigateTo({
                    url: '../login/login',
                })
            }, 2000)
        }
    },
    // 滚动切换标签样式
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.setData({
            oreId: this.data.oreList[this.data.currentTab].oreId
        })
        this.getOreInfo(this.data.currentTab)
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
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
                // this.getOreInfo(this.data.currentTab)
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
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
    onLoad: function(options) {
        var that = this;
        //  高度自适应
        app.is_login()
        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    height1 = res.statusBarHeight,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - (80 + height1) * 2;
                // var calc = clientHeight * rpxR - 200;
                that.setData({
                    winHeight: calc
                });
            }
        });
        wx.getSystemInfo({
            success(res) {
                console.log(res.model)
                if (res.model.indexOf('iPhone XR') != -1) {
                    that.setData({
                        brand: 'iphonex'
                    })
                } else if (res.model.indexOf('iPhone') != -1) {
                    that.setData({
                        brand: 'iphone'
                    })
                } else {
                    that.setData({
                        brand: 'an'
                    })
                }
            }
        })
    },
    footerTap: app.footerTap,
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let that = this
        wx.getSystemInfo({
            success(res) {
                that.setData({
                    topgap: res.statusBarHeight
                })
            }
        })
        this.setData({
            month: this.data.monthList[this.data.monthIndex],
            year: new Date().getFullYear()
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.hideNavigationBarLoading();

        app.is_login()
            //刷新页面操作
        this.setData({
            once: 1,
            active: 0,
            currentTab: 0,
            scrollLeft: 0,
            monthIndex: (new Date().getMonth()),
            todaybtn: 0, //切换车次吨数（今日）
            monthbtn: 0, //切换车次吨数（本月）
            needbtn: 0, //切换车次吨数（需方）
            destinationbtn: 0, //切换车次吨数（目的地）
            needfold: true, //需方列表展开收起
            destinationfold: true, //目的地列表展开收起
        })
        if (wx.getStorageSync('userOreList')) {
            let oreList = wx.getStorageSync('userOreList')
            oreList.unshift({
                oreName: '总体'
            })
            this.setData({
                year: new Date().getFullYear(),
                oreList: oreList
            })
            setTimeout(() => {
                this.setData({
                    oreId: this.data.oreList[this.data.currentTab].oreId
                })
                this.getOreInfo(this.data.currentTab)
                wx.hideLoading({})
            }, 100);
        }

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    setchartdata: function() {
        if (this.data.todaybtn == 0) {
            lineoption.series.lineStyle.normal.color = 'rgba(49,99,232,1)'
            lineoption.series.data = this.data.daycar
        } else if (this.data.todaybtn == 1) {
            lineoption.series.lineStyle.normal.color = '#F5A623'
            lineoption.series.data = this.data.dayweight
        }
        if (this.data.monthbtn == 0) {
            baroption.series.itemStyle.color = 'rgba(49,99,232,1)'
            baroption.series.data = this.data.monthcar
        } else if (this.data.monthbtn == 1) {
            baroption.series.itemStyle.color = '#F5A623'
            baroption.series.data = this.data.monthweight
        }
    },
    //初始化chart
    initChart1: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine1.setOption(lineoption, true)
        chartBar1.setOption(baroption, true)
        chartPie1.setOption(pieoption, true)
        wx.hideLoading({})
    },

    initChart2: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine2.setOption(lineoption, true)
        chartBar2.setOption(baroption, true)
        chartPie2.setOption(pieoption, true)
        wx.hideLoading({})
    },
    initChart3: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine3.setOption(lineoption, true)
        chartBar3.setOption(baroption, true)
        chartPie3.setOption(pieoption, true)
        wx.hideLoading({})
    },
    initChart4: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine4.setOption(lineoption, true)
        chartBar4.setOption(baroption, true)
        chartPie4.setOption(pieoption, true)
        wx.hideLoading({})
    },
    initChart5: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine5.setOption(lineoption, true)
        chartBar5.setOption(baroption, true)
        chartPie5.setOption(pieoption, true)
        wx.hideLoading({})
    },
    initChart6: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine6.setOption(lineoption, true)
        chartBar6.setOption(baroption, true)
        chartPie6.setOption(pieoption, true)
        wx.hideLoading({})
    },
    initChart7: function() {
        this.setchartdata()
        lineoption.xAxis.data = this.data.dayx
        baroption.xAxis.data = this.data.monthx
        pieoption.series.data = this.data.pieoption
        chartLine7.setOption(lineoption, true)
        chartBar7.setOption(baroption, true)
        chartPie7.setOption(pieoption, true)
        wx.hideLoading({})
    },
    //接口部分
    getOreInfo: function(type) {
        wx.showLoading({
            title: '加载中',
        })
        let that = this
        const data = {
            modeCode: 'lHlw9demqRo5YjzCLl3MYyGBZtLye8rI', //功能码
            sessionId: wx.getStorageSync('sessionId'),
            // oreIds: that.data.password,
            oreId: that.data.oreId,
            month: that.data.year + '-' + (parseInt(that.data.monthIndex) + 1).toString().padStart(2, 0)
        }
        let ids = []
        that.data.oreList.forEach((item) => {
            ids.push(item.oreId)
        })
        ids.shift()
        ids = ids.join(',')
        if (type == 0) {
            data.oreIds = ids
        }
        req.requestAll(data).then(res => {
            if (res.data.code == 1) {
                let resdata = res.data.data
                let monthx = []
                let monthcar = []
                let monthweight = []
                resdata.monthsCountWeight.forEach((item) => {
                    monthx.push(item.PASSDATE.substr(-2))
                    monthcar.push(Math.round(item.CNT))
                    monthweight.push(Math.round(item.NET_WEIGHT))
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
                    pieoption: resdata.oreWeight,
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
                    setTimeout(() => {
                        that.initChart1()
                    }, 1000);
                }
                switch (that.data.currentTab) {
                    case 0:
                        that.initChart1()
                        break;
                    case 1:
                        that.initChart2()
                        break;
                    case 2:
                        that.initChart3()
                        break;
                    case 3:
                        that.initChart4()
                        break;
                    case 4:
                        that.initChart5()
                        break;
                    case 5:
                        that.initChart6()
                        break;
                    case 6:
                        that.initChart7()
                        break;
                    default:
                        wx.hideLoading({})
                        break;
                }
                that.setData({
                    once: 0
                })
                wx.hideLoading({})
            } else {
                wx.hideLoading({})
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                })
                that.isLoged(res.data.msg)
                wx.hideLoading({})
            }
        })
    }

})