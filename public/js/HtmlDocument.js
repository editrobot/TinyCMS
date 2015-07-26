append.define("HtmlDocument", [], function() {
	function HtmlDocument_oop(){
		if (typeof HtmlDocument_oop._initialized == "undefined") {
			var this_prototype = HtmlDocument_oop.prototype;
			this_prototype._method = HtmlDocument_oop__method;
			HtmlDocument_oop._initialized = true;
		}
		var map_table = [
			[0],
			[0],
			[0],
			[0],
			[0]
		];
		function HtmlDocument_oop__method(){}
		
		HtmlDocument_oop__method.window_css_init = function(){//全局css设置
			$("*").css("margin","0px");
			$("*").css("padding","0px");

			$("html").css("font-family","'Tangerine'");
			$("html").css("margin","0px");
			$("html").css("overflow","hidden");
			$("html").css("width","100%");
			$("html").css("height","100%");

			$("body").css("font-family","Georgia, serif");
			$("body").css("margin","0px");
			$("body").css("overflow","hidden");
			$("body").css("width","100%");
			$("body").css("height","100%");
		}
		
		HtmlDocument_oop__method.set_waitting = function(BackgroundColor){//设置幕布
			var theNodeTag = append.use("NodeTag");
			theNodeTag.AddNodeTag("windowbody","div","waitting","waitting","");
			$(".waitting").css("position","absolute");
			$(".waitting").css("z-index","3000");
			$(".waitting").css("bottom","0px");
			$(".waitting").css("left","0px");
			$(".waitting").css("top","0px");
			$(".waitting").css("width","100%");
			$(".waitting").css("height","100%");
			$(".waitting").css("filter","alpha(opacity=80)");
			$(".waitting").css("-moz-opacity","0.8");
			$(".waitting").css("opacity","0.8");
			$(".waitting").css("text-align","center");
			$(".waitting").css("background-color",BackgroundColor);
		}
		
		HtmlDocument_oop__method.window_map_init = function(map_width_size,map_height_size,BackgroundImage,BackgroundColor){//地图初始化
			var theNodeTag = append.use("NodeTag");
				var Virtual_body = G_id._method.get_id();
				var content_div = G_id._method.get_id();
				var canvas_map_iframe = G_id._method.get_id();
				var canvasmap_bg = G_id._method.get_id();
				
				theNodeTag.AddNodeTag("windowbody","div",Virtual_body,Virtual_body,"");//创建主容器
				$("#"+Virtual_body).css("width",map_table[0].length*$("body").width()+"px");
				$("#"+Virtual_body).css("height",map_table.length*$("body").height()+"px");
				$("#"+Virtual_body).css("overflow","hidden");
				$("#"+Virtual_body).css("position","fixed");
				$("#"+Virtual_body).css("top","0px");
				$("#"+Virtual_body).css("left","0px");
				$("#"+Virtual_body).css("z-index","0");
				
				theNodeTag.AddNodeTag(Virtual_body,"div",content_div,content_div,"");
				$("#"+content_div).css("position","absolute");
				$("#"+content_div).css("z-index","2");
				$("#"+content_div).css("margin","0px");
				$("#"+content_div).css("padding","0px");
				$("#"+content_div).css("width",map_table[0].length*$("body").width()+"px");
				$("#"+content_div).css("height",map_table.length*$("body").height()+"px");
				$("#"+content_div).css("left","0px");
				$("#"+content_div).css("top","0px");
				$("#"+content_div).css("background-color",BackgroundColor);
				
					theNodeTag.AddNodeTag(content_div,"ul","mapiframe","mapiframe","");
					$("#"+content_div+" ul").css("list-style-type","none");
					$("#"+content_div+" ul").css("text-align","center");
					$("#"+content_div+" ul").css("margin","0px");
					$("#"+content_div+" ul").css("padding","0px");
					
					var BlockS_height = $("#"+content_div).height()/map_table.length;
					var BlockS_width = $("#"+content_div).width()/map_table[0].length;
					mapiframeBlockMax = map_table.length*map_table[0].length;
					
					for (var mapiframeBlock_id = 1; mapiframeBlock_id <= mapiframeBlockMax; mapiframeBlock_id++){
					    theNodeTag.AddNodeTag("mapiframe", "li", "mapiframeBlock" + mapiframeBlock_id, "mapiframeBlock", "");
					}
					$("#"+content_div+" .mapiframeBlock").css("height",BlockS_height+"px");
					$("#"+content_div+" .mapiframeBlock").css("width",BlockS_width+"px");
					$("#"+content_div+" .mapiframeBlock").css("margin","0px");
					$("#"+content_div+" .mapiframeBlock").css("padding","0px");
					$("#"+content_div+" .mapiframeBlock").css("float","left");
					$("#"+content_div+" .mapiframeBlock").css("text-align","center");
					$("#"+content_div+" .mapiframeBlock").css("overflow","auto");
				
				theNodeTag.AddNodeTag(Virtual_body,"div",canvas_map_iframe,canvas_map_iframe,"");
				$("#"+canvas_map_iframe).css("position","absolute");
				$("#"+canvas_map_iframe).css("z-index","1");
				$("#"+canvas_map_iframe).css("margin","0px");
				$("#"+canvas_map_iframe).css("padding","0px");
				$("#"+canvas_map_iframe).css("width",map_table[0].length*$("body").width()+"px");
				$("#"+canvas_map_iframe).css("height",map_table.length*$("body").height()+"px");
				$("#"+canvas_map_iframe).css("left","0px");
				$("#"+canvas_map_iframe).css("top","0px");
                if ((typeof BackgroundImage != "undefined")||(BackgroundImage == "#")) {
                    $("#"+canvas_map_iframe).css("background-image","url(\""+BackgroundImage+"\")");
                }
				$("#"+canvas_map_iframe).css("background-size",map_table[0].length*$("body").width()+"px "+map_table.length*$("body").height()+"px");
				
				document.getElementById(canvas_map_iframe).innerHTML = "<canvas id='"+canvasmap_bg+"' width='"+map_table[0].length*$("body").width()+"' height='"+map_table.length*$("body").height()+"'></canvas>";
				
			return {
				"body_id" : "windowbody" ,
				"Virtual_body" : Virtual_body ,
				"canvas_map_iframe" : canvas_map_iframe ,
				"canvasmap_bg" : canvasmap_bg ,
				"handle" : content_div ,
				"BlockS_height" : BlockS_height ,
				"BlockS_width" : BlockS_width
			};
		}
		
		HtmlDocument_oop__method.finish = function(){
			$("#waitting").animate({"top":"-"+$("body").height()+"px"},300,function(){});
		}
		
	}
	
	return HtmlDocument_oop;
});