<@
	/*
	 * --------------------
	 * user manipulation
	 * --------------------
	 * sample usage
	 * --------------------
	 *  create:
	 *  curl -X POST -H "Content-type: application/json" --data '{"action":"create","params":{"user":"usr0","pass":"1234"}}' http://localhost:1111/api/user.js
	 *  get one:
	 *  curl -X POST -H "Content-type: application/json" --data '{"action":"get","params":{"name":"usr0"}}' http://localhost:1111/api/user.js
	 *  list all:
	 *  curl -X POST -H "Content-type: application/json" --data '{"action":"list"}' http://localhost:1111/api/user.js
	 *  set name 
	 *  curl -X POST -H "Content-type: application/json" --data '{"action":"set","params":{"name":"usr0","data":{"name":"usr1"}}}' http://localhost:1111/api/user.js
	 *  set password
	 *  curl -X POST -H "Content-type: application/json" --data '{"action":"set","params":{"name":"usr0","data":{"pass":"4321"}}}' http://localhost:1111/api/user.js
	 *  set data
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"set","params":{"name":"usr0","data":{"data":[0,1,2,3]}}}' http://localhost:1111/api/user.js 
	 * --------------------
	 */
	main();
	function main(){
		request.ResponseHeader().Add("Content-type","application/json");
		include('/lib/sjs/lnksys/libconsole.js')
		try{
			include('/lib/sjs/lnksys/libusr.js')
			var ret={};
			var sm=new lnksys.user.Manager();
			switch(request.RequestMethod()){
				case 'POST':
					var body=getBody();
					if(body!=null){
						switch(body.action){
							case 'create':
								if(
									body.params!=null&&
									body.params.user!=null&&
									typeof(body.params.user)=='string'&&
									body.params.pass!=null&&
									typeof(body.params.pass)=='string'
								){
									ret=sm.createUser(body.params.user,body.params.pass);
								}else{
									ret.error=[];
									if(body.params==null){
										ret.error.push("params NULL");
									}else{
										if(body.params.user==null){
											ret.error.push("params.user NULL");
										}else{
											if(typeof(body.params.user)!="string"){
												ret.error.push("params.user not string");
											}
										}
										if(body.params.pass==null){
											ret.error.push("params.pass NULL");
										}else{
											if(typeof(body.params.pass)!="string"){
												ret.error.push("params.pass not string");
											}
										}
									}
								}
								break;
							case 'set':
								if(
									body.params!=null&&
									body.params.name!=null&&
									typeof(body.params.name)=='string'&&
									body.params.data!=null&&
									Object.keys(body.params.data).length>0
								){
									ret=sm.setUser(body.params.name,body.params.data);
								}else{
									ret.error=[];
									if(body.params.name==null){
										ret.error.push('params.name NULL');
									}else{
										if(typeof(body.params.name)!='string'){
											ret.error.push('params.name not string');
										}
									}
									if(body.params.data==null){
										ret.error.push('params.data NULL');
									}else{
										if(Object.keys(body.params.data).length==0){
											ret.error.push("params.data.length 0")
										}
									}
								}
								break;
							case 'get':
								if(
									body.params!=null&&
									body.params.name!=null&&
									typeof(body.params.name)=='string'
								){
									var usr=sm.getUser(body.params.name);
									ret=usr==null?{}:usr;
								}else{
									if(body.params==null){
										ret.error="params NULL";
									}else{
										if(body.params.name==null){
											ret.error="params.name NULL";
										}else{
											if(typeof(body.params.name)!='string'){
												ret.error="params.name not string";
											}
										}
									}
								}
								break;
							case 'list':
								ret=sm.getUsers();
								break;
							case 'drop':
								ret=sm.dropUsers();
								break;
							case null:
								ret.error='No action specified';
								break;
							default:
								ret.error='Invalid action specified';
						}
					}else{
						ret.error="No body";
					}
					break;
				default:
					ret.error="Invalid method";
					break;
			}
			out.Println(JSON.stringify(ret));
		}catch(e){
			console.error(e.toString());

		}
		return 0;
	}
	function getBody(){
		var body=request.RequestContent().String();
		try{
			return JSON.parse(body);
		}catch(e){
			CPrintln(e.toString());
			return null;
		}
	}
@>
