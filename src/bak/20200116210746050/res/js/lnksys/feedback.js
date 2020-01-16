lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
lnksys.ui=typeof(lnksys.ui)=='undefined'?{}:lnksys.ui;
lnksys.ui.feedback=typeof(lnksys.ui.feedback)=='undefined'?{}:lnksys.ui.feedback;
lnksys.ui.feedback.process=function(obj_feedback){
	try{
		console.log('1');
		//JSON.parse(_obj_feedback);
		obj_feedback=JSON.parse(obj_feedback);
		if(typeof(obj_feedback)==='string'){
			console.log('2');
			window.terminal.echo("is string");
			window.terminal.echo(data);
		}else{
			console.log('3');
			if(Array.isArray(obj_feedback)){
				console.log('4');
				window.terminal.echo(JSON.stringify(obj_feedback));
			}else{
				console.log('5');
				if(obj_feedback['type']==null){
					console.log('6');
				}else{
					console.log('7');
					switch(obj_feedback['type']){
						case 'text':
							if(typeof(obj_feedback['data'])==='string'||obj_feedback['data'] instanceof String){
								window.terminal.echo(obj_feedback['data']);
							}else{
								window.terminal.echo(JSON.stringify(obj_feedback['data']));
							}
							break;
						case 'js':
							if(typeof(obj_feedback['data'])==='string'||obj_feedback['data'] instanceof String){
								try{
									console.log('1');
									eval(obj_feedback['data']);
								}catch(e){
									console.error(e.toString());
								}
								break;
							}else{
								window.terminal.echo('No feedback data provided');
							}
						case 'info':
							if(typeof(obj_feedback['data'])==='string'||obj_feedback['data'] instanceof String){
								try{
									lnksys.ui.info(obj_feedback['data']);
								}catch(e){
									console.error(e.toString());
								}
								break;
							}else{
								window.terminal.echo('No feedback data provided');
							}
						default:
							window.terminal.echo('Invalid feedback type ('+obj_feedback['type']+')');
							break;
					}
				}
			}
		}
	}catch(e){
		console.error(e.toString());
		console.log('4');
		window.terminal.echo(obj_feedback);
	}
	window.terminal.resume();
}
