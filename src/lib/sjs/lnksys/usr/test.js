<@
	request.ResponseHeader().Add("Content-type","text/plain");
	out.Println('dbmanager test')
	include('/lib/sjs/lnksys/libconsole.js')
	try{
		include('/lib/sjs/lnksys/libusr.js')
		var mgr=new lnksys.user.Manager();
		console.debug('done');
	}catch(e){
		console.error(e.toString());

	}
@>
