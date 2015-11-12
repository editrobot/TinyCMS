<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>EditRobot</title>
		<link rel="stylesheet" href="css/main.css" type="text/css" media="screen" />
	</head>
<body>
<div id="head">
	<h2>EditRobot基础代码生成工具</h2>
</div>
<div id="container">
	<a href="update_include.php" style="color:#ffffff;">点击更新模块列表</a>
	<p>
		欢迎下载这个粗糙的附加工具。该项目目前只是一个雏形，欢迎有想法的伙伴加入到我这里的开源之路。
	</p>
	<p>
		QQ群：318648545
	</p>
	<p>
		您可以编辑 run.php 里面的内容，接着运行它就可以，运行后生成的项目在 project 文件夹中,总共有两个版本，一个是zip压缩包，一个是未经打包的。代码的内容都是一样的。
	</p>

</div>
<div id="foot">
	Copy&nbsp;Right&nbsp;2015.&nbsp;&nbsp;EDITROBOT
</div>
<script type="text/javascript" src="js/Append.js"></script>
<script type="text/javascript">
var ResourcesFile = append.use("ResourcesFile");
ResourcesFile.AddScript("js/page_run.js", "run", function () {
	var jsfile = new Array();
	jsfile.push("js/test");
	append.require(jsfile,function(){});
    run_code();
});
</script>

</body>
</html>