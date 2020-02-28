<@
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
		var sidx=0;
		sidx=parseInt(request.Parameters().Parameter('sidx')[0]);
		sidx=isNaN(sidx)?0:sidx;
		var args={};
		args.sidx=sidx;
		args.formguid=request.Parameters().Parameter('formguid')[0];
		switch(form){
			case null:
				break;
			default:
				preform(args);
				//CPrintln('----------------------------------------');
				var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
				//CPrintln(pth);
				//CPrintln('----------------------------------------');
				include(pth+'/'+form+'.js');
				postform(args);
		};
	}
	function preform(args){
@>
script||
populate<@ out.Print(args.formguid); @>();
||script
<@

	}
	function postform(args){
@>
script||
//submit<@ out.Print(args.formguid); @>();
||script
<@
	}
@>
