
var express = require('express');
var file = require('./file.js');

//创建接口
var Interface = function(){};

//读取数据
Interface.prototype.read = function (db_path) {
    var temp = file.file_read(db_path);
    return JSON.parse(temp.toString('utf-8'));
};

//写入数据
Interface.prototype.write = function (db_path, db_handle) {
    file.file_write(db_path, JSON.stringify(db_handle));
};

//选择数据库数据，第一个参数，数据表路径
Interface.prototype.select = function(db_path,callback1,callback2){
	var temp = file.file_read(db_path);//读取数据
	var db_handle = JSON.parse(temp.toString('utf-8'));//解析json
    var key_index = -1;
    var db_handle_result = db_handle.filter(function (e, index, self){
        key_index = index;
        return callback1(e, index, self);
    });
	if(typeof db_handle[0] == "undefined"){
		callback2(1, db_handle_result, key_index);
	}
	else{
		callback2(0, db_handle_result, key_index);
    }
    return key_index;
};

//插入新数据 push new data
Interface.prototype.push = function (db_path, json_fmt, callback) {
    var temp = file.file_read(db_path);
    var db_handle = JSON.parse(temp.toString('utf-8'));
    db_handle.push(json_fmt);
    file.file_write(db_path, JSON.stringify(db_handle));
    callback(db_handle[db_handle.length-1]);
};

//修改数据 update data
Interface.prototype.update = function (db_path, id, json_fmt, callback) {
    var temp = file.file_read(db_path);
    var db_handle = JSON.parse(temp.toString('utf-8'));
    db_handle[id] = json_fmt;
    console.log(db_handle);
    file.file_write(db_path, JSON.stringify(db_handle));
    callback();
};

Interface.prototype.del = function (db_path, handle, callback) {
    this.read(db_path).filter(function (e, index, self) {
        if (self[index].handle + "" == handle) {
            self.splice(index, 1);
            file.file_write(db_path, JSON.stringify(self));
        }
        return callback(e, index, self,handle);
    });
};

module.exports = new Interface();