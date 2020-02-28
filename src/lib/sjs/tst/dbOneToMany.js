<@
	/*
	 * One-to-Many
	 *
	 * A one-to-many relationship exists between two entities if an entity instance in one
	 * of the tables can be associated with multiple records (entity instances) in the other
	 * table. The opposite relationship does not exist; that is, each entity instance
	 * in the second table can only be associated with one entity instance in the first
	 * table.
	 *
	 * Example: A book has many reviews. A review belongs to only one book.
	 *
	 * In the database world, this sort of relationship is implemented by ensuring that
	 * book_id that is the PRIMARY KEY of the books table is a FOREIGN KEY of the reviews table
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
				"CREATE TABLE IF NOT EXISTS C (id INT NOT NULL PRIMARY KEY,P_id INT NOT NULL,data JSON NOT NULL,FOREIGN KEY(P_id) REFERENCES P(id) ON DELETE CASCADE)",
				{
				}
			);
		}catch(e){
			this.error(e.toString());
		}
		//------------------------------------------------------------------------
		try{
			var pidx=0;
			var cidx=0;
			for(var i=0;i<4;i++){
				try{
					console.debug("populate");
					DBExecute(
						"lnks",
						"insert into P (id,data) values (@id@,@data@)",
						{
							id:pidx,
							data:JSON.stringify({p_ts:new Date().getTime()})
						}
					);
					pidx++;
					for(var j=0;j<4;j++){
						DBExecute(
							"lnks",
							"insert into C (id,P_id,data) values (@id@,@p_id@,@data@);",
							{
								id:cidx,
								p_id:i,
								data:JSON.stringify({c_ts:new Date().getTime()})
							}
						);
						cidx++;
					}
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
				"SELECT P.id,P.data,C.id,C.data FROM P INNER JOIN C ON P.id=C.P_id ORDER BY P.id ASC",
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

