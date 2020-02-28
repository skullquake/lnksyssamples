<@
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	include("/lib/sjs/lnksys/libalert.js");
	lnksys.ui.Form=typeof(lnksys.ui.Form)=='undefined'?new Class({
		destroy:function(){
			console.log(this);
		},
		node:null,
		title:null,
		items:null,
		initialize:function(props){
			this.log('initialize()');
			this.items=[];
			this.node=new lnksys.ui.Node({
				node:'form',
				attr:{
				}
			});
			this.btn=new lnksys.ui.Node({
				node:'button',
				contents:'Submit',
				attr:{
					class:'btn btn-default',
					onclick:function(el){
						//note event is available
						//el is the element,
						//this is the outermost found props
						event.preventDefault();
						$.ajax({
							type:"POST",
							url:"/forms/formtest.html",
							data:$('#'+this.node.attr.id).serialize(),
							success:function(a){console.log(a);},
							error:function(a){console.log(a);}
						});
						return false;
					}

				}
			})
			//tests
			this.node.addChild(new lnksys.ui.Node({
				node:'btn',
				contents:'Test Button',
				attr:{
					class:'btn btn-default',
					onclick:function(el){
						console.log(el);
						console.log(this);
						event.preventDefault();
						$.ajax({
							type:"POST",
							url:"/forms/formtest.html",
							data:$('#'+this.node.attr.id).serialize(),
							success:function(a){console.log(a);},
							error:function(a){console.log(a);}
						});
					}
				}
			}));
			return this;
		},
		addItem:function(itmP){
			this.log('addItem()');
			this.items.push(
				itmP
			);
			return this;
		},
		setItems:function(itemsP){
			this.log('setItems()');
			this.items=itemsP;
			return this;
		},
		toHtml:function(a){
			this.log('toHtml()');
			var t0=new Date();
			for(var i=0;i<this.items.length;i++){
				var grp=new lnksys.ui.Node({
					node:'div',
					attr:{
						'class':'form-group'
					},
				});

				var inp=new lnksys.ui.Node({
					node:'input',
					attr:{
						'class':'form-control',
						'type':typeof(this.items[i].type)=='undefined'?'text':this.items[i].type,
						'placeholder':typeof(this.items[i].placeholder)=='undefined'?'':this.items[i].placeholder
					},
				});
				inp.attr.name=typeof(this.items[i].name)=='undefined'?inp.attr.id:this.items[i].name;
				var lbl=new lnksys.ui.Node({
					node:'label',
					contents:this.items[i].label,
					attr:{
						'for':inp.attr.id
					}
				});
				grp.addChild(
					[
						lbl,
						inp
					]
				);
				if(this.items[i].small!=null){
					var sml=new lnksys.ui.Node({
						node:'small',
						attr:{
							'class':'form-text form-text-muted',
							'id':inp.attr.id+'Help'
						},
					});
					inp.atr['aria-describedby']=sml.attr.id;
					grp.push(sml);
				}
				this.node.addChild(grp);
			}
			this.node.addChild(this.btn);
			var backslash=(String.fromCharCode(92));
			var attr_props=JSON.stringify(this).replace(/\"/g,'&quot;')//for htmlprop
			this.node.attr.props=attr_props;
			this.node.addChild(
				new lnksys.ui.Node({
					node:'img',
					attr:{
						src:null,
						onerror:function(){
							window.lnksys.ui.registry={};
							lnksys.ui.registry[this.node.attr.id]=this;
						}
					}
				})
			);
			this.scr=new lnksys.ui.Node({
				node:'script',
				attr:{
					type:'text/javascript',
					props:attr_props
				},
				contents:
'('+(function(){
}).toString()+").call(JSON.parse(document.currentScript.getAttribute('props')))"

			});
			this.node.addChild(this.scr);
			var ret=this.node.toHtml(' ');
			var t1=new Date();
			this.log('toHtml()['+(t1-t0)+' ms]')
			return ret;
		},
		getAllChildren:function(a){//in order to use with regular nodes
			return [this.node]
		},
		log:function(a){
			//console.log('lnksys.ui.Form:'+a);
		}
	}):lnksys.ui.Form;
@>

