<@
/* fib.js */
if(
	Parameters()
	.Parameter('a')
	.length==0
)
	Parameters()
	.SetParameter(
		'a',
		true,
		1
	);
if(
	Parameters()
	.Parameter('b')
	.length==0
)
	Parameters()
	.SetParameter(
		'b',
		true,
		2
	);
if(
	Parameters()
	.Parameter('idx')
	.length==0
)
	Parameters()
	.SetParameter(
		'idx',
		true,
		1
	);
var a=parseInt(
	Parameters()
	.Parameter('a')[0]
);
var b=parseInt(
	Parameters()
	.Parameter('b')[0]
);
var idx=parseInt(
	Parameters()
	.Parameter('idx')[0]
);
//CPrintln(idx+':'+a);out.Print(idx+':'+a);
if(idx<32){
	var c=b+a;
	idx++;
	Parameters().SetParameter('a',true,b)
	Parameters().SetParameter('b',true,c)
	Parameters().SetParameter('idx',true,idx)
	request.AddResource("/tst/lod/fib.js")
}
@>
