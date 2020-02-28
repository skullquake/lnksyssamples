<@
CPrintln("json");
request.ResponseHeader().Add("Content-type","application/json");
var obj_ret={};
var arrHdr="abcdefghijklmnop".split("");
/*
arrHdr.forEach(function(h1,hidx){					//
	obj_ret[h1]={};							// todo:
	arrHdr.forEach(function(h2,hidx2){				// recursive
		obj_ret[h1][h2]={};					// generate
		arrHdr.forEach(function(h3,hidx3){			// levels
			obj_ret[h1][h2][h3]={};				//
			arrHdr.forEach(function(h4,hidx4){		//
				obj_ret[h1][h2][h3][h4]=h1+h2+h3+h4;	//
			});						//
		});							//
	});								//
});									//
*/
arrHdr.forEach(function(h1,hidx){					//
	obj_ret[h1]={};							// todo:
	arrHdr.forEach(function(h2,hidx2){				// recursive
		obj_ret[h1][h2]={};					// generate
		arrHdr.forEach(function(h3,hidx3){			// levels
			obj_ret[h1][h2]=h1+h2;
		});							//
	});								//
});									//
out.Println(JSON.stringify(obj_ret))
@>
