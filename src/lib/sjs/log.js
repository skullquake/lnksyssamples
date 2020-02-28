<@
	var msg=JSON.parse(request.RequestContent().String())
	var term_fg_black='\033[0;30m';
	var term_fg_red='\033[0;31m';
	var term_fg_green='\033[0;32m';
	var term_fg_yellow='\033[0;33m';
	var term_fg_blue='\033[0;34m';
	var term_fg_magenta='\033[0;35m';
	var term_fg_cyan='\033[0;36m';
	var term_fg_white='\033[0;37m';

	var term_reset='\033[0m';
	try{
		switch(msg.lvl){
			case 'info':
				CPrint(term_fg_blue);
				break;
			case 'warn':
				CPrint(term_fg_yellow);
				break;
			case 'error':
				CPrint(term_fg_red);
				break;
			case 'debug':
				CPrint(term_fg_magenta);
				break;
			default:
				CPrint(term_fg_magenta);
				break;
		}
		CPrint("["+msg.time+":"+msg.lvl+":"+msg.node+":"+msg.url+"]: "+msg.msg)
	}catch(e){
		CPrint(term_fg_red);
		CPrint(request.RequestContent().String())
	}finally{
	}
	CPrintln(term_reset);
@>
