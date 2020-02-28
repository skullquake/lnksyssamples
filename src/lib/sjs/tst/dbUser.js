<@
	/*
	 * User/Session example
	 * sample usage
	 * --------------------
	 * list sessions:
	 * curl -X POST -H "Content-type: application/json" --data '{"action":"listSessions"}' http://localhost:1111/lib/sjs/tst/dbUser.js
	 */
	ADMIN_PASS="1234";
	var tblUser="Usr";
	var tblSession="Ses";
	function main(){
		request.ResponseHeader().Add("Content-type","application/json");
		include("/lib/sjs/lnksys/libconsole.js");
		include(true,"/lib/sjs/cjs/cjs.js");
		//------------------------------------------------------------------------
		function dropDb(){
			console.debug("dropDb");
			ret=true;
			try{
				DBExecute(
					"lnks",
					"DROP TABLE IF EXISTS "+tblUser+" CASCADE",
					{
					}
				);
			}catch(e){
				this.error(e.toString());
				ret=false;
			}
			try{
				console.debug("drop");
				DBExecute(
					"lnks",
					"DROP TABLE IF EXISTS "+tblSession+" CASCADE",
					{
					}
				);
			}catch(e){
				this.error(e.toString());
				ret=false;
			}
			return ret;
		}
		//------------------------------------------------------------------------
		function initDb(){
			console.debug('initDb');
			var ret=true;
			try{
				DBExecute(
					"lnks",
					"CREATE TABLE IF NOT EXISTS "+tblUser+"(id SERIAL PRIMARY KEY,name VARCHAR UNIQUE NOT NULL,pass VARCHAR NOT NULL,data JSON NOT NULL)",
					{
					}
				);
			}catch(e){
				this.error(e.toString());
				ret=false;
			}
			try{
				DBExecute(
					"lnks",
					//"CREATE TABLE IF NOT EXISTS "+tblSession+" (id SERIAL PRIMARY KEY,id VARCHAR UNIQUE NOT NULL PRIMARY KEY,usr_id INT NOT NULL,data JSON NOT NULL,FOREIGN KEY(usr_id) REFERENCES "+tblUser+"(id) ON DELETE CASCADE)",//ockert
					"CREATE TABLE IF NOT EXISTS "+tblSession+" (id VARCHAR UNIQUE NOT NULL PRIMARY KEY,usr_id INT NOT NULL,data JSON NOT NULL,FOREIGN KEY(usr_id) REFERENCES "+tblUser+"(id) ON DELETE CASCADE)",//ockert
					{
					}
				);
			}catch(e){
				this.error(e.toString());
				ret=false;
			}
			return ret;
		}
		//------------------------------------------------------------------------
		function populate(){
			console.debug("populate");
			var ret=true;
			try{
				var pidx=0;
				var cidx=0;
				for(var i=0;i<2;i++){
					try{
						DBExecute(
							"lnks",
							"INSERT INTO "+tblUser+"(id,name,pass,data)VALUES(@id@,@name@,@pass@,@data@)",
							{
								id:pidx,
								name:'usr'+pidx,
								pass:'1234',
								data:JSON.stringify({usr_ts:new Date().getTime()})
							}
						);
						pidx++;
						for(var j=0;j<4;j++){
							DBExecute(
								"lnks",
								"INSERT INTO "+tblSession+"(usr_id,data)VALUES(@usr_id@,@data@);",
								{
									usr_id:i,
									data:JSON.stringify({"ses_ts":new Date().getTime()})
								}
							);
						}
					}catch(e){
						console.error(e.toString());
						ret=false;
					}
				}
			}catch(e){
				console.error(e.toString());
				ret=false;
			}
			return ret;
		}
		//------------------------------------------------------------------------
		//USER
		//------------------------------------------------------------------------
		function addUserFunctions(ret){
			if(ret!=null){
				ret.set=function(k,v){
					if(k!=null){
						if(this.fields[k]!=null){
							if(this.fields[k].ordinal!=null){
								this.data[0][this.fields[k].ordinal]=v;
							}
						}else{
							console.error('No field '+k);
						}
					}else{
						console.error('k NULL');
					}
				};
				ret.get=function(k){
					var ret=null;
					if(k!=null){
						if(this.fields[k]!=null){
							if(this.fields[k].ordinal!=null){
								ret=this.data[0][this.fields[k].ordinal];
							}
						}else{
							console.error('No field '+k);
						}
					}else{
						console.error('k NULL');
					}
					return ret;
				};
				ret.update=function(){
					return updateUser(this);
				}
				ret.refresh=function(){
					var objnew=DBQuery(
						"lnks",
						"SELECT *\n"+
						"FROM "+tblUser+"\n"+
						"WHERE\n"+
						"	id=@id@\n"+
						"LIMIT 1\n",
						{
							id:this.get("id")
						}
					).Map(
						{
							"include-fields-defs":true,
							"include-fields":true,
							"include_data_fields":true
						}
					);
					this.data=objnew.data;
				}
				ret.createSession=function(){
					var ses=createSession(this.get('id'));
					return ses;
				}
				ret.getSessions=function(){
					var ret=[];
					try{
						var rows=DBQuery(
							"lnks",
							"SELECT *\n"+
							"FROM "+tblSession+"\n"+
							"WHERE usr_id=@id@",
							{
								id:this.get('id')
							}
						).Map(
							{
								"include-fields-defs":true,
								"include-fields":true,
								"include_data_fields":true
							}
						);
						rows.data.forEach(function(row,rowidx){
							var obj={};
							obj.fields=rows.fields;
							obj.data=[];
							obj.data.push(row);
							addSessionFunctions(obj);
							ret.push(obj);
						})
					}catch(e){
						console.error(e.toString());
					}
					return ret;
				}


			};
			ret.remove=function(){
				var ret=false;
				try{
					var r=DBExecute(
						"lnks",
						"DELETE FROM "+tblUser+"\n"+
						"WHERE\n"+
						"	id=@id@\n",
						{
							id:this.get("id")
						}
					)
					if(r.RowsAffected>0){
						ret=true;
					}else{
						ret=false;
					}
				}catch(e){
					console.error(e.toString());
					ret=false;
				}
				//this={};//???
				return ret;
			};

		}
		function retrieveUser(nameP){
			var ret=null;
			try{
				ret=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblUser+"\n"+
					"WHERE\n"+
					"	name=@name@\n"+
					"LIMIT 1\n",
					{
						name:nameP
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				console.warn(ret['record-count']);
				if(ret['record-count']>0){
					addUserFunctions(ret);
				}else{
					ret=null;
				}
			}catch(e){
				console.error(e.toString());
			}
			return ret;
		}
		function retrieveUserById(idP){
			var ret=null;
			try{
				ret=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblUser+"\n"+
					"WHERE\n"+
					"	id=@id@\n"+
					"LIMIT 1\n",
					{
						id:idP
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				console.warn(ret['record-count']);
				if(ret['record-count']>0){
					addUserFunctions(ret);
				}else{
					ret=null;
				}
			}catch(e){
				console.error(e.toString());
			}
			return ret;
		}

		function retrieveUsers(){
			var ret=[];
			try{
				var rows=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblUser+"\n",
					{
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				rows.data.forEach(function(row,rowidx){
					var obj={};
					obj.fields=rows.fields;
					obj.data=[];
					obj.data.push(row);
					addUserFunctions(obj);
					ret.push(obj);
				})
			}catch(e){
				console.error(e.toString());
			}
			return ret;
		}
		function createUser(nameP,passP,dataP){
			console.debug('createUser');
			dataP=dataP==null?{usr_ts:new Date().getTime()}:dataP;
			var ret={};
			try{
				var a=DBExecute(
					"lnks",
					"INSERT INTO "+tblUser+"(name,pass,data)VALUES(@name@,@pass@,@data@)",
					{
						name:nameP,
						pass:passP,
						data:JSON.stringify(dataP)
					}
				);
				if(a.RowsAffected>0){
					ret=DBQuery(
						"lnks",
						"SELECT *\n"+
						"FROM "+tblUser+"\n"+
						"WHERE\n"+
						"	name=@name@\n"+
						"LIMIT 1\n",
						{
							name:nameP
						}
					).Map(
						{
							"include-fields-defs":true,
							"include-fields":true,
							"include_data_fields":true
						}
					);
					addUserFunctions(ret);
				}else{
					ret=null;
				}
				/*
				console.warn(Object.keys(a).join(','));
				console.warn('Err:'+a.Err);
				console.warn('RowsAffected:'+a.RowsAffected);
				console.warn('LastInsertId:'+a.LastInsertId);
				console.warn(1);
				*/
			}catch(e){
				ret=null;
				console.error(e.toString());
			}
			return ret;
		}
		function updateUser(userP){
			console.debug('updateUser');
			var ret=true;
			try{
				var a=DBExecute(
					"lnks",
					"UPDATE "+tblUser+" SET name=@name@,pass=@pass@,data=@data@ WHERE id=@id@",
					{
						id:userP.data[0][0],
						name:userP.data[0][1],
						pass:userP.data[0][2],
						data:userP.data[0][3]
					}
				);
				ret=a.RowsAffected>0;
			}catch(e){
				ret=false;
				console.error(e.toString());
			}
			return ret;
		}
		//------------------------------------------------------------------------
		//SESSION
		//------------------------------------------------------------------------
		function addSessionFunctions(ret){
			ret.set=function(k,v){
				if(k!=null){
					if(this.fields[k]!=null){
						if(this.fields[k].ordinal!=null){
							this.data[0][this.fields[k].ordinal]=v;
						}
					}else{
						console.error('No field '+k);
					}
				}else{
					console.error('k NULL');
				}
			};
			ret.get=function(k){
				var ret=null;
				if(k!=null){
					if(this.fields[k]!=null){
						if(this.fields[k].ordinal!=null){
							ret=this.data[0][this.fields[k].ordinal];
						}
					}else{
						console.error('No field '+k);
					}
				}else{
					console.error('k NULL');
				}
				return ret;
			};
			ret.update=function(){
				return updateSession(this);
			};
			ret.refresh=function(){
				var objnew=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblSession+"\n"+
					"WHERE\n"+
					"	id=@id@\n"+
					"LIMIT 1\n",
					{
						id:this.get("id")
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				this.data=objnew.data;
			};
			ret.getUser=function(){
				var obj_usr=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblUser+"\n"+
					"WHERE\n"+
					"	id=@id@\n"+
					"LIMIT 1\n",
					{
						id:this.get("usr_id")
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				addUserFunctions(obj_usr);
				return obj_usr;

			};
			ret.remove=function(){
				var ret=false;
				try{
					var r=DBExecute(
						"lnks",
						"DELETE FROM "+tblSession+"\n"+
						"WHERE\n"+
						"	id=@id@\n",
						{
							id:this.get("id")
						}
					)
					if(r.RowsAffected>0){
						ret=true;
					}else{
						ret=false;
					}
				}catch(e){
					console.error(e.toString());
					ret=false;
				}
				//this={};//???
				return ret;
			};


		}
		function createSession(p_idP,dataP){
			console.debug('createSession');
			function uuidv4(){
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
					.replace(
						/[xy]/g,
						function(c) {
							var r=Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
							return v.toString(16);
						}
					);
			};
			dataP=dataP==null?{usr_ts:new Date().getTime()}:dataP;
			var id=uuidv4();
			var ret={};
			try{
				var a=DBExecute(
					"lnks",
					"INSERT INTO "+tblSession+" (id,"+tblUser+"_id,data) VALUES (@id@,@p_id@,@data@)",
					{
						id:id,
						p_id:p_idP,
						data:JSON.stringify(dataP)
					}
				);
				if(a.RowsAffected>0){
					ret=DBQuery(
						"lnks",
						"SELECT *\n"+
						"FROM "+tblSession+"\n"+
						"WHERE\n"+
						"	id=@id@\n"+
						"LIMIT 1\n",
						{
							id:id
						}
					).Map(
						{
							"include-fields-defs":true,
							"include-fields":true,
							"include_data_fields":true
						}
					);
					addSessionFunctions(ret);
				}else{
					ret=null;
				}
				/*
				console.warn(Object.keys(a).join(','));
				console.warn('Err:'+a.Err);
				console.warn('RowsAffected:'+a.RowsAffected);
				console.warn('LastInsertId:'+a.LastInsertId);
				console.warn(1);
				*/
			}catch(e){
				ret=null;
				console.error(e.toString());
			}
			return ret;
		}
		function retrieveSessionById(idP){
			var ret=null;
			try{
				ret=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblSession+"\n"+
					"WHERE\n"+
					"	id=@id@\n"+
					"LIMIT 1\n",
					{
						id:idP
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				addSessionFunctions(ret);
			}catch(e){
				console.error(e.toString());
			}
			return ret;
		}
		function retrieveSessions(){
			var ret=[];
			try{
				var rows=DBQuery(
					"lnks",
					"SELECT *\n"+
					"FROM "+tblSession+"\n",
					{
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				rows.data.forEach(function(row,rowidx){
					var obj={};
					obj.fields=rows.fields;
					obj.data=[];
					obj.data.push(row);
					addSessionFunctions(obj);
					ret.push(obj);
				})
			}catch(e){
				console.error(e.toString());
			}
			return ret;
		}
		function updateSession(sessionP){
			console.debug('updateSession');
			var ret=true;
			try{
				var a=DBExecute(
					"lnks",
					"UPDATE "+tblSession+" SET data=@data@ WHERE id=@id@",
					{
						id:sessionP.get('id'),
						data:sessionP.get('data')
					}
				);
				ret=a.RowsAffected>0;
			}catch(e){
				ret=false;
				console.error(e.toString());
			}
			return ret;
		}

		//------------------------------------------------------------------------
		function getSessions(nameP){
			console.debug("getSessions");
			var ret=null;
			try{
				ret=DBQuery(
					"lnks",
					"SELECT \n"+
					"	"+tblUser+".id,\n"+
					"	"+tblUser+".name,\n"+
					"	"+tblUser+".pass,"+
					"	"+tblUser+".data,\n"+
					"	"+tblSession+".id,"+
					"	"+tblSession+".data\n"+
					"FROM "+tblUser+"\n"+
					"INNER JOIN "+tblSession+" ON \n"+
					"	"+tblUser+".id="+tblSession+"."+tblUser+"_id\n"+
					"WHERE\n"+
					"	"+tblUser+".name=@name@\n"+
					"ORDER BY \n"+
					"	"+tblSession+".id ASC",
					{
						name:nameP
					}
				).Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
			}catch(e){
				console.error(e.toString());
			}
			return ret;
		}
		//--------------------------------------------------------------------------------
		function init(){
			dropDb();
			initDb();
		}
		//--------------------------------------------------------------------------------
		function test0(){
			var arr_usr=[];
			for(var i=0;i<8;i++){
				var usr=createUser('usr'+i,'1234');	//creates row, adds functions used below
				usr.set('pass','4321');			//mutator
				usr.set('name',i+'usr')			//...
				usr.set('data','{"foo":"bar"}')		//...
				usr.update();				//commits
				usr.refresh();				//reloads from db based on id
				arr_usr.push(usr);
			}
			arr_usr.forEach(function(usr,usridx){
				console.log([
					usr.get('name'),		//accessor
					usr.get('pass'),		//...
					usr.get('data')			//...
				].join(','));

			});
		}
		//--------------------------------------------------------------------------------
		function test1(){
			var tmp=retrieveUsers();
			tmp.forEach(function(a,b){
				console.log([a.get('name'),a.get('pass'),a.get('data')].join(','));
				a.set('name','new_'+a.get('name'));
				var data={
					ts:new Date().getTime(),
					values:[]
				};
				for(var i=0;i<16;i++){
					data.values.push(Math.floor(8*Math.random()));
				}
				a.set('data',JSON.stringify(data));
				a.update();
			});
			tmp.forEach(function(a,b){
				a.refresh();
			});
			tmp.forEach(function(a,b){
				console.log([a.get('name'),a.get('pass'),a.get('data')].join(','));
			});
		}
		//--------------------------------------------------------------------------------
		function test2(){
			var _yoda=createUser('yoda','1234')
			var yoda=retrieveUser('yoda');
			yoda.set('name','yahoo');
			yoda.set('pass','4321');
			yoda.update();
			yoda.refresh()
			console.log([_yoda.get('name'),_yoda.get('pass'),_yoda.get('data')].join(','));
			console.log([yoda.get('name'),yoda.get('pass'),yoda.get('data')].join(','));
			_yoda.refresh()
			console.log([_yoda.get('name'),_yoda.get('pass'),_yoda.get('data')].join(','));
			var usrs=retrieveUsers();
			usrs.forEach(function(usr,usridx){
				console.debug([usr.get('name'),usr.get('pass'),usr.get('data')].join(','));
			});
		}
		//--------------------------------------------------------------------------------
		function test3(){
			var usr=retrieveUser('yahoo');
			var ses=createSession(usr.get('id'));
			var _usr=ses.getUser()
			console.warn([ses.get('usr_id'),ses.get('id'),ses.get('data')].join(','));
			console.log([usr.get('id'),usr.get('name'),usr.get('pass'),usr.get('data')].join(','));
			console.debug([_usr.get('id'),_usr.get('name'),_usr.get('pass'),_usr.get('data')].join(','));
		}
		//--------------------------------------------------------------------------------
		function test4(){
			var usr=createUser('skullquake','1234');
			var ses=usr.createSession();
			var _usr=ses.getUser();
			console.warn([usr.get('id'),usr.get('name'),usr.get('pass'),usr.get('data')].join(','));
			console.debug([_usr.get('id'),_usr.get('name'),_usr.get('pass'),_usr.get('data')].join(','));
			console.warn([ses.get('usr_id'),ses.get('id'),ses.get('data')].join(','));
			for(var i=0;i<15;i++){
				usr.createSession();
			}
			var sessions=usr.getSessions();
			sessions.forEach(function(s,sidx){
				console.warn("    "+[s.get('usr_id'),s.get('id'),s.get('data')].join(','));
			});
		}
		function hdlrest(){
			console.debug('hdlrest');
			function getBody(){
				var body=request.RequestContent().String();
				console.debug(JSON.stringify(body));
				try{
					return JSON.parse(body);
				}catch(e){
					CPrintln(e.toString());
					return null;
				}
			}
			var ret={};
			switch(request.RequestMethod()){
				case 'POST':
					var body=getBody();
					if(body!=null){
						switch(body.action){
							case 'createUser':
								if(
									body.pass!=null
								){
									if(body.pass==ADMIN_PASS){
										console.warn('createUser');
										if(
											body.params!=null&&
											body.params.name!=null
										){
											var usr=createUser(body.params.name,body.params.pass,body.params.data)
											if(usr==null){
												ret.error=ret.error==null?[]:ret.error;
												ret.error.push("Failed to create User");
											}else{

												_usr={};
												_usr.name=usr.get("name");
												_usr.pass=usr.get("pass");
												ret=_usr;
											}
										}else{
											ret.error=ret.error==null?[]:ret.error;
											if(body.params==null){
												ret.error.push("body.params NULL");
											}else{
												if(body.params.name==null){
													ret.error.push("body.params.name NULL");
												}
											}
										}


									}else{
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("ADMIN_PASS mismatch");
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.pass==null){
										ret.error.push("ADMIN_PASS NULL");
									}
								}
								break;

								break;
							case 'updateUser':
								console.warn('updateUser');
								if(
									body.params!=null&&
									body.params.name!=null&&
									body.params.values!=null&&
									Object.keys(body.params.values).length>0
								){
									var usr=retrieveUser(body.params.name);
									if(usr==null){
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("Failed to get User");
									}else{
										Object.keys(body.params.values).forEach(function(k,kidx){
											usr.set(k,body.params.values[k]);
										});
										if(usr.update()){
											ret.msg="updated";
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Failed to commit changes");
										}
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.name==null){
											ret.error.push("body.params.name NULL");
										}
										if(body.params.values==null){
											ret.error.push("body.params.values NULL");
										}else{
											if(Object.keys(body.params.values).length==0){
												ret.error.push("body.params.values has no values");
											}else{
											}
										}
									}
								}
								break;
							case 'updateUserById':
								console.warn('updateUserById');
								if(
									body.params!=null&&
									body.params.id!=null&&
									body.params.values!=null&&
									Object.keys(body.params.values).length>0
								){
									var usr=retrieveUserById(body.params.id);
									if(usr==null){
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("Failed to get User");
									}else{
										Object.keys(body.params.values).forEach(function(k,kidx){
											usr.set(k,body.params.values[k]);
										});
										if(usr.update()){
											ret.msg="updated";
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Failed to commit changes");
										}
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}
										if(body.params.values==null){
											ret.error.push("body.params.values NULL");
										}else{
											if(Object.keys(body.params.values).length==0){
												ret.error.push("body.params.values has no values");
											}else{
											}
										}
									}
								}
								break;
							case 'updateSessionById':
								console.warn('updateSessionById');
								if(
									body.params!=null&&
									body.params.id!=null&&
									body.params.values!=null&&
									Object.keys(body.params.values).length>0
								){
									var ses=retrieveSessionById(body.params.id);
									if(ses==null){
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("Failed to get User");
									}else{
										Object.keys(body.params.values).forEach(function(k,kidx){
											ses.set(k,body.params.values[k]);
										});
										if(ses.update()){
											ret.msg="updated";
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Failed to commit changes");
										}
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}
										if(body.params.values==null){
											ret.error.push("body.params.values NULL");
										}else{
											if(Object.keys(body.params.values).length==0){
												ret.error.push("body.params.values has no values");
											}else{
											}
										}
									}
								}
								break;
							case 'removeUser':
								console.warn('removeUser');
								if(
									body.params!=null&&
									body.params.name!=null
								){
									var usr=retrieveUser(body.params.name);
									console.log(usr);
									if(usr!=null){
										if(usr.remove()){
											ret.msg="User Removed";
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Failed to remove User");
										};
									}else{
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("User does not exist");
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.name==null){
											ret.error.push("body.params.name NULL");
										}
									}
								}
								break;

							case 'listUsers':
								console.warn('listUsers');
								if(
									body.pass!=null
								){
									if(body.pass==ADMIN_PASS){
										var usrs=retrieveUsers();
										if(usrs.length>0){
											ret=[];
											usrs.forEach(function(usr,usridx){
												_usr={};
												_usr.name=usr.get("name");
												_usr.pass=usr.get("pass");
												ret.push(_usr);
											});
										}
									}else{
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("ADMIN_PASS mismatch");
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.pass==null){
										ret.error.push("ADMIN_PASS NULL");
									}
								}
								break;
							case 'login':
								console.warn('login');
								if(
									body.params!=null&&
									body.params.name!=null&&
									body.params.pass!=null
								){
									var usr=retrieveUser(body.params.name);
									if(usr!=null){
										if(usr.get("pass")==body.params.pass){
											var _ret={};
											_ret.user={};
											_ret.user.name=usr.get("name");
											_ret.user.pass=usr.get("pass");
											_ret.user.id=usr.get("id");
											try{
												_ret.user.data=JSON.parse(usr.get("data"));
											}catch(e){
												_ret.user.data=null;
											}
											var _ses=null;
											try{
												_ses=usr.createSession();
												if(_ses!=null){
													_ret.session={};
													_ret.session.id=_ses.get('id');
													try{
														_ret.session.data=JSON.parse(_ses.get("data"));
													}catch(e){
														_ret.session.data=null;
													}
													_ret.session.id=_ses.get('id');
													ret=_ret;
												}else{
													ret.error=ret.error==null?[]:ret.error;
													ret.error.push("Failed to create session");
												}
											}catch(e){
												ret.error=ret.error==null?[]:ret.error;
												ret.error.push("Failed to create session: "+e.toString());
											}
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Invalid Password");
										}
									}else{
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("User not found");
										console.error('Failed to retrieve User');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.name==null){
											ret.error.push("body.params.name NULL");
										}else{
										}
										if(body.params.pass==null){
											ret.error.push("body.params.pass NULL");
										}else{
										}
									}
								}
								break;
							case 'logout':
								console.warn('logout');
								if(
									body.params!=null&&
									body.params.csrftoken!=null
								){
									try{
										var ses=retrieveSessionById(body.params.csrftoken);
										if(ses!=null){
											if(ses.remove()){
												ret.msg="Session Removed";
											}else{
												ret.error=ret.error==null?[]:ret.error;
												ret.error.push("Failed to remove Session");
											};

										}else{
											ret.error=ret.error==null?[]:ret.error;
											console.error('Failed to retreive Session');
										}
									}catch(e){
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("Failed to remove session: "+e.toString());
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}else{
										}
									}
								}

								break;
							case 'createUserSession':
								break;
							case 'getUser':
								console.warn('getUser');
								if(
									body.params!=null&&
									body.params.name!=null
								){
									var usr=retrieveUser(body.params.name);
									if(usr!=null){
										_usr={};
										_usr.name=usr.get("name");
										_usr.pass=usr.get("pass");
										_usr.id  =usr.get("id");
										ret=_usr;
									}else{
										ret.error=ret.error==null?[]:ret.error;
										console.error('Failed to retreive User');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.name==null){
											ret.error.push("body.params.name NULL");
										}else{
										}
									}
								}
								break;
							case 'getUserById':
								console.warn('getUserById');
								if(
									body.params!=null&&
									body.params.id!=null
								){
									var usr=retrieveUserById(body.params.id);
									if(usr!=null){
										_usr={};
										_usr.name=usr.get("name");
										_usr.pass=usr.get("pass");
										_usr.id  =usr.get("id");
										try{
											_usr.data=JSON.parse(usr.get('data'));
										}catch(e){
											console.error(e.toString());
											_usr.data=null;
										}
										ret=_usr;
									}else{
										ret.error=ret.error==null?[]:ret.error;
										console.error('Failed to retreive User');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}else{
										}
									}
								}
								break;
							case 'getSessionById':
								console.warn('getSessionById');
								if(
									body.params!=null&&
									body.params.id!=null
								){
									var ses=retrieveSessionById(body.params.id);
									if(ses!=null){
										_ses={};
										try{
											_ses.data=JSON.parse(ses.get('data'));
										}catch(e){
											console.error(e.toString());
											_ses.data=null;
										}
										ret=_ses;
										console.warn(JSON.stringify(ret));
									}else{
										ret.error=ret.error==null?[]:ret.error;
										console.error('Failed to retreive Session');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}else{
										}
									}
								}
								break;

							case 'createUserSession':
								console.warn('createUserSession');
								if(
									body.params!=null&&
									body.params.name!=null
								){
									var usr=retrieveUser(body.params.name);
									if(usr!=null){
										var ses=usr.createSession();
										if(ses!=null){
											var _ses={};
											_ses.id=ses.get("id");
											try{
												_ses.data=JSON.parse(ses.get("data"));
											}catch(e){
												_ses.data=null;
											}
											ret=_ses;
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Failed to create session");
										}
									}else{
										ret.error=ret.error==null?[]:ret.error;
										console.error('Failed to retreive User');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.name==null){
											ret.error.push("body.params.name NULL");
										}else{
										}
									}
								}

								break;
							case 'getUserSessions':
								console.warn('getUserSessions');
								if(
									body.params!=null&&
									body.params.name!=null
								){
									var usr=retrieveUser(body.params.name);
									if(usr!=null){
										var ret=[]
										var sessions=usr.getSessions();
										sessions.forEach(function(ses,sesidx){
											_ses={};
											_ses.id=ses.get("id");
											try{
												_ses.data=JSON.parse(ses.get("data"));
											}catch(e){
												_ses.data=null;
											}
											ret.push(_ses);
										});
									}else{
										ret.error=ret.error==null?[]:ret.error;
										console.error('Failed to retreive User');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.name==null){
											ret.error.push("body.params.name NULL");
										}else{
										}
									}
								}
								break;
							case 'removeSession':
								console.warn('removeSession');
								if(
									body.params!=null&&
									body.params.id!=null
								){
									var ses=retrieveSessionById(body.params.id);
									if(ses!=null){
										if(ses.remove()){
											ret.msg="Session Removed";
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Failed to remove Session");
										};

									}else{
										ret.error=ret.error==null?[]:ret.error;
										console.error('Failed to retreive Session');
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}else{
										}
									}
								}

								break;
							case 'listSessions':
								console.warn('listSessions');
								if(
									body.pass!=null
								){
									if(body.pass==ADMIN_PASS){
										var sessions=retrieveSessions();
										if(sessions.length>0){
											ret=[];
											sessions.forEach(function(ses,sesidx){
												_ses={};
												_ses.id=ses.get("id");
												try{
													_ses.data=JSON.parse(ses.get("data"));
												}catch(e){
													_ses.data=null;
												}
												ret.push(_ses);
											});
										}
									}else{
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("ADMIN_PASS mismatch");
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									ret.error.push("ADMIN_PASS NULL");
								}
								break;
							case 'initdb':
								console.warn('initdb');
								if(
									body.params!=null&&
									body.params.pass!=null
								){
									try{
										if(body.params.pass==ADMIN_PASS){
											dropDb();
											initDb();
											ret.msg="Database initialized";
										}else{
											ret.error=ret.error==null?[]:ret.error;
											ret.error.push("Invalid Password");
										}
									}catch(e){
										ret.error=ret.error==null?[]:ret.error;
										ret.error.push("Failed: "+e.toString());
									}
								}else{
									ret.error=ret.error==null?[]:ret.error;
									if(body.params==null){
										ret.error.push("body.params NULL");
									}else{
										if(body.params.id==null){
											ret.error.push("body.params.id NULL");
										}else{
										}
									}
								}

								break;

							default:
								ret.error=ret.error==null?[]:ret.error;
								console.error('Invalid Action');
								ret.error.push("Invalid Action");
								break;
						}
					}else{
						ret.error="No body";
					}
					break;

				default:
					ret.error="Invalid method";
					break;
			}
			return ret;
		}
		out.Println(JSON.stringify(hdlrest(),0,' '));
		return;
	}
	main();
@>
