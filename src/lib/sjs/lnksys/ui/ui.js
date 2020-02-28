<@
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	include("/lib/sjs/lnksys/libalert.js");
	lnksys.ui.Node=lnksys.ui.Node==null?new Class({
		//id:0,
		name:null,
		contents:null,
		attr:null,
		node:null,
		parent:null,
		children:null,
		//cjs
		destroy:function(){
			alert('d');
		},
		initialize:function(props){
			this.log('lnksys.ui.Node:initialize');
			props=props==null?{}:props;
			this.node='div';
			this.children=new Array();
			this.contents='';
			this.parent=''
			//mixin
			var _this=this;
			Object.keys(props).forEach(function(p,pidx){
				_this.log(p+":"+props[p]);
				if(p=='attr'){
					_this[p]=props[p];
				}else{
					_this[p]=props[p];
				}
			});
			this.attr=this.attr==null?{}:this.attr;
			this.attr.id=
				this.attr.id==null||typeof(this.attr.id)=='undefined'?
				//this.uuidv4():
				this.genId()
				:
				this.attr.id
			;
		},
		addChild:function(c){
			if(c!=null){
				var _this=this;
				if(Array.isArray(c)){
					c.forEach(function(_c,_cdx){
						_this.addChild(_c);
					});
				}else{
					_this.children.push(c);
				}
			}
			return this;
		},
		getChildren:function(){
			this.log('getChildren');
			return this.children;
		},
		getAllChildren:function(){
			this.log('getAllChildren');
			var ret=[];
			this.getChildren().forEach(function(c,cidx){
				ret.push(c);
				c.getAllChildren().forEach(function(cc,ccidx){
					if(!ret.indexOf(cc))ret.push(cc);//issue with multiples
				});
			});
			return ret;
		},
		toString:function(){
			this.log('toString');
			var msg='';
			msg+=this.id;
			msg+=':'
			/*
			msg+='\n'
			this.getChildren().forEach(function(c,cidx){
				msg+="\t"+c.getId()+"\n";
				msg+=c.toString();
			});
			*/
			return msg;
		},
		toHtml:function(padc,lvl){
			lvl=lvl==null?0:lvl;
			this.log('toHtml');
			var msg='';
			padc=padc==null?'':padc;
			var dlm=padc==''?'':'\n';
			var pad='';
			for(var i=0;i<lvl;i++)pad+=padc;
			msg+=[
				pad,
				'<',
				this.node,
			].join('');
			var _this=this;
			//readability (create switch for this)
			Object.keys(this.attr).forEach(function(a,aidx){
				//CPrintln(padc.length);
				msg+=padc.length==0?'':'\n';
				msg+=' ';//padc.length==0?' ':padc;
				msg+=padc.length==0?'':(pad+padc+padc);
				msg+=[a,'=','"',typeof(_this.attr[a])=='function'?
					//complicated thing to try and get outer most
					//--
"(function(el,fn){return fn.call((function(){try{return JSON.parse($(el).parents('[props]:eq(0)').attr('props'))}catch(e){return {}}})(),el);})(this,"+_this.attr[a].toString().replace(/\"/g,'&quot;')+")"
					//--
					:_this.attr[a],'"'].join('');
			})
			/*
			msg+=
				(
					(Object.keys(this.attr).length>0)&&
					(padc.length>0)
				)
				?
				'\n'+pad:
				''
			;
			*/
			msg+=[
				'>',
				dlm
				//pad+padc
			].join('');
		if(this.contents!=''){
			msg+=pad+padc+this.contents;
			msg+=dlm;
		}
		this.getAllChildren().forEach(function(c,cidx){
			msg+=c.toHtml(padc,lvl+1);//+'\n';
		});
		msg+=[
				pad,
				'<',
				'/'+this.node,
				'>',
				dlm
			].join('');
			return msg;
		},
		toJson:function(lvl){
			this.log('toJson');
			var msg={
				attr:this.attr,
				content:this.content,
				node:this.node,
				children:[]
			};
			this.getAllChildren().forEach(function(c,cidx){
				msg.children.push(c.toJson());
			});
			return msg;
		},
		uuidv4:function(){
			this.log('uuidv4');
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
				.replace(
					/[xy]/g,
					function(c) {
						var r=Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
						return v.toString(16);
					}
				);
		},
		genId:function(){
			return 'n'+(lnksys.ui.Node.id++);//bootstrap menu borks on ids starting with numbers
		},
		log:function(a){
			//console.debug(this.getId()+":"+a);
		}
	}):lnksys.ui.Node;
	//atomic monotonic counter
	lnksys.ui.Node.id=lnksys.ui.Node.id==null?0:lnksys.ui.Node.id;
@>
