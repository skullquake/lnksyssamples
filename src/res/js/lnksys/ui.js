lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
lnksys.ui=typeof(lnksys.ui)=='undefined'?{}:lnksys.ui;
lnksys.ui.open=function(url,title,formparams){
	if(url==null){
		console.error('lnksys.ui.open: no url');
		return;
	}
	title=title==null?'':title;
	formparams=formparams==null?{}:formparams;
	jsPanel.create({
		/*
		resizeit:{//dragit
			//disable:true
			start:function(){console.log('a')},
			resize:function(){console.log('b')},
			stop:function(){console.log('c')}
		},
		*/

		theme: {
			bgPanel: '#222222',
			bgContent: '#111111',
			colorHeader: '#FFFFFF',
			colorContent: '#888888'
		},
		//headerToolbar: 'Subtitle',
		//footerToolbar: 'Status',
		contentSize: {
			width: function() { return Math.min(730, window.innerWidth*0.9);},
			height: function() { return Math.min(300, window.innerHeight*0.5);}
		},
		position: 'center-top 0 100',
		animateIn: 'jsPanelFadeIn',
		//onwindowresize:true,
		headerTitle: title,//'Title',
		/*
		*/
		contentAjax: {
			url: url,
			evalscripttags: true,
			done: function (panel) {
				panel.content.innerHTML = this.responseText;
			}
		},
		onwindowresize: true,
		callback: function (panel) {
			jsPanel.setStyles(panel.content, {
				padding: '10px',
				fontSize: '1rem'
			});
		}
	});
}
lnksys.ui.info=function(content){
	content=content==null?'':content;
	jsPanel.create({
		theme: {
			bgPanel: '#222222',
			bgContent: '#111111',
			colorHeader: '#FFFFFF',
			colorContent: '#888888'
		},
		contentSize: {
			width: function() { return Math.min(730, window.innerWidth*0.9);},
			height: function() { return Math.min(300, window.innerHeight*0.5);}
		},
		position: 'center-top 0 100',
		animateIn: 'jsPanelFadeIn',
		headerTitle: 'info',//title,//'Title',
		content:content,
		onwindowresize: true,
		callback: function (panel) {
			jsPanel.setStyles(panel.content, {
				padding: '10px',
				fontSize: '1rem'
			});
		}
	});
}
lnksys.ui.reload=function(){
	window.location.reload();
}
