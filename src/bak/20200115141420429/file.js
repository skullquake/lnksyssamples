<@
	/* ---------------------------------------------------------------------------- */
	/* Hoisted entry point */
	/* ---------------------------------------------------------------------------- */
	main();
	/* ---------------------------------------------------------------------------- */
	/* Main */
	/* ---------------------------------------------------------------------------- */
	function main(){
		try{
			switch(Parameters().Parameter('cmd')[0].toLowerCase()){
				case 'test':
					var r=DBQuery(
						"lnks",
						"SELECT @CONTENTS@ as qwer",
						Parameters()
					);
					if(r!=undefined){
						while(r.Next()){
							r.Data().forEach(
								function(d){
									out.Print(d);
								}
							);
						}
					}else{
						out.Print("Failed to query");
					}
					break;
				case 'open':
					var r=DBQuery(
						"lnks",
						"SELECT content from file where name='"+Parameters().Parameter('file')+"' LIMIT 1",
						{}
					);
					if(r!=undefined){
						while(r.Next()){
							r.Data().forEach(
								function(d){
									out.Print(d);
								}
							);
						}
					}else{
						out.Print("Failed to query");
					}
					break;
				case 'save':
					try{
						var r=DBExecute(
							"lnks",
							"update file set content=@contents@  where name=@file@",
							Parameters()
						);
						out.Print(Parameters().Parameter("file")[0]+" saved");
						if(r!=undefined){
						}else{
							out.Print("Failed to query");
						}
					}catch(e){
						out.Print(e.toString());
					}
					break;
				default:
					out.Print('Invalid cmd');
					break;
			};
		}catch(e){
			out.Print(e.toString());
		}
	};
@>
