<@ CPrintln('main.js'); @>
require(
	[
		 'dojo/dom'
		,'dojo/dom-construct'
		,'dojo/ready'
		,'dojo/_base/array'
		//,'/res/js/widgets/MyWidget/MyWidget.js'
		,'lnksys/MyWidget/MyWidget'
		/*
		,'/res/js/widgets/Layout/Layout.js'
		,'/res/js/widgets/Sidebar/Sidebar.js'
		,'/res/js/widgets/Topbar/Topbar.js'
		,'/res/js/widgets/Dialog/Dialog.js?FOO=BAR'
		,'dojo/_base/xhr'
		*/
	],
	function(
		 dom
		,domConstruct
		,ready
		,array
		,MyWidget
		/*
		,Layout
		,Sidebar
		,Topbar
		,Dialog
		,xhr
		*/
	){
		/*
		var dialog=new Dialog();
		dialog.setContent('<h3>LOADING...</h3>');
		dialog.show();
		setTimeout(
			dojo.hitch(this,function(){
				dialog.destroy();
			}),
			500
		);
		var layout=new Layout();
		var myWidget=new MyWidget();
		layout.placeAt(dojo.body());
		var sidebar=new Sidebar();
		sidebar.getItems();
		sidebar.placeAt(layout.sidebar);
		var topbar=new Topbar();
		topbar.placeAt(layout.topbar);
		myWidget.placeAt(layout.content);
		layout.setTitle('Landing Page');
		*/
	}
);
