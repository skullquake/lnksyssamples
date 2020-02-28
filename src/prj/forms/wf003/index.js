<@
	request.ResponseHeader().Add("Content-type","text/plain");
	var t0=new Date();
	//CPrintln('/forms/wf001/index.js:'+resource().Path());
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
	function post(){
		var form=request.Parameters().Parameter('form')[0];
		form=form==null?'form0':form;
		var sidx=0;
		sidx=parseInt(request.Parameters().Parameter('sidx')[0]);
		sidx=isNaN(sidx)?0:sidx;
		var args={};
		args.sidx=sidx;
		args.node=request.Parameters().Parameter('node')[0];
		switch(form){
			case null:
				break;
			default:
				preform(args);
				var pth=resource().Path().substring(0,resource().Path().lastIndexOf('/'));
				include(pth+'/'+form+'.js');
				postform(args);
		};
	}
	function preform(args){
		/*
		try{
			if(request.Parameters().Parameter('NODEDATA')!=null)
			CPrintln(
				JSON.stringify(
					JSON.parse(
						request.Parameters().Parameter('NODEDATA')
					)
				)
			);
		}catch(e){
			CPrintln(e.toString());
		}
		*/
		//note: somehow args.formguid come in as a dom node
		//here we attach data on it
@>
script||
<@ out.Print(args.node); @>.data=<@ out.Print(args.node); @>.data==null?{}:<@ out.Print(args.node); @>.data;
<@ out.Print(args.node); @>.data.tmp=<@
		var p=40000;
		var d0=[];
		for(var i=0;i<16;i++){
			var d1=[];
			var line='';
			var j;
			var maxlinelen=24;
			var linelen=maxlinelen*(1+Math.sin((i+1)*Math.PI*(t0%p)/p))/2;
			for(j=0;j<linelen;j++){
				line=line+'█';//Math.random());
			}
			for(j=0;j<maxlinelen-linelen;j++){
				line=line+'▒';//Math.random());
			}
			d0.push(line)
		}
		out.Print(JSON.stringify(d0))
@>;
<@ out.Print(args.node); @>.data.srvts=<@ out.Print(t0.getTime()); @>;
<@ out.Print(args.node); @>.data.trx='<@ out.Print(new Date()-new Date(JSON.parse(request.Parameters().Parameter('NODEDATA')).tsent)); @> ms';
<@ out.Print(args.node); @>.data.srvprocdur=<@ out.Print(new Date().getTime()-t0); @>;
<@ out.Print(args.node); @>.data.sidx=<@ out.Print(args.node); @>.data.sidx==null?0:<@ out.Print(args.node); @>.data.sidx+1;
<@ out.Print(args.node); @>.done();
//window.test=<@ out.Print(args.node); @>;
||script
<@
	try{
		out.Println(JSON.stringify(JSON.parse(request.Parameters().Parameter('NODEDATA')),0,' '))
	}catch(e){
		out.Println(e.toString());
	}
@>
<@

	}
	function postform(args){
@>
script||
submit<@ out.Print(args.node); @>();
||script
<@
	}
	var t1=new Date();
	//CPrintln((t1-t0)+' ms')
@>
