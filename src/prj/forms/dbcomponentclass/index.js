<@
	request.ResponseHeader().Add("Content-type","text/plain");
	var automate=false;
	main();
     	function main(){
     		handleMethod();
	}
	function handleMethod(){
		switch(request.RequestMethod()){
			case 'GET':
				get();
				break;
			case 'POST':
				post();
				break;
			default:
				break;
		}
	}
	function get(){
		include(resource().Path().substring(0,resource().Path().lastIndexOf('/'))+'/index.html');
	}
	function getBody(){
		return JSON.parse(request.RequestContent().String());
	}
	function post(){
		var body=getBody();
		var form=body.form;
		form=form==null?'form0':form;
		var sidx=0;
		sidx=body.sidx;
		var args={};
		args.sidx=sidx;
		args.node=body.node;
		switch(form){
			case null:
				break;
			default:
				preform(body);
				var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
				include(pth+'/'+form+'.js');
				postform(body);
		};
	}
	function preform(args){
		//attach functions once off
		if(!args.output.fn==true){
			//CPrintln('a');
			CPrintln('initializing database ['+args.node+']');
			//dbdrop();
			dbinit();
			CPrintln('attaching functions['+args.node+']');
			//todo: attempt retrieve state from db...
			CPrintln('retrieving state['+args.node+']');
			var state=dbselect(args.node);
			if(state==null){
				CPrintln("failed to acquire state");
			}else{
				CPrintln("Restoring state:\n"+JSON.stringify(state));
				args.output=state;
			}
			CPrintln('comitting initial state['+args.node+']');
			dbupsert(args.node,args.output);
			args.output.fn=true;
@>
script||
this.data.output=<@ out.Print(JSON.stringify(args.output)); @>;
$(this).css('white-space','pre');
$(this).css('font-family','monospace');
this.printdata=function(){
	$(this).text(JSON.stringify(this.data,0,' '));
}
||script
<@
		}else{
			//CPrintln('b');
			switch(args.cmd){
				case 'commit':
					CPrintln('comitting final state['+args.node+']');
					dbupsert(args.node,args.output);
					break;
				case 'nop':
					break;
				default:
					break;
			}
			//if(args.cmd=='commit')CPrintln('committing...');
			//CPrintln(args.output.test);
			args.output.test=new Date().getTime();
			//CPrintln(args.node);
			//CPrintln(args.output);
			//dbupsert(args.node,args.output);
@>
script||
this.data.output=<@ out.Print(JSON.stringify(args.output)); @>;
this.printdata();
//this.data.output.test=new Date();//'a';
this.data.cmd='nop';
||script
<@
		}
	}
	function postform(args){
	}
	//component database stuff
	function dbdrop(){
		try{
			DBExecute(
				"lnks",
				"drop table component"
			);
		}catch(e){
			CPrintln(e.toString());
		}
	}
	function dbinit(){
		try{
			DBExecute(
				"lnks",
				"create table  if not exists component (id varchar NOT NULL PRIMARY KEY, data json NOT NULL)"
			);
		}catch(e){
			CPrintln(e.toString());
		}
	}
	function dbselect(guid){
		var r=DBQuery(
			"lnks",
			"select data from component where id=%guid%",
			{
				guid:guid
			}
		);
		var ret=null;
		if(r!=undefined){
			while(r.Next()){
				r.Data().forEach(function(col,colidx){
					ret=JSON.parse(col);
				})
			}
		}else{
			CPrintln("NO ROWS");
		}
		return ret;
	}
	function dbupsert(guid,data){
		CPrintln(guid);
		DBExecute(
			"lnks",
			"insert into component(id,data) values (@guid@,@data@) on conflict (id) do update set data=excluded.data",
			{
				guid:guid,
				data:JSON.stringify(data)
			}
		);
	}
@>
