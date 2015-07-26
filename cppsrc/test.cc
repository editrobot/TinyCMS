#define BUILDING_NODE_EXTENSION
#include <node.h>
#include <v8.h>
#include "StdAfx.h"
#include "Neurons.h"
#include "base_class.h"
#include "string_class.h"

using namespace v8;
using namespace std;

//ת��Ϊc++�ַ���
char* ToCString(const String::Utf8Value& value)
{
	return *value ? *value: "string conversion failed";
}

///////////////////////////////////////////////////////////////////////////////////////////////
Handle<Value> hello(const Arguments& args) {
	HandleScope scope;
	return scope.Close(String::New("hello,world,in nodecpp.node"));
}

Handle<Value> Add(const Arguments& args) {
    HandleScope scope;

    // �����˿��Դ��� 2 �����ϵĲ�������ʵ��������ֻ��ǰ����
    if(args.Length() < 2)
    {
        // �׳�����
        ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));

        // ���ؿ�ֵ
        return scope.Close(Undefined());
    }

    // ��ǰ������������һ���������ֵĻ�
    if(!args[0]->IsNumber() || !args[1]->IsNumber())
    {
        // �׳����󲢷��ؿ�ֵ
        ThrowException(Exception::TypeError(String::New("Wrong arguments")));
        return scope.Close(Undefined());
    }

    // ����ο� v8 �ĵ�
    //     http://izs.me/v8-docs/classv8_1_1Value.html#a6eac2b07dced58f1761bbfd53bf0e366)
    // �� `NumberValue` ����
    Local<Number> num = Number::New(args[0]->NumberValue() + args[1]->NumberValue());

    return scope.Close(num);
}

Handle<Value> get_string(const Arguments& args) {
	HandleScope scope;
	
	String::Utf8Value str(args[0]);
	const char * pstr = ToCString(str);
	printf("%s\n",pstr);
	return scope.Close(String::New("hello,world,in nodecpp.node"));
}

Handle<Value> read_json(const Arguments& args) {

	// Create a stack-allocated handle scope.
	HandleScope handle_scope;

	// Create a new context.
	Persistent<Context> context = Context::New();

	// Enter the created context for compiling
	Context::Scope context_scope(context);

	// Create a string containing the JavaScript source code.
	Handle<String> source = String::New("var config={'Version':'1.0', 'Title':'HelloWorld', 'ThreadNum':'28'};");

	// Compile the source code.
	Handle<Script> script = Script::Compile(source);

	// Run the script to get the result.
	script->Run();


	// ��ȡVersion����
	Handle<v8::String> src1 = v8::String::New("config.Version;");
	Handle<Script> script1 = v8::Script::Compile(src1);
	Handle<Value> val1 = script1->Run();
	String::AsciiValue ascii1(val1);
	printf("%s\n", *ascii1);

	// ��ȡTitle����
	Handle<v8::String> src2 = v8::String::New("config.Title;");
	Handle<Script> script2 = v8::Script::Compile(src2);
	Handle<Value> val2 = script2->Run();
	String::Utf8Value ascii2(val2);
	printf("%s\n", *ascii2);

	// Dispose the persistent context.
	context.Dispose();

	return handle_scope.Close(String::New("hello,world,in nodecpp.node"));
}

//Handle��һ��handle����ָ��һ�������ָ�롣v8�����еĶ�����ʹ��handle�����з��ʣ�֮������������Ϊv8��������������Ҫ��
Handle<Value> Method(const Arguments& args) {

	//HandleScope�����԰���������Ƕ��Handle��һ��������
	HandleScope scope;

	//���args�ĳ���С��2�����׳����󣬴������������֪������׳�һ�������Ժ��հ����	
	if (args.Length() < 2) {
		ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
		//����Udefined
		return scope.Close(Undefined());
	}
	//�ж�2�������Ƿ���number
	if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
		ThrowException(Exception::TypeError(String::New("Wrong arguments")));
		return scope.Close(Undefined());
	}

	//������ת����C++���õ�double����ӣ�Ȼ����ת���������node��Number�ͣ����ֵ�� Local<Number> ���͵ı��� num�����ظ��û�	
	Local<Number> num = Number::New(args[0]->NumberValue() + args[1]->NumberValue());

	return scope.Close(num);
}

Handle<Value> Callback(const Arguments& args) {
	HandleScope scope;

	Local<Function> cb = Local<Function>::Cast(args[0]);
	const unsigned argc = 2;
	Local<Value> argv[argc] = { Local<Value>::New(String::New("RunCallback hello world")),Local<Value>::New(String::New("RunCallback hello world 2")) };
	cb->Call(Context::GetCurrent()->Global(), argc, argv);

	return scope.Close(Undefined());
}

///////////////////////////////////////////////////////////////////////////////////////////////
Handle<Value> travel_dir(const Arguments& args) {
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
	string_class *stringclass = new string_class();
	stringclass->set_str_from_file(ToCString(str));
	///////////////////////////////////////////////////////////////////////////////////////////////
	Local<Function> cb = Local<Function>::Cast(args[1]);
	const unsigned argc = 2;
	Local<Value> argv[argc] = { Local<Value>::New(String::New("")),Local<Value>::New(String::New("")) };
	cb->Call(Context::GetCurrent()->Global(), argc, argv);

	return scope.Close(Undefined());
}

// ��ʼ��ģ��
void init(Handle<Object> exports, Handle<Object> module) {
	exports->Set(String::NewSymbol("hello"),
		FunctionTemplate::New(hello)->GetFunction());
	exports->Set(String::NewSymbol("Add"),
		FunctionTemplate::New(Add)->GetFunction());
	exports->Set(String::NewSymbol("get_string"),
		FunctionTemplate::New(get_string)->GetFunction());
	exports->Set(String::NewSymbol("read_json"),
		FunctionTemplate::New(read_json)->GetFunction());
	exports->Set(String::NewSymbol("nodecpp"),
		FunctionTemplate::New(Method)->GetFunction());
	exports->Set(String::NewSymbol("Callback"),
		FunctionTemplate::New(Callback)->GetFunction());
}

// ����"nodecpp"ģ��
NODE_MODULE(nodecpp, init)

/* v8ģ����Handle,Local,Persistent ����Handle����HandleScope,Context::Scope ��C++�����ݴ����js
Local<RegExp>
Local<Object>
Local<Number>
Local<Integer>
Local<Value>
Local<String>
Local<Array>
Local<Function>
Local<Context>
Local<External>
Local<FunctionTemplate>
String::New("")
//�½����ַ���
Array::New(n); //����js���飬����Ϊn
NumberValue(); //������ת��Ϊdouble
IsString() //�Ǵ�Ϊ�ַ���
ToString() //ת��Ϊ�ַ���
IsBoolean() //�Ƿ�Ϊ����ֵ
ToBoolean() //ת��Ϊ����ֵ
IsNumber() //�Ƿ�����ֵ
ToNumber() //ת��Ϊ���� V8 �У�������ģ�� (Template) �� ( ���� C++ �е�ģ���� )��
	����ģ�� (ObjectTempalte) �ͺ���ģ�� (FunctionTemplate)��
	������ģ�������Զ��� JavaScript ����� JavaScript ������
	ͨ��ʹ�� ObjectTemplate�����Խ� C++ �еĶ���¶���ű������� ���Ƶģ�FunctionTemplate ���Խ� C++ ������¶���ű��������Թ��ű�ʹ��
*/