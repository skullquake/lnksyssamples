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
							"update file set content='"+postgres_real_escape_string(Parameters().Parameter("contents")[0])+"' where name='"+postgres_real_escape_string(Parameters().Parameter("file")[0])+"'"
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
	function mysql_real_escape_string(str){
		return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
			switch (char) {
				case "\0":
					return "\\0";
				case "\x08":
					return "\\b";
				case "\x09":
					return "\\t";
				case "\x1a":
					return "\\z";
				case "\n":
					return "\\n";
				case "\r":
					return "\\r";
				case "\"":
				case "'":
				case "\\":
				case "%":
					return "\\"+char; // prepends a backslash to backslash, percent,
									  // and double/single quotes
				default:
					return char;
			}
		});
	}
	function postgres_real_escape_string(str){
		return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
			switch (char) {
				case "\0":
					return "\\0";
				case "\x08":
					return "\\b";
				case "\x09":
					return "\\t";
				case "\x1a":
					return "\\z";
				case "\n":
					return "'||chr(10)||'";
				case "\r":
					return "\\r";
				//case "\"":
				case "'":
				//case "\\":
				case "%":
					return "\\"+char; // prepends a backslash to backslash, percent,
				case "\\":
					return "\\";
				default:
					return char;
			}
		});
	}
@>
