append.define("people", [], function() {
	function people_oop(){
		if (typeof people_oop._initialized == "undefined") {
			var this_prototype = people_oop.prototype;
			this_prototype._method = people_oop__method;
			people_oop._initialized = true;
		}
		var oTempVar = new Object;
		oTempVar.x = 0;
		oTempVar.y = 0;
		oTempVar.z = 0;
		oTempVar.speed = 100;
		
		function people_oop__method(){}
		
		people_oop__method.people_init = function(img,set_id,set_class){//人物节点初始化

			var theNodeTag = append.use("NodeTag");
			theNodeTag.AddNodeTag("windowbody","div",set_id,set_class,"");
			theNodeTag.SetTextInNode(set_id,"<div style='color:#ffffff;margin:4px auto;'><span class='glyphicon glyphicon-user'></span></div>");
			$("#"+set_id).css("width","30px");
			$("#"+set_id).css("height","30px");
			
			$("#"+set_id).css("position","absolute");
			$("#"+set_id).css("z-index","3");
			
			$("#"+set_id).css("top",($("body").height()-$("#"+set_id).height())/2+"px");
			$("#"+set_id).css("left",($("body").width()-$("#"+set_id).width())/2+"px");
			
			$("#"+set_id).css("filter","alpha(opacity=100)");
			$("#"+set_id).css("-moz-opacity","1");
			$("#"+set_id).css("opacity","1");
			
			$("#"+set_id).css("text-align","center");
			$("#"+set_id).css("background-color","#4b3633");
		}
		
		//人物向上移动
		people_oop__method.Protagonist_move_top = function(map_id){
			var top_bottom_px = parseInt($("#"+map_id["handle"]).css("top").replace(/px/,""));
			$("#"+map_id["handle"]).animate({top:top_bottom_px+oTempVar.speed+"px"});
			$("#"+map_id["canvas_map_iframe"]).animate({top:top_bottom_px+oTempVar.speed+"px"});
		}
		
		//人物向下移动
		people_oop__method.Protagonist_move_bottom = function(map_id){
			var top_bottom_px = parseInt($("#"+map_id["handle"]).css("top").replace(/px/,""));
			$("#"+map_id["handle"]).animate({top:top_bottom_px-oTempVar.speed+"px"});
			$("#"+map_id["canvas_map_iframe"]).animate({top:top_bottom_px-oTempVar.speed+"px"});
		}
		
		//人物向左移动
		people_oop__method.Protagonist_move_left = function(map_id){
			var left_right_px = parseInt($("#"+map_id["handle"]).css("left").replace(/px/,""));
			$("#"+map_id["handle"]).animate({left:left_right_px+oTempVar.speed+"px"});
			$("#"+map_id["canvas_map_iframe"]).animate({left:left_right_px+oTempVar.speed+"px"});
		}
		
		//人物向右移动
		people_oop__method.Protagonist_move_right = function(map_id){
			var left_right_px = parseInt($("#"+map_id["handle"]).css("left").replace(/px/,""));
			$("#"+map_id["handle"]).animate({left:left_right_px-oTempVar.speed+"px"});
			$("#"+map_id["canvas_map_iframe"]).animate({left:left_right_px-oTempVar.speed+"px"});
		}
		
		//移动主角
		people_oop__method.Protagonist_move = function(x,y,z,map_id){
			KeyboardEven_Action.message_map[38] = function(){
				people_oop__method.Protagonist_move_top(map_id);
			}
			KeyboardEven_Action.message_map[40] = function(){
				people_oop__method.Protagonist_move_bottom(map_id);
			}
			KeyboardEven_Action.message_map[37] = function(){
				people_oop__method.Protagonist_move_left(map_id);
			}
			KeyboardEven_Action.message_map[39] = function(){
				people_oop__method.Protagonist_move_right(map_id);
			}
		}
		
		people_oop__method.Protagonist_move_ctrl = function(size_px,x,y){ //生成主角移动控制面板
			var button_size = size_px/3;
			
			var theNodeTag = append.use("NodeTag");
			var theNodeTag_set_style = append.use("set_style");
			
			theNodeTag.AddNodeTag("windowbody","div","Protagonist_move_ctrl_left","Protagonist_move_ctrl","");
			$("#Protagonist_move_ctrl_left").css("bottom",y+button_size+"px");
			$("#Protagonist_move_ctrl_left").css("left",x+"px");
			theNodeTag.SetTextInNode("Protagonist_move_ctrl_left","<div style='color:#ffffff;margin:4px auto;'><span class='glyphicon glyphicon-arrow-left'></span></div>");
			
			theNodeTag.AddNodeTag("windowbody","div","Protagonist_move_ctrl_top","Protagonist_move_ctrl","");
			$("#Protagonist_move_ctrl_top").css("bottom",y+button_size+button_size+"px");
			$("#Protagonist_move_ctrl_top").css("left",x+button_size+"px");
			theNodeTag.SetTextInNode("Protagonist_move_ctrl_top","<div style='color:#ffffff;margin:4px auto;'><span class='glyphicon glyphicon-arrow-up'></span></div>");
			
			theNodeTag.AddNodeTag("windowbody","div","Protagonist_move_ctrl_right","Protagonist_move_ctrl","");
			$("#Protagonist_move_ctrl_right").css("bottom",y+button_size+"px");
			$("#Protagonist_move_ctrl_right").css("left",x+button_size+button_size+"px");
			theNodeTag.SetTextInNode("Protagonist_move_ctrl_right","<div style='color:#ffffff;margin:4px auto;'><span class='glyphicon glyphicon-arrow-right'></span></div>");
			
			theNodeTag.AddNodeTag("windowbody","div","Protagonist_move_ctrl_bottom","Protagonist_move_ctrl","");
			$("#Protagonist_move_ctrl_bottom").css("bottom",y+"px");
			$("#Protagonist_move_ctrl_bottom").css("left",x+button_size+"px");
			theNodeTag.SetTextInNode("Protagonist_move_ctrl_bottom","<div style='color:#ffffff;margin:4px auto;'><span class='glyphicon glyphicon-arrow-down'></span></div>");
			
			theNodeTag_set_style._method.set_tag_class_shadow("Protagonist_move_ctrl","#808080");
			
			$(".Protagonist_move_ctrl").css("filter","alpha(opacity=90)");
			$(".Protagonist_move_ctrl").css("-moz-opacity","0.9");
			$(".Protagonist_move_ctrl").css("opacity","0.9");
			$(".Protagonist_move_ctrl").css("text-align","center");
			$(".Protagonist_move_ctrl").css("color","#ffffff");
			$(".Protagonist_move_ctrl").css("position","absolute");
			$(".Protagonist_move_ctrl").css("z-index","3");
			$(".Protagonist_move_ctrl").css("background-color","#4b3633");
			$(".Protagonist_move_ctrl").css("width",button_size+"px");
			$(".Protagonist_move_ctrl").css("height",button_size+"px");
			
			alleven = alleven+"$('#Protagonist_move_ctrl_left').click(function(){"+
								"the_Protagonist._method.Protagonist_move_left(map_handle);});";
			alleven = alleven+"$('#Protagonist_move_ctrl_top').click(function(){"+
								"the_Protagonist._method.Protagonist_move_top(map_handle);});";
			alleven = alleven+"$('#Protagonist_move_ctrl_right').click(function(){"+
								"the_Protagonist._method.Protagonist_move_right(map_handle);});";
			alleven = alleven+"$('#Protagonist_move_ctrl_bottom').click(function(){"+
								"the_Protagonist._method.Protagonist_move_bottom(map_handle);});";
			
		}
	}
	
	return people_oop;
});

