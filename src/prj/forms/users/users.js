var lnksys=null;
var lnksys=typeof(lnksys)=='undefined'||lnksys==null?{}:lnksys;
lnksys.session=typeof(lnksys.session)=='undefined'?{}:lnksys.session;
lnksys.meta=typeof(lnksys.meta)=='undefined'?{}:lnksys.meta;
lnksys.onlineData=typeof(lnksys.onlineData)=='undefined'?{}:lnksys.onlineData;
lnksys.onlineData.objectCache=typeof(lnksys.onlineData.objectCache)=='undefined'?{}:lnksys.onlineData.objectCache;
lnksys.onlineData.objectCache._objectCache=typeof(lnksys.onlineData.objectCache._objectCache)=='undefined'?{}:lnksys.onlineData.objectCache._objectCache;
lnksys.onlineData.objectCache._newGuids=typeof(lnksys.onlineData.objectCache._newGuids)=='undefined'?{}:lnksys.onlineData.objectCache._newGuids;
lnksys.onlineData.objectCache._changes=typeof(lnksys.onlineData.objectCache._changes)=='undefined'?{}:lnksys.onlineData.objectCache._changes;
lnksys.startup=typeof(lnksys.startup)=='undefined'?function(){
}:lnksys.startup;
lnksys.modulePath=typeof(lnksys.modulePath)=='undefined'?'./widgets':lnksys.modulePath;
lnksys.onError=typeof(lnksys.onError)=='undefined'?function(){
}:lnksys.onError;
lnksys.onlineData=typeof(lnksys.onlineData)=='undefined'?{}:lnksys.onlineData;
lnksys.reload=typeof(lnksys.reload)=='undefined'?function(){
	window.location.reload();
}:lnksys.reload;
lnksys.appUrl=typeof(lnksys.appUrl)=='undefined'||lnksys.appUrl==null?'/':lnksys.appUrl;
lnksys.remoteUrl=typeof(lnksys.remoteUrl)=='undefined'||lnksys.remoteUrl==null?'/':lnksys.remoteUrl;
lnksys.homeUrl=typeof(lnksys.homeUrl)=='undefined'||lnksys.homeUrl==null?'/':lnksys.homeUrl;
lnksys.baseUrl=typeof(lnksys.baseUrl)=='undefined'||lnksys.baseUrl==null?lnksys.appUrl+'lib/sjs/tst/dbUser.js':lnksys.baseUrl;
lnksys.data=typeof(lnksys.data)=='undefined'||lnksys.data==null?{}:lnksys.data;
lnksys.data.get=typeof(lnksys.data.get)=='undefined'||lnksys.data==null?function(){
	var ret={};
	if(lnksys.session.csrftoken!=null&&lnksys.session.csrftoken.length>0){
		ret.msg='stub';
	}else{
		ret.error=[];
		ret.error.push('lnksys.session.csrftoken NULL')
	}
	return ret;
}:lnksys.data.get;
lnksys.data.create=typeof(lnksys.data.create)=='undefined'||lnksys.data==null?function(){
	var ret={};
	if(lnksys.session.csrftoken!=null&&lnksys.session.csrftoken.length>0){
		ret.msg='stub';
	}else{
		ret.error=[];
		ret.error.push('lnksys.session.csrftoken NULL')
	}
	return ret;
}:lnksys.data.create;
lnksys.data.commit=typeof(lnksys.data.commit)=='undefined'||lnksys.data==null?function(){
	var ret={};
	if(lnksys.session.csrftoken!=null&&lnksys.session.csrftoken.length>0){
		ret.msg='stub';
	}else{
		ret.error=[];
		ret.error.push('lnksys.session.csrftoken NULL')
	}
	return ret;
}:lnksys.data.commit;
lnksys.isLoaded=typeof(lnksys.isLoaded)=='undefined'||lnksys.isLoaded==null?true:lnksys.isLoaded;
lnksys.isOffline=typeof(lnksys.isOffline)=='undefined'||lnksys.isOffline==null?false:lnksys.isOffline;
lnksys.logger=typeof(lnksys.logger)=='undefined'||lnksys.logger==null?function(){
}:lnksys.logger;
lnksys.afterLoginAction=typeof(lnksys.afterLoginAction)=='undefined'||lnksys.afterLoginAction==null?function(){
}:lnksys.afterLoginAction;
lnksys.session.progress=typeof(lnksys.session.progress)=='undefined'||lnksys.session.progress==null?{}:lnksys.session.progress;
lnksys.session.progress.sending=typeof(lnksys.session.progress.sending)=='undefined'||lnksys.session.progress.sending==null?false:lnksys.session.progress.sending;
lnksys.session.login=typeof(lnksys.login)=='undefined'||lnksys.login==null?function(name,pass,onSuccess,onError){
	if(
		name!=null&&
		pass!=null&&
		!lnksys.session.progress.sending
	){
		lnksys.session.progress.sending=true;
		$.ajax({
			type: "POST",
			url: lnksys.baseUrl,//'/lib/sjs/tst/dbUser.js',
			contentType: 'application/json',
			async: true,
			data: JSON.stringify({"action":"login","params":{"name":name,"pass":pass}}),
			success: function (data) {
				lnksys.session.progress.sending=false;
				if(data.error==null){
					console.log('lnksys.session.login:logged in');
					lnksys.session.csrftoken=data.session.id;
					lnksys.session.sessionObjectId=data.session.id;
					lnksys.session.sessionObject=data.session;//todo: add accessors and mutators and ajax cruds
					lnksys.session.sessionObject.reload=function(onSuccess,onError){
						return $.ajax({
							type: "POST",
							url: lnksys.baseUrl,//'/lib/sjs/tst/dbUser.js',
							contentType: 'application/json',
							async: true,
							data: JSON.stringify({"action":"getSessionById","params":{"id":this.id}}),
							success: $.proxy(function (data) {
								console.log(this);
								if(data.error==null){
									Object.keys(data).forEach($.proxy(function(k,kidx){
										console.log(this);
										this[k]=data[k];
									},this));
									if(typeof(onSuccess)=='function'){
										onSuccess.call(this,e);
									}else{
									}
								}else{
									if(typeof(onError)=='function'){
										onError.call(this,e);
									}else{
									}
								}
								console.log(data);
							},this),
							fail:$.proxy(function(e){
								console.error(e.toString());
								if(typeof(onError)=='function'){
									onError.call(this,e);
								}else{
								}

							},this)
						});

					};
					lnksys.session.sessionObject.commit=function(onSuccess,onError){
						$.ajax({
							type: "POST",
							url: lnksys.baseUrl,//'/lib/sjs/tst/dbUser.js',
							contentType: 'application/json',
							async: true,
							data: JSON.stringify({"action":"updateSessionById","params":{"id":this.id,"values":{'data':JSON.stringify(this.data)}}}),
							success: function (data) {
								if(data.error==null){
									console.info('lnksys.session.sessionObject.commit: done');
								}else{
									console.error('lnksys.session.sessionObject.commit: error');
									data.error.forEach(function(e,eidx){
										console.error('lnksys.session.sessionObject.commit: '+e);
									})
								}
							},
							fail:function(e){
								console.error('lnksys.session.sessionObject.commit: error');
								console.error(e.toString());
								if(typeof(onError)=='function'){
									onError.call(this,e);
								}else{
								}

							}
						});

					};

					//----------------------------------------------------------------
					lnksys.session.userObject=data.user;
					lnksys.session.userObjectId=data.user.id;

					//----------------------------------------------------------------
					//lnksys.session.sessionObjectId=data.session.id;
					lnksys.session.userObject.reload=function(onSuccess,onError){
						$.ajax({
							type: "POST",
							url: lnksys.baseUrl,//'/lib/sjs/tst/dbUser.js',
							contentType: 'application/json',
							async: true,
							data: JSON.stringify({"action":"getUserById","params":{"id":this.id}}),
							success:$.proxy(function (data) {
								if(data.error==null){
									Object.keys(data).forEach($.proxy(function(k,kidx){
										this[k]=data[k];
									},this));
									if(typeof(onSuccess)=='function'){
										onSuccess.call(this,e);
									}else{
									}
								}else{
									if(typeof(onError)=='function'){
										onError.call(this,e);
									}else{
									}
								}
								console.log(data);
							},this),
							fail:$.proxy(function(e){
								console.error(e.toString());
								if(typeof(onError)=='function'){
									onError.call(this,e);
								}else{
								}

							},this)
						});

					};
					lnksys.session.userObject.commit=function(onSuccess,onError){
						$.ajax({
							type: "POST",
							url: lnksys.baseUrl,//'/lib/sjs/tst/dbUser.js',
							contentType: 'application/json',
							async: true,
							data: JSON.stringify({"action":"updateUserById","params":{"id":this.id,"values":{'name':this.name,'pass':this.pass,'data':JSON.stringify(this.data)}}}),
							success: function (data) {
								console.log(data);
							},
							fail:function(e){
								console.error(e.toString());
								if(typeof(onError)=='function'){
									onError.call(this,e);
								}else{
								}

							}
						});

					};
					//----------------------------------------------------------------
					lnksys.session.sessionObjectId=data.session.id;
					if(typeof(onSuccess)=='function'){
						onSuccess.call(this,data);
					}else{
					}
				}else{
					console.error('lnksys.session.login:failed');
					if(typeof(onError)=='function'){
						onError.call(this,data);
					}else{
					}
				}
							},
			fail:function(e){
				console.error(e.toString());
				lnksys.session.progress.sending=false;
				if(typeof(onError)=='function'){
					onError.call(this,e);
				}else{
				}

			}
		});
	}else{

		var ret={};
		ret.error=[];
		if(name==null){
			ret.error.push("name NULL");
		}
		if(pass==null){
			ret.error.push("pass NULL");
		}
		if(lnksys.session.progress.sending){
			ret.error.push("Busy sending");
		}
		console.error(JSON.stringify(ret));
		return ret;
	};
}:lnksys.session;
lnksys.login=typeof(lnksys.login)=='undefined'||lnksys.login==null?lnksys.session.login:lnksys.login;
lnksys.session.logout=typeof(lnksys.session.logout)=='undefined'||lnksys.session.logout==null?function(onSuccess,onError){
	var ret={};
	if(
		lnksys.session.csrftoken!=null&&
		!lnksys.session.progress.sending
	){
		lnksys.session.progress.sending=true;
		$.ajax({
			type: "POST",
			url: lnksys.baseUrl,//'/lib/sjs/tst/dbUser.js',
			contentType: 'application/json',
			async: true,
			data: JSON.stringify({"action":"logout","params":{"csrftoken":lnksys.session.csrftoken}}),
			success: function (data) {
				if(data.error==null){
					console.log('lnksys.session.logout: logged out')
					lnksys.session.progress.sending=false;
					lnksys.session.csrftoken=null;
					lnksys.session.userObject=null;
					lnksys.session.sessionObject=null;
					lnksys.session.userObjectId=null;
					lnksys.session.sessionObjectId=null;
					if(typeof(onSuccess)=='function'){
						onSuccess.call(this,data);
					}else{
						console.error('lnksys.session.logout: onSuccess not a function');
					}
				}else{
					console.error('lnksys.session.logout: error')
					data.error.forEach(function(e,eidx){
						console.error('lnksys.session.logout: '+e.toString())
					});
					if(typeof(onError)=='function'){
						onError.call(this,data);
					}else{
						console.error('lnksys.session.logout: onError not a function');
					}
				}
			},
			fail:function(e){
				console.error('lnksys.session.logout: error')
				console.error(e.toString());
				lnksys.session.progress.sending=false;
				if(typeof(onError)=='function'){
					onError.call(this,e);
				}else{
				}

			}
		});
		return ret;
	}else{
		ret.error=[];
		if(lnksys.session.progress.sending){
			ret.error.push("Busy sending");
		}
		if(lnksys.session.progress.sending){
			ret.error.push("lnksys.session.csrftoken NULL");
		}
		console.error(JSON.stringify(ret))
		return ret;
	};
}:lnksys.session.logout;
lnksys.logout=typeof(lnksys.logout)=='undefined'||lnksys.logout==null?lnksys.session.logout:lnksys.logout;
lnksys.session.csrftoken=typeof(lnksys.session.csrftoken)=='undefined'||lnksys.session.csrftoken==null?null:lnksys.session.csrftoken;
lnksys.session.destroySession=typeof(lnksys.session.destroySession)=='undefined'||lnksys.session.destroySession==null?function(){
	lnksys.session.logout();
}:lnksys.session.destroySession;
lnksys.session.isValid=typeof(lnksys.session.isValid)=='undefined'||lnksys.session.isValid==null?function(){
}:lnksys.session.isValid;
lnksys.session.getConfig=typeof(lnksys.session.getConfig)=='undefined'||lnksys.session.getConfig==null?function(){
}:lnksys.session.getConfig;
lnksys.session.getActionInfo=typeof(lnksys.session.getActionInfo)=='undefined'||lnksys.session.getActionInfo==null?function(){
}:lnksys.session.getActionInfo;
lnksys.session.getUserName=typeof(lnksys.session.getUserName)=='undefined'||lnksys.session.getUserName==null?function(){
	return lnksys.session.userObject.name;
}:lnksys.session.getUserName;
lnksys.session.sessionObjectId=typeof(lnksys.session.csrftoken)=='undefined'||lnksys.session.csrftoken==null?null:lnksys.session.sessionObjectId;
lnksys.session.clientMetaData=typeof(lnksys.session.csrftoken)=='undefined'||lnksys.session.csrftoken==null?{}:lnksys.session.clientMetaData;
lnksys.session.locale=typeof(lnksys.session.locale)=='undefined'||lnksys.session.locale==null?{}:lnksys.session.locale;
lnksys.session.sync_config=typeof(lnksys.session.sync_config)=='undefined'||lnksys.session.sync_config==null?null:lnksys.session.sync_config;
lnksys.session.keepalive=typeof(lnksys.session.keepalive)=='undefined'||lnksys.session.keepalive==null?30000:lnksys.session.keepalive;
lnksys.session.metadata=typeof(lnksys.session.metadata)=='undefined'||lnksys.session.metadata==null?[]:lnksys.session.metadata;//table stuff, object attributes, etc
lnksys.session.deletes=typeof(lnksys.session.deletes)=='undefined'||lnksys.session.deletes==null?[]:lnksys.session.deletes;
lnksys.session.isDevModeEnabled=typeof(lnksys.session.isDevModeEnabled)=='undefined'||lnksys.session.isDevModeEnabled==null?true:lnksys.session.isDevModeEnabled;
lnksys.session.demoUsers=typeof(lnksys.session.demoUsers)=='undefined'||lnksys.session.demoUsers==null?null:lnksys.session.demoUsers;
lnksys.session.userObject=typeof(lnksys.session.userObject)=='undefined'||lnksys.session.userObject==null?null:lnksys.session.userObject;
lnksys.session.getUserObject=typeof(lnksys.session.getUserObject)=='undefined'||lnksys.session.getUserObject==null?function(){
	return lnksys.session.userObject;
}:lnksys.session.getUserObject;
lnksys.session.userObjectId=typeof(lnksys.session.userObjectId)=='undefined'||lnksys.session.userObjectId==null?null:lnksys.session.userObjectId;
lnksys.session.sessionObject=typeof(lnksys.session.sessionObject)=='undefined'||lnksys.session.sessionObject==null?null:lnksys.session.sessionObject;
lnksys.session.getSessionObject=typeof(lnksys.session.getSessionObject)=='undefined'||lnksys.session.getSessionObject==null?function(){
	return lnksys.session.sessionObject;
}:lnksys.session.getSessionObject;
lnksys.session.uiConfig=typeof(lnksys.session.uiConfig)=='undefined'||lnksys.session.uiConfig==null?{}:lnksys.session.uiConfig;
lnksys.session.cacheBust=typeof(lnksys.session.cacheBust)=='undefined'||lnksys.session.cacheBust==null?new Date().getTime():lnksys.session.cacheBust;
lnksys.session.user=typeof(lnksys.session.user)=='undefined'||lnksys.session.user==null?new Date().getTime():lnksys.session.user;
lnksys.session.user.objectType=typeof(lnksys.session.user.objectType)=='undefined'||lnksys.session.user.objectType==null?null:lnksys.session.user.objectType;
lnksys.session.user.id=typeof(lnksys.session.user.id)=='undefined'||lnksys.session.user.id==null?null:lnksys.session.user.id;
lnksys.session.user.hash=typeof(lnksys.session.user.hash)=='undefined'||lnksys.session.user.hash==null?null:lnksys.session.user.hash;
lnksys.session.user.attributes=typeof(lnksys.session.user.attributes)=='undefined'||lnksys.session.user.attributes==null?null:lnksys.session.user.attributes;
lnksys.session.roles=typeof(lnksys.session.roles)=='undefined'||lnksys.session.roles==null?[]:lnksys.session.roles;
lnksys.session.resets=typeof(lnksys.session.resets)=='undefined'||lnksys.session.resets==null?{}:lnksys.session.resets;
lnksys.session.objects=typeof(lnksys.session.objects)=='undefined'||lnksys.session.objects==null?[]:lnksys.session.objects;
lnksys.session.locale=typeof(lnksys.session.locale)=='undefined'||lnksys.session.locale==null?{}:lnksys.session.locale;
lnksys.session.locale.code=typeof(lnksys.session.locale.code)=='undefined'||lnksys.session.locale.code==null?"en_US":lnksys.session.locale.code;
lnksys.session.locale.firstDayOfWeek=typeof(lnksys.session.locale.firstDayOfWeek)=='undefined'||lnksys.session.locale.firstDayOfWeek==null?0:lnksys.session.locale.firstDayOfWeek;
lnksys.session.locale.minimalDaysInFirstWeek=typeof(lnksys.session.locale.minimalDaysInFirstWeek)=='undefined'||lnksys.session.locale.minimalDaysInFirstWeek==null?1:lnksys.session.locale.minimalDaysInFirstWeek;
lnksys.meta.startup=typeof(lnksys.meta.startup)=='undefined'?function(){
}:lnksys.meta.startup;
lnksys.meta.getMap=typeof(lnksys.meta.getMap)=='undefined'?function(){
}:lnksys.meta.getMap;
lnksys.meta.getEntity=typeof(lnksys.meta.getEntity)=='undefined'?function(){
}:lnksys.meta.getEntity;
lnksys.ui=typeof(lnksys.ui)=='undefined'||lnksys.ui==null?{}:lnksys.ui;
//priveleged for now...
lnksys.db=typeof(lnksys.db)=='undefined'||lnksys.db==null?{}:lnksys.db;
lnksys.db.init=typeof(lnksys.db.init)=='undefined'||lnksys.db.init==null?function(pass,onSuccess,onError){
	var ret={};
	if(
		pass!=null
	){
		ret=$.ajax({
			type: "POST",
			url: lnksys.baseUrl,
			contentType: 'application/json',
			async: true,
			data: JSON.stringify({"action":"initdb","params":{"pass":pass}}),
			success: function (data) {
				if(typeof(onSuccess)=='function'){
					onSuccess.call(this,data);
				}else{
				}
			},
			fail:function(e){
				console.error(e.toString());
				if(typeof(onError)=='function'){
					onError.call(this,e);
				}else{
				}

			}
		});
		return ret;
	}else{
		var ret={};
		ret.error=[];
		ret.error.push("pass NULL");
		return ret;
	};

}:lnksys.db.init;
lnksys.db.users=typeof(lnksys.db.users)=='undefined'||lnksys.db.users==null?function(pass,onSuccess,onError){
	var ret={};
	if(
		pass!=null
	){
		ret=$.ajax({
			type: "POST",
			url: lnksys.baseUrl,
			contentType: 'application/json',
			async: true,
			data: JSON.stringify({"action":"listUsers","pass":pass}),
			success: function (data) {
				if(typeof(onSuccess)=='function'){
					onSuccess.call(this,data);
				}else{
				}
			},
			fail:function(e){
				console.error(e.toString());
				if(typeof(onError)=='function'){
					onError.call(this,e);
				}else{
				}

			}
		});
		return ret;
	}else{
		var ret={};
		ret.error=[];
		ret.error.push("pass NULL");
		return ret;
	};

}:lnksys.db.users;
lnksys.db.createUser=typeof(lnksys.db.createUser)=='undefined'||lnksys.db.createUser==null?function(pass,params,onSuccess,onError){
	var ret={};
	if(
		pass!=null&&
		params!=null&&
		typeof(params)=='object'&&
		params.name!=null&&
		params.pass!=null

	){
		ret=$.ajax({
			type: "POST",
			url: lnksys.baseUrl,
			contentType: 'application/json',
			async: true,
			data: JSON.stringify({"action":"createUser","pass":pass,"params":params}),
			success: function (data) {
				if(data.error!=null){
					if(typeof(onError)=='function'){
						onError.call(this,data);
					}else{
					}

				}else{
					if(typeof(onSuccess)=='function'){
						onSuccess.call(this,data);
					}else{
					}
				}
			},
			fail:function(e){
				console.error(e.toString());
				if(typeof(onError)=='function'){
					onError.call(this,e);
				}else{
				}

			}
		});
		return ret;
	}else{
		var ret={};
		ret.error=[];
		if(pass==null){
			ret.error.push("pass NULL");
		}else{
		}
		if(params==null){
			ret.error.push("params NULL");
		}else{
			if(typeof(params)!='object'){
				ret.error.push("params not object");
			}else{
				if(params.name==null){
					ret.error.push("params.name NULL");
				}else{
				}
				if(params.pass==null){
					ret.error.push("params.pass NULL");
				}else{
				}
			}
		}
		return ret;
	};

}:lnksys.db.createUser;
lnksys.db.sessions=typeof(lnksys.db.sessions)=='undefined'||lnksys.db.sessions==null?function(pass,onSuccess,onError){
	var ret={};
	if(
		pass!=null
	){
		$.ajax({
			type: "POST",
			url: lnksys.baseUrl,
			contentType: 'application/json',
			async: true,
			data: JSON.stringify({"action":"listSessions","pass":pass}),
			success: function (data) {
				if(typeof(onSuccess)=='function'){
					onSuccess.call(this,data);
				}else{
				}
			},
			fail:function(e){
				console.error(e.toString());
				if(typeof(onError)=='function'){
					onError.call(this,e);
				}else{
				}

			}
		});
		return ret;
	}else{
		var ret={};
		ret.error=[];
		ret.error.push("pass NULL");
		return ret;
	};

}:lnksys.db.sessions;


