(function () {
	var moduleMap = {};
	var fileMap = {};
	var noop = function () {
	};
	
	var append = {
		define: function(name, dependencies, factory) {
			if (!moduleMap[name]) {
				var module = {
					name: name,
					dependencies: dependencies,
					factory: factory
				};

				moduleMap[name] = module;
			}

			return moduleMap[name];
		},

		use: function(name) {
			var module = moduleMap[name];

			if (!module.entity) {
				var args = [];
				for (var i=0; i<module.dependencies.length; i++) {
					if (moduleMap[module.dependencies[i]].entity) {
						args.push(moduleMap[module.dependencies[i]].entity);
					}
					else {
						args.push(this.use(module.dependencies[i]));
					}
				}

				module.entity = module.factory.apply(noop, args);
			}

			return module.entity;
		},

		require: function (pathArr, callback) {
			for (var i = 0; i < pathArr.length; i++) {
				var path = pathArr[i];
			 
				if (!fileMap[path]) {
					var head = document.getElementsByTagName('head')[0];
					var node = document.createElement('script');
					node.type = 'text/javascript';
					node.async = 'true';
					node.src = path + '.js';
					node.onload = function (){
						fileMap[path] = true;
						//head.removeChild(node);
						checkAllFiles();
					};
					head.appendChild(node);
				}
			}
			function checkAllFiles() {
				var allLoaded = true;
				for (var i = 0; i < pathArr.length; i++) {
					if (!fileMap[pathArr[i]]) {
						allLoaded = false;
						break;
					}
				}
				if (allLoaded){
					callback();
				}
			}
		}
	};
	window.append = append;
})();

//加载脚本
append.define("ResourcesFile", [], function() {
	return {
		AddScript: function(js_filename,set_tag_id,callback){
	
			var script = document.createElement("script");
			//script.type = "text/javascript";
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', js_filename);
			script.setAttribute('id', set_tag_id);
		
			script_id = document.getElementById(set_tag_id);
		
			if (script.readyState){ //IE
				script.onreadystatechange = function(){
					if (script.readyState == "loaded" || script.readyState == "complete"){
						script.onreadystatechange = null;
						callback();
					}
				};
			} else {
				script.onload = function(){
					callback();
				};
			}
		
			if(script_id){
				document.getElementsByTagName('head')[0].removeChild(script_id);
			}
			document.getElementsByTagName("head")[0].appendChild(script);
		},
		RemoveScript: function(tag_id){
			script_id = document.getElementById(set_tag_id);
			if(script_id){
				document.getElementsByTagName('head')[0].removeChild(script_id);
			}
		},
		AddCss: function(css_filename,set_tag_id,callback){
			var cssNode = document.createElement('link');
			cssNode.rel = 'stylesheet';
			cssNode.type = 'text/css';
			cssNode.media = 'screen';
			cssNode.setAttribute('id', set_tag_id);
			cssNode.href = css_filename+'?t='+new Date().getTime();/*附带时间参数，防止缓存*/
			document.head.appendChild(cssNode);
			callback();
		}
	};
});

//节点操作标签
append.define("NodeTag", [], function() {
	return {
		AddNodeTag: function(father_tag,tag_name,set_tag_id,set_tag_class,set_tag_type,set_tag_src) {
			var doc = document;
			var the_tag = doc.createElement(tag_name);
			the_tag.setAttribute('id', set_tag_id);
			the_tag.setAttribute('class', set_tag_class);
			the_tag.setAttribute('type', set_tag_type);
			the_tag.setAttribute('src', set_tag_src);
			doc.getElementById(father_tag).appendChild(the_tag);
		},
		DelNodeTag:function(){
			
			return type;
		},
		GetTextInNode:function(tag_id){
			return document.getElementById(tag_id)[0].textContent;
		},
		SetTextInNode:function(tag_id,Content){
			return document.getElementById(tag_id).innerHTML = Content;
		}
	};
});
var theNodeTag = append.use("NodeTag");

//获取信息
append.define("get_info", [], function() {
	function get_info_oop(){
		if (typeof get_info_oop._initialized == "undefined") {
			var this_prototype = get_info_oop.prototype;
			this_prototype._method = get_info__method;
			get_info_oop._initialized = true;
		}
		function get_info__method(){}
		
		get_info__method.screen_width = function(){
			return window.screen.width;
		}
		get_info__method.screen_height = function(){
			return window.screen.height;
		}
		get_info__method.platform = function(){
			return navigator.platform;
		}
		get_info__method.get_tag_style = function(id){
			var json_return ={
				"_return":"true",
				"width":0,
				"height":0,
				"scale":0
			};
			if(typeof id == "undefined"){return json_return;}
			json_return.width = document.getElementById(id).clientWidth;
			json_return.height = document.getElementById(id).clientHeight;
			json_return.scale = json_return.width/json_return.height ;
			return json_return;
		}
	}
	
	return get_info_oop;
});

