<@
	request.ACommit(request.GetResource('/lib/sjs/include.js'));
	include('/lib/sjs/lnksys/libdb.js');
	var d=new lnksys.db.Db('buffered');
	//d.query('select * from employees');
	//d.query('select * from employees','buffered');
	d.query('select * from employees','direct');
@>
