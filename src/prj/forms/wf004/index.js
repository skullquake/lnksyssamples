<@
	request.ResponseHeader().Add("Content-type","text/plain");
	var t0=new Date();
	CPrintln(t0.getTime())
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
		/*
		args.tst=[];
		for(var i=0;i<0;i++){
			args.tst.push(Math.random());
		}
		*/
		args.srvts=t0.getTime();
		args.trx=new Date()-new Date(args.tsent);
		args.srvprocdur=new Date().getTime()-t0;
		args.sidx=args.sidx==null?0:args.sidx+1;
@>
script||
<@ out.Print(args.node); @>.data=<@ out.Print(JSON.stringify(args)); @>;
<@ out.Print(args.node); @>.done();
<@ out.Print(args.node); @>.submit()
||script
<@
	}
	function postform(args){
	}
	var t1=new Date();
	//CPrintln((t1-t0)+' ms')
@>


