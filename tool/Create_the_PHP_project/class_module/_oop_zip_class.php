<?php
class _oop_zip_class{
	public $zip_object;
	public $root_path = "project/";
	public $zip_file_name;
	public $from;
	public $folder_list_array_count = 0;
	public $folder_list_array = array();
	public $file_list_array = array();
	
	public function __construct($zip_file_name,$from){
		$this->zip_object = new ZipArchive();
		$this->zip_file_name = $zip_file_name;
		$this->from = $from;
		
		if ($this->zip_object->open($this->root_path.$this->zip_file_name, ZipArchive::CREATE)!==TRUE) {
			exit("cannot open filename\n");
		}
		$this->files_zip();
	}
	
	public function __destruct() {
		// echo "<br/>";
		// echo "numfiles: " . $this->zip_object->numFiles . "\n";
		// echo "status:" . $this->zip_object->status . "\n";
		$this->zip_object->close();
	}
	
	public function files_in_folder($folder){
		if(is_dir($folder)&&$dh = opendir($folder)){
			while($name = readdir($dh)){
				if(!(($name == '.')||($name == '..')))
				{
					clearstatcache();
					if(is_dir($folder.'/'.$name)){
						array_push($this->folder_list_array,$folder.$name.'/');
					}
					else if(is_file($folder.'/'.$name)){
						array_push($this->file_list_array,$folder.$name);
					}
					clearstatcache();
				}
			}
			closedir($dh);
		}
	}
	
	public function all_in_folder($from){
		if(is_file($from)){
			array_push($this->file_list_array,$from);
		}
		else if(is_dir($from)){
			$this->files_in_folder($from);
			while(isset($this->folder_list_array[$this->folder_list_array_count])){
				$this->files_in_folder($this->folder_list_array[$this->folder_list_array_count]);
				++$this->folder_list_array_count;
			}
		}
	}
	
	public function files_zip(){
		$this->all_in_folder($this->from);
		foreach($this->folder_list_array as &$value){
			echo "<br/>";
			if($this->zip_object->addEmptyDir($value)) {
				echo 'add directory <b>'.$value.'</b> successful';
			} else {
				echo 'Could not add directory <b>'.$value.'</b>';
			}
		}
		foreach($this->file_list_array as &$value){
			echo "<br/>";
			if($this->zip_object->addFile($value)) {
				echo 'add File <b>'.$value.'</b> successful';
			} else {
				echo 'Could not add File <b>'.$value.'</b>';
			}
		}
	}
}
?>