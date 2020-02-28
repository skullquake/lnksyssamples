<@
lnksys.data.genarr=function(h,w,cb){
	idx=0;
	if(cb==null){
		     cb=function(a,b){return idx++};
	}
	var arr=[];
	for(var i=0;i<h;i++){
		var row=[];
		for(var j=0;j<w;j++){
			row.push(cb(i,j));
		}
		arr.push(row);
	}
	return arr;
};
lnksys.data.arr2delim=function(a,df,dl){
	df=df==null?',':df;
	dl=dl==null?'\n':dl;
	var ret='';
	a.forEach(function(b){
		ret+=b.join(df);
		ret+=dl;
	});
	return ret;
}
lnksys.data.arr2table=function(a){
	var ret=''
	ret+='<table class="table table-striped table-sm">';
	a.forEach(function(b){
		ret+='<tr>';
		ret+='<td>';
		ret+=b.join('</td><td>');
		ret+='</td>';
		ret+='</tr>';
	});
	ret+='</table>';
	return ret;
};
lnksys.data.arr2canvas=function(a){
	var ret=''
	ret+='<canvas id="tutorial" width="150" height="150"></canvas>\n';
	ret+='<script>\n';
	ret+="	var canvas = document.getElementById('tutorial');\n";
	ret+="	if (canvas.getContext) {\n";
	ret+="		var ctx = canvas.getContext('2d');\n";
	ret+="		// drawing code here\n";
	ret+="		var ctx = canvas.getContext('2d');\n";
	a.forEach(function(b,bidx){
		b.forEach(function(c,cidx){
			ret+="		ctx.fillStyle = 'rgb("+[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)].join(',')+")';\n";
			ret+="		ctx.fillRect("+bidx+", "+cidx+", "+1+", "+1+");\n";
		});
	})
	/*
	ret+="		ctx.fillRect(10, 10, 50, 50);\n";
	ret+="		ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';\n";
	ret+="		ctx.fillRect(30, 30, 50, 50);\n";
	*/
	ret+="	} else {\n";
	ret+="		// canvas-unsupported code here\n";
	ret+="	}\n";
	ret+='</script>\n';
	return ret;
}
@>
