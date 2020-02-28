<@
	var include=typeof(include)=='undefined'?function(a){
		var t0=new Date();
		CPrintln("/lib/sjs/include.js:["+a+"]:start")
		if(include.included.indexOf(a)==-1){
			request
				.ACommit(
					request
					.GetResource(a)
				)
			;
			CPrintln("/lib/sjs/include.js:["+a+"]:caching")
			include.included.push(a);
		}else{
			CPrintln("/lib/sjs/include.js:["+a+"]:busting")
		}
		var t1=new Date();
		CPrintln("/lib/sjs/include.js:["+a+"]:end["+(t1-t0)+" ms]")
	}:include;
	include.included=typeof(include.included)=='undefined'?
		[]
		:
		include.included
	;
@>
