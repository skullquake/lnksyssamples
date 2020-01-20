<@
CPrintln("a.js:start");out.Println("a.js:start");
CPrintln("a.js:add b.js:start");out.Println("a.js:add b.js:start");
request.AddResource("/b.js")
CPrintln("a.js:add b.js:end");out.Println("a.js:add b.js:end");
CPrintln("a.js:end");out.Println("a.js:end");
@>
