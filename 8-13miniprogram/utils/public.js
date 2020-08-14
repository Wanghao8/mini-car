var CryptoJS = require('./aes.js');
// var _KEY ="";//16位
// var _IV = "";//16位    //这个key和偏移量都是后台给的数据

//字符串加密方法
function encrypt(source,aesKey,aesIv){
    var key = CryptoJS.enc.Utf8.parse(aesKey);
    var iv = CryptoJS.enc.Utf8.parse(aesIv);
    var ciphertext = CryptoJS.enc.Utf8.parse(source);
    var encrypt = CryptoJS.AES.encrypt(ciphertext, key,{
       iv:iv,
       mode:CryptoJS.mode.CBC,
       padding:CryptoJS.pad.Pkcs7
    })
    //return encrypt.ciphertext.toString();
    return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
}

//字符串解密方法
// function decrypt(str){
//     var key = CryptoJS.enc.Utf8.parse(_KEV);
//     var iv = CryptoJS.enc.Utf8.parse(_IV);
//     var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
//     var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
//     var decrypt = CryptoJS.AES.decrypt(srcs,key,{
//         iv:iv,
//         mode:CryptoJS.mode.CBC,
//         padding:CryptoJS.pad.Pkcs7
//     }) 
//     var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//     return decryptedStr.toString();
// }

function decrypt(secret, cryptData) {
    var key = secret.substring(0, 16);
    var iv = secret.substring(16, 32);

    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypt = CryptoJS.AES.decrypt(cryptData,
        key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

module.exports = {
    decrypt:decrypt,
    encrypt:encrypt
}