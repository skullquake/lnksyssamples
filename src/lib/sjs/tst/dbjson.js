<@ request.ResponseHeader().Add("Content-type","text/plain"); @>
	<@
	main();
	function main(){
		//operation?
		var operation=getBody().operation;
		CPrintln('----------------------------------------');
		CPrintln('----------------------------------------');
		operation=operation==''||operation==null?'select':operation;
		switch(operation){
			case 'select':
				dbselect();
				break;
			case 'init':
				dbinit();
				dbselect();
				break;
			case 'drop':
				dbdrop();
				dbselect();
				break;
			case 'select':
				dbselect();
				break;
			default:
				CPrintln('Invalid Operation');
				out.Println(('Invalid Operation'));
				break;
		}
		CPrintln('----------------------------------------');
		return 0;
	}

	function getBody(){
		try{
			return JSON.parse(request.RequestContent().String());
		}catch(e){
			return {};
		}
	}
	function dbinit(){
		CPrintln('dbinit');
		try{
			DBExecute(
				"lnks",
				"create table component (id varchar NOT NULL PRIMARY KEY, data json NOT NULL)"
			);
		}catch(e){
			CPrintln(e.toString());
		}
	}
	function dbdrop(){
		CPrintln('dbinit');
		try{
			DBExecute(
				"lnks",
				"drop table component"
			);
		}catch(e){
			CPrintln(e.toString());
		}
	}
	function dbselect(){
		CPrintln('dbselect');
		renderUi();
@>
<pre class="language-javascript">
<@
		var r=DBQuery(
			"lnks",
			"select * from component"
		);
		if(r!=undefined){
			while(r.Next()){
				out.Println('<br/>')
				r.Data().forEach(function(col,colidx){
					try{
						out.Println(JSON.stringify(JSON.parse(col),0,' '));
					}catch(e){
						@><h5><ul><@ out.Println(col); @></ul></h5><@
					}
				})
			}
		}else{
			CPrintln("NO ROWS");
		}
@>
<pre>
<@
	}
	function renderUi(){@>
<div class='btn-group'>
	<button class="btn btn-default" onClick="exec('init')">init</button>
	<button class="btn btn-default" onClick="exec('drop')">drop</button>
	<button class="btn btn-default" onClick="exec('select')">select</button>
</div>
<div id="tmp"></div>
<script>
var path='/lib/sjs/tst/dbjson.js';//'<@ out.Print(resource().Path());  @>';
function exec(operation){
	operation=operation==null?'select':operation;
	var url_ref=path;//+'?operation='+operation;
	postNode(
		{
			url_ref:url_ref,
			json_ref:{"operation":operation},
			ctx:window,
			form_ref:"#tmp",
			target:"#main",
			resolved:function(e){
				console.log('resolved:'+e);
			},
			rejected:function(o,e){
				console.log('rejected:'+e);
			}
		}
	);
}
</script>
	<@}
@>


