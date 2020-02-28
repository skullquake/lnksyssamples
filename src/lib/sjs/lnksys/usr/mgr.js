<@
	CPrintln('/lib/sjs/lnksys/user/mgr.js:start:'+new Date().getTime());
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	try{
		//----------------------------------------
		//declare
		//----------------------------------------
		lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
		lnksys.user=typeof(lnksys.user)=='undefined'?{}:lnksys.user;
		lnksys.user.Manager=typeof(lnksys.user.Manager)=='undefined'?new Class({
			//--------------------------------
			className:resource().Path(),
			//--------------------------------
			initialize:function(bufmodP){
				this.debug("initialize()");
				this.dbinit();
			},
			createUser:function(nameP,passP,dataP){
				this.debug("createUser()");
				var ret={};
				if(nameP!=null&&passP!=null){
					var dataP=dataP==null?{modified:new Date().getTime()}:dataP;
					dataP.modified=new Date().getTime();
					try{
						DBExecute(
							"lnks",
							"insert into usr (name,pass,data) values (@name@,@pass@,@data@)",
							{
								name:nameP,
								pass:passP,
								data:JSON.stringify(dataP)
							}
						);
						ret={name:nameP,pass:passP,data:dataP};
					}catch(e){
						CPrintln(e.toString());
						ret.error=e.toString();
					}
				}else{
					ret.error=[];
					nameP==null?ret.error.push("nameP null"):null;
					passP==null?ret.error.push("passP null"):null;
				}
				return ret;
			},
			setUser:function(nameP,dataP){
				this.debug("setUser()");
				this.log(nameP);
				var ret={};
				if(
					nameP!=null&&
					typeof(nameP)=='string'&&
					dataP!=null&&
					Object.keys(dataP).length>0
				){
					var q="update usr set ";
					Object.keys(dataP).forEach(function(k,kidx){
						q+=k+"=@"+k+"@ "
					});
					q+=" where name=@nameOld@",
					dataP.nameOld=nameP;
					if(dataP.data!=null){//deal with json limitation
						dataP.data=JSON.stringify(dataP.data);
					}
					this.warn(q);
					try{
						DBExecute(
							"lnks",
							q,
							dataP
						);
						ret=true;
					}catch(e){
						CPrintln(e.toString());
						ret=false;
					}
					/*
					*/
				}else{
					this.error("Invalid paramers");
				}
				return ret;
			},




			setUserPassword:function(nameP,passP){
				this.debug("setUserPassword()");
				var ret={};
				if(nameP!=null){
					var usr=this.getUser(nameP);
					if(usr!=null){
						if(this.dbupsert(nameP,dataP)){
							return this.getUser(nameP);
						}else{
							ret.error="Failed to update user";
						}
					}else{
						ret.error="User "+nameP+" not found";
					}
				}else{
					ret.error="nameP NULL";
				}
				return ret;
			},
			setUserData:function(nameP,dataP){
				this.debug("setUserData()");
				var ret={};
				if(nameP!=null){
					var usr=this.getUser(nameP);
					if(usr!=null){
						if(this.dbupsert(nameP,dataP)){
							return this.getUser(nameP);
						}else{
							ret.error="Failed to update user";
						}
					}else{
						ret.error="User "+nameP+" not found";
					}
				}else{
					ret.error="nameP NULL";
				}
				return ret;
			},
			getUser:function(nameP){
				this.debug('getUser()');
				var ret=null;
				if(nameP!=null){
					var r=DBQuery(
						"lnks",
						"select name,pass,data from usr where name=@name@ LIMIT 1",
						{
							name:nameP
						}
					);
					if(r!=undefined){
						ret={};
						while(r.Next()){
							try{ret.name=r.Data()[0]}catch(e){ret.name=e.toString();};
							try{ret.pass=r.Data()[1]}catch(e){ret.pass=e.toString();};
							try{ret.data=JSON.parse(r.Data()[2])}catch(e){ret.pass=e.toString();};
						}
					}else{
						CPrintln("NO ROWS");
					}
				}else{
					ret.error="No GUID specified";
				}
				return ret;
			},
			getUsers:function(){
				this.debug('getUsers()');
				var r=DBQuery(
					"lnks",
					"select name,pass,data from usr",
					{}
				);
				var ret=null;
				if(r!=undefined){
					ret=[];
					while(r.Next()){
						var row={};
						try{row.name=r.Data()[0]}catch(e){row.name=e.toString();};
						try{row.pass=r.Data()[1]}catch(e){row.pass=e.toString();};
						try{row.data=JSON.parse(r.Data()[2])}catch(e){row.pass=e.toString();};
						ret.push(row);
						this.warn(JSON.stringify(row));
					}
				}else{
					CPrintln("NO ROWS");
				}
				return ret;
			},
			//database
			dropUsers:function(){
				var ret=false;
				this.debug('dropUsers()');
				try{
					DBExecute(
						"lnks",
						"DROP TABLE usr"
					);
					ret=true;
				}catch(e){
					CPrintln(e.toString());
				}
				return ret;
			},
			dbinit:function(){
				this.debug('dbinit()');
				try{
					DBExecute(
						"lnks",
						  "create table if not exists usr (name varchar NOT NULL PRIMARY KEY, pass VARCHAR NOT NULL, data json NOT NULL)",
						//"create table if not exists session (id varchar NOT NULL PRIMARY KEY, data json NOT NULL)",
						{}
					);
				}catch(e){
					CPrintln(e.toString());
				}
			},
			/*
			dbselect:function(nameP){
				this.debug('dbselect()');
				var r=DBQuery(
					"lnks",
					"select data from usr where name=@name@",
					{
						name:nameP
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
			dbupdateUser:function(namePOld,namePNew){
				if(namePOld!null&&passPNew!=null)
				this.debug('dbupdateUser()');
				var ret=false;
				try{
					DBExecute(
						"lnks",
						"update usr set name=@nameNew@ where name=@nameOld@",
						{
							nameNew:namePNew,
							nameOld:namePOld
						}
					);
					ret=true;
				}catch(e){
					CPrintln(e.toString());
					ret=false;
				}
				return ret;
			},
			dbupdatePass:function(nameP,passP){
				if(nameP!null&&passP!=null)
				this.debug('dbupdatePass()');
				var ret=false;
				try{
					DBExecute(
						"lnks",
						"update usr set pass=@pass@ where name=@name@",
						{
							name:nameP,
							pass:passP
						}
					);
					ret=true;
				}catch(e){
					CPrintln(e.toString());
					ret=false;
				}
				return ret;
			},
			dbupdateData:function(nameP,dataP){
				if(nameP!null&&dataP!=null)
				this.debug('dbupdateDate()');
				var ret=false;
				try{
					DBExecute(
						"lnks",
						"update usr set data=@data@ where name=@name@",
						{
							name:nameP,
							data:dataP
						}
					);
					ret=true;
				}catch(e){
					CPrintln(e.toString());
					ret=false;
				}
				return ret;
			},
			*/
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
		}):lnksys.user.Manager
		;
		CPrintln('/lib/sjs/lnksys/user/mgr.js:end:'+new Date().getTime());
	}catch(e){
		console.error(e.toString());
	}
@>

