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
		feedback.data="alert('"+a.replace("'","\\'")+"')";
		out.Print(JSON.stringify(feedback));
	}
	function feedbackJS(a){
		response.type='js';
		response.data=a;
	}
	/* ---------------------------------------------------------------------------- */
	/* Extract input components */
	/* ---------------------------------------------------------------------------- */
	function parseInput(){
		cmd=Parameters().Parameter('cmd')[0].split(' ')[0];
		args=Parameters().Parameter('cmd')[0].split(' ').slice(1);
	}
	/* ---------------------------------------------------------------------------- */
	/* Execute */
	/* ---------------------------------------------------------------------------- */
	function exec(){
		if(cmd.length>0){
			if(cmdfn[cmd]==null){
				out.Println("Command not found");
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
							out.Print('----------------------------------------\n');
							out.Print('Tables:\n');
							out.Print('----------------------------------------\n');
							var r=DBQuery(
								"lnks",
								"select * from pg_catalog.pg_tables",
								{}
							);
							if(r!=undefined){
								out.Print(
									'NumCols:'+
									r.Columns().length+
									'\n'
								);
								out.Print("\nColumns:\n");
								r.Columns().forEach(function(col){
									out.Print(col);
								});
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
								out.Print('\n');
								out.Print('----------------------------------------\n');
								out.Print("done");
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
			'feedbacktest':function(cmd,args){
				feedbackAlert("hi'hi");
				//feedbackData('hi');
			}
		};
	}
@>


