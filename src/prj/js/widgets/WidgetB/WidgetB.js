<@ CPrintln("/js/WidgetB"); @>
define(
	[
		 "dojo/_base/declare"
		,"dojo/on"
		,"dojo/_base/lang"
		,"/js/WidgetA.js"
		,"dojo/ready"
	],
	function(
		 declare
		,on
		,lang
		,_WidgetA
		,ready
	){
		return declare(
			"WidgetB",
			WidgetA,
			{
				constructor:function(){
				},
				postCreate:function(){
					this.setupEvents();
				},

				msgCase:"",
				_setMsgCaseAttr:function(val){
					this.msgCase=val;
					this._ochMsgCaseAttr(this.get("msgCase"),val);
				},
				_getMsgCaseAttr:function(){
					return this.msgCase;
				},
				_ochMsgCaseAttr:function(oldVal,newVal){
					this.log("_ochMsgCaseAttr");
					switch(newVal){
						case "UPPERCASE":
							this.set("msg",this.get("msg").toUpperCase());
							break;
						case "LOWERCASE":
							this.set("msg",this.get("msg").toLowerCase());
							break;
						default:
							break;
					};
				},
				onClick:function(){
					this.log("onClick");
					switch(this.get("msgCase")){
						case "":
						case "UPPERCASE":
							this.set("msgCase","LOWERCASE");
							break;
						case "LOWERCASE":
							this.set("msgCase","UPPERCASE");
							break;
						default:
							break;
					}
				},
				setupEvents:function(){
					this.log("setupEvents");
					//automatically tracked and unsubscribed on destruction
					this.own(
						on(
							this.msgNode,
							"click",
							lang.hitch(this,this.onClick)
						)
					);
				}
			}
		);
	}
);
