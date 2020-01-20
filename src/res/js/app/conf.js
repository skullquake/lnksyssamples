<@ CPrintln("app/conf.js"); @>
dojoConfig={
	//baseUrl:"/js",
	cacheBust:true,
	async:true,
	packages:[
	/*
		{
			name: "xstyle",
			location: "/lib/xstyle"
		},
	/*
	],
	deps:[/*"xstyle/main"*/],
	paths:{
		/*
		"jQuery":"/lib/jquery/3.2.1/jquery.min",
		"ace":"/lib/ace/ace",
		"xtermjs":"/lib/xterm/xterm",
		"jspanel":"/lib/jspanel/4.5.0/jspanel.min",
		"jqueryterminal":"/lib/jquery.terminal/2.4.1/js/jquery.terminal",
		"jquerytoast":"/lib/jquery.toast/1.3.2/jquery.toast.min",
		"jquerygrowl":"/lib/jquery.growl/1.3.5/jquery.growl",
		"jexcel":"/lib/jexcel/2.0.0/js/jquery.jexcel",
		"jquery_csv":"/lib/jquery-csv/0.8.3/jquery.csv.min",
		"babylonjs":"/lib/babylonjs/babylon"
		*/
	},
	shim: {
		/*
		"jQuery": {
			exports: "$"
		},
		"jqueryterminal":{
			deps:["jQuery"],
			exports: "jqueryterminal"
		},
		"ace": {
			exports: "ace"
		},
		"xtermjs": {
			exports: "xtermjs"
		},
		"jquerytoast":{
			deps:["jQuery"],
			exports:"jquerytoast"
		},
		"jquery_csv":{
			deps:["jQuery"],
			exports:"jquery_csv"
		},
		"jexcel":{
			deps:["jQuery"],
			exports:"jexce"
		},
		"jquerygrowl":{
			deps:["jQuery"],
			exports:"jquerygrowl"
		},
		"jspanel":{
			deps:["jQuery"],
			exports:"jspanel"
		},
		"babylonjs":{
			exports:"babylonjs"
		}
		*/
	}
};