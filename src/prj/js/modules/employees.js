<@
	CPrintln('/js/modules/employees.js');
	//request.ResponseHeader().Add("Content-range","items 0-25/4096");
	request.ACommit(request.GetResource("/lib/sjs/lnksys/libdbjson.js"));
	lnksys.dbjson("employees")
@>
