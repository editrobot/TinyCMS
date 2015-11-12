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
	
	//获取配置文件
	exports->Set(String::NewSymbol("get_config_callback"),
		FunctionTemplate::New(get_config_callback)->GetFunction());

}

// 定义"gps"模块
NODE_MODULE(gps, init)