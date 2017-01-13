var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js')


//创建handlebars实例，定义目录为layouts,文件名为main.handlebars的主模版,默认所在文件夹为views
var handlebars = require('express-handlebars').create({
	defaultLayout:'main'
});

//定义页面动态数据数组
// var fortunes = [
// 		"Conquer your fears or they will conquer you.",
// 		"Rivers need springs.",
// 		"Do not fear what you don't know.",
// 		"Whenever possible, keep it simple.",
// ];


//注册并设置模版视图引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// static中间件给需要链接的静态文件创建了一个路由，渲染文件并发送给客户端。
app.use(express.static(__dirname + '/public'));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next){
				res.locals.showTests = app.get('env') !== 'production' &&
						req.query.test === '1';
				next();
});

//创建页面路由
app.get('/', function(req, res){
					res.render('home');

});
app.get('/about', function(req, res) {
					res.render('about', {
									fortune: fortune.getFortune(),
									pageTestScript: '/qa/tests-about.js'
					});
});


//创建页面
app.use(function(req,res){

	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);

	res.status(500);
	res.render('500');
});



app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port') );
});
