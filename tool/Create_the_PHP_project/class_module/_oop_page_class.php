<?php

class _oop_css_file_class{
	public $config_array;
	public $css_file_name;
	public $css_code_array = array();
	
	public function __construct($config_array,$css_file_name) {
		$this->css_file_name = $css_file_name;
	}
	
	public function __destruct() {
	}
	
	public function push_css_code($code) {
		array_push($this->css_code_array,$code);
	}
	
	public function out_put(){
		
	}
}

class _oop_js_file_class{
	public $config_array;
	public $js_file_name;
	public $js_code_array = array();
	
	public function __construct($config_array,$js_file_name) {
		$this->js_file_name = $js_file_name;
	}
	
	public function __destruct() {
		// print "Destroying\n";
	}
	
	public function push_js_code($code) {
		array_push($this->js_code_array,$code);
	}
	
	public function out_put(){
		
	}
}

class _oop_page_class{
	public $name;
	public $title;
	public $format;
	public $config_array;
	public $language_array = array(
		"template_content" => array(
			"english" => "content",
			"chinese" => "放置页面内容"
		),
		"page_name" => array(
			"english" => "page_name",
			"chinese" => "页面名称"
		),
		"page_description" => array(
			"english" => "put description in here",
			"chinese" => "此处填写页面描述"
		),
	);
	
	public function __construct($input_array) {
		$this->name = $input_array["name"];
		$this->title = $input_array["title"];
		$this->format = $input_array["format"];
		$this->config_array = $input_array["config_array"];//配置信息
	}
	
	public function __destruct() {
	}
	
	public function printf_word($switch_word){
		if(isset($this->language_array[$switch_word])&&
			isset($this->language_array[$switch_word][$this->config_array["language"]])){
			return $this->language_array[$switch_word][$this->config_array["language"]];
		}
		else{
			return "";
		}
	}
		
	public function make_template(){
		return '<html>
	<head><title>'.$this->title.'</title></head>
	<body>
	'.$this->printf_word("template_content").'
	</body>
</html>
		';
	}
	
	public function make_page(){
		
			return '<?php
	//'.$this->printf_word("page_name").':'.$this->name.'
	//创建时间:'.time().'
	//负责人:___________________
	
	class _oop_this_page_template{
		public $charset = "utf-8";
		public $title = \''.$this->title.'\';
		public $key_word_array = array();
		public $description = \''.$this->printf_word("page_description").'\';
		public $page_head = "";
		public $page_foot = "";
		
		public function page_include_module(){
			include("module/_oop_config_class.php");			//加载配置文件
		}
		
		public function page_define(){
			define(\'CACHE_TIME\', 40);
			define(\'CACHE_FILENAME\', "'.$this->config_array["project_cache_path_name"].'/'.$this->name.'.html");//设置缓存文件路径
		}
		
		//构造函数
		public function __construct() {
			$this->page_include_module();
			$this->page_define();
			if(file_exists(CACHE_FILENAME)&&(filemtime(CACHE_FILENAME)+CACHE_TIME>time())){echo file_get_contents(CACHE_FILENAME);exit;}
			ob_start();
			include("'.$this->config_array["project_template_path_name"].'/'.$this->name.'.php");
			$content = ob_get_contents();
			ob_end_clean();
			file_put_contents(CACHE_FILENAME, $content);
		}
		
		//析构函数
		public function __destruct() {
			echo $content;
		}
		
		public function page_show(){
			
		}
	}
	$page_show = new _oop_this_page_template();
	
?>
	';
		}
}
?>