<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<title>EditRobot</title>
		<link rel="stylesheet" href="css/main.css" type="text/css" media="screen" />
	</head>
<body>
<div id="head">
	<h3>EditRobot基础代码生成工具</h3>
</div>
<div id="container">
	<div>
		<p>
			<b>项目名称:</b>&nbsp;<input value=""/>
		</p>
	</div>
	<div id="db_list">
		数据表数量:&nbsp;<input type="number" value="0"/>&nbsp;<input type="button" value="确定"/>
		<p>
			<b>数据表编号:&nbsp;1</b><br/>
			数据表名称:<input value=""/><br/><br/>
			主键:&nbsp;
			<select name="cars">
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="fiat">Fiat</option>
				<option value="audi">Audi</option>
			</select>
			<table>
				<tr>
					<th>键名</th>
					<th>格式</th>
					<th>是否允许为空</th>
					<th>是否允许自增长</th>
					<th>对键名注释</th>
				</tr>
				<tr>
					<td><input value=""/></td>
					<td>
						<select name="cars">
							<option value="volvo">Volvo</option>
							<option value="saab">Saab</option>
							<option value="fiat">Fiat</option>
							<option value="audi">Audi</option>
						</select>
					</td>
					<td><input type="checkbox" value=""/></td>
					<td><input type="checkbox" value=""/></td>
					<td><input type="text" value=""/></td>
				</tr>
			</table>
		</p>
	</div>
	<div>
		<h4>模块类:</h4>
		<b>模块名:</b>&nbsp;<input type="text" value=""/><br/><br/>
		模块属性列表:<br/>
		<table>
			<tr>
				<th>属性名</th>
				<th>格式</th>
				<th>初始值</th>
				<th>能见度</th>
			</tr>
			<tr>
				<td><input type="text" value=""/></td>
				<td>
					<select name="type">
						<option value="string">字符串</option>
						<option value="number">数字</option>
					</select>
				</td>
				<td><input type="text" value=""/></td>
				<td>
					<select name="visibility">
						<option value="public">public</option>
						<option value="protected">protected</option>
						<option value="private">private</option>
					</select>
				</td>
			</tr>
		</table>
		模块方法列表:<br/>
		<table>
			<tr>
				<th>方法名</th>
				<th>能见度</th>
				<th>输入参数</th>
			</tr>
			<tr>
				<td><input type="text" value=""/></td>
				<td>
					<select name="visibility">
						<option value="public">public</option>
						<option value="protected">protected</option>
						<option value="private">private</option>
					</select>
				</th>
				<td></th>
			</tr>
		</table>
	</div>
	<div>
		<h4>页面:</h4><input value=""/>
	</div>
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