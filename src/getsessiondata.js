<@
	CPrintln("getsessiondata.js:start");
	if(Parameters().Parameter('token').length>0){
		var token=Parameters().Parameter('token')[0];
		out.Print(JSON.stringify(
			{
				'msg':'Action getsessiondata unimplemented',
				'token':token
			}
		));
	}else{
	}
	CPrintln("getsessiondata.js:end");
@>

