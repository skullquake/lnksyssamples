<@
CPrintln("d.js:start");out.Println("d.js:start");
CPrintln(a);out.Println(a);
//Parameters().SetParameter('asdf',false,1);
//Parameters().SetParameter('asdf',false,1);

if(Parameters().Parameter('a').length==0)Parameters().SetParameter('a',true,0);
var a=parseInt(Parameters().Parameter('a')[0]);
Parameters().SetParameter('a',true,a+1)
out.Println(a);
if(Math.random()<0.5){
	CPrintln("d.js:add a.js:start");out.Println("a.js:add a.js:start");
	request.AddResource("/a.js")
	CPrintln("d.js:add a.js:end");out.Println("a.js:add a.js:end");
}
CPrintln("d.js:end");out.Println("d.js:end");
@>
