<@ CPrintln("/js/WidgetA"); @>
define(
	[
		 "dojo/_base/declare"
		,"dijit/_WidgetBase"
		,"dijit/_TemplatedMixin"
		,"dijit/_OnDijitClickMixin"
		,"dijit/parser"
		,"dojo/on"
		,"dojo/_base/lang"
		,"dojo/ready"
		,"dojo/text!./templates/template.html"
		,"xstyle/css!./css/style.css"
	],
	function(
		 declare
		,_WidgetBase
		,_TemplatedMixin
		,_OnDijitClickMixin
		,parser
		,on
		,lang
		,ready
		,template
		,css
	){
		declare(
			"WidgetA",
			[
				 _WidgetBase
				,_TemplatedMixin
				,_OnDijitClickMixin
			],
			{
				templateString:template,
				baseClass:"WidgetA",
				buttonText:"Hello",
				_setButtonTextAttr:{
					node:'buttonNode',
					type:'innerHTML'
				},
				buttonClass:"btn btn-info",
				_setButtonClassAttr:{
					 node:'buttonNode'
					,type:'attribute'
					,attribute:"class"
				},
				msg:"Msg",
				_setMsgAttr:{
					node:'msgNode',
					type:'innerHTML'
				},
				_getMsgAttr:function(){
					return this.msg;
				},
				buttonDisabled:false,
				_setButtonDisabledAttr:function(){
					this.buttonNode.setAttribute("disabled",true);
					this.set("buttonText","DISABLED");
					this.set("buttonClass","btn btn-danger disabled");
				},
				postCreate:function(){
					window.asdf=this;
					this.log("postCreate");
					this.set("msg","postCreate");
				},
				_onButtonClick:function(e){
					this.log("_onButtonClick");
					this.set("msg","buttonClick");
					this.set("buttonDisabled",true);
					return this.onButtonClick(e)
				},
				onButtonClick:{},
				buttonMouseEnter:function(e){
					this.log("buttonMouseEnter");
					this.set("msg","buttonMouseEnter");
				},
				buttonMouseLeave:function(e){
					this.log("buttonMouseLeave");
					this.set("msg","buttonMouseLeave");
				},
				buttonMouseDown:function(e){
					this.log("buttonMouseDown");
					this.set("msg","buttonMouseDown");
				},
				log:function(a){
					console.log(((this.id==null||this.id=="")?"NO ID YET":this.id)+":"+a.toString());
				},
				warn:function(a){
					console.warn(((this.id==null||this.id=="")?"NO ID YET":this.id)+":"+a.toString());
				},
				error:function(a){
					console.error(((this.id==null||this.id=="")?"NO ID YET":this.id)+":"+a.toString());
				},
				debug:function(a){
					console.debug(((this.id==null||this.id=="")?"NO ID YET":this.id)+":"+a.toString());
				}
			}
		);
		ready(function(){
			dojo.parser.parse();
		});
	}
);
