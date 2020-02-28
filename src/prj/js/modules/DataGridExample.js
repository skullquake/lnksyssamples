<@ CPrintln("/js/modules/DataGridExample.js"); @>
require(
	[
		 "dojo/query"
		,"dojox/grid/DataGrid"
		,"dojox/grid/cells"
		,"dojo/_base/lang"
		,"dojo/dom-construct"
		,"dojo/store/JsonRest"
		,"dojo/data/ObjectStore"
		,"dojo/domReady!"
	],
	function(
		 query
		,DataGrid
		,gridCells
		,lang
		,domConstruct
		,JsonRest
		,ObjectStore
		,ready
	){
		var employeeStore = new JsonRest(
			{
				 target:"/js/modules/employees.js"
				,headers:{
					 "X-Foo":"FooValue"
					,"X-Bar":"BarValue"
				}
			}
		);
		window.employeeStore =employeeStore ;
		var grid=new DataGrid(
			{
				 store:dataStore=new ObjectStore(
					{
						objectStore:employeeStore 
					}
				 )
				,structure:[
					 new gridCells.RowIndex({width:"10%"})
					,{name:"Id",field:"id",width:"50px"}
					,{name:"Name",field:"name",width:"200px",editable:true}
					,{name:"Department",field:"department",width:"200px"}
				 ]
				,seletionMode:"multiple"
			}
			,query("#example2 #content")[0]
		);
		grid.on(
			"SelectionChanged",
			lang.hitch(
				grid,
				function(){
					console.log('----------------------------------------')
					this.selection.getSelected().forEach(function(s,sidx){
						console.log(s);
					})
					console.log('----------------------------------------')
				},
				true
			)
		);
		grid.startup();
	}
);
