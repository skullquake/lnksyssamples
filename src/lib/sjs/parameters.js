<@
// curl -X POST -H "Content-type: application/jsonz" -H "X-foo: fooval" -d '{"asdf":"foo","qwer":["asdf":"fdsa","qwer":"rewq"]}' "http://localhost:1111/sjs/parameters.js?uk0=uv0&uk1=uv1"
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
			out.Println("\ttype: "+typeof(o));
			Object.keys(o).forEach(function(k,kidx){
				out.Print('\t'+k+":"+typeof(o[k]));
				out.Print("\n");
			});
		}else{
			out.Println("NULL!");
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
	//printkeys(Parameters())
}catch(e){
	out.Print(e.toString());
}
@>
