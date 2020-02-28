JSON.parse($('#n43').parents('[propsz]:eq(0)').attr('props'))

(function(el){
window.el=el;
	console.log(
		/* fn here */(function(){try{return JSON.parse($(e).parents('[props]:eq(0)').attr('props'))}catch(e){return {}}})()
	);
})(this)


(function(el,fn){
console.log(el);
fn.call((function(){try{return JSON.parse($(e).parents('[props]:eq(0)').attr('props'))}catch(e){return {}}})());
})(this,function(){console.log(this)})
