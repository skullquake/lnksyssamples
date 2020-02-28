<@ CPrintln("/js/WidgetC"); @>
define(
	[
		 "dojo/_base/declare"
		,"/js/WidgetB.js"
		,"dojo/ready"
	],
	function(
		 declare
		,_WidgetB
		,ready
	){
		return declare(
			"WidgetC",
			WidgetB,
			{
				onClick:function(){
					this.log("onClick");
					switch(this.get("msgCase")){
						case "UPPERCASE":
							this.error("UPPERCASE");
							this.set("msgClass","alert alert-danger");
							break;
						case "LOWERCASE":
							this.warn("LOWERCASE");
							this.set("msgClass","alert alert-warning");
							break;
					}
					this.inherited(arguments);
				}
			}
		);
	}
);



