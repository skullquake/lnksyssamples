<pre class="code">
<@
	try{
		out.Print('----------------------------------------\n');
		out.Print('Database:\n');
		out.Print('----------------------------------------\n');
		DBExecute(
			"lnks",
			"drop table test"
		);
		DBExecute(
			"lnks",
			"create table test (a integer)"
		);
		for(var i=0;i<32;i++){
			DBExecute(
				"lnks",
				"insert into test(a) values (@v0@)",
				{
					v0:i
				}
			);
		}
	}catch(e){
		out.Print(e.toString());
	}
	include("/lib/sjs/lnksys/libdbjson.js");
	lnksys.dbjson("test")
@>
<pre>
