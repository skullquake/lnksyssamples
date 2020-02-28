<@
//CPrintln(resource().Path());
{
	main();
	function main(){
		//validate...
		var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
		if(true){
			include(pth+'/form1.html');
		}else{
			include(pth+'/form0.html');
		}
	}
}
@>
