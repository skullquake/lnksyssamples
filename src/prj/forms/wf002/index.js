<@
	request.ResponseHeader().Add("Content-type","text/plain");
	//CPrintln('/forms/wf001/index.js:'+resource().Path());
	var automate=false;
	main();
     	function main(){
     		handleMethod();
	}
	function handleMethod(){
		switch(request.RequestMethod()){
			case 'GET':
				get();
				break;
			case 'POST':
				post();
				break;
			default:
				break;
		}
	}
	function get(){
		include(resource().Path().substring(0,resource().Path().lastIndexOf('/'))+'/index.html');
	}
	function post(){
		var form=request.Parameters().Parameter('form')[0];
		form=form==null?'form0':form;
		var args={};
		args.node=request.Parameters().Parameter('node')[0];
		switch(form){
			case null:
				break;
			default:
				preform();
				var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
				include(pth+'/'+form+'.js');
				postform(args);
		};
	}
	function preform(args){
@>
script||
||script
<@

	}
	function postform(args){
@>
script||
submit<@ out.Print(args.node); @>();
||script
<@
	}
@>