//设置标签样式
append.define("set_style", [], function() {
	function set_style_oop(){
		if (typeof set_style_oop._initialized == "undefined") {
			var this_prototype = set_style_oop.prototype;
			this_prototype._method = set_style_oop__method;
			set_style_oop._initialized = true;
		}
		function set_style_oop__method(){}
		
		set_style_oop__method.set_tag_width_size = function(id,speed,width){
			if(typeof id == "undefined"){return "";}
			
			var $ = document.getElementById(id);
			var Local_json = {
				"speed":1
			};
			if(typeof speed != "undefined"){
				Local_json.speed = Local_json.speed + speed;
			}
			
			if(typeof width != "undefined"){
				var Interval_ID_temp_Width;
				var temp_Width = $.clientWidth;
				if(width > temp_Width){
					Interval_ID_temp_Width = setInterval(function(){
						if(width >= temp_Width){
							temp_Width = temp_Width + Local_json.speed;
							if(temp_Width > width){
								temp_Width = width;
							}
							$.style.width = temp_Width+'px';
						}
						else{
							clearInterval(Interval_ID_temp_Width);
						}
					},1);
				}
				else if(width < temp_Width){
					Interval_ID_temp_Width = setInterval(function(){
						if(width <= temp_Width){
							temp_Width = temp_Width - Local_json.speed;
							if(temp_Width < width){
								temp_Width = width;
							}
							$.style.width = temp_Width+'px';
						}
						else{
							clearInterval(Interval_ID_temp_Width);
						}
					},1);
				}
			}
		}
		set_style_oop__method.set_tag_height_size = function(id,speed,width){
			if(typeof json_var.id == "undefined"){return "";}
			
			var $ = document.getElementById(json_var.id);
			var Local_json = {
				"speed":1
			};
			if(typeof json_var.speed != "undefined"){
				Local_json.speed = Local_json.speed + json_var.speed;
			}
			
			if(typeof json_var.height != "undefined"){
				var Interval_ID_temp_Height;
				var temp_Height = $.clientHeight;
				if(json_var.height > temp_Height){
					Interval_ID_temp_Height = setInterval(function(){
						if(json_var.height >= temp_Height){
							temp_Height = temp_Height + Local_json.speed;
							if(temp_Height > json_var.height){
								temp_Height = json_var.height;
							}
							$.style.height = temp_Height+'px';
						}
						else{
							clearInterval(Interval_ID_temp_Height);
						}
					},1);
				}
				else if(json_var.height < temp_Height){
					Interval_ID_temp_Height = setInterval(function(){
						if(json_var.height <= temp_Height){
							temp_Height = temp_Height - Local_json.speed;
							if(temp_Height < json_var.height){
								temp_Height = json_var.height;
							}
							$.style.height = temp_Height+'px';
						}
						else{
							clearInterval(Interval_ID_temp_Height);
						}
					},1);
				}
			}
		}
	}
	
	return set_style_oop;
});
var set_style = new(append.use("set_style"));

append.define("Global_id", [], function() {
	function Global_id_oop(){
		if (typeof Global_id_oop._initialized == "undefined") {
			var this_prototype = Global_id_oop.prototype;
			this_prototype._method = Global_id_oop__method;
			Global_id_oop._initialized = true;
		}
		var Global_id = -1;
		function Global_id_oop__method(){}
		
		Global_id_oop__method.get_id = function(){++Global_id;return "id_"+Global_id;}
	}
	return Global_id_oop;
});
var G_id = new (append.use("Global_id"));

append.define("KeyboardEven", [], function() {
	function KeyboardEven_oop(){
		if (typeof KeyboardEven_oop._initialized == "undefined") {
			var this_prototype = KeyboardEven_oop.prototype;
			this_prototype._method = KeyboardEven_oop__method;
			KeyboardEven_oop._initialized = true;
		}

		function KeyboardEven_oop__method(){}
		
		this.message_map = new Array();
	}
	
	return KeyboardEven_oop;
});
var KeyboardEven_Action = new (append.use("KeyboardEven"));
