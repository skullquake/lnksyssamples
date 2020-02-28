<@
//------------------------------------------------------------------------------
//DROP TABLE
//------------------------------------------------------------------------------
try{
	var q="DROP TABLE IF EXISTS employees";
	var r=DBExecute(
		"lnks",
		q
	);
}catch(e){
	out.Print(e.toString());
}
//------------------------------------------------------------------------------
//CREATE TABLE
//------------------------------------------------------------------------------
try{
	var q="create table if not exists employees (id serial primary key,name varchar,department varchar)";
	var r=DBExecute(
		"lnks",
		q
		//,{}
	);
}catch(e){
	out.Print(e.toString());
}
//------------------------------------------------------------------------------
//CLEAR TABLE
//------------------------------------------------------------------------------
try{
	var r=DBExecute(
		"lnks",
		"delete from employees"
	);
}catch(e){
	out.Print(e.toString());
}
//------------------------------------------------------------------------------
//POPULATE TABLE
//------------------------------------------------------------------------------
try{
	var employees = [
	];
	var vowels="aeiouy";
	var consonants="bcdfghjklmnpqrstvwxz";
	var fields=[
		 "Geo"
		,"Cryo"
		,"Syntho"
		,"Nutrio"
		,"Geno"
		,"Acousto"
		,"Eco"
		,"Astro"
		,"Biblio"
		,"Physio"
		,"Schizo"
		,"Porno"
		,"Psycho"
		,"Pyro"
		,"Hydro"
		,"Photo"
		,"Dynamo"
		,"Electro"
		,"Spatio"
		,"Thermo"
		,"Mecha"
		,"Iso"
		,"Duo"
		,"Poly"
		,"Melo"
		,"Trans"
		,"Gravi"
		,"Aero"
		,"Pharmo"
		,"Endo"
		,"Exo"
		,"Intra"
		,"Extra"
		,"Sub"
		,"Super"
		,"Lacto"
		,"Pneu"
		,"Hexa"
		,"Tri"
		,"Radio"
		,"Miro"
		,"Phylo"
	];
	var subfields=[
		 "logical"
		,"fractal"
		,"septic"
		,"active"
		,"plastic"
		,"natural"
		,"lytic"
		,"tarsic"
		,"monious"
		,"rhythmic"
		,"frenic"
		,"phasic"
		,"baric"
		,"rectal"
		,"spheric"
		,"tonic"
		,"desic"
		,"linear"
		,"spacial"
		,"genic"
		,"mono"
		,"nomical"
		,"motional"
		,"metric"
		,"graphic"
		,"phylic"
		,"cryptic"
		,"peptic"
		,"noptic"
		,"pathic"
	];
	var departments=[
		 "engineering"
		,"procurement"
		,"design"
		,"management"
		,"training"
		,"law"
		,"research"
		,"testing"
		,"archiving"
		,"sales"
		,"pre-sales"
	];
	for(var i=0;i<65536;i++){
		var name=
			consonants[Math.floor(Math.random()*vowels.length)].toUpperCase()+
			vowels[Math.floor(Math.random()*vowels.length)];
		var surname=
			consonants[Math.floor(Math.random()*vowels.length)].toUpperCase()+
			vowels[Math.floor(Math.random()*vowels.length)];
		var lettergroups=Math.floor(Math.random()*4)
		for(var j=0;j<lettergroups;j++){
			name+=
				consonants[Math.floor(Math.random()*vowels.length)]+
				vowels[Math.floor(Math.random()*vowels.length)]
			;
		}
		lettergroups=Math.floor(Math.random()*4)
		for(var j=0;j<lettergroups;j++){
			surname+=
				consonants[Math.floor(Math.random()*vowels.length)]+
				vowels[Math.floor(Math.random()*vowels.length)]
			;
		}
		var department=
			 (fields[Math.floor(Math.random()*fields.length)])
			+(subfields[Math.floor(Math.random()*subfields.length)])
			+" "
			+(departments[Math.floor(Math.random()*departments.length)])
		DBExecute(
			"lnks",
			"insert into employees (name,department) values ('"+name+" "+surname+"','"+department+"')"
		);

		var employee={
			 name:name
			,department:department
		};
		employees.push(employee);
	}
}catch(e){
	out.Print(e.toString());
}
//------------------------------------------------------------------------------
//SELECT
//------------------------------------------------------------------------------
try{
	var r=DBQuery(
		"lnks",
		"select * from employees",
		{}
	);
	if(r!=undefined){
		out.Println(r.Columns().join(','))
		while(r.Next()){
			out.Println(r.Data().join(','))
		}
	}else{
		out.Print("Failed to query");
	}
}catch(e){
	out.Print(e.toString());
}
@>
