InvokeListener("0.0.0.0:1111");
InvokeListener("0.0.0.0:1112");
//InvokeListener("0.0.0.0:1113");
//InvokeListener("0.0.0.0:1114");
//MAPRoots("1111/","http://localhost:1111");
MAPRoots("1112/","http://localhost:1112");
//MAPRoots("1113/","http://localhost:1113");
//MAPRoots("1114/","http://localhost:1114");
MAPRoots("lib/","/data/data/com.termux/files/home/src/skullquake/dojosamples/src/lib");
MAPRoots("sjs/","/data/data/com.termux/files/home/src/skullquake/dojosamples/src/lib/sjs");
MAPRoots("db/","/data/data/com.termux/files/home/dat/db");
DBMSRegister(
	"lnks",
	"driver=postgres",
	"username=test",
	"password=1",
	//"database=mx7235",//can ommit
	"database=test",//can ommit
	"host=127.0.0.1:6000",
	"sslmode=disable"
);

