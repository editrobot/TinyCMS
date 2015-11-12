<?php
	class _oop_config_class{
		
		//多国语言信息
		public $language_array = array(
			"work_dir" => array(
				"english" => "work dir",
				"chinese" => "当前工作目录"
			),
			"project_path_is" => array(
				"english" => "project path is",
				"chinese" => "项目路径是"
			),
			"project_module_path_is" => array(
				"english" => "project module path is",
				"chinese" => "功能模块路径是"
			),
			"project_template_path_is" => array(
				"english" => "project template path is",
				"chinese" => "模板路径是"
			),
			"project_cache_path_is" => array(
				"english" => "project cache path is",
				"chinese" => "缓存路径是"
			),
			"project_js_path_is" => array(
				"english" => "project template path is",
				"chinese" => "js路径是"
			),
			"project_css_path_is" => array(
				"english" => "project css path is",
				"chinese" => "css路径是"
			)
		);
		
		public $zip_class;
		public $readme_class;
		
		public $db_table_list_array = array();
		public $module_list_array = array();
		public $page_list_array = array();
		
		public $sql_code = '';
		
		public $config_array = array(
			"language" => "english",
			"project_root_path" => "project/",
			"project_name" => "default",
			"project_path" => "",
			"project_module_path_name" => "module",
			"project_module_path" => "",
			"project_template_path_name" => "template",
			"project_template_path" => "",
			"project_cache_path_name" => "_cache",
			"project_cache_path" => "",
			"project_js_path_name" => "js",
			"project_js_path" => "",
			"project_css_path_name" => "css",
			"project_css_path" => ""
		);
		
		public function __construct($project_name) {
			
			$this->config_array["project_name"] = $project_name;
			
			//生成项目路径
			$this->config_array["project_path"] = $this->config_array["project_root_path"].$this->config_array["project_name"].'/';
			$this->config_array["project_module_path"] = $this->config_array["project_path"].$this->config_array["project_module_path_name"].'/';
			$this->config_array["project_template_path"] = $this->config_array["project_path"].$this->config_array["project_template_path_name"].'/';
			$this->config_array["project_cache_path"] = $this->config_array["project_path"].$this->config_array["project_cache_path_name"].'/';
			$this->config_array["project_js_path"] = $this->config_array["project_path"].$this->config_array["project_js_path_name"].'/';
			$this->config_array["project_css_path"] = $this->config_array["project_path"].$this->config_array["project_css_path_name"].'/';
			
			$this->readme_class = new _oop_readme_class($this->config_array);
			
			echo $this->printf_word("work_dir").':'.getcwd();
			echo "<br/>";
			echo $this->printf_word("project_path_is").':'.$this->config_array["project_path"];											//打印项目根路径
			echo "<br/>";
			echo $this->printf_word("project_module_path_is").':'.$this->config_array["project_module_path"];							//打印模块路径
			echo "<br/>";
			echo $this->printf_word("project_template_path_is").':'.$this->config_array["project_template_path"];						//打印模板路径
			echo "<br/>";
			echo $this->printf_word("project_cache_path_is").':'.$this->config_array["project_cache_path"];								//打印缓存路径
			echo "<br/>";
			echo $this->printf_word("project_js_path_is").':'.$this->config_array["project_js_path"];									//打印模板路径
			echo "<br/>";
			echo $this->printf_word("project_css_path_is").':'.$this->config_array["project_css_path"];									//打印缓存路径
		}
		
		public function __destruct() {
		}
		
		public function push_project_db_table_info($mysql_db_table_info,$members){
			array_push($this->db_table_list_array,new _oop_mysql_db_table_class($mysql_db_table_info,$members));
		}
		
		public function push_project_module_info($module_info){
			array_push($this->module_list_array,new _oop_module_class($module_info));
		}
		
		public function push_project_page_info($page_info){
			array_push($this->page_list_array,new _oop_page_class($page_info));
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
		
		public function main_run(){
			
			$c_del = new _oop_del_file;
			if(file_exists($this->config_array["project_path"])){
				//初始化文件删除模块
				$c_del->del_all($this->config_array["project_path"]);	//先清除当前现存的项目
			}
			
			if(file_exists($this->config_array["project_root_path"].$this->config_array["project_name"].'.zip')){
				unlink($this->config_array["project_root_path"].$this->config_array["project_name"].'.zip');	//先清除当前现存的项目
			}
			
			//部署目录结构
			mkdir($this->config_array["project_path"]);				//创建项目根
			mkdir($this->config_array["project_module_path"]);		//创建模块目录
			mkdir($this->config_array["project_template_path"]);	//创建模板目录
			mkdir($this->config_array["project_cache_path"]);		//创建缓存目录
			mkdir($this->config_array["project_js_path"]);			//创建js目录
			mkdir($this->config_array["project_css_path"]);			//创建css目录
			
			//数据库列表
			foreach ($this->db_table_list_array as &$value){
				$this->sql_code = $this->sql_code.$value->table_sql;
				$this->push_project_module_info($value->module_ctrl_sql_array);
			}
			//生成数据库导入文件
			file_put_contents($this->config_array["project_path"].'sql_table.sql',
								$this->sql_code,
								LOCK_EX);
			
			//模块列表
			foreach ($this->module_list_array as &$value){
				//创建模块文件
				file_put_contents($this->config_array["project_module_path"].'_oop_'.$value->class_name.'_class.'.$value->format,
									$value->make_class(),
									LOCK_EX);
				$this->readme_class->push_module_info($value);
			}
			
			//页面列表
			foreach ($this->page_list_array as &$value) {
				//创建模板文件
				file_put_contents($this->config_array["project_template_path"].$value->name.'.'.$value->format,
									$value->make_template(),
									LOCK_EX);
				//创建页面文件
				file_put_contents($this->config_array["project_path"].$value->name.'.'.$value->format,
									$value->make_page(),
									LOCK_EX);
				$this->readme_class->push_page_info($value);
			}
								
			//创建说明文档
			file_put_contents($this->config_array["project_path"].'README.txt',
								$this->readme_class->out_put(),
								LOCK_EX);
			
			//打包项目
			$this->zip_class = new _oop_zip_class($this->config_array["project_name"].'.zip',$this->config_array["project_path"]);
		}
		
	}
?>