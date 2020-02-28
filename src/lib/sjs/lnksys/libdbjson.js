<@
CPrintln('/lib/sjs/lnksys/libdbjson.js')
lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
lnksys.dbjson=typeof(lnksys.dbjson)=='undefined'?function(table){
	try{
		//----------------------------------------------------------------------------
		//ACK METHOD
		//----------------------------------------------------------------------------
		switch(request.RequestMethod()){
			case "GET":
				CPrintln("GET stub");
				break;
			case "POST":
				CPrintln("POST stub");
				break;
			case "DELETE":
				CPrintln("DELETE stub");
				break;
			case "PUT":
				CPrintln("PUT stub");
				break;
			case "PATCH":
				CPrintln("PATCH stub");
				break;
			default:
				CPrintln("Invalid Method");
		}
		//----------------------------------------------------------------------------
		//ACK LIMIT/OFFSET
		//----------------------------------------------------------------------------
		var limit=512;
		var offset=0;
		var range=request.RequestHeader().Get("Range");
		if(range!=null||range!=''){
			if(range.split('=')[0]=='items'){
				offset=parseInt(range.split('=')[1].split('-')[0]);
				limit=parseInt(range.split('=')[1].split('-')[1]);
				limit=limit-offset+1;
			}else{
			}
		}else{
		}
		CPrintln("limit:"+limit);
		CPrintln("offset:"+offset);
		//----------------------------------------------------------------------------
		//ACK PARS
		//----------------------------------------------------------------------------
		var qpar={};
		var spar={};
		Parameters().StandardKeys().forEach(function(k,kidx){
			CPrintln(k+":"+Parameters().Parameter(k)[0]);
			if(k.indexOf("SORT(")!=0){
				//------------------------------------------------------------
				//HDL QPAR
				//------------------------------------------------------------
				qpar[k]=Parameters().Parameter(k)[0]
			}else{
				//------------------------------------------------------------
				//HDL SPAR
				//------------------------------------------------------------
				spar[k]=Parameters().Parameter(k)[0]
			}
		});
		CPrintln(JSON.stringify(qpar,0,'\t'));
		CPrintln(JSON.stringify(spar,0,'\t'));
		//----------------------------------------------------------------------------
		//CONSTR QUERY
		//----------------------------------------------------------------------------
		var query=
			 "select * from "+table
		;
		if(Object.keys(qpar).length>0){
			query+=
				" where "
			;
			var arrConstraint=[];
			Object.keys(qpar).forEach(function(k,vP){
				arrConstraint.push(
					 k.toLowerCase()
					+" LIKE "
					+"'"
					+qpar[k]
					+"'"
				);
			});
			query+=arrConstraint.join(' and ')
		}
		if(Object.keys(spar).length>0){
			query+=
				" order by "
			;

			var arrSorts=[];
			Object.keys(spar).forEach(function(k,kidx){
				k=k.substring(k.indexOf("(")+1);
				k=k.substring(0,k.indexOf(")"));
				var dir=k[0]=='-'?'DESC':'ASC';
				var fld=k.substring(1).toLowerCase();
				CPrintln(fld);
				CPrintln(dir);
				arrSorts.push(
					 fld
					+" "
					+dir
				);
			});
			query+=arrSorts.join(' and ')

		}
		query+=
			 " limit "
			+limit
			+" offset "
			+offset
		;
		CPrintln(query);
		//------------------------------------------------------------------------------
		//SELECT
		//------------------------------------------------------------------------------
		var r=DBQuery(
			"lnks"
			,query
			,{}
		);
		if(r!=undefined){
			var cols=r.Columns();
			var ret=[];
			while(r.Next()){
				var rowobj={};
				r.Data().forEach(function(col,colidx){
					rowobj[cols[colidx]]=col;
				})
				ret.push(rowobj);
			}
			out.Println(JSON.stringify(ret,0,'\t'))
		}else{
			out.Print("Failed to query");
		}
	}catch(e){
		CPrintln(e.toString());
	}
}:lnksys.dbjson;
@>
