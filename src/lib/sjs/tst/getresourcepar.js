<@
	try{
		include('/lib/sjs/lnksys/libconsole.js');
		function genJson(){
			var ret={};
			var glyph='01234566789ABCDEF'.split('');
			glyph.forEach(function(a,b){
				ret['jsnp'+a]=Math.random();
				ret['jsnpa'+a]=[0,1,2,3];
				ret['jsnpo'+a]={
					'a':[0,1,2,3],
					'b':{'c':0,'d':[0,1,2,3]}
				};
			});
			return ret;
		}
		function genUrlPar(){
			var ret=[];
			var glyph='0123456789ABCDEF'.split('');
			glyph.forEach(function(a,b){
				ret.push(['urlp'+a,Math.random()].join('='));
			});
			return '?'+ret.join('&');
		}
		request.ACommit(
			request.
			GetResource(
				'/1112/lib/sjs/lnksys/httpbin.js'+genUrlPar(),
				genJson()
			)
		)
		console.log(genUrlPar());
		console.warn(JSON.stringify(genJson()));
	}catch(e){
		out.Println(e.toString());
	}
@>
