<?php
class _oop_readme_class{
	public $config_array;
	public $language_array = array(
		"the_document" => array(
			"english" => "The document",
			"chinese" => "开发文档"
		),
		"page_file_name" => array(
			"english" => "page file name",
			"chinese" => "页面文件名"
		),
		"page_file_title" => array(
			"english" => "page file title",
			"chinese" => "页面标题"
		),
		"class_name" => array(
			"english" => "class name",
			"chinese" => "模块名称"
		)
	);
	public $readme_title;
	public $page_list_array = array();
	public $module_list_array = array();
	
	public function __construct($input_array) {
		$this->config_array = $input_array;//配置信息
	}
	
	public function __destruct() {
		// print "Destroying\n";
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

	
	public function set_readme_title($readme_title){
		$this->readme_title = $readme_title;
	}
	
	public function push_page_info($page_class){
		
		array_push($this->page_list_array,'
'.$this->printf_word("page_file_name").':'.$page_class->name.'.php
'.$this->printf_word("page_file_title").':'.$page_class->title
		);
	}
	
	public function push_module_info($module_class){
		array_push($this->module_list_array,'
'.$this->printf_word("class_name").':'.$module_class->class_name.'.php'
		);
	}
	
	public function out_put(){
		return $this->printf_word("the_document").'
'.implode('
',$this->page_list_array).'
'.implode('
',$this->module_list_array);
	}
}
?>