<@
lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
lnksys.httpbin=typeof(lnksys.httpbin)=='undefined'?function(){
	var ret={}
	try{
		//------------------------------------------------------------------------
		//UTIL
		//------------------------------------------------------------------------
		function parametersToJson(o){
			var pars={};
			Parameters().StandardKeys().forEach(function(k,kidx){
				pars[k]=Parameters().Parameter(k)[0];
			});
			return pars;
		}
		function headersToJson(){
			var headers={};
			request.RequestHeaders().forEach(function(k,kidx){
				headers[k]=request.RequestHeader().Get(k);
			})
			return headers;
		}
		function getBody(){
			return request.RequestContent().String();
		}
		//------------------------------------------------------------------------
		//HDL METHOD
		//------------------------------------------------------------------------
		function hdlmth(m){
			switch(m){
				case "GET":
					ret.body=getBody();
					break;
				case "POST":
					ret.body=getBody();
					break;
				case "DELETE":
					ret.body=getBody();
					break;
				case "PUT":
					ret.body=getBody();
					break;
				case "PATCH":
					ret.body=getBody();
					break;
				default:
					ret.body=getBody();
					break;
			}
		}
		//------------------------------------------------------------------------
		//RET
		//------------------------------------------------------------------------
		var ret={
			method:request.RequestMethod()
		};
		//------------------------------------------------------------------------
		//PUT HDR
		//------------------------------------------------------------------------
		function puthdr(a){
			request.ResponseHeader().Add("Content-type","application/json");
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
		}
		ret.parameters=parametersToJson();
		ret.headers=headersToJson();
		ret.protocol=request.RequestProtocol();
		hdlmth(ret.method);
		return ret;
	}catch(e){
		ret.error=e.toString();
	}
}:lnksys.httpbin;
@>
