append.define("main_index_menu", [], function() {
	function main_index_menu_oop(){
		if (typeof main_index_menu_oop._initialized == "undefined") {
			var this_prototype = main_index_menu_oop.prototype;
			this_prototype._method = main_index_menu_oop__method;
			main_index_menu_oop._initialized = true;
		}
		function main_index_menu_oop__method(){}
		
		main_index_menu_oop__method.set_main_menu = function(main_menu_height){//全局菜单css设置
			var theNodeTag = append.use("NodeTag");
			var theNodeTag_set_style = new(append.use("set_style"));
			var this_id = G_id._method.get_id();
			var Transparent = 0.9;
			theNodeTag.AddNodeTag("windowbody","div","main_index_menu"+this_id,"main_index_menu"+this_id,"");//创建菜单栏目
			$("#main_index_menu"+this_id).css("position","absolute");
			$("#main_index_menu"+this_id).css("z-index","2000");
			$("#main_index_menu"+this_id).css("top","-"+main_menu_height);
			$("#main_index_menu"+this_id).css("left","0px");
			$("#main_index_menu"+this_id).css("width","100%");
			$("#main_index_menu"+this_id).css("height",main_menu_height);
			$("#main_index_menu"+this_id).css("filter","alpha(opacity="+(Transparent*100)+")");
			$("#main_index_menu"+this_id).css("-moz-opacity",Transparent);
			$("#main_index_menu"+this_id).css("opacity",Transparent);
			$("#main_index_menu"+this_id).css("text-align","center");
			// $("#main_index_menu"+this_id).css("color","#ffffff");
			$("#main_index_menu"+this_id).css("background-color","#ffffff");
			$("#main_index_menu"+this_id).css("background-image","url(img/bg.png)");
			
			theNodeTag.AddNodeTag("windowbody","div","main_index_menu_c"+this_id,"main_index_menu_c"+this_id,"");
			$("#main_index_menu_c"+this_id).css("position","absolute");
			$("#main_index_menu_c"+this_id).css("z-index","2000");
			$("#main_index_menu_c"+this_id).css("top","0px");

			$("#main_index_menu_c"+this_id).css("left",(($("body").width()-$("#main_index_menu_c"+this_id).width())/2)+"px");
			$("#main_index_menu_c"+this_id).css("width","83px");
			$("#main_index_menu_c"+this_id).css("height","63px");
			$("#main_index_menu_c"+this_id).css("filter","alpha(opacity="+(Transparent*100)+")");
			$("#main_index_menu_c"+this_id).css("-moz-opacity",Transparent);
			$("#main_index_menu_c"+this_id).css("opacity",Transparent);
			$("#main_index_menu_c"+this_id).css("text-align","center");
			//$("#main_index_menu_c"+this_id).css("background-color","#ff0000");
			theNodeTag.SetTextInNode("main_index_menu_c"+this_id,"<a href=\"javascript:void(0);\" style=\"color:#ffffff;\"><img id=\"main_index_menu_c_img\" src=\"img/logomini.png\" /></a>");
			
			alleven = alleven+"$('#main_index_menu"+this_id+"').click(function(){"+
									"$('#main_index_menu"+this_id+"').animate({top:'-"+main_menu_height+"'});"+
									"$('#main_index_menu_c"+this_id+"').animate({top:'0px'});});";
									
			alleven = alleven+"$('#main_index_menu_c"+this_id+"').click(function(){"+
									"$('#main_index_menu"+this_id+"').animate({top:'0px'});"+
									"$('#main_index_menu_c"+this_id+"').animate({top:'"+main_menu_height+"'});});";
									
			theNodeTag_set_style._method.set_tag_shadow("main_index_menu"+this_id,"#000000");
			
			KeyboardEven_Action.message_map[77] = function(){
				$("#main_index_menu"+this_id).animate({top:"0px"});
				$("#main_index_menu_c"+this_id).animate({top:main_menu_height});
			}
			var main_menu_iframe = G_id._method.get_id();
			theNodeTag.SetTextInNode("main_index_menu"+this_id,"<nav class='navbar navbar-default' style='margin:0px;border:0px;height: 52px;' role='navigation'><div class='container-fluid'><div class='navbar-header'><a class='navbar-brand' href='#' style=\"color:#ff0000;\">茶糖匠</a><ul id='"+main_menu_iframe+"' class='nav navbar-nav'></ul></div></div></nav>");
			return main_menu_iframe;
		}
		
		main_index_menu_oop__method.set_button = function(menu_id,json_format){//设置按钮
			var theNodeTag = append.use("NodeTag");
			
			var button_id;
			var onclick_jscode;
			
			var col_number_max = json_format.length;
			var col_md_var = 12/col_number_max;
			for(var col_id = 0;col_id < col_number_max;col_id++){
				button_id = G_id._method.get_id();
				if(typeof json_format[col_id].onclick_jscode != "undefined"){
					onclick_jscode = json_format[col_id].onclick_jscode
				}
				theNodeTag.AddNodeTag(menu_id,"li",button_id,"","");//创建菜单栏目
				theNodeTag.SetTextInNode(button_id,json_format[col_id]);
				
			}
		}
		
	}
	
	return main_index_menu_oop;
});


