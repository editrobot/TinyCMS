#define BUILDING_NODE_EXTENSION
#include <node.h>
#include <v8.h>
#include "../../../module_code/module_code/StdAfx.h"
#include "../../../module_code/module_code/Neurons.cpp"
#include "../../../module_code/module_code/base_class.cpp"
#include "../../../module_code/module_code/string_class.cpp"
#include "../../../module_code/module_code/string_expand_class.cpp"
#include "../../../module_code/module_code/html_class.cpp"
#include "../../../module_code/module_code/file_class.cpp"

using namespace v8;
using namespace std;

//转化为c++字符串
char* ToCString(const String::Utf8Value& value)
{
	return *value ? *value: "string conversion failed";
}
///////////////////////////////////////////////////////////////////////////////////////////////
//接口模版
Handle<Value> test(const Arguments& args){
	HandleScope scope;
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	//判断参数是否是字符串
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	String::Utf8Value str0(args[0]);//文件的超链接
	///////////////////////////////////////////////////////////////////////////////////////////////
	Local<Value> result = Local<Value>::New(String::New("true"));
	return scope.Close(result);
}
///////////////////////////////////////////////////////////////////////////////////////////////
//接口模版
Handle<Value> analysis(const Arguments& args){
	HandleScope scope;
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	//判断参数是否是字符串
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	String::Utf8Value str0(args[0]);//文件的超链接
	string_class html_path;
	html_path.set_str(ToCString(str0));
	html_path.replace_str(":","%3a");
	html_path.replace_str("/","%2f");
	html_path.link_str_before("tmp\\");
	html_path.link_str_back(".html");
	//printf("%s\n",html_path.str);

	html_class html_tag_list;//标签列表
	html_tag_list.analysis_html_page(html_path.str);

	///////////////////////////////////////////////////////////////////////////////////////////////
	Local<Value> result = Local<Value>::New(String::New("true"));
	return scope.Close(result);
}
///////////////////////////////////////////////////////////////////////////////////////////////
//判断文件是否存在
Handle<Value> url_on_local_file_exists(const Arguments& args){
	HandleScope scope;
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	//判断参数是否是字符串
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	String::Utf8Value str0(args[0]);//文件的超链接
	string_expand_class html_path;
	html_path.set_str(ToCString(str0));
	html_path.replace_str(":","%3a");
	html_path.replace_str("/","%2f");
	html_path.link_str_before("tmp\\");
	html_path.link_str_back(".html");
	Local<Value> result;
	FILE *File=fopen(html_path.str,"rb");
	if(!File){
		result = Local<Value>::New(String::New("false"));
	}
	else{
		result = Local<Value>::New(String::New("true"));
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	return scope.Close(result);
}
///////////////////////////////////////////////////////////////////////////////////////////////
Handle<Value> write_json_file(const Arguments& args) {
	//HandleScope：可以把它想象成是多个Handle的一个容器。
	HandleScope scope;

	//如果args的长度小于2，则抛出错误，从下面代码我们知道如何抛出一个错误，以后照搬就行	
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	//判断参数是否是字符串
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}
	if (!args[1]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}

	String::Utf8Value str1(args[0]);
	String::Utf8Value str2(args[1]);
	
	string_class *file_path_string_class = new string_class();//设置文件路径
	string_class *file_content_string_class = new string_class();//设置文件内容
	file_path_string_class->set_str(ToCString(str1));
	file_content_string_class->set_str(ToCString(str2));
	file_content_string_class->str_write_to_file(file_path_string_class->str);
	Local<Value> result = Local<Value>::New(String::New("true"));
	delete file_path_string_class;
	delete file_content_string_class;
	
	return scope.Close(result);
}

Handle<Value> read_json_file(const Arguments& args) {
	//HandleScope：可以把它想象成是多个Handle的一个容器。
	HandleScope scope;

	//如果args的长度小于2，则抛出错误，从下面代码我们知道如何抛出一个错误，以后照搬就行	
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	//判断参数是否是字符串
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}

	String::Utf8Value str1(args[0]);
	string_class *file_string_class = new string_class();//设置文件内容
	file_string_class->set_str_from_file(ToCString(str1));
	Local<Value> result = Local<Value>::New(String::New(file_string_class->str));
	delete file_string_class;
	
	return scope.Close(result);
}

