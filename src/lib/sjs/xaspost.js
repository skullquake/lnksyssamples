<@
	/* ---------------------------------------------------------------------------- */
	/* Hoisted entry point */
	/* ---------------------------------------------------------------------------- */
	main();
	/* ---------------------------------------------------------------------------- */
	/* Main */
	/* ---------------------------------------------------------------------------- */
	function main(){
		parseInput();
		initcmd();
		exec();
	};
	/* ---------------------------------------------------------------------------- */
	/* Globals */
	/* ---------------------------------------------------------------------------- */
	var cmd=null;
	var args=null;
	var cmdfn=null;
	var feedback=null;
	/* ---------------------------------------------------------------------------- */
	/* Reponse helpers */
	/* ---------------------------------------------------------------------------- */
	function feedbackData(a){
		feedback={};
		feedback.type='text'
		feedback.data=a;
		out.Print(JSON.stringify(feedback));
	}
	function feedbackAlert(a){
		feedback={};
		feedback['type']='js';
		feedback.data="lnksys.ui.info('"+a.replace("'","\\'")+"')";
		out.Print(JSON.stringify(feedback));
	}
	function feedbackJS(a){
		feedback={};
		feedback['type']='js';
		feedback.data=a;
		out.Print(JSON.stringify(feedback));
	}
	/* ---------------------------------------------------------------------------- */
	/* Extract input components */
	/* ---------------------------------------------------------------------------- */
	function parseInput(){
		CPrintln(JSON.stringify(request.RequestContent().String()));
		var obj=JSON.parse(request.RequestContent().String());
		CPrintln(JSON.stringify(obj));
		cmd=obj.cmd.split(' ')[0];
		args=obj.cmd.split(' ').slice(1);
	}
	/* ---------------------------------------------------------------------------- */
	/* Execute */
	/* ---------------------------------------------------------------------------- */
	function exec(){
		if(cmd.length>0){
			if(cmdfn[cmd]==null){
				try{
					//CPrintln(args.join('\n'));
					//CPrintln([cmd].concat(args));
					
					//cmdfn['dbeval']('dbeval',[cmd].concat(args.slice(1)));
					cmdfn['dbeval']('dbeval',[cmd].concat(args));
				}catch(e){
					out.Println(e.toString());
				}
				//out.Println("Command not found: "+cmd);
			}else{
				cmdfn[cmd](cmd,args)
			}
		}else{
			out.Print("No command issued");
		}
	}
	/* ---------------------------------------------------------------------------- */
	/* Util */
	/* ---------------------------------------------------------------------------- */
	function printkeys(o){
		Object.keys(o).forEach(function(k,kidx){
			out.Print(k+":"+typeof(o[k]));
			out.Print("\n");
		});
		out.Print('\n');
	}
	function parametersToJson(){
		var ret={}
		Parameters().StandardKeys().forEach(function(k,kidx){
			ret[k]=Parameters().Parameter(k)[0];
		});
		return ret;
	}
	function jsonToUrl(o){
		return Object.keys(o).map(function(k){
			//return encodedURIComponent(k)+'='+encodedURIComponent(o[k])
			return encodeURI(k)+'='+encodeURI(o[k])
		}).join('&');
	}

	/* ---------------------------------------------------------------------------- */
	/* Commands */
	/* ---------------------------------------------------------------------------- */
	function initcmd(){
		cmdfn={
			'help':function(cmd,args){
				out.Println('Available commands:');
				Object.keys(cmdfn).forEach(
					function(cmd,cmdidx){
						out.Println('\t'+cmd)
					}
				)
			},
			'args':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Prints command and arguments");
						break;
					default:
						out.Println("Arg len: "+args.length);
						args.forEach(function(arg,argidx){
							out.Print('\t'+argidx+':'+arg+'\n');
						});

						break;
				}
			},
			'getpars':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Prints request arguments");
						break;
					default:
						try{
							Parameters().StandardKeys().forEach(function(k,kidx){
								out.Print(
									k+':'+
									Parameters().Parameter(k)+
									'\n'
								);
							});
						}catch(e){
							out.Print(e.toString());
						}

						break;
				}
			},
			'dbtables':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Lists database tables");
						break;
					default:
						try{
							var r=DBQuery(
								"lnks",
"SELECT\n\
    table_schema || '.' || table_name\n\
as Table\n\
FROM\n\
    information_schema.tables\n\
WHERE\n\
    table_type = 'BASE TABLE'\n\
AND\n\
    table_schema NOT IN ('pg_catalog', 'information_schema');",
								{}
							);
							if(r!=undefined){
								var str_hdr=''
								r.Columns().forEach(function(col){
									str_hdr+=(col+',');
								});
								for(var i=0;i<str_hdr.length;i++)out.Print('-');
								out.Print('\n');
								out.Print(str_hdr);
								out.Print('\n');
								out.Print("\nRows:\n");
								while(r.Next()){
									r.Data().forEach(
										function(d){
											out.Print(d);
											out.Print(',');
										}
									);
									out.Print('\n');
								}
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
			'dbquery':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Executes database query");
						out.Println("Usage:");
						out.Println("\tdbquery SQL");
						break;
					default:
						try{
							if(args.length==0){
								out.Print("No arguments specified");
							}
							var r=DBQuery(
								"lnks",
								args.join(' '),
								{}
							);
							if(r!=undefined){
								var str_hdr=''
								r.Columns().forEach(function(col){
									str_hdr+=(col+',');
								});
								for(var i=0;i<str_hdr.length;i++)out.Print('-');
								out.Print('\n');
								out.Print(str_hdr);
								out.Print('\n');
								for(var i=0;i<str_hdr.length;i++)out.Print('-');
								out.Print('\n');
								while(r.Next()){
									r.Data().forEach(
										function(d){
											out.Print(d);
											out.Print(',');
										}
									);
									out.Print('\n');
								}
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
			'dbexec':function(cmd,args){
				try{
					if(args.length==0){
						out.Print("No arguments specified");
					}
					var r=DBExecute(
						"lnks",
						args.join(' ')
					);
				}catch(e){
					out.Print(e.toString());
				}
			},
			'asciiart':function(cmd,args){
				try{
					var str='';
					for(var i=0;i<18;i++){
						for(var j=0;j<70;j++){
							str+=Math.random()>0.5?'0':'X';
						}
						str+='\n';
					}
					out.Print(str);
				}catch(e){
					out.Print(e.toString());
				}
			},
			'alert':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Alerts message");
						out.Println("Usage:");
						out.Println("\talert MSG");
						break;
					default:
						feedbackAlert(args.join(' '));
						break;
				}
			},
			'reload':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Reloads window");
						out.Println("Usage:");
						out.Println("\treload");
						break;
					default:
						feedbackJS('window.location.reload()');
						break;
				}
			},
			'open':function(cmd,args){
				if(args.length==0){
					out.Println("Invalid Usage");
					return;
				}
				switch(args[0]){
					case '--help':
						out.Println("Opens page in panel");
						out.Println("Usage:");
						out.Println("\topen URL");
						break;
					default:
						args[1]
						feedbackJS(
							'lnksys.ui.open('+
							"'"+args[0]+"'"+
							(args[1]==null?'':','+"'"+args[1]+"'")+
							')'
						);
						break;
				}
			},
			'opendb':function(cmd,args){
				if(args.length==0){
					out.Println("Invalid Usage");
					return;
				}
				switch(args[0]){
					case '--help':
						out.Println("Opens dbpage in panel");
						out.Println("Usage:");
						out.Println("\topendb URL");
						break;
					default:
						//out.Println(args[0]);
						feedbackJS("lnksys.ui.opendb('"+args[0]+"')")
						//cmdfn['cat'](cmd,args);
							/*
						feedbackJS(
							'lnksys.ui.opendb('+
							"'"+args[0]+"'"+
							')'
						);
							*/
						break;
				}
			},
			'vi':function(){
				cmdfn['edit'](cmd,args);
			},
			'vim':function(cmd,args){
				cmdfn['edit'](cmd,args);
			},
			'edit':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Opens editor");
						out.Println("Usage:");
						out.Println("\topen FILE");
						break;
					default:
						feedbackJS(
							'lnksys.ui.open("/acepost.html?cmd=open&file='+encodeURI(args[0])+'");console.log("'+args[0]+'")'
						);
						break;
				}
			},
			'ls':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Shows files");
						break;
					default:
						try{
							var r=DBQuery(
								"lnks",
								"SELECT name FROM file",
								{}
							);
							if(r!=undefined){
								while(r.Next()){
									r.Data().forEach(
										function(d){
											out.Print(d);
										}
									);
									out.Print('\n');
								}
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
			'cat':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Prints file contents");
						break;
					default:
						try{
							var r=DBQuery(
								"lnks",
								"SELECT content FROM file where name='"+args[0]+"'",
								{}
							);
							if(r!=undefined){
								while(r.Next()){
									r.Data().forEach(
										function(d){
											out.Print(d);
										}
									);
									out.Print('\n');
								}
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
			'dbeval':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Evaluates vfs item server side");
						break;
					default:
						//out.Println("Executing "+args[0]);
						try{
							var r=DBQuery(
								"lnks",
								"SELECT content FROM file where name='"+args[0]+"' LIMIT 1",
								{}
							);
							var nscr=0;
							var str_scr="";
							if(r!=undefined){
								while(r.Next()){
									r.Data().forEach(
										function(d){
											str_scr+=d;
										}
									);
									nscr++;
								}
								if(nscr==0){
									out.Println("Script "+args[0]+" not found");
								}else{
									cmd=args[0];
									args=args.slice(1);
									eval(str_scr);
								}
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
			'touch':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Creates file");
						break;
					default:
						try{
							var r=DBExecute(
								"lnks",
								"INSERT INTO file VALUES('"+args[0]+"','')"
							);
							if(r!=undefined){
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
			'rm':function(cmd,args){
				switch(args[0]){
					case '--help':
						out.Println("Removes file");
						break;
					default:
						try{
							var r=DBExecute(
								"lnks",
								"DELETE FROM file"+(args[0]!="*"?" WHERE name='"+args[0]+"'":"")
							);
							if(r!=undefined){
							}else{
								out.Print("Failed to query");
							}
						}catch(e){
							out.Print(e.toString());
						}
						break;
				}
			},
		};
	}
@>
