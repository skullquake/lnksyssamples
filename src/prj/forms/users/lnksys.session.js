//create users
for(var i=0;i<32;i++){
    $.ajax
    ({
        type: "POST",
        url: '/lib/sjs/tst/dbUser.js',
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({"action":"createUser","params":{"name":"usr"+i}}),
        success: function (data) {
            console.log(JSON.stringify(data,0,' '));
        },
        fail:function(e){
            console.error(e.toString());
        }
    })
}

//remove users
for(var i=0;i<32;i++){
    $.ajax
    ({
        type: "POST",
        url: '/lib/sjs/tst/dbUser.js',
        contentType: 'application/json',
        async: true,
        data: JSON.stringify({"action":"removeUser","params":{"name":"usr"+i}}),
        success: function (data) {
            console.log(JSON.stringify(data,0,' '));
        },
        fail:function(e){
            console.error(e.toString());
        }
    })
}
//list users
$.ajax({
  type: "POST",
  url: '/lib/sjs/tst/dbUser.js',
  contentType: 'application/json',
  async: true,
  data: JSON.stringify({"action":"listUsers"}),
  success: function (data) {
    console.log(JSON.stringify(data,0,' '));
  },
  fail:function(e){
    console.error(e.toString());
  }
})
//create user sessions ($i users, each with $j sessions)
for(var i=0;i<32;i++){
	for(var j=0;j<4;j++){
      $.ajax({
          type: "POST",
          url: '/lib/sjs/tst/dbUser.js',
          contentType: 'application/json',
          async: true,
          data: JSON.stringify({"action":"createUserSession","params":{"name":"usr"+i}}),
          success: function (data) {
              console.log(JSON.stringify(data,0,' '));
          },
          fail:function(e){
              console.error(e.toString());
          }
      });
  }
}
//retrieve all sessions
$.ajax({
    type: "POST",
    url: '/lib/sjs/tst/dbUser.js',
    contentType: 'application/json',
    async: true,
    data: JSON.stringify({"action":"listSessions"}),
    success: function (data) {
        console.log(JSON.stringify(data,0,' '));
    },
    fail:function(e){
        console.error(e.toString());
    }
})
//delete sessions
$.ajax({
    type: "POST",
    url: '/lib/sjs/tst/dbUser.js',
    contentType: 'application/json',
    async: true,
    data: JSON.stringify({"action":"listSessions"}),
    success: function (data) {
        data.forEach(function(row,rowidx){
            $.ajax({
                type: "POST",
                url: '/lib/sjs/tst/dbUser.js',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify({"action":"removeSession","params":{"guid":row.guid}}),
                success: function (data) {
		            console.log(row.guid+' removed');
                },
                fail:function(e){
                    console.error(e.toString());
                }
            })
        });
    },
    fail:function(e){
        console.error(e.toString());
    }
})