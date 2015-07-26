append.define("test", [], function() {
	function test_oop(){
		if (typeof test_oop._initialized == "undefined") {
			var this_prototype = test_oop.prototype;
			this_prototype._method = test_oop__method;
			test_oop._initialized = true;
		}
		function test_oop__method(){}
		
		test_oop__method.test_run = function(){
			alert("test");
		}
	}
	
	return test_oop;
});