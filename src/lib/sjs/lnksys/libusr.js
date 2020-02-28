<@
	CPrintln('/lib/sjs/lnksys/libusr.js:start:'+new Date().getTime())
	lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
	lnksys.user=typeof(lnksys.user)=='undefined'?{}:lnksys.user;
	include("lib/sjs/lnksys/usr/mgr.js");
	CPrintln('/lib/sjs/lnksys/libusr.js:end:'+new Date().getTime())
@>