Handle<Value> project_path(const Arguments& args) {
	//HandleScope：可以把它想象成是多个Handle的一个容器。
	HandleScope scope;

	//如果args的长度小于2，则抛出错误，从下面代码我们知道如何抛出一个错误，以后照搬就行	
	if (args.Length() < 3) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments 1")));
		return scope.Close(Undefined());
	}
	if (!args[1]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments 2")));
		return scope.Close(Undefined());
	}
	if (!args[2]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments 3")));
		return scope.Close(Undefined());
	}
	
	String::Utf8Value str1(args[0]);
	String::Utf8Value str2(args[1]);
	String::Utf8Value str3(args[2]);
	
	string_class *absolute_directory_string_class = new string_class();
	absolute_directory_string_class->set_str(ToCString(str1));//设置绝对路径
	
	string_class *project_name_string_class = new string_class();
	project_name_string_class->set_str(ToCString(str2));//设置项目名称
	
	string_class *path_Segmentation_string_class = new string_class();
	path_Segmentation_string_class->set_str(ToCString(str3));//设置路径斜杠
	
	absolute_directory_string_class->split(path_Segmentation_string_class->str);
	absolute_directory_string_class->push_back("");
	char lock;
	do{
		if(!absolute_directory_string_class->pop_back()){
			lock = 0;
		}
		if(!strcmp(absolute_directory_string_class->pop_date,project_name_string_class->str)){
			lock = 1;
		}
		else{
			lock = 0;
			absolute_directory_string_class->pop_back();
		}
	}
	while(lock);
	absolute_directory_string_class->join("/");
	///////////////////////////////////////////////////////////////////////////////////////////////
	Local<Function> cb = Local<Function>::Cast(args[3]);
	const unsigned argc = 1;
	Local<Value> argv[argc] = { Local<Value>::New(String::New(absolute_directory_string_class->str))};
	cb->Call(Context::GetCurrent()->Global(), argc, argv);
	Local<Value> result = Local<Value>::New(String::New(absolute_directory_string_class->str));
	
	delete absolute_directory_string_class;
	delete project_name_string_class;
	delete path_Segmentation_string_class;
	
	return scope.Close(result);
}

Handle<Value> get_config_callback(const Arguments& args) {
	HandleScope scope;

	//如果args的长度小于2，则抛出错误，从下面代码我们知道如何抛出一个错误，以后照搬就行	
	if (args.Length() < 2) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//返回Udefined
		return scope.Close(Undefined());
	}
	//判断2个参数是否是number
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	String::Utf8Value str(args[0]);
	string_class *json_config_stringclass = new string_class();
	string_class *stringclass = new string_class();
	stringclass->set_str_from_file(ToCString(str));
	json_config_stringclass->push_back("var config=");
	json_config_stringclass->push_back(stringclass->str);
	delete stringclass;
	json_config_stringclass->join("");
	//printf("%s",json_config_stringclass->str);
	
	// Create a new context.
	Persistent<Context> context = Context::New();
	// Enter the created context for compiling
	Context::Scope context_scope(context);
	
	// Create a string containing the JavaScript source code.
	Handle<String> source = String::New(json_config_stringclass->str);
	// Compile the source code.
	Handle<Script> script = Script::Compile(source);
	// Run the script to get the result.
	script->Run();
	
	//将变量转化为json字符串
	// Handle<Value> valtemp = Script::Compile(String::New("JSON.stringify(config);"))->Run();
	// String::Utf8Value valtempUtf8(valtemp);
	// printf("%s\n", *valtempUtf8);
	
	// 读取name
	Handle<Value> val1 = v8::Script::Compile(v8::String::New("config[\"name\"];"))->Run();
	String::Utf8Value config_name(val1);
	
	// 读取Version配置
	Handle<Value> val2 = v8::Script::Compile(v8::String::New("config.language;"))->Run();
	String::Utf8Value config_language(val2);
	
	// Dispose the persistent context.
	context.Dispose();
	
	delete json_config_stringclass;
	///////////////////////////////////////////////////////////////////////////////////////////////
	Local<Function> cb = Local<Function>::Cast(args[1]);
	const unsigned argc = 2;
	Local<Value> argv[argc] = { Local<Value>::New(String::New(ToCString(config_name))),Local<Value>::New(String::New(ToCString(config_language))) };
	cb->Call(Context::GetCurrent()->Global(), argc, argv);

	return scope.Close(Undefined());
}

// 初始化模块
void init(Handle<Object> exports, Handle<Object> module) {
	
	//页面分析
	exports->Set(String::NewSymbol("analysis"),
		FunctionTemplate::New(analysis)->GetFunction());
		
	//判断网络文件是否已经缓存
	exports->Set(String::NewSymbol("url_on_local_file_exists"),
		FunctionTemplate::New(url_on_local_file_exists)->GetFunction());
		
	//写入json文件
	exports->Set(String::NewSymbol("write_json_file"),
		FunctionTemplate::New(write_json_file)->GetFunction());
	//读取json文件
	exports->Set(String::NewSymbol("read_json_file"),
		FunctionTemplate::New(read_json_file)->GetFunction());
		
	//获取项目路径
	exports->Set(String::NewSymbol("project_path"),
		FunctionTemplate::New(project_path)->GetFunction());
	
	//获取配置文件
	exports->Set(String::NewSymbol("get_config_callback"),
		FunctionTemplate::New(get_config_callback)->GetFunction());

}

// 定义"nodecpp"模块
NODE_MODULE(nodecpp, init)