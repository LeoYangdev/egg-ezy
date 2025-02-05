var host = "http://localhost:8080";
// 本地路由域名
// var host = "http://192.168.3.128:8080";
// 校园网域名
// var host = "http://10.60.16.115:8080";
// var host = "https://egg.shenghao.xyz"

var Region = "ASG";
var uptokenURL = host + "/qiniu/getuptoken";
var domain = "https://cdn.cookcode.xyz/";

var config={
  host,
  Region,
  uptokenURL,
  domain
}
module.exports=config//输出配置