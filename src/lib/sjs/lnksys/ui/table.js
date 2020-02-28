<@
	include("/lib/sjs/cjs/cjs.js");
	include("/lib/sjs/lnksys/libconsole.js");
	include("/lib/sjs/lnksys/libalert.js");
	lnksys.ui.Table=lnksys.ui.Table==null?new Class({
		node:null,
		header:null,
		rows:null,
		initialize:function(props){
			this.log('initialize()');
			this.rows=[];
			this.header=[];
			return this;
		},
		setHeader:function(headerP){
			this.header=headerP;
		},
		addRow:function(rowP){
			this.rows.push(rowP);
			return this;
		},
		setRows:function(rowsP){
			this.rows=rowsP;
			return this;
		},
		toHtml:function(padc){
			var t0=new Date();
			var ret=null;
			var _this=this;

			this.table=new lnksys.ui.Node({
				node:'table',
				attr:{
					class:'table table-striped table-sm'
				}
			});
			this.thead=new lnksys.ui.Node({
				node:'thead'
			});
			this.theadtr=new lnksys.ui.Node({
				node:'tr'
			});
			this.thead.addChild(this.theadtr);
			this.table.addChild(this.thead);
			this.tbody=new lnksys.ui.Node({
				node:'tbody'
			});
			this.table.addChild(this.tbody);


			this.header.forEach(function(h,hidx){
				_this.theadtr.addChild(
					new lnksys.ui.Node({
						node:'td',
						contents:h
					})
				);
			});
			this.rows.forEach(function(r,ridx){
				var row=new lnksys.ui.Node({
					node:'tr'
				});
				r.forEach(function(c,cidx){
					row.addChild(
						new lnksys.ui.Node({
							node:'td',
							contents:c
						})
					);
				});
				_this.tbody.addChild(row);
			});
			ret=this.table.toHtml(padc);

			return ret;
		},
		log:function(a){
			console.log('lnksys.ui.Table:'+a);
		}
	}):lnksys.ui.Table;
@>

