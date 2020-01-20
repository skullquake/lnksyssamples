<@
CPrintln("b.js:start");out.Println("b.js:start");
CPrintln("b.js:add c.js:start");out.Println("b.js:add c.js:start");
request.AddResource("/c.js")
CPrintln("b.js:add c.js:end");out.Println("b.js:add c.js:end");
CPrintln("b.js:end");out.Println("b.js:end");
@>
