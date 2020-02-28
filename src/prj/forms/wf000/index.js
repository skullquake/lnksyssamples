<@
	CPrintln('/forms/wf001/index.js:'+resource().Path());
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
		include('/forms/wf001/index.html');
	}
	function post(){
		CPrintln('post')
		var form=request.Parameters().Parameter('form')[0];
		form=form==null?'form0':form;
		var sidx=0;
		sidx=parseInt(request.Parameters().Parameter('sidx')[0]);
		sidx=isNaN(sidx)?0:sidx;
		switch(form){
			case null:
				//CPrintln(form)
				//CPrintln('NULL');
				break;
			default:
				//CPrintln(form)
				//CPrintln('NON NULL');
				preform(sidx);
				//CPrintln(form);
				//include('/forms/wf001/'+form+'.js');
				CPrintln('----------------------------------------');
				var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
				//to js string
				CPrintln(pth);
				CPrintln('----------------------------------------');
				//include('/forms/wf001/'+form+'.js');
				include(pth+'/'+form+'.js');
				postform(sidx);
		};
	}
	function preform(sidx){
			//CPrintln('preform:'+sidx)
@>
replace-content||#title||
Submission: <@ out.Print(sidx); @>
||replace-content
script||
window.automate=<@ out.Print(automate); @>;
populate();
||script
<@
	}
	function postform(sidx){
		//CPrintln('postform:'+sidx)
@>
script||
if(automate)submit();
||script
	<@}

@>
