<@
// --------------------------------------------------------------------------------
// interrogation of dojo/data/JsonRest request
// --------------------------------------------------------------------------------
/*
----------------------------------------
Parameters:
DEPARTMENT:sales
SORT( NAME,-UNDEFINED):
----------------------------------------
Headers:
Connection:keep-alive
Accept:application/javascript, application/json
X-Requested-With:XMLHttpRequest
X-Range:items=0-9
User-Agent:Mozilla/5.0 (Linux; Android 7.0; SM-G920F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.136 Mobile Safari/537.36
Sec-Fetch-Site:same-origin
Sec-Fetch-Mode:cors
Referer:http://localhost:1111/index.html
Cookie:originURI=/login.html
Range:items=0-9
Accept-Encoding:identity
Accept-Language:en-US,en;q=0.9
----------------------------------------
Body:

----------------------------------------
*/
// --------------------------------------------------------------------------------
CPrintln("/js/modules/employees.json"); 
CPrintln("parameters");
try{
	//remember to set first!
	request.ResponseHeader().Add("Content-type","text/plain");
	var arrHdr=[
		"X-foo",
		"X-bar",
		"X-baz",
		"X-qux",
		"X-klutz"
	];
	arrHdr.forEach(function(h,hidx){
		request.ResponseHeader().Add(h,h+"_value");
	});
	function printkeys(o){
		if(o!=null){
			CPrintln("\ttype: "+typeof(o));
			Object.keys(o).forEach(function(k,kidx){
				out.Print('\t'+k+":"+typeof(o[k]));
				out.Print("\n");
			});
		}else{
			CPrintln("NULL!");
		}
		out.Print('\n');
	}
	function parametersToJson(o){
		var ret={}
		Parameters().StandardKeys().forEach(function(k,kidx){
			ret[k]=Parameters().Parameter(k)[0];
		});
		return ret;
	}
        function getBody(){
		return request.RequestContent();
	}
	CPrintln("----------------------------------------");
	CPrintln("Parameters:");
	Parameters().StandardKeys().forEach(function(k,kidx){
		CPrintln(k+":"+Parameters().Parameter(k)[0]);
	});
	CPrintln("----------------------------------------");
	CPrintln("Headers:");
	request.RequestHeaders().forEach(function(k,kidx){
		CPrintln(
			k+":"+
			request.RequestHeader().Get(k)
		);
	})
	CPrintln("----------------------------------------");
	CPrintln("Body:");
	CPrintln(getBody());
	CPrintln("----------------------------------------");
	//printkeys(Parameters())
}catch(e){
	out.Print(e.toString());
}
@>
<@
CPrintln("parameters");
try{
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
	CPrintln(request.RequestHeader().Get("Range"))
	/*
	//remember to set first!
	request.ResponseHeader().Add("Content-type","text/plain");
	var arrHdr=[
		"X-foo",
		"X-bar",
		"X-baz",
		"X-qux",
		"X-klutz"
	];
	arrHdr.forEach(function(h,hidx){
		request.ResponseHeader().Add(h,h+"_value");
	});
	function parametersToJson(o){
		var ret={}
		Parameters().StandardKeys().forEach(function(k,kidx){
			ret[k]=Parameters().Parameter(k)[0];
		});
		return ret;
	}
        function getBody(){
		return request.RequestContent();
	}
	out.Println("----------------------------------------");
	out.Println("Protocol:");
	out.Println("----------------------------------------");
	out.Println(request.RequestProtocol());
	out.Println("----------------------------------------");
	out.Println("Method:");
	out.Println("----------------------------------------");
	out.Println(request.RequestMethod());
	out.Println("----------------------------------------");
	out.Println("Parameters:");
	Parameters().StandardKeys().forEach(function(k,kidx){
		out.Println(k+":"+Parameters().Parameter(k)[0]);
	});
	out.Println("----------------------------------------");
	out.Println("Headers:");
	request.RequestHeaders().forEach(function(k,kidx){
		out.Println(
			k+":"+
			request.RequestHeader().Get(k)
		);
	})
	out.Println("----------------------------------------");
	out.Println("Body:");
	out.Println(getBody());
	out.Println("----------------------------------------");
	*/
}catch(e){
	out.Print(
		JSON.stringify(
			{
				error:e.toString()
			}
		)
	);
}
@>

<@
//------------------------------------------------------------------------------
//SELECT
//------------------------------------------------------------------------------
try{
	var r=DBQuery(
		"lnks",
		"select * from employees",
		{}
	);
	if(r!=undefined){
		var cols=r.Columns();
		var ret=[];
		while(r.Next()){
			var rowobj={};
			r.Data().forEach(function(col,colidx){
				rowobj[cols[colidx]]=col;
				ret.push(rowobj);
			})
		}
		out.Println(JSON.stringify(ret,0,'\t'))
	}else{
		out.Print("Failed to query");
	}
}catch(e){
	out.Print(e.toString());
}
@>
