<?php
class _oop_del_file{
	public $folder_list_array = array();
	
	public function cut_word($word){//�и��ַ�
		$word_array = array();
		$word_count = 0;
		while(isset($word[$word_count])){
			array_push($word_array,$word[$word_count]);
			++$word_count;
		}
		return $word_array;
	}

	public function array_link_to_folder_list_array($folder_array){//�����������Ӽӳ�
		$folder_array_count = 0;
		while(isset($folder_array[$folder_array_count])){
			array_push($this->folder_list_array,$folder_array[$folder_array_count]);
			++$folder_array_count;
		}
	}
	
	public function file_list_in_folder_do_del($folder){//�ļ��б�
		if(!file_exists($folder)){exit;}
		if($dh = opendir($folder)){//�����ļ���
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
	
	public function del_all($file_or_folder){//ִ��ɾ��
		clearstatcache();//��ջ���
		if(!file_exists($file_or_folder)){
			return '';
		}
		clearstatcache();//��ջ���
		if(!is_dir($file_or_folder)){
			unlink($file_or_folder);
		}
		array_push($this->folder_list_array,$file_or_folder);//�ļ����б�
		$file_or_folder_count = 0;
		while(isset($this->folder_list_array[$file_or_folder_count])){
		
			$file_list_array = array();
			$this->file_list_in_folder_do_del($this->folder_list_array[$file_or_folder_count]);//ɾ����Ŀ¼�ļ�������Ŀ¼��
			
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
// if(!file_exists($link)){exit;}//�ж������Ƿ����
// $c_del->del_all($link);
?>