<@
	request.ResponseHeader().Add("Content-type","application/json");
	main();
	function main(){
		var t0=new Date();
		include("/lib/sjs/lnksys/libconsole.js");
		ret={};
		switch(request.RequestMethod()){
			case 'GET':
				break;
			case 'POST':
				ret=hdlPost();
				break;
			case 'PUT':
				break;
			case 'PATCH':
				break;
			case 'DELETE':
				break;
			default:
				break;
		}
		console.log(typeof(ret));
		if(typeof(ret)=='string'){
			out.Print(ret);
		}else{
			out.Print(JSON.stringify(ret));
		}
		var t1=new Date();
		console.warn("dur:"+(t1-t0)+" ms");
		return 0;
	}
	function getBody(){
		console.debug('getBody');
		var body=request.RequestContent().String();
		try{
			return JSON.parse(body);
		}catch(e){
			CPrintln(e.toString());
			return null;
		}
	}
	function hdlPost(){
		console.debug('hdlPost');
		var ret={};
		var body=getBody();
		if(body!=null&&body!=''){
			if(body.action!=null){
				switch(body.action){
					case 'initdb':
						ret=initdb();
						break;
					case 'listtables':
						ret=listtables();
						break;
					case 'query':
						if(
							body.params!=null&&
							body.params.query!=null&&
							body.params.args!=null
						){
							var fmt=body.params.fmt==null?'json':body.params.fmt;
							switch(fmt){
								case 'json':
									ret=query(body.params.query,body.params.args,'json');
									break;
								case 'csv':
									ret=query(body.params.query,body.params.args,'csv');
									//out.Println(ret);
									break;
								default:
									ret={};
									ret.error=[];
									ret.error.push("Invalid format specification");
							}
						}else{
							ret.error=[];
							if(body.params==null){
								ret.error.push('body.params NULL');
							}else{
								if(body.params.query==null){
									ret.error.push('body.params.query NULL');
								}
								if(body.params.args==null){
									ret.error.push('body.params.args NULL');
								}
							}
						}
						break;
					case 'exec':
						if(
							body.params!=null&&
							body.params.query!=null&&
							body.params.args!=null
						){
							ret=exec(body.params.query,body.params.args);
						}else{
							ret.error=[];
							if(body.params==null){
								ret.error.push('body.params NULL');
							}else{
								if(body.params.query==null){
									ret.error.push('body.params.query NULL');
								}
								if(body.params.args==null){
									ret.error.push('body.params.args NULL');
								}
							}
						}
						break;
					default:
						ret.error=ret.error==null?[]:ret.error;
						ret.error.push("invalid method");
						break;
				}
			}else{
				ret.error=ret.error==null?[]:ret.error;
				ret.error.push("method NULL");
			}
		}else{
			ret.error=ret.error==null?[]:ret.error;
			ret.error.push("body NULL");
		}
		return ret;
	}
	function initdb(){
		console.debug('initdb');
		ret={};
		try{
			var r=DBExecute(
				"lnks",
				"drop table if exists professor",
				{}
			);
		}catch(e){
			ret.error=ret.error==null?[]:ret.error;
			ret.error.push(e.toString());
		}
		try{
			var r=DBExecute(
				"lnks",
				"create table if not exists professor(id int not null primary key)",
				{}
			);
		}catch(e){
			ret.error=ret.error==null?[]:ret.error;
			ret.error.push(e.toString());
		}
	}
	function query(queryP,mapP,fmtP){
		console.debug('query');
		fmtP=fmtP==null?'json':fmtP;
		var ret={};
		if(
			queryP!=null&&
			mapP!=null
		){
			try{
				if(Array.isArray(queryP)){
					queryP=queryP.join("\n");
				}
				//console.warn(queryP);
				//console.warn(JSON.stringify(mapP));
				var res=DBQuery(
					"lnks",
					queryP,
					mapP
				)
				if(res.Err!=null){
					ret.error={};
					Object.keys(res.Err).forEach(function(e,eidx){
						ret.error[e]=typeof(res.Err[e])=='function'?res.Err[e]():res.Err[e];
					});
				}else{
					var resjson=res.Map(
						{
							"include-fields-defs":true,
							"include-fields":true,
							"include_data_fields":true
						}
					);
					switch(fmtP){
						case 'json':
							ret=resjson.data;
							break;
						case 'csv':
							var csv='';
							//console.log(JSON.stringify(resjson));
							//console.log(resjson.fields['field-count'])
							var arr_headings=new Array(resjson.fields['field-count']);
							Object.keys(resjson.fields).forEach(function(field,fieldidx){
								if(field!='field-count'){
									arr_headings[resjson.fields[field].ordinal]=field;
								}
							});
							csv+=arr_headings.join(',')+"\n";
							var hr='';
							for(var i=0;i<csv.length-1;i++){
								hr+='-';
							}
							csv+=hr+"\n";
							resjson.data.forEach(function(a,b){
								csv+=a.join(',')+"\n";;
							});
							ret=csv;
							break;
						default:
							break;
					};
				}
			}catch(e){
				ret.error=[];
				ret.error.push(e.toString());
			}
		}else{
			ret.error=[];
			if(queryP==null){
				ret.error.push("queryP NULL");
			}
			if(mapP==null){
				ret.error.push("mapP NULL");
			}
		}
		return ret;

	}
	function exec(execP,mapP){
		console.debug('exec');
		var ret={};
		if(
			execP!=null&&
			mapP!=null
		){
			try{
				if(Array.isArray(execP)){
					execP=execP.join("\n");
				}
				console.warn(execP);
				console.warn(JSON.stringify(mapP));
				var res=DBExecute(
					"lnks",
					execP,
					mapP
				);
				if(res.Err!=null){
					ret.error={};
					Object.keys(res.Err).forEach(function(e,eidx){
						console.log(typeof(res.Err[e])=='function'?res.Err[e]():res.Err[e])
						ret.error[e]=typeof(res.Err[e])=='function'?res.Err[e]():res.Err[e];

					});
				}else{
					ret={'status':'done','rowsaffected':res.RowsAffected};
				}
			}catch(e){
				ret.error=[];
				ret.error.push(e.toString());
			}
		}else{
			ret.error=[];
			if(execP==null){
				ret.error.push("execP NULL");
			}
			if(mapP==null){
				ret.error.push("mapP NULL");
			}
		}
		return ret;

	}


	function listtables(){
		console.debug('listtables');
		var ret={};
		try{
			var res=DBQuery(
				"lnks",
				"select table_name from information_schema.tables where table_schema='public' order by table_name",
				{}
			)
			if(res.Err!=null){
				ret.error={};
				Object.keys(res.Err).forEach(function(e,eidx){
					console.log(typeof(res.Err[e])=='function'?res.Err[e]():res.Err[e])
					ret.error[e]=typeof(res.Err[e])=='function'?res.Err[e]():res.Err[e];

				});
			}else{
				var resjson=res.Map(
					{
						"include-fields-defs":true,
						"include-fields":true,
						"include_data_fields":true
					}
				);
				ret=resjson.data;
			}
		}catch(e){
			ret.error=[];
			ret.error.push(e.toString());
		}
		return ret;

	}
@>
