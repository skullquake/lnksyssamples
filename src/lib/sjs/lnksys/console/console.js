<@
(function(){
	//----------------------------------------
	var term_fg_black='\033[0;30m';
	var term_fg_red='\033[0;31m';
	var term_fg_green='\033[0;32m';
	var term_fg_yellow='\033[0;33m';
	var term_fg_blue='\033[0;34m';
	var term_fg_magenta='\033[0;35m';
	var term_fg_cyan='\033[0;36m';
	var term_fg_white='\033[0;37m';
	var term_reset='\033[0m';
	//----------------------------------------
	console.log=function(a){
		CPrint(term_fg_blue);
		CPrint(a);
		CPrintln(term_reset);
	}
	console.warn=function(a){
		CPrint(term_fg_yellow);
		CPrint(a);
		CPrintln(term_reset);
	}
	console.error=function(a){
		CPrint(term_fg_red);
		CPrint(a);
		CPrintln(term_reset);
	}
	console.debug=function(a){
		CPrint(term_fg_magenta);
		CPrint(a);
		CPrintln(term_reset);
	}
})();
@>
