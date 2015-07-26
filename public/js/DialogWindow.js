//生成一个包含弹窗的按钮
append.define("DialogWindow", [], function() {
	function DialogWindow_oop(){
		if (typeof DialogWindow_oop._initialized == "undefined") {
			var this_prototype = DialogWindow_oop.prototype;
			this_prototype._method = DialogWindow_oop__method;
			DialogWindow_oop._initialized = true;
		}
		function DialogWindow_oop__method(){}
		
		DialogWindow_oop__method.put = function(button_text,DialogWindow_title,DialogWindow_body){
			var theNodeTag = append.use("NodeTag");
			var button_id = G_id._method.get_id();
			var temp_text = "<a data-toggle='modal' data-target='#"+button_id+"' href=\"#\">"+button_text+"</a>"+
			"<div class='modal fade' id='"+button_id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>"+
				"<div class='modal-dialog' style='margin-top: 100px;'>"+
				"<div class='modal-content'>"+
					"<div class='modal-header'>"+
						"<button type='button' class='close' data-dismiss='modal'>"+
						"<span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>"+
						"<h4 class='modal-title' id='myModalLabel' style='color:#000000;'>"+DialogWindow_title+"</h4>"+
					"</div>"+
					"<div class='modal-body'>"+DialogWindow_body+"</div>"+
					"<div class='modal-footer'>"+
						"<button type='button' class='btn btn-default' data-dismiss='modal'>关闭</button>"+
					"</div>"+
				"</div>"+
				"</div>"+
			"</div>";
			return temp_text;
		}
	}
	return DialogWindow_oop;
});