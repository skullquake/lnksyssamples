<@
//CPrintln(resource().Path());
{
	main();
	function main(){
		//validate...
		var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
		include(pth+'/form0.html');
	}
}
@>
