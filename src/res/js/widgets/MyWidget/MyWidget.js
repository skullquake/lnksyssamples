<@ CPrintln('MyWidget.js'); @>
define(
	[
		// 'dojo/_base/declare'
		 'dojo/declare'
		,'dijit/_WidgetBase'
		//,'dojo/dom-construct'
		//,'xstyle/css!./ui/MyWidget.css'
		//,'dijit/_TemplatedMixin'
		//,'dojo/text!./templates/MyWidget.html'
	],
	function(
		 declare
		,_WidgetBase
		//,_TemplatedMixin
		//,domConstruct
		//,MyWidget_css
		//,template
	){
		return declare(
			'lnksys.MyWidget',
			[
				// _WidgetBase
				//,_TemplatedMixin
			],
			{
				//templateString:template,
				//baseClass:'MyWidget',
				constructor:function(){
					console.log('asdf.MyWidget:constructor');
					//console.log(this.templateString);
				},
				postCreate:function(){
					console.log('asdf.MyWidget:postCreate');
				}
			}
		);
	}
);
/*
require(
	[
		"dojo/declare",
		//"dojo/_base/declare",
		"dijit/_WidgetBase",
		"dijit/_TemplatedMixin"
	],
	function(
		declare,
		_WidgetBase,
		_TemplatedMixin
	){
		declare(
			"MyWidget",
			[
				_WidgetBase,
				_TemplatedMixin
			],
			{
				templateString: "<div>hello world</div>"
			}
		);
	}
);
*/

