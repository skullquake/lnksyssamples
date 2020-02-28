<@
for(var i=0;i<32;i++){
	try{
		CPrintln("drop table test"+i+";")
		var r=DBExecute(
			"lnks",
			"drop table if exists test"+i+";"
			//,{}
		);
	}catch(e){
		out.Print(e.toString());
	}
}
@>
