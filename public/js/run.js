var jsfile = new Array();
jsfile.push("js/HtmlDocument");
jsfile.push("js/main_index_menu");
jsfile.push("js/people");
jsfile.push("js/login");
jsfile.push("js/DialogWindow");
jsfile.push("js/canvas");
append.require(jsfile,function(){});

function show(id, path) {
    var now = new Date();
    var number = now.getSeconds();
    path = path + "?temp=" + number;
    console.log(id, path);
    $("#"+id).load(path);
}

function location_center(ele_id){
	$("#"+ele_id).css("left",($("body").width()-$("#"+ele_id).width())/2+"px");
}

//动态生成的事件
var alleven = "";

//地图句柄
var map_handle;

var Location_in_this_map = [
    {
        "name": "mapiframeBlock1",
        "load": false,
        "top": 0,
        "left": 0,
        "show": "child_page/1.html"
    },
    {
        "name": "mapiframeBlock2",
        "load": false,
        "top": -1,
        "left": 0,
        "show": "child_page/2.html"
    },
    {
        "name": "mapiframeBlock3",
        "load": false,
        "top": -2,
        "left": 0,
        "show": "child_page/3.html"
	},
    {
        "name": "mapiframeBlock4",
        "load": false,
        "top": -3,
        "left": 0,
        "show": "child_page/4.html"
    },
	{
        "name": "mapiframeBlock5",
        "load": false,
        "top": -4,
        "left": 0,
        "show": "child_page/5.html"
    }
];
var Location_in_this_map_count = 0;


window.onmousewheel=function(){return false}

function run_code(){
	$(window).load(function(){
		document.getElementById("windowbody").innerHTML = "";
		$(document).attr('title','汇投汇贷互联网金融服务');
		var this_windows = new (append.use("HtmlDocument"));
		this_windows._method.window_css_init();//全局样式初始化
		this_windows._method.set_waitting("#9cfff2");//设置幕布
		map_handle = this_windows._method.window_map_init(5,1,"#","#ffffff");//地图初始化
		/*
		var set_menu = new (append.use("DialogWindow"));
		var button_array = new Array();
		button_array.push(set_menu._method.put("菜单(M)","菜单<br/>(如果菜单列表过长，可以按住向下方向键)",
			"<a href=\"#\" onclick=\"which_mapiframeBlock(Location_in_this_map[0]);\">"+
				"<div class=\"panel panel-primary\" data-dismiss='modal'><div class=\"panel-body\">汇投汇贷</div></div>"+
			"</a>"+
			"<a href=\"#\" onclick=\"which_mapiframeBlock(Location_in_this_map[1]);\">"+
				"<div class=\"panel panel-primary\" data-dismiss='modal'><div class=\"panel-body\">首页</div></div>"+
			"</a>"+
			"<a href=\"#\" onclick=\"which_mapiframeBlock(Location_in_this_map[2]);\">"+
				"<div class=\"panel panel-primary\" data-dismiss='modal'><div class=\"panel-body\">匠人的故事</div></div>"+
			"</a>"+
			"<a href=\"#\" onclick=\"which_mapiframeBlock(Location_in_this_map[3]);\">"+
				"<div class=\"panel panel-primary\" data-dismiss='modal'><div class=\"panel-body\">匠人糖品</div></div>" +
			"</a>"+
			"<a href=\"#\" onclick=\"which_mapiframeBlock(Location_in_this_map[4]);\">"+
				"<div class=\"panel panel-primary\" data-dismiss='modal'><div class=\"panel-body\">英雄联盟</div></div>" +
			"</a>"));
		var this_main_index_menu = new (append.use("main_index_menu"));//实例化菜单
		var this_main_index_menu_id = this_main_index_menu._method.set_main_menu("52px");//创建菜单，并取得id
		this_main_index_menu._method.set_button(this_main_index_menu_id,button_array);//显示菜单
		*/
		
		var theNodeTag = append.use("NodeTag");
		var set_style = new(append.use("set_style"));
		var menu_id = "menu_"+G_id._method.get_id();
		theNodeTag.AddNodeTag("windowbody","img",""+menu_id,""+menu_id,"","img/down.png");//大字体
		$("#"+menu_id).css("position","absolute");
		$("#"+menu_id).css("z-index","2000");
		$("#"+menu_id).css("height","100px");
		$("#"+menu_id).css("width","102px");
		$("#"+menu_id).css("bottom","20px");
		$("#"+menu_id).css("right","20px");
		$("#"+menu_id).click(function(){
			++Location_in_this_map_count;
			if(Location_in_this_map.length == Location_in_this_map_count){
				Location_in_this_map_count = 0;
			}
			//console.log(Location_in_this_map_count);
			which_mapiframeBlock(Location_in_this_map[Location_in_this_map_count]);
		});

		// var this_canvas = new (append.use("canvas"));
		// this_canvas._method.init(map_handle);
		// this_canvas._method.draw3D(map_handle["canvasmap_bg"]);
		
		// var the_Protagonist = new (append.use("people"));
		// the_Protagonist._method.people_init("#","PeopleRole","PeopleRole");
		// the_Protagonist._method.Protagonist_move_ctrl(100,40,40);
		// the_Protagonist._method.Protagonist_move(0,0,0,map_handle);
		
		this_windows._method.finish();
		var keylock = 0;
		$(document).keydown(function(event){
			if(typeof KeyboardEven_Action.message_map[event.keyCode] != "undefined"){
				if(keylock == 0){
					console.log(event.keyCode);
					keylock = 1;
					KeyboardEven_Action.message_map[event.keyCode]();
					keylock = 0;
				}
			}
			else{
				console.log(event.keyCode);
			}
		});
		which_mapiframeBlock(Location_in_this_map[0]);
		eval(alleven);
	});
	$(window).resize(function(){window.location.reload();});
}
function which_mapiframeBlock(in_id){
	// console.log(in_id.load);
	if(typeof in_id == "undefined") {
		console.log("undefined");
		return ;
	}
	$("#"+map_handle["handle"]).animate({top:(in_id.top*$("body").height())+"px"},function(){
		$("#"+map_handle["handle"]).animate({left:(in_id.left*$("body").width())+"px"},function(){
			if ( in_id["load"] == false) {
				in_id["load"] = true;
				var theNodeTag = append.use("NodeTag");
                if (typeof in_id["show"] != "undefined" ) {
                    var this_id = G_id._method.get_id();
                    show(in_id["name"], in_id["show"]);
                }

			}
		});
	});

	$("#"+map_handle["canvas_map_iframe"]).animate({top:(in_id.top*$("body").height())+"px"},function(){
		$("#"+map_handle["canvas_map_iframe"]).animate({left:(in_id.left*$("body").width())+"px"},function(){
		});
	});
}