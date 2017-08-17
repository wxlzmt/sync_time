

//日志相关
var log4js = require("log4js");
var log4js_config = require("./log4js.json");
log4js.configure(log4js_config);

const logger = log4js.getLogger();


//windows 命令调用相关
var cmd=require('node-cmd');


//api相关
var http=require('http'); 

var url = "http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json";

logger.info("--------------更新操作系统时间开始!!!-----------------");

//get 请求外网
http.get(url,function(req,res){
	logger.info("API请求URL="+url);
    var html='';
    req.on('data',function(data){
        html+=data;
    });
    req.on('end',function(){
		logger.info("API请求返回JSON数据:");
        logger.info(html);
		sync(html);
    });
	req.on('error',function(){
		//nothing
	});
});

function sync(data){
	var obj = null;
	try{
		obj = JSON.parse(data);
	}catch(e){
		logger.info(e);
	}
	if(obj!=null && obj.success=="1"){
		var dt1 = obj.result.datetime_1;
		var d = new Date(dt1);
		var s1 = getYMD(d);
		var s2 = getTM(d);
		logger.info("获取到北京时间:");
		logger.info(dt1);
		update(s1,s2);
	}
}

function update(ymd,time){
	cmd.run("date "+ymd);
	cmd.run("time "+time);
	logger.info("--------------更新操作系统时间完成!!!-----------------");
}

function getYMD(d){
  var yyyy = d.getFullYear();
  var mo = d.getMonth() < 9 ? ("0" + (d.getMonth()+1)) : d.getMonth()+1;
  var dd = d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate();
  return yyyy + "/" + mo + "/" + dd ;
}

function getTM(d){
  var hh = d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours();
  var mi = d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes();
  var ss = d.getSeconds() < 10 ? ("0" + d.getSeconds()) : d.getSeconds();
  return hh + ":" + mi + ":" + ss;
}

process.on('uncaughtException', function (err) {
    logger.error('An uncaught error occurred!');
    logger.error(err.stack);
});
