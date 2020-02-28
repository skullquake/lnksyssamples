<@
CPrintln('/lib/sjs/lnksys/reflect/reflect.js')
lnksys.reflect.reflect=typeof(lnksys.reflect.reflect)=='undefined'?function(){
	function getKeys(o){
		var ret={};
		if(o!=null){
			ret["type"]=typeof(o);
			if(typeof(o)!='function'){
				ret["children"]={};
				Object.keys(o).forEach(function(k,kidx){
					ret.children[k]=getKeys(o[k]);
				});
			}
			/*
			*/
		}else{
			ret["type"]='null';
		}
		return ret;
	}
	try{
		var ret={};
		ret.request=getKeys(request);
		ret.Parameters=getKeys(Parameters());
		ret.resource=getKeys(resource());
		//ret['this']=Object.keys(this);
		//ret.request_fn={};//getKeys(request());
		//var a=Request();
		//ret.Parameters=getKeys(Parameters());
		//ret.ParametersStandardKeys=Parameters().StandardKeys();
		//ret.response=getKeys(response);
		//ret.out=getKeys(out);
		//ret['this']=getKeys(global);
		return ret;
	}catch(e){
		return {};
	}
}:lnksys.reflect.reflect;
@>
