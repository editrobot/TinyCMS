<?php
class _oop_mysql_db_table_class{
	public $db_table_name = "";
	public $PRIMARY_KEY = "";
	public $AUTO_INCREMENT_INIT = "-1";
	public $table_members_array = array();
	public $ENGINE = "MyISAM";
	public $table_sql = "";
	public $module_ctrl_sql_array = array();
	
	public function __construct($db_table_info_array, $members) {
		$this->db_table_name = $db_table_info_array["db_table_name"];
		$this->PRIMARY_KEY = (isset($db_table_info_array["PRIMARY_KEY"]))?$db_table_info_array["PRIMARY_KEY"]:"";
		$this->AUTO_INCREMENT_INIT = (isset($db_table_info_array["AUTO_INCREMENT_INIT"]))?$db_table_info_array["AUTO_INCREMENT_INIT"]:"-1";
		$this->table_members_array = $members;
		$this->creat_table();
		$this->creat_table_method();
		// $this->printf_table_info();
	}
	
	public function __destruct() {
	}
	
	public function printf_table_info(){
		echo '<br/>';
		echo 'db_table_name:'.$this->db_table_name;
		echo '<br/>';
		echo 'PRIMARY_KEY:'.$this->PRIMARY_KEY;
		echo '<br/>';
		print_r($this->table_members_array);
		echo '<br/>';
		echo 'sql_code:<br/>';
		echo $this->table_sql;
	}
	
	public function creat_table(){
		$key_array = array();
		$temp = 'DROP TABLE IF EXISTS '.$this->db_table_name.';';
		$temp = $temp.'
		CREATE TABLE '.$this->db_table_name.' (
		';
		foreach($this->table_members_array as &$value){
			array_push($key_array, $value["key"].' '.$value["var_format"].' '.$value["NULL"].' '.$value["AUTO_INCREMENT"]);
		}
		$temp = $temp.implode(',
		',$key_array);
		if($this->PRIMARY_KEY != ""){
			$temp = $temp.',PRIMARY KEY ('.$this->PRIMARY_KEY.')';
		}
		$temp = $temp.'
		)
		';
		
		$temp = $temp.'ENGINE='.$this->ENGINE.' DEFAULT CHARACTER SET latin1 COLLATE latin1_general_cs';
		if($this->AUTO_INCREMENT_INIT != "-1"){
			$temp = $temp.' AUTO_INCREMENT='.$this->AUTO_INCREMENT_INIT;
		}
		$this->table_sql = $temp.';';
	}
	
	public function creat_table_method(){
		
		$this->module_ctrl_sql_array = array(
			"class_name" => 'db_table_'.$this->db_table_name,
			"format" => "php",
			"attribute_array" => array(),
			"methods_array" => array()
		);
		
		foreach($this->table_members_array as &$value){
			array_push($this->module_ctrl_sql_array["attribute_array"],
				new _oop_module_attribute_class(
					array("variable_name" => $value["key"],
						"type" => "string",
						"init" => "",
						"visibility" => "public")
				)
			);
		}
		
		array_push($this->module_ctrl_sql_array["methods_array"],
			new _oop_module_function_class(
				array("function_name" => "insert",
					"visibility" => "public",
					"input_variable" => array("input")
				)
			)
		);
		array_push($this->module_ctrl_sql_array["methods_array"],
			new _oop_module_function_class(
				array("function_name" => "delete",
					"visibility" => "public",
					"input_variable" => array("input")
				)
			)
		);
		array_push($this->module_ctrl_sql_array["methods_array"],
			new _oop_module_function_class(
				array("function_name" => "Modify",
					"visibility" => "public",
					"input_variable" => array("input")
				)
			)
		);
		array_push($this->module_ctrl_sql_array["methods_array"],
			new _oop_module_function_class(
				array("function_name" => "seach",
					"visibility" => "public",
					"input_variable" => array("input")
				)
			)
		);
		
	}
}
?>