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
			height: function() { return Math.min(400, window.innerHeight*0.5);}
		},
		position: 'center-top 0 100',
		animateIn: 'jsPanelFadeIn',
		headerTitle: title,//'Title',
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
