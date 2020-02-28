<@
	request.ResponseHeader().Add("Content-type","text/plain");
	out.Println('dbmanager test')
	include('/lib/sjs/lnksys/libconsole.js')
	try{
		include('/lib/sjs/lnksys/libses.js')
		var sm=new lnksys.session.Manager();
		console.log(sm.createSession());
		console.log(JSON.stringify(sm.getSessions()));
		sm.dbdrop();
		console.debug('done');
	}catch(e){
		console.error(e.toString());

	}
@>
