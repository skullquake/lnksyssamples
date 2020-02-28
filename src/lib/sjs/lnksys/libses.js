<@
	CPrintln('/lib/sjs/lnksys/libses.js:start:'+new Date().getTime())
	lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
	lnksys.session=typeof(lnksys.session)=='undefined'?{}:lnksys.session;
	include("lib/sjs/lnksys/ses/mgr.js");
	CPrintln('/lib/sjs/lnksys/libses.js:end:'+new Date().getTime())
@>
