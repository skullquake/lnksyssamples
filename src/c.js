<@
CPrintln("c.js:start");out.Println("c.js:start");
CPrintln("c.js:add d.js:start");out.Println("c.js:add d.js:start");
request.AddResource("/d.js")
CPrintln("c.js:add d.js:end");out.Println("c.js:add d.js:end");
CPrintln("c.js:end");out.Println("c.js:end");
@>
