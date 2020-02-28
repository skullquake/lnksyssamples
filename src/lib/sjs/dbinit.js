<@
for(var i=0;i<4;i++){
	try{
		var q="";
		q+="create table if not exists test"+i+" ("
		var ncols=Math.floor(Math.random()*24)+1;
		var arrcols=[];
		for(var j=0;j<ncols;j++){
			arrcols.push("col"+j+" integer");
		}
		q+=arrcols.join(",");
		q+=");";
		var r=DBExecute(
			"lnks",
			q
			//,{}
		);
	}catch(e){
		out.Print(e.toString());
	}
}
@>
