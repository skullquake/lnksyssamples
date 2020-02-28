<@
	var i=0;
	CPrintln(i);
	request.APrint("<@ i++;CPrintln(i);  @>");
	request.ACommit();
	request.APrint("<@ request.APrint('<@ i++;CPrintln(i); @>'); request.ACommit();  @>");
	request.ACommit();
@>
