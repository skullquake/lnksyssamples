<@
	/*
	 * One-to-One
	 * A one-to-one relationship between two entities exists when a particular entity
	 * instance exists in one table, and can have only one associated entity instance
	 * in another table
	 *
	 * Example: A user has only one address, and an address belongs to only one user
	 *
	 * In the database world, this sort of relationship is implemented like this:
	 * the id that is the PRIMARY KEY of users table is used as both the FOREIGN KEY and
	 * PRIMARY KEY of the addresses table
	 */
	function main(){
		request.ResponseHeader().Add("Content-type","application/json");
		include("/lib/sjs/lnksys/libconsole.js");
		CPrintln('included');
		include(true,"/lib/sjs/cjs/cjs.js");
		CPrintln('here');
		CPrintln(typeof(console));
		//------------------------------------------------------------------------
		try{
			console.debug("drop");
			DBExecute(
				"lnks",
				"DROP TABLE IF EXISTS P CASCADE",
				{
				}
			);
		}catch(e){
			this.error(e.toString());
		}
		try{
			console.debug("drop");
			DBExecute(
				"lnks",
				"DROP TABLE IF EXISTS C CASCADE",
				{
				}
			);
		}catch(e){
			this.error(e.toString());
		}
		//------------------------------------------------------------------------
		try{
			console.debug("initialize");
			DBExecute(
				"lnks",
				"CREATE TABLE IF NOT EXISTS P (id INT NOT NULL PRIMARY KEY, data JSON NOT NULL)",
				{
				}
			);
			DBExecute(
				"lnks",
				"CREATE TABLE IF NOT EXISTS C (P_id INT NOT NULL PRIMARY KEY,data JSON NOT NULL,CONSTRAINT fk_P_id FOREIGN KEY (P_id) REFERENCES P(id))",
				{
				}
			);
		}catch(e){
			this.error(e.toString());
		}
		//------------------------------------------------------------------------
		try{
			for(var i=0;i<8;i++){
				try{
					console.debug("populate");
					DBExecute(
						"lnks",
						"insert into P (id,data) values (@id@,@data@)",
						{
							id:i,
							data:JSON.stringify({p_ts:new Date().getTime()})
						}
					);
					DBExecute(
						"lnks",
						"insert into C (P_id,data) values (@id@,@data@);",
						{
							id:i,
							data:JSON.stringify({c_ts:new Date().getTime()})
						}
					);
				}catch(e){
					console.error(e.toString());
				}
			}
		}catch(e){
			console.error(e.toString());
		}
		//------------------------------------------------------------------------
		console.debug("select");
		try{
			var r=DBQuery(
				"lnks",
				"SELECT DISTINCT ON (P.id) P.id,P.data,C.P_id,C.data FROM P INNER JOIN C ON P.id=C.P_id",
				{}
			).Map(
				{
					"include-fields-defs":true,
					"include-fields":true,
					"include_data_fields":true
				}
			);
			console.log(JSON.stringify(r.data).replace(/\],\[/g,"],\n["));
		}catch(e){
			console.error(e.toString());
		}
	}
	main();
@>

