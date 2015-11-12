<?php
class _oop_del_file{
	public $folder_list_array = array();
	
	public function cut_word($word){//切割字符
		$word_array = array();
		$word_count = 0;
		while(isset($word[$word_count])){
			array_push($word_array,$word[$word_count]);
			++$word_count;
		}
		return $word_array;
	}

	public function array_link_to_folder_list_array($folder_array){//两个数组连接加长
		$folder_array_count = 0;
		while(isset($folder_array[$folder_array_count])){
			array_push($this->folder_list_array,$folder_array[$folder_array_count]);
			++$folder_array_count;
		}
	}
	
	public function file_list_in_folder_do_del($folder){//文件列表
		if(!file_exists($folder)){exit;}
		if($dh = opendir($folder)){//进入文件夹
			while($name = readdir($dh)){
				if(!(($name == '.')||($name == '..')))
				{
					clearstatcache();
					if(is_dir($folder.'/'.$name)){
						array_push($this->folder_list_array,$folder.'/'.$name);
					}
					else{
						unlink($folder.'/'.$name);
					}
					clearstatcache();
				}
			}
			closedir($dh);
		}
	}
	
	public function del_all($file_or_folder){//执行删除
		clearstatcache();//清空缓存
		if(!file_exists($file_or_folder)){
			return '';
		}
		clearstatcache();//清空缓存
		if(!is_dir($file_or_folder)){
			unlink($file_or_folder);
		}
		array_push($this->folder_list_array,$file_or_folder);//文件夹列表
		$file_or_folder_count = 0;
		while(isset($this->folder_list_array[$file_or_folder_count])){
		
			$file_list_array = array();
			$this->file_list_in_folder_do_del($this->folder_list_array[$file_or_folder_count]);//删除非目录文件，返回目录。
			
			++$file_or_folder_count;
		}
		
		while(isset($this->folder_list_array[0])){
			$temp_dir_path = array_pop($this->folder_list_array);
			rmdir($temp_dir_path);
			++$file_or_folder_count;
		}
	}
}

// session_start();
// if(!isset($_REQUEST['link'])){exit;}
// set_time_limit(9999);
// $c_del = new _oop_del_file;//del file module

// clearstatcache();//clean cache
// $link = $_REQUEST['link'];
// if(!file_exists($link)){exit;}//判断连接是否存在
// $c_del->del_all($link);
?>