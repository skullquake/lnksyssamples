var dojoConfig={
	async:true,
	//baseUrl:'/lib/dojo/dojo',
	baseUrl:'/',
	cacheBust:new Date(),
	waitSeconds:5,
	parseOnLoad:true,
	packages:[
		/*
		{ name: "dojo", location: "/js/dojo/dojo" },
		{ name: "dijit", location: "/js/dojo/dijit" },
		{ name: "dojox", location: "/js/dojo/dojox" },
		{ name: "xstyle", location: "/js/xstyle" },
		{ name: "lnksys", location: "/js/xstyle" }
		*/
		{ name: "dojo", location: "/lib/dojo/dojo" },
		{ name: "dijit", location: "/lib/dojo/dijit" },
		{ name: "dojox", location: "/lib/dojo/dojox" },
		{ name: "xstyle", location: "/lib/xstyle" },
		{ name: "main", location: "/js/modules" },
		{ name: "lnksys", location: "/lib/lnksys" }
	]
};
