<@
//CPrintln('/forms/wf001/form2.js:'+resource().Path());
{
	main();
	function main(){
		var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
		//validate...
		if(true){
			include(pth+'/form0.html');
		}else{
			include(pth+'/form2.html');
		}
	}
}
//CPrintln('form0.js:end')
@>
