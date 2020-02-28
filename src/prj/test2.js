<@
	out.Println("Main:start")
	try{
		for(var i=0;i<4096;i++){
			//request.APrint("<@ out.Println('APrint["+i+"]'); @>");
			request.APrint("<@ request.APrint(\"request.APrint();\"); @>"");
		}
		request.ACommit();
	}catch(e){
		out.Println(e.toString());
	}
	out.Println("Main:end")
@>
