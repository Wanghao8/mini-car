var RSA = require('../utils/useRSA.js');
var AES = require("../utils/public.js");
var FIX = require("../utils/fixed.js");
// 接口url
// let baseUrl="http://v.kuangyuntong.com:10256";    //测试
// let baseUrl="http://192.168.2.192:9023/";    //测试
let baseUrl="https://openapi.zzkyt.cn";         //生产
// 公钥
const rsaPubKey ="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs3Vx3p2gz4kK7RCZpicq6jnZO93qiiSnY/j+Ehf25S0RbzyIJ6o7MkMTNEhuCpHQs5jD67IMhKK6AyFciaByiK8Xji2TTo/sjc4pm+aO91CrzYGp66PfQHqzyNbKn0gg9xwAVZqRrFomailhUCsf1agX0Ikiq62U8UBjxJGQ2jR0wYpO3/Cwn5+38XtQUMvXxJgj93zKIL7WAu/QP0Qdpu7WdcBpoaiMPCSCVfFknfzE5cSXHx9pW9YnIEUrpS5qoNYzyIa3cwUkpiVwaHhIPZI8kiMCfam0VrhWYhOmAskUxS/0ApE0cQaCEFRNtneb/wAylFf/w+ze3HRbGffvOQIDAQAB"; 
// 获取token的接口
let tokenUrl = baseUrl+'/zzsoft/openApi/v1/token/getToken.fix';
//业务接口;
let mainUrl = baseUrl + '/zzsoft/openApi/v1/modeward/forward.fix';
//系统唯一appId
const appId = '26EonIsCOTqyC8ecKoOT';
  // 业务接口封装
  function requestAll(params) {
    return new Promise((resolve, reject) => {
      // 获取token
      let token=wx.getStorageSync('token');
      // 加密处理
      let aes_key = FIX.random(16);       //aes 密钥
      let aes_iv = FIX.random(16);        //aes 偏移
      let nonce = FIX.random(32);         //nonce
      let timestamp = FIX.timeStamp();    //时间戳
      let secret = RSA.RSAEncrypt(aes_key, aes_iv,rsaPubKey);       //secret
      // 参数赋值
      params.token=token;
      params.appId=appId;
      params.nonce=nonce;
      params.timestamp=timestamp;
      console.log("业务参数",params);
      // 对所有参数进行加密
      let sign = AES.encrypt(JSON.stringify(params), aes_key, aes_iv);
      // 最终处理的参数
      let sendData = {
        appId: appId,
        secret: secret,
        sign: sign
      }
      // 如果本地没有token先获取token
      if(!token){
        getToken(params);
        return;
      }
      wx.request({
        url:mainUrl,
        data:JSON.stringify(sendData),
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        'method': 'POST',
        success: (res => {
          console.log("业务接口返回",res);
          // 请求成功
          if (res.statusCode === 200) {
            // 说明token过期，重新获取token
            if(res.data.code==-19 || res.data.code==-20){
              getToken(params);
              return;
            }
            resolve(res);
          } else {
            //其它错误，提示用户错误信息
            reject(res);
          }
        }),
        fail: (res => {
          reject(res);
        })
      })
    })
  }
  // token接口封装
  function getToken(params) { 
    //AES 加密数据
    let aes_key = FIX.random(16);
    let aes_iv = FIX.random(16); //AES_IV
    let nonce = FIX.random(32);
    let timestamp = FIX.timeStamp(); //时间戳
    let sign_mw = '{"appId":"' + appId + '","nonce":"' + nonce + '", "timestamp": "' + timestamp + '"}';
    //aes 使用 aes_key aes_iv 加密 sign
     let sign = AES.encrypt(sign_mw, aes_key, aes_iv);
     //rsa 公钥加密AES的密码和偏移
     //rsa 公钥加密 aes_key + aes_iv
     let secret = RSA.RSAEncrypt(aes_key, aes_iv,rsaPubKey);
     //RSA.ende
     const sendData = {
      appId: appId,
      secret: secret,
      sign: sign
    }
    wx.request({
      url:tokenUrl,
      'method': 'POST',
      data: JSON.stringify(sendData),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 1) {
          let get_secret = res.data.data.secret;
          let token_miwen = res.data.data.token;
          let token_mingwen = AES.decrypt(get_secret, token_miwen);
          wx.setStorageSync('token', token_mingwen);
          // 成功获取到token后再继续请求业务接口
          requestAll(params);
        }
      }
    })
  }

module.exports = {
  requestAll: requestAll,
  rsaPubKey:rsaPubKey,
  tokenUrl:tokenUrl,
  appId:appId,
  mainUrl:mainUrl
}