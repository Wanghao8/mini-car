//app.js
var RSA = require('./utils/useRSA.js');
var AES = require('./utils/public.js');
var FIX = require('./utils/fixed.js');
var Req = require('./utils/requestCommon.js');


App({
  onLaunch: function () {
    // 获取token
    //AES 加密数据
    let aes_key = FIX.random(16);
    let aes_iv = FIX.random(16); //AES_IV
    let nonce = FIX.random(32);
    let timestamp = FIX.timeStamp(); //时间戳
    let sign_mw = '{"appId":"' + Req.appId + '","nonce":"' + nonce + '", "timestamp": "' + timestamp + '"}';
    //aes 使用 aes_key aes_iv 加密 sign
    let sign = AES.encrypt(sign_mw, aes_key, aes_iv);
    //rsa 公钥加密AES的密码和偏移
    //rsa 公钥加密 aes_key + aes_iv
    let secret = RSA.RSAEncrypt(aes_key, aes_iv, Req.rsaPubKey);
    //RSA.ende
    const sendData = {
      appId: Req.appId,
      secret: secret,
      sign: sign
    }
    wx.request({
      url: Req.tokenUrl,
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
          wx.setStorageSync('token', token_mingwen)
          // console.log(wx.getStorageSync('token'))
        }
      }
    });
  },
  is_login: function () {
    if (!wx.getStorageSync('sessionId')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
  },
  globalData: {
    userInfo: null,
    isUpdate: false,
  },
  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  }
})