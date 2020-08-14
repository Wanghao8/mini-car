var RSA = require('../utils/wx_rsa.js');
//rsa加密
var RSAEncrypt = function (aesKey,aesIv, publicKey) {
  //RSA使用公钥加密 AES 密码及偏移
  //js处理为PEM格式
  var pemStart = "-----BEGIN PUBLIC KEY-----";
  var pemEnd = "-----END PUBLIC KEY-----";
  var rsaPublicPem = pemStart + publicKey + pemEnd;
  //处理PEM公钥对象
  var rsaEncryptKey = RSA.KEYUTIL.getKey(rsaPublicPem);
  //rsa加密从新取，上边已经重置了aesPwd及aesIv
  var aesPwdIvs = aesKey + aesIv;
  var rsaEncryptSource = RSA.hextob64(RSA.KJUR.crypto.Cipher.encrypt(aesPwdIvs, rsaEncryptKey, "RSA"));
  return  rsaEncryptSource;
}
module.exports={
  RSAEncrypt:RSAEncrypt
}