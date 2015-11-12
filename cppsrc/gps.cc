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

//ת��Ϊc++�ַ���
char* ToCString(const String::Utf8Value& value)
{
	return *value ? *value: "string conversion failed";
}
///////////////////////////////////////////////////////////////////////////////////////////////
//�ӿ�ģ��
Handle<Value> test(const Arguments& args){
	HandleScope scope;
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//����Udefined
		return scope.Close(Undefined());
	}
	//�жϲ����Ƿ����ַ���
	if (!args[0]->IsString()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	String::Utf8Value str0(args[0]);//�ļ��ĳ�����
	///////////////////////////////////////////////////////////////////////////////////////////////
	Local<Value> result = Local<Value>::New(String::New("true"));
	return scope.Close(result);
}
///////////////////////////////////////////////////////////////////////////////////////////////

Handle<Value> get_config_callback(const Arguments& args) {
	HandleScope scope;

	//���args�ĳ���С��2�����׳����󣬴������������֪������׳�һ�������Ժ��հ����	
	if (args.Length() < 2) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//����Udefined
		return scope.Close(Undefined());
	}
	//�ж�2�������Ƿ���number
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
	
	//������ת��Ϊjson�ַ���
	// Handle<Value> valtemp = Script::Compile(String::New("JSON.stringify(config);"))->Run();
	// String::Utf8Value valtempUtf8(valtemp);
	// printf("%s\n", *valtempUtf8);
	
	// ��ȡname
	Handle<Value> val1 = v8::Script::Compile(v8::String::New("config[\"name\"];"))->Run();
	String::Utf8Value config_name(val1);
	
	// ��ȡVersion����
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

// ��ʼ��ģ��
void init(Handle<Object> exports, Handle<Object> module) {
	
	//��ȡ�����ļ�
	exports->Set(String::NewSymbol("get_config_callback"),
		FunctionTemplate::New(get_config_callback)->GetFunction());

}

// ����"gps"ģ��
NODE_MODULE(gps, init)