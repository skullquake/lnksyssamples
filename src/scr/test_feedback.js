function test000(){
    feedbackData("asdf-asdf");
}
function test001(){
    var msg="";
    var arr_chr=["░","▒","▓"];
    for(var i=0;i<10;i++){
        for(var j=0;j<40;j++){
            var idx=Math.floor(Math.random()*arr_chr.length);
            msg+=(arr_chr[idx]);
        }
        msg+='<br/>';
    }
    feedbackAlert(msg);
}
function test002(){
    feedbackJS("asdf");
}

test001();


