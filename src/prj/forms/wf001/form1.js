<@
//CPrintln(resource().Path());
{
	main();
	function main(){
		var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
		//validate...
		if(true){
			include(pth+'/form2.html');
		}else{
			include(pth+'/form1.html');
		}
	}
}
//CPrintln('form0.js:end')
@>
