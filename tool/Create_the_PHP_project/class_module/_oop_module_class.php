<?php

class _oop_module_attribute_class{
	public $variable_name;
	public $type;
	public $init;
	public $visibility;
	public $definition_attribute_code = "";
	public $definition_set_attribute_code = "";
	
	public function __construct($input_array){
		$this->variable_name = (isset($input_array["variable_name"]))?$input_array["variable_name"]:"default";
		$this->type = (isset($input_array["type"]))?$input_array["type"]:"string";
		$this->init = (isset($input_array["init"]))?$input_array["init"]:"";
		$this->visibility = (isset($input_array["visibility"]))?$input_array["visibility"]:"public";
		$this->definition_attribute_code = '
	'.$this->visibility.' $'.$this->variable_name.';';
		$this->definition_set_attribute_code = '
	public function set_'.$this->variable_name.'(){
		$this->'.$this->variable_name.' = $'.$this->variable_name.';
	}';
	}
	
	public function __destruct(){
		
	}
}

class _oop_module_function_class{
	public $function_name;
	public $input_variable = array();
	public $visibility;
	public $php_code = "";
	
	public function __construct($input_array){
		$this->function_name = (isset($input_array["function_name"]))?$input_array["function_name"]:"default";
		$this->input_variable = (isset($input_array["input_variable"]))?$input_array["input_variable"]:array();
		
		$this->visibility = (isset($input_array["visibility"]))?$input_array["visibility"]:"public";
		$this->php_code = '

	'.$this->visibility.' function method_'.$this->function_name.'('.
		'$'.implode(',$',$this->input_variable).
		')'.
		'{
			
	}
';
	}
	
	public function __destruct(){
		
	}
}

class _oop_module_class{
		public $class_name;
		public $format;
		public $attribute_array = array();
		public $methods_array = array();
		public $contents_array = array();
		
		public function __construct($input_array) {
			$this->class_name = $input_array["class_name"];
			$this->format = $input_array["format"];
			$this->attribute_array = $input_array["attribute_array"];
			$this->methods_array = $input_array["methods_array"];
			
			foreach($this->attribute_array as &$value){
				array_push($this->contents_array,$value->definition_attribute_code);
			}
			
			foreach($this->attribute_array as &$value){
				array_push($this->contents_array,$value->definition_set_attribute_code);
			}
			
			foreach($this->methods_array as &$value){
				array_push($this->contents_array,$value->php_code);
			}
		}
		
		public function __destruct() {
			// print "Destroying\n";
		}
		
		public function make_class(){
			return '<?php
//修改该模块的负责人：_________________
class _oop_'.$this->class_name.'_class {	
	//类的方法
	//构造函数
	public function __construct($class_name) {
	}
	
	//析构函数
	public function __destruct() {
	}
	
	'.implode('',$this->contents_array).'
}
?>';
		}
}
?>