const charts =  ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const random = function generateMixed(n){
  var res = '';
  for(var i = 0; i <n; i++){
    var id = Math.floor(Math.random()*62);
    res += charts[id];
  }
  return res;
}

//时间戳
const timeStamp = function time() {
  let time_stamp = Date.parse(new Date());
  return time_stamp.toString();
}

//获取当年年份 
const yearData = function  year(){
  let data = new Date();
  let year_data = data.getFullYear();
  return year_data;
}
module.exports = {
  random:random,
  timeStamp:timeStamp,
  yearData:yearData,
}