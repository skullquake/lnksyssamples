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
//raph
this.data.output=<@ out.Print(JSON.stringify(args.output)); @>;
this.paper=null;
this.data.input.w=320;
this.data.input.h=200;
this.paper=new Raphael(this,this.data.input.w,this.data.input.h);
this.paper.setViewBox(0,0,this.data.input.w,this.data.input.h,true);
this.paper.setSize('100%','100%');
||script
<@
		}else{
			//code...
			//cmd experiment
			//CPrintln(args.cmd);
			switch(args.input.cmd){
				case 'call':
					CPrintln('here');
					//this[args.fn]();
					break;
				case null:
				default:
					//args.cmd='getcmd';
					break;
			}
			//raphael stuff
			var nelem=16;
			var p=30000;
			var strd=18;
			var minsz=3;
			var maxsz=6;
			var minop=0.3;
			var maxop=0.8;
			var f=(new Date().getTime()%p)/p;
			args.output.reload=false;//(new Date().getTime()%6000)>5000;
			args.output.clear=args.input.clear==true?true:f<0.01;
			args.output.radius=(Math.sin(f*Math.PI))*(maxsz-minsz)+minsz;
			if(typeof(args.output.pos)=='undefined'||args.output.pos==null){
				args.output.pos=[];
				for(var i=0;i<nelem;i++){
					args.output.pos.push([
						args.input.w/2,
						args.input.h/2
					]);
				}
			}
			for(var i=0;i<nelem;i++){
				args.output.pos[i]=[
					args.output.pos[i][0]+Math.random()*strd-strd/2,
					args.output.pos[i][1]+Math.random()*strd-strd/2,
					Math.floor(((Math.sin(8*f*Math.PI)/2)+0.5)*255),
					32,//Math.floor(255-((Math.sin(1*f*Math.PI)/2)+0.5)*255),
					Math.floor(((Math.sin(12*f*Math.PI)/2)+0.5)*128),
					((Math.sin(16*f*Math.PI)/2)+0.5)*(maxop-minop)+minop
				];
				args.output.pos[i][0]=args.output.pos[i][0]<0?0:args.output.pos[i][0];
				args.output.pos[i][0]=args.output.pos[i][0]>args.w?args.w:args.output.pos[i][0];
				args.output.pos[i][1]=args.output.pos[i][1]<0?0:args.output.pos[i][1];
				args.output.pos[i][1]=args.output.pos[i][1]>args.h?args.h:args.output.pos[i][1];
			}
@>
script||
this.data.output=<@ out.Print(JSON.stringify(args.output)); @>;
if(this.data.output.reload)window.location.reload();
if(this.data.output.clear)this.paper.clear();
for(var i=0;i<this.data.output.pos.length;i++){
	this.paper.circle(
		this.data.output.pos[i][0],
		this.data.output.pos[i][1],
		this.data.output.radius
	).attr({
		fill:'rgba('+this.data.output.pos[i][2]+','+this.data.output.pos[i][3]+','+this.data.output.pos[i][4]+','+this.data.output.pos[i][5]+')',
		stroke:'rgba('+this.data.output.pos[i][2]+','+this.data.output.pos[i][3]+','+this.data.output.pos[i][4]+','+this.data.output.pos[i][5]+')'
	});
}
<@ out.Print(args.node); @>.done();
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
	var t1=new Date();
	//CPrintln((t1-t0)+' ms')
@>

