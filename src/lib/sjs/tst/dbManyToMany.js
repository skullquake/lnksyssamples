<@
	/*
	 * Many-to-Many
	 *
	 * A many-to-many relationship exists between two entities if for one entity there may
	 * be multiple records in the other table and vice versa.
	 *
	 * Example: A user has many books checked out or may have checked them out in the past.
	 * A book has many users that have checked a book out.
	 *
	 * In the database world, this sort of relationship is implemented by introducing a
	 * third cross-reference table, that holds the relationship between the two entities,
	 * which is the PRIMARYKEY of the books table and the PRIMARY KEY of the user table.
	 *
	 * Look at the line PRIMARY KEY (user_id,book_id). THe primary key is not a single key,
	 * but a composite key based on user_id and book_id. Therefore, the pair has to be unique.
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
		try{
			console.debug("drop");
			DBExecute(
				"lnks",
				"DROP TABLE IF EXISTS P_C CASCADE",
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
				"CREATE TABLE IF NOT EXISTS C (id INT NOT NULL PRIMARY KEY,data JSON NOT NULL)",
				{
				}
			);
			DBExecute(
				"lnks",
				"CREATE TABLE IF NOT EXISTS P_C (\n"+
				"	id INT NOT NULL,\n"+
				"	P_id INT NOT NULL,\n"+
				"	C_id INT NOT NULL,\n"+
				"	PRIMARY KEY(P_id,C_id),\n"+
				"	FOREIGN KEY(P_id) REFERENCES P(id) ON UPDATE CASCADE,\n"+
				"	FOREIGN KEY(C_id) REFERENCES C(id) ON UPDATE CASCADE\n"+
				")",
				{
				}
			);
		}catch(e){
			this.error(e.toString());
		}
		//------------------------------------------------------------------------
		try{
			console.debug("populate");
			var pidx=0;
			var cidx=0;
			var pcidx=0;
			var psz=4;
			var csz=4;
			//create P
			for(var i=0;i<psz;i++){
				try{
					DBExecute(
						"lnks",
						"insert into P (id,data) values (@id@,@data@)",
						{
							id:pidx,
							data:JSON.stringify({p_ts:new Date().getTime()})
						}
					);
					pidx++;
				}catch(e){
					console.error(e.toString());
				}
			}
			//create C
			for(var i=0;i<csz;i++){
				try{
					DBExecute(
						"lnks",
						"insert into C (id,data) values (@id@,@data@)",
						{
							id:cidx,
							data:JSON.stringify({c_ts:new Date().getTime()})
						}
					);
					cidx++;
				}catch(e){
					console.error(e.toString());
				}
			}
			//create P_C
			for(var i=0;i<psz;i++){
				for(var j=0;j<csz;j++){
					DBExecute(
						"lnks",
						"insert into P_C (\n"+
						"	id,\n"+
						"	P_id,\n"+
						"	C_id\n"+
						") values (\n"+
						"	@id@,\n"+
						"	@p_id@,\n"+
						"	@c_id@\n"+
						")",
						{
							id:pcidx,
							p_id:i,
							c_id:j
						}
					);
					pcidx++;

				}
			}
		}catch(e){
			console.error(e.toString());
		}
		//------------------------------------------------------------------------
		//select P
		console.debug("select");
		try{
			var r=DBQuery(
				"lnks",
				"SELECT * from P",
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
		//select C
		console.debug("select");
		try{
			var r=DBQuery(
				"lnks",
				"SELECT * from C",
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
		//select P_C
		console.debug("select");
		try{
			var r=DBQuery(
				"lnks",
				"SELECT * from P_C",
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
		//join select ???
		try{
			var r=DBQuery(
				"lnks",
				"SELECT P.id,P.data,C.id,C.data\n"+
				"FROM C\n"+
				"LEFT OUTER JOIN P_C\n"+
				"	ON C.id=P_C.C_id\n"+
				"	AND\n"+
				"	C.id=0\n"+
				"LEFT OUTER JOIN P\n"+
				"	ON P_C.P_id=P.id\n",
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
		//select p_c
		try{
			var r=DBQuery(
				"lnks",
				"SELECT * from P_C",
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
		//select p,c,p_c
		try{
			var r=DBQuery(
				"lnks",
				"SELECT\n"+
				"	P.id,P.data,\n"+
				"	C.id,C.data,\n"+
				"	P_C.id\n"+
				"FROM\n"+
				"	P,C,P_C\n"+
				"WHERE\n"+
				"	P.id=P_C.P_id\n"+
				"AND\n"+
				"	C.id=P_C.C_id\n"+
				"AND\n"+
				//"	P.id=0"
				"	C.id=0"
				,
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
