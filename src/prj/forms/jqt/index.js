<@
	request.ResponseHeader().Add("Content-type","text/plain");
	var t0=new Date();
	//CPrintln(t0);
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
			//CPrintln(args);
			args.output.fn=true;
@>
script||
this.data.output=<@ out.Print(JSON.stringify(args.output)); @>;
this.terminal=$(this).terminal(
	function(command){
		if(command!==''){
		}else{
			this.echo('')
		}
	},
	{
		greetings:'hi',
		name:'js_demo',
		height:200,
		prompt:'js>'
	}
);
||script
<@
		}else{
			args.output.test=new Date().getTime();
@>
script||
this.data.output=<@ out.Print(JSON.stringify(args.output)); @>;
this.terminal.clear();
this.terminal.echo(JSON.stringify(this.data));
||script
<@
		}
	}
	function postform(args){
	}
	function dbinit(){
		try{
			DBExecute(
				"lnks",
				"drop table component"
			);
			DBExecute(
				"lnks",
				"create table component (id varchar,data varchar)"
			);
		}catch(e){
			CPrintln(e.toString());
		}
		/*
			for(var i=0;i<32;i++){
				DBExecute(
					"lnks",
					"insert into test(id,data) values (@v0@,@v1@)",
					{
						v0:i
						v1:i
					}
				);
			}
		}catch(e){
			out.Print(e.toString());
		}
		include("/lib/sjs/lnksys/libdbjson.js");
		lnksys.dbjson("test")
		*/
	}
	function dbselect(){
		include("/lib/sjs/lnksys/libdbjson.js");
		return(lnksys.dbjson("test"));
	}
	var t1=new Date();
	//CPrintln((t1-t0)+' ms')
@>