//------------------------------------------------------------------------------
/*
//create users
for(var i=0;i<32;i++){
	$.ajax({
		type: "POST",
		url: '/lib/sjs/tst/dbUser.js',
		contentType: 'application/json',
		async: true,
		data: JSON.stringify({"action":"createUser","params":{"name":"usr"+i}}),
		success: function (data) {
			console.log(JSON.stringify(data,0,' '));
		},
		fail:function(e){
			console.error(e.toString());
		}
	})
}

//remove users
for(var i=0;i<32;i++){
	$.ajax
	({
		type: "POST",
		url: '/lib/sjs/tst/dbUser.js',
		contentType: 'application/json',
		async: true,
		data: JSON.stringify({"action":"removeUser","params":{"name":"usr"+i}}),
		success: function (data) {
			console.log(JSON.stringify(data,0,' '));
		},
		fail:function(e){
			console.error(e.toString());
		}
	})
}
//list users
$.ajax({
  type: "POST",
  url: '/lib/sjs/tst/dbUser.js',
  contentType: 'application/json',
  async: true,
  data: JSON.stringify({"action":"listUsers"}),
  success: function (data) {
	console.log(JSON.stringify(data,0,' '));
  },
  fail:function(e){
	console.error(e.toString());
  }
})
//create user sessions ($i users, each with $j sessions)
for(var i=0;i<32;i++){
	for(var j=0;j<4;j++){
	  $.ajax({
		  type: "POST",
		  url: '/lib/sjs/tst/dbUser.js',
		  contentType: 'application/json',
		  async: true,
		  data: JSON.stringify({"action":"createUserSession","params":{"name":"usr"+i}}),
		  success: function (data) {
			  console.log(JSON.stringify(data,0,' '));
		  },
		  fail:function(e){
			  console.error(e.toString());
		  }
	  });
  }
}
//retrieve all sessions
$.ajax({
	type: "POST",
	url: '/lib/sjs/tst/dbUser.js',
	contentType: 'application/json',
	async: true,
	data: JSON.stringify({"action":"listSessions"}),
	success: function (data) {
		console.log(JSON.stringify(data,0,' '));
	},
	fail:function(e){
		console.error(e.toString());
	}
})
//delete sessions
$.ajax({
	type: "POST",
	url: '/lib/sjs/tst/dbUser.js',
	contentType: 'application/json',
	async: true,
	data: JSON.stringify({"action":"listSessions"}),
	success: function (data) {
		data.forEach(function(row,rowidx){
			$.ajax({
				type: "POST",
				url: '/lib/sjs/tst/dbUser.js',
				contentType: 'application/json',
				async: true,
				data: JSON.stringify({"action":"removeSession","params":{"id":row.id}}),
				success: function (data) {
					console.log(row.id+' removed');
				},
				fail:function(e){
					console.error(e.toString());
				}
			})
		});
	},
	fail:function(e){
		console.error(e.toString());
	}
})
*/
