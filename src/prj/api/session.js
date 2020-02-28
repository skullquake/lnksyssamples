<@
	/*
	 * --------------------
	 * session manipulation
	 * --------------------
	 * sample usage
	 * --------------------
	 * list all:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"list"}' http://localhost:1111/api/session.js
	 * --------------------
	 * list individual:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"list","params":{"guid":"c6378dcb-4457-440f-8821-cbdd2b477202"}}' http://localhost:1111/api/session.js
	 * --------------------
	 * create:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"create"}' http://localhost:1111/api/session.js
	 * --------------------
	 * drop:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"drop"}' http://localhost:1111/api/session.js
	 * --------------------
	 * delete:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"delete","params":{"guid":"c6378dcb-4457-440f-8821-cbdd2b477202"}}' http://localhost:1111/api/session.js
	 * --------------------
	 * set data:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"put","params":{"guid":"c6378dcb-4457-440f-8821-cbdd2b477202","data":{"foo":"barasdf"}}}' http://localhost:1111/api/session.js
	 * --------------------
	 */
	main();
	function main(){
		request.ResponseHeader().Add("Content-type","application/json");
		include('/lib/sjs/lnksys/libconsole.js')
		try{
			include('/lib/sjs/lnksys/libses.js')
			var ret={};
			var sm=new lnksys.session.Manager();
			switch(request.RequestMethod()){
				case 'POST':
					var body=getBody();
					if(body!=null){
						switch(body.action){
							case 'create':
								ret=sm.createSession();
								break;
							case 'list':
								if(body.params!=null&&body.params.guid!=null){
									console.warn('guid')
									console.debug(body.params.guid)
									ret=sm.getSession(body.params.guid);
								}else{
									console.warn('*')
									ret=sm.getSessions();
								}
								break;
							case 'put':
								console.warn('put')
								if(
									body.params!=null&&body.params.guid!=null&&body.params.data!=null
								){
									ret=sm.setSessionData(body.params.guid,body.params.data);
								}else{
									ret.error="GUID|DATA null"
								}
								break;

							case 'delete':
								if(body.params!=null&&body.params.guid!=null){
									ret=sm.dbdelete(body.params.guid);
								}else{
									ret.error="No guid";
								}
								break;
							case 'drop':
								sm.dbdrop();
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
