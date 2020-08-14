const CryptoJS  = require("./crypto-js");
let APPID="5ec3459a";
let APIKey="126da52a3b10d70ff8554c9fb51267c2";
let ts=parseInt(new Date().getTime() / 1000);

// 拍照识别身份证信息
function OcrIdCard(){
    return new Promise(function(resolve,reject){
      var that = this;
      //识别身份证
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
            // 获取base64格式
            wx.getFileSystemManager().readFile({
                filePath: res.tempFilePaths[0],
                encoding: 'base64',             //编码格式
                success(ans) {
                    wx.showLoading({ title: '识别中' })
                    let param={
                        engine_type: 'idcard'
                    }
                    let img= encodeURI(ans.data);              //urlencode编码
                    param=CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(param)));
                    let CheckSum=CryptoJS.MD5(APIKey+ts+param).toString();
                    wx.request({
                        url: 'https://webapi.xfyun.cn/v1/service/v1/ocr/idcard',
                        method: 'POST',
                        header: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        "X-Appid":APPID,
                        "X-CurTime":ts+"",
                        "X-Param":param,
                        "X-CheckSum":CheckSum
                        },
                        data:{
                            image:img
                        },
                        success(_res) {
                            resolve(_res)
                        }, 
                        fail(_res) {
                            wx.hideLoading();
                            wx.showToast({
                                title: '请求出错',
                                icon:"none"
                            })
                            reject(_res)
                        }
                    })
                }
            })
        }
      })
    })
}
  
  module.exports = {
    OcrIdCard: OcrIdCard
  }