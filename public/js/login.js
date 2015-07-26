append.define("login", [], function() {
	function login_oop(){
		if (typeof login_oop._initialized == "undefined") {
			var this_prototype = login_oop.prototype;
			this_prototype._method = login_oop__method;
			login_oop._initialized = true;
		}
		function login_oop__method(){}
		
		login_oop__method.login_windows_init = function(post_url){
			alleven = alleven + "$('#login_button').click(function(){"+
									"$.post('index.html',{username:'123@qq.com',password: ''},"+
									"function(data,status){"+
								"});});";
			return "<div role='form' style='text-align:left;'>"+
					"<div class='form-group'>"+
					"<label for='username'>帐号:</label>"+
					"<input type='email' class='form-control' id='username' placeholder='请输入用户名(邮箱)......'>"+
					"</div>"+
					"<div class='form-group'>"+
					"<label for='password'>密码:</label>"+
					"<input type='password' class='form-control' id='password' placeholder='请输入密码......'>"+
					"</div>"+
					"<div class='form-group'>"+
					"<label for='VerificationCode'><img src='#' style='width:100px;height:50px;'/></label>"+
					"<input type='text' class='form-control' id='VerificationCode' placeholder='请输入验证码......'>"+
					"</div>"+
					"<button class='btn btn-default' id='login_button'>登录</button></div>";
		}
	}
	
	return login_oop;
});