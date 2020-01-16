function printMembers(){
    Object.keys(request).forEach(function(a,b){
        out.Println(a);
    });
}
function test000(){
    CPrintln("test.js:start");
    CPrintln("add resource:start");
    request.AddResource("/a.js");
    CPrintln("add resource:end");
    CPrintln("test.js:end");
}
function test001(){
    request.AddResource("/repl.js?cmd=ls|/repl.js?cmd=grep\\%20foo")
    request.AddResource("/r0.js|/f1.js")
    request.AddResource("/test.js");
}
test000();



