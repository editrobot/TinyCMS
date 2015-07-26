append.define("upload", [], function() {
	function upload_oop(){
		if (typeof upload_oop._initialized == "undefined") {
			var this_prototype = upload_oop.prototype;
			this_prototype._method = upload_oop__method;
			upload_oop._initialized = true;
		}
		function upload_oop__method(){}
		
		upload_oop__method.run = function(input_id,upload_link){
			
			var input = document.getElementById(input_id);
			var formdata = false;
			
			if (window.FormData) {//如果浏览器不支持FormData，隐藏按钮
				formdata = new FormData();
				document.getElementById("btn").style.display = "none";
			}
			
			input.addEventListener("change", function (evt) {//监听上传框的change事件
				
				//资料上传前的逻辑区块
				
				var i = 0;
				var len = this.files.length;
				var reader;
				var file;
				
				for ( ; i < len; i++ ) {//遍历文件
					file = this.files[i];
					
					if (!!file.type.match(/image.*/)) {//文件类型为图片
					
						if ( window.FileReader ) {//浏览器支持FileReader对象
							reader = new FileReader();
							
							reader.onloadend = function (e) {//监听文件读取结束后事件
								
							};
							
							reader.readAsDataURL(file);//读取文件
						}
						if (formdata) { //将文件数据添加到FormData对象内
							formdata.append("images[]", file);
						}
					}
				}
				//发送ajax请求，存储文件（传递FormData对象过去）
				if (formdata) {
					$.ajax({
						url: upload_link,
						type: "POST",
						data: formdata,
						processData: false,
						contentType: false,
						success: function (res) {
							//将上传成功后的逻辑
						}
					});
				}
			}, false);
		}
		
		upload_oop__method.init = function(to,input_name,input_id){
			document.getElementById(to).innerHTML = "<form method='post' enctype='multipart/form-data'>"+
				"<input type='file' name='"+input_name+"' id='"+input_id+"' multiple />"+
				"<button type='submit' id='btn'>上传</button>"+
    		"</form>";
		}
	}
	
	return upload_oop;
});