DBMSRegister(
	"lnks",
	"driver=postgres",
	"username=test",
	"password=1",
	"host=127.0.0.1:6001",
	"sslmode=disable"
);
InvokeListener("0.0.0.0:1112");
//MAPRoots("movies/","D:/movies/");
