<@
	/*
	 * todo: check if token in json body...act accordingly
	 */
	//CPrintln("server.js:start")
	function main(){
		var ret={};
		var parsed=parseInput();
		//CPrintln(JSON.stringify(parsed));
		if(parsed.err==null){
			CPrintln(parsed.action)
			switch(parsed.action){
				case "getSession":
					request.AddResource("/getsession.js")
					return;
					break;
				case "getSessionData":
					Parameters()
					.SetParameter(
						'token',
						true,
						parsed.params.token
					);
					//check for session key in params
					request.AddResource("/getsessiondata.js")
					return;
					break;
				case "create":
					request.AddResource("/create.js")
					return;
					break;
				case "update":
					request.AddResource("/update.js")
					return;
					break;
				case "get":
					request.AddResource("/get.js")
					return;
					break;
				default:
					ret.error="Error: \""+parsed.action+"\" not found";
					break;
			}
			out.Println(JSON.stringify(ret));
		}else{
			out.Println(JSON.stringify(parsed));
		}
	}
	function parseInput(){
		var ret={};
		try{
			var body=request.RequestContent().String();
			var bodyobj=JSON.parse(body);
			//validate
			if(bodyobj.action==null){
				ret.err="No action specified"
			}else{
				if(typeof(bodyobj.action)!='string'){
					ret.err="Action must by string"
				}else{
					if(bodyobj.params!=null){
						if(typeof(bodyobj.params)!='object'){
							ret.err="Params must by object"
						}else{
							ret=bodyobj;
						}
					}else{
						ret.msg=bodyobj;
					}
				}
			}
		}catch(e){
			ret.err=e;
		}
		return ret;
	}
	main();
	//CPrintln("server.js:end")
@>
