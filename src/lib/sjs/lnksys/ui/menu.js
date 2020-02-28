<@
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	include("/lib/sjs/lnksys/libalert.js");
	lnksys.ui.Menu=new Class({
		node:null,
		title:null,
		items:null,
		initialize:function(props){
			this.log('initialize()');
			this.items=[];
			this.title='';
			this.nav=new lnksys.ui.Node({
				node:'nav',
				attr:{
					class:'navbar navbar-expand-lg navbar-dark bg-dark'
				}
			});

			return this;
		},
		addItem:function(hrefP,titleP){
			this.items.push(
				{
					href:hrefP,
					title:titleP
				}
			);
			return this;
		},
		setItems:function(itemsP){
			this.items=itemsP;
			return this;
		},
		setTitle:function(titleP){
			this.title=titleP;
			return this;
		},
		toHtml:function(a){
			var t0=new Date();
			this.nav.addChild(
				new lnksys.ui.Node({
					node:'a',
					attr:{
						class:'navbar-brand',
						href:'#'
					},
					contents:this.title==null||this.title==''?'':this.title
				})
			);
			this.navbarContents=new lnksys.ui.Node({
				node:'div',
				attr:{
					"class":"collapse navbar-collapse",
					//"id":"test"
				}
			});
			this.nav.addChild(
				new lnksys.ui.Node({
					node:'button',
					attr:{
						"class":"navbar-toggler",
						"type":"button",
						"data-toggle":"collapse",
						"data-target":'#'+this.navbarContents.attr.id,//"#test",
						"aria-controls":"navbarSupportedContent",
						"aria-expanded":"false",
						"aria-label":"Toggle navigation"
					}
				}).addChild(
					new lnksys.ui.Node({
						node:'span',
						attr:{
							"class":"navbar-toggler-icon"
						}
					})
				)
			);

			this.nav.addChild(this.navbarContents)
			this.navbarNav=new lnksys.ui.Node({
				node:'ul',
				attr:{
					'class':'navbar-nav mr-auto'
				}
			});
			this.navbarContents.addChild(this.navbarNav)

			for(var i=0;i<this.items.length;i++){
				this.navbarNav.addChild(
					new lnksys.ui.Node({
						node:'li',
						attr:{
							'class':'nav-item'
						},
					}).addChild(
						new lnksys.ui.Node({
							node:'a',
							attr:{
								'class':'nav-link',
								'href':this.items[i].href==null||this.items[i].href==''?'#':this.items[i].href,
								'onclick':this.items[i].onclick==null||this.items[i].onclick==''?'#':this.items[i].onclick
							},
							contents:this.items[i].title==null||this.items[i].title==''?'#':this.items[i].title
						})
					)
				);
			}

			var ret=this.nav.toHtml(' ');
			var t1=new Date();
			this.log('toHtml()['+(t1-t0)+' ms]')
			return ret;
		},
		log:function(a){
			console.log('lnksys.ui.Menu:'+a);
		}
	});
@>

