<@
	CPrintln('/lib/sjs/lnksys/session/mgr.js:start:'+new Date().getTime());
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	try{
		//----------------------------------------
		//declare
		//----------------------------------------
		lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
		lnksys.session=typeof(lnksys.session)=='undefined'?{}:lnksys.session;
		lnksys.session.Manager=typeof(lnksys.session.Manager)=='undefined'?new Class({
			//--------------------------------
			className:resource().Path(),
			//--------------------------------
			initialize:function(bufmodP){
				this.debug("initialize()");
				this.dbinit();
			},
			createSession:function(){
				this.debug("createSession()");
				var guid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
					.replace(
						/[xy]/g,
						function(c) {
							var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
							return v.toString(16);
						}
					);
				var data={created:new Date().getTime()};
				this.dbupsert(guid,data);
				var ret={};//this.dbselect(guid);
				return ret==null?{}:{csrftoken:guid,data:data};
				return this.dbselect(guid);//{};
				return ret;
			},
			setSessionData:function(guidP,dataP){
				this.debug("setSessionData()");
				var ret={};
				if(guidP!=null){
					var ses=this.getSession(guidP);
					if(ses!=null){
						if(this.dbupsert(guidP,dataP)){
							return this.getSession(guidP);
						}else{
							ret.error="Failed to update session";
						}
					}else{
						ret.error="Session "+guidP+" not found";
					}
				}else{
					ret.error="Not GUID specified";
				}
				return ret;
			},
			getSession:function(guidP){
				this.debug('getSession()');
				var ret=[];
				if(guidP!=null){
					var r=DBQuery(
						"lnks",
						"select * from session where id=@guid@ LIMIT 1",
						{
							guid:guidP
						}
					);
					if(r!=undefined){
						ret=[];
						while(r.Next()){
							var row={};
							row.csrftoken=r.Data()[0];
							row.data=JSON.parse(r.Data()[1]);
							ret.push(row);
						}
					}else{
						CPrintln("NO ROWS");
					}
				}else{
					ret.error="No GUID specified";
				}
				return ret;
			},
			getSessions:function(){
				this.debug('getSessions()');
				var r=DBQuery(
					"lnks",
					"select * from session",
					{}
				);
				var ret=[];
				if(r!=undefined){
					ret=[];
					while(r.Next()){
						var row={};
						row.csrftoken=r.Data()[0];
						row.data=r.Data()[1];
						ret.push(row);
					}
				}else{
					CPrintln("NO ROWS");
				}
				return ret;
			},
			//database
			dbdrop:function(){
				this.debug('dbdrop()');
				try{
					DBExecute(
						"lnks",
						"drop table session"
					);
				}catch(e){
					CPrintln(e.toString());
				}
			},
			dbinit:function(){
				this.debug('dbdrop()');
				try{
					DBExecute(
						"lnks",
						"create table  if not exists session (id varchar NOT NULL PRIMARY KEY, data json NOT NULL)"
					);
				}catch(e){
					CPrintln(e.toString());
				}
			},
			dbselect:function(guidP){
				this.debug('dbselect()');
				var r=DBQuery(
					"lnks",
					"select data from session where id=@guid@",
					{
						guid:guidP
					}
				);
				var ret=null;
				if(r!=undefined){
					while(r.Next()){
						r.Data().forEach(function(col,colidx){
							try{
								ret=JSON.parse(col);
							}catch(e){
								ret={};
								ret.error=e.toString()
							}
						})
					}
				}else{
					CPrintln("NO ROWS");
				}
				return ret;
			},
			dbupsert:function(guid,data){
				this.debug('dbupsert()');
				var ret=false;
				try{
					DBExecute(
						"lnks",
						"insert into session (id,data) values (@guid@,@data@) on conflict (id) do update set data=excluded.data",
						{
							guid:guid,
							data:JSON.stringify(data)
						}
					);
					ret=true;
				}catch(e){
					CPrintln(e.toString());
					ret=false;
				}
				return ret;
			},
			log:function(a){
				console.log(this.className+":"+a.toString());
			},
			warn:function(a){
				console.warn(this.className+":"+a.toString());
			},
			debug:function(a){
				console.debug(this.className+":"+a.toString());
			},
			error:function(a){
				console.error(this.className+":"+a.toString());
			}
		}):lnksys.session.Manager
		;
		CPrintln('/lib/sjs/lnksys/session/mgr.js:end:'+new Date().getTime());
	}catch(e){
		console.error(e.toString());
	}
@>
