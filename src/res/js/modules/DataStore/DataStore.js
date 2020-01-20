define(
	[
		"dojo/_base/declare",
		"dojo/store/util/SimpleQueryEngine"
	],
	function(declare,SimpleQueryEngine) {
		declare(
			"Modules.DataStore",
			null,
			{
				constructor: function(options){ },
					data: null,
					index: null,
				queryEngine: SimpleQueryEngine,

		//    what follows is the actual API signature
				idProperty: "id",
				get: function(id){ },
				getIdentity: function(object){ },
				put: function(object, options){ },
				add: function(object, options){ },
				remove: function(id){ },
				query: function(query, options){ },
				setData: function(data){ }
			}
		);
	}
);
