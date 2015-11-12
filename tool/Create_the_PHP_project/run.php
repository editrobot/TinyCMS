<?php
	//加载所有模块
	//Load all modules
	
	include('include.php');
	
	//设置项目名称
	$config_class = new _oop_config_class("default");
	$config_array = $config_class->config_array;
	
	//数据表
	$config_class->push_project_db_table_info(
		array(
			"db_table_name" => "user",
			"PRIMARY_KEY" => "USER_ID",
			"AUTO_INCREMENT_INIT" => "0"
		),
		array(
			array( "key" => "USER_ID", "var_format" => "INTEGER UNSIGNED", "NULL" => "NOT NULL", "AUTO_INCREMENT" => "AUTO_INCREMENT", "annotation" => "" ),
			array( "key" => "USERNAME", "var_format" => "VARCHAR(20)", "NULL" => "NOT NULL", "AUTO_INCREMENT" => "", "annotation" => "" ),
			array( "key" => "PASSWORD", "var_format" => "CHAR(40)", "NULL" => "NOT NULL", "AUTO_INCREMENT" => "", "annotation" => "" ),
			array( "key" => "EMAIL_ADDR", "var_format" => "VARCHAR(100)", "NULL" => "NOT NULL", "AUTO_INCREMENT" => "", "annotation" => "" ),
			array( "key" => "IS_ACTIVE", "var_format" => "TINYINT(1)", "NULL" => "NOT NULL", "AUTO_INCREMENT" => "DEFAULT 0", "annotation" => "" )
		)
	);
	
	$config_class->push_project_module_info(array(
			"class_name" => "config",
			"format" => "php",
			"attribute_array" => array(
				new _oop_module_attribute_class(
					array("variable_name" => "domain_name",
						"type" => "string",
						"init" => "",
						"visibility" => "public")),
				new _oop_module_attribute_class(
					array("variable_name" => "port",
						"type" => "number",
						"init" => 0,
						"visibility" => "public"))
			),
			"methods_array" => array(
				new _oop_module_function_class(
					array("function_name" => "aaa",
							"visibility" => "public",
							"input_variable" => array("a","b")
					)
				)
			)
		)
	);
	
	$config_class->push_project_page_info(array("name" => "login","title" => "登录","format" => "php","config_array" => $config_class->config_array,"content" => "login"));
	$config_class->push_project_page_info(array("name" => "logout","title" => "登出","format" => "php","config_array" => $config_class->config_array,"content" => "logout"));
	
	$config_class->main_run();
?>