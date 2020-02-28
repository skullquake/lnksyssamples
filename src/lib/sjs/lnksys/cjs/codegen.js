<@
	/* client side js generator */
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	lnksys.cjs.CodeGenerator=lnksys.cjs.CodeGenerator==null?new Class({
		vars:{},
		fns:{},
		fnc:[],
		initialize:function(props){
			this.log('initialize()');
		},
		// create variable
		mkvar:function(k,v){
			k=typeof(k)=='undefined'?this.mknm():k;
			this.vars[k]=typeof(v)=='undefined'?null:typeof(v)=='string'?'\''+v+'\'':v;
			return this;
		},
		// crt fcf
		mkfn:function(args){
			var ret=false;
			if(
				args.name!=null&&//function name
				typeof(args.name)=='string'
			){
				this.fns[args.name]={};//function 
				this.fns[args.name].args=args.args;//function arguments
				this.fns[args.name].body=args.body;//function body
			}else{
			}
			return this;
		},
		//make function call
		mkfnc:function(args){
			var ret=false;
			if(
				args.name!=null&&//function name
				typeof(args.name)=='string'
			){
				this.fnc.push({
					nm:args.name,
					args:args.args
				})
			}else{
			}
			return this;
		},

		// crt cod blk
		mkblk:function(){
		},
		//mkobj
		mkobj:function(){
		},
		// reas var
		reasvar:function(){
		},
		// inc var
		incvar:function(){
		},
		// dec var
		decvar:function(){
		},
		// crt ins
		mkinst:function(){
		},
		// if stmt
		mkstmt:function(){
		},
		// elif stmt
		mkelif:function(){
		},
		// else stmt
		mkelse:function(){
		},
		// for loop
		mkfor:function(){
		},
		// try blk
		mktry:function(){
		},
		// ctch blk
		mkctch:function(){
		},
		// chain fn
		mkchain:function(){
		},
		// asgn prop
		mkprop:function(){
		},
		// mk return
		mkret:function(){
		},
		// con log
		mklog:function(){
		},
		// comment
		mkcmt:function(){
		},
		// uniq nm
		mknm:function(){
			return 'cg'+lnksys.cjs.CodeGenerator.idx++;
		},
		toString:function(){
			var ret='';
			var _this=this;
			Object.keys(this.vars).forEach(function(k,kidx){
				ret+='var ${K}=${V};\n'.replace('${K}',k).replace('${V}',_this.vars[k])
			});
			Object.keys(this.fns).forEach(function(k,kidx){
				ret+='function ${FNAM}(${ARGS}){\n\t${BODY}\n};\n'
					.replace('${FNAM}',k)
					.replace('${ARGS}',_this.fns[k].args.join(','))
					.replace('${BODY}',_this.fns[k].body)
			});
			this.fnc.forEach(function(fnc,kidx){
				var fncargs=JSON.stringify(fnc.args)
				fncargs=fncargs.substring(1,fncargs.length-1);
				ret+='${FNAME}(${ARGS});\n'
					.replace('${FNAME}',fnc.nm)
					.replace('${ARGS}',fncargs)//.join(','))
			});
			return ret;
		},
		test:function(){
			this.log('test()');
			var glyphs='qwerasdfzxcvtyighkbnm';
			var _this=this;
			for(var k=0;k<32;k++){
				//_this.mkvar(g,gidx);
				_this.mkvar(_this.mknm(),Math.random());
				_this.mkfn({name:_this.mknm(),args:['a','b','c'],body:'a=c;'});
				var args=[];
				for(var i=Math.floor(Math.random()*8);i--;i>0){
					args.push(Math.random())
				}
				_this.mkfnc({name:_this.mknm(),args:args});
			};
			this.log(this.toString())
		},
		log:function(a){
			console.log('lnksys.cjs.CodeGenerator:'+a);
		}
	}):lnksys.cjs.CodeGenerator;
	//monotonic counter
	lnksys.cjs.CodeGenerator.idx=typeof(lnksys.cjs.CodeGenerator.idx)=='undefined'?0:lnksys.cjs.CodeGenerator.idx;
@>

