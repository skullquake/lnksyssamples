<@
	try{
		/*
		var arr_hdr=[
			'foo',
			'bar',
			'baz',
			'qux',
			'klutz'
		];
		arr_hdr.forEach(function(hdr0,hdr0idx){
			arr_hdr.forEach(function(hdr1,hdr1idx){
				arr_hdr.forEach(function(hdr2,hdr2idx){
					arr_hdr.forEach(function(hdr3,hdr3idx){
						var hdrk=hdr0+hdr1+hdr2+hdr3;
						var hdrv=hdr0+hdr1+hdr2+hdr3+"_value";
						request.ResponseHeaders().Set(hdrk,hdrv);
					});
				});
			});
		});
		*/
		request.ResponseHeaders().Set("Content-Type","bar");
		//request.ResponseHeaders().Set("foo","bar");
		//var a=request.ResponseHeaders().Get("Content-type");
		out.Println('azzzzzzz');
	}catch(e){
		out.Println(e);
	}
@>
