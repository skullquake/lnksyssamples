var lnksys=typeof(lnksys)=='undefined'?{}:lnksys;
lnksys.session=typeof(lnksys.session)=='undefined'?{}:lnksys.session;
lnksys.session.token=typeof(lnksys.session.token)=='undefined'?null:lnksys.session.token;
lnksys.session.getSession=typeof(lnksys.session.getSession)=='undefined'?function(){
	if(lnksys.session.token==null){
		//cjs generated session code
		lnksys.session.token="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
			.replace(
				/[xy]/g,
				function(c) {
					var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);
					return v.toString(16);
				}
			);

		}
	return lnksys.session.token
}:lnksys.session.getSession;
/*
*/

function webactionRequestViaOptions(callbackurl,formid,actiontarget,command,enableProgressElem){
	postForm({
		url_ref:callbackurl,
		form_ref:formid,
		target:actiontarget,
		command:command,
        enable_progress_elem:enableProgressElem==undefined?"true":enableProgressElem
	});
}

var lasturlref="";

function postElem() {
	var elem=[].slice.call(arguments);
	if(elem==undefined) return;
	if (Array.isArray(elem)){
		if (elem.length==0) return;
		if (elem.length==1) {
			elem=elem[0];
		} else {
			for (var elm in elem) {
				postElem(elem[elm]);
			}
			return;
		}
	}
	var options={}
	$(elem).each(function() {
		$.each(this.attributes, function() {
			if(this.specified) {
				if (this.name=="url_ref" || this.name=="form_ref" || this.name=="enable_progress_elem" || this.name=="progress_elem" || this.name=="target" || this.name=="command"){
					options[this.name] = this.value;
				} else if (this.name=="json_ref"){
					if (this.value!=undefined && this.value!="") {
						options[this.name] = JSON.parse(this.value);
					}
				}
			}
		});
	});
	postNode(options);
}

function postNode(){
	var options=[].slice.call(arguments);
	if(options==undefined) return;
	if (Array.isArray(options)){
		if (options.length==0) return;
		if (options.length==1) {
			if (Array.isArray(options[0])){
				for (var opt in options[0]) {
					postNode(options[0][opt]);
				}
				return;
			} if (typeof options[0] === 'function'){
				var optreturn=options[0]();
				if (optreturn===undefined){
					return;
				} else {
					postNode(optreturn);
				}
				return;
			}
			else {
				options=options[0]
			}
		} else {
			for (var opt in options) {
				postNode(options[opt]);
			}
			return;
		}
	} 
	if(options.url_ref==undefined||options.url_ref==""){
		return;
	}
	if(options.ctx==undefined){
		options.ctx=this;
	}
	
	var hasForm=false;
	var enableProgressElem=false;

    if(options.enable_progress_elem!=undefined&&options.enable_progress_elem!=""){
		enableProgressElem=options.enable_progress_elem=="true"?true:false;
	}

	var progressElem="";
	var hasJson=false;
	var errorElem="";
	var urlref="";
	var formid="";
	var command="";
	
	if(options.command!=undefined&&options.command!=""){
		command=options.command;
	}
	
	if(options.form_ref!=undefined&&options.form_ref!=""){
		hasForm=true;
		formid=options.form_ref;
	}


	var jsondata=null;

	if(options.json_ref!=undefined){
		hasJson=true
		jsondata=options.json_ref;
		//attach token
		jsondata['csrftoken']=lnksys.session.getSession();
	}
	
	var target="";

    if(enableProgressElem) {
	    if(options.progress_elem!=undefined){
		    progressElem=options.progress_elem+"";
	    } else{
		    $.blockUI({ 
			    message : '<span style="font-size:1.2em" id="showprogress">Please wait ...</span>',
			    css: { 
			    border: 'none', 
	            padding: '15px', 
	            backgroundColor: '#000', 
	            '-webkit-border-radius': '10px', 
	            '-moz-border-radius': '10px', 
	            opacity: .7, 
	            color: '#fff'
			    }
		    });
		    progressElem="#showprogress";
	    }
    
        if(progressElem!=undefined){
		    if (progressElem!="#showprogress") {
			    $(progressElem).show();
		    }
	    }
    }
	
	if(options.error_elem!=undefined){
		errorElem=options.error_elem+"";
	}	
	if(options.url_ref!=undefined){
		urlref=options.url_ref+"";
    } else {
    	urlref=lasturlref+"";
    }
    if (hasForm) {
        if(options.form_ref!=undefined){
            formid=options.form_ref+"";
        }
    }
	if(options.target!=undefined){
		target=options.target+"";
	}
    var formData = hasJson?jsondata:new FormData();
	//attach token
	if (!hasJson) {
		formData.append('csrftoken',lnksys.session.getSession());
		var urlparams=getAllUrlParams(urlref);
		if (urlref.indexOf("?")>-1){
			urlref=urlref.slice(0,urlref.indexOf("?"));
			lasturlref=urlref+"";
		} else {
			lasturlref=urlref+"";
		}
	
		if (urlparams!=undefined){
			Object.keys(urlparams).forEach(function(key) {
				if(Array.isArray(urlparams[key])){
					urlparams[key].forEach(function(val){
						formData.append(key,val);
					});
				} else {
					formData.append(key,urlparams[key]);
				}
			});
		}
	}
    var formIds=formid.trim()==""?[]:formid.split("|")
    if (hasForm) {
        formIds.forEach(function(fid,i,arr){
			if($(fid).length){
				if(!$(fid).is("form")){
					if ($(fid).find(" select[name],input[name],textarea[name]")!=undefined){
						$(fid).find(" select[name],input[name],textarea[name]").each(function(){
							var input = $(this); 
							if (input.attr("name")!=""){
								var fname=input.attr("name")
								var fval=input.val();
								if (hasJson) {
									if (formData["reqst-params"]==undefined){
										formData["reqst-params"]={}
									}
								}
								if(input.attr("type")!=undefined && input.attr("type")!="button"&&input.attr("type")!="submit"&&input.attr("type")!="image"){
									if(input.attr("type")=="file"){
										if (!hasJson) {	formData.append(input.attr("name"),input[0].files[0]); }
									} else {
										if (hasJson) {
											if (formData["reqst-params"][fname]==undefined){
												formData["reqst-params"][fname]=[];
											} 
											formData["reqst-params"][fname].push(fval);
										} else {
											formData.append(fname,fval);
										}
									}
								} else {
									if (hasJson) {
										if (formData["reqst-params"][fname]==undefined){
											formData["reqst-params"][fname]=[];
										} 
										formData["reqst-params"][fname].push(fval);
									} else {
										formData.append(fname,fval);
									}
								}
							}
						});
					}
					/*if ($(fid+" textarea")!=undefined) {
						$(fid+" textarea").each(function(){
								var input = $(this);
								if(input.attr("name")!=""){
										formData.append(input.attr("name"),input.text());
								}
						});
					}*/
				}
			}
        });
    }
	
	if (command!=""){
		if (hasJSon) {
		} else {
			formData.append("command",command);
		}
	}
	var ajaxpromise=new Promise($.proxy(function(resolve, reject) {
		$.ajax({
			xhr: $.proxy(function () {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function (e) {
					if(enableProgressElem) {
						if(progressElem!=undefined&&progressElem!=""){
							$(progressElem).html(Math.floor(e.loaded / e.total * 100) + '%');
						}
					}
				};
				xhr.withCredentials = false;
				return xhr;
			},this),
			contentType:hasJson?"application/json":false,
			processData: false,
			type: 'POST',
			data:hasJson?JSON.stringify(formData):formData,
			url: urlref,
			success: $.proxy(function (response,textStatus,xhr) {
				if(xhr.getResponseHeader("Content-Disposition")==null){
					if(enableProgressElem){
						if(progressElem!=undefined){
									if (progressElem=="#showprogress") {
												$.unblockUI();
									} else {
										$(progressElem).hide();
									}
						}
					}
					var parsed=parseActiveString("script||","||script",response);
					var parsedScript=parsed[1].join("");
					response=parsed[0].trim();
					var targets=[];
					var targetSections=[];
					if(response!=""){
						if(response.indexOf("replace-content||")>-1){
							parsed=parseActiveString("replace-content||","||replace-content",response);
							response=parsed[0];
							parsed[1].forEach(function(possibleTargetContent,i){
								if(possibleTargetContent.indexOf("||")>-1){
									targets[targets.length]=[possibleTargetContent.substring(0,possibleTargetContent.indexOf("||")),possibleTargetContent.substring(possibleTargetContent.indexOf("||")+"||".length,possibleTargetContent.length)];
								}        				
							});
						}
						targets.unshift([target,response]);
					}
					if(targets.length>0){
						targets.forEach(function(targetSec){
							if ($(targetSec[0]).length>0) {
										if (targetSec[0].startsWith("#")) {
											$(targetSec[0]).html(targetSec[1]);
										} else {
											$(targetSec[0]).each(function(i){
												$(this).html(targetSec[1])
											});
										}
							}
						});
					}
					if(parsedScript!=""){
						try {
							(function(){
								eval(parsedScript);
							}).call(options.ctx);
							resolve();
						} catch(e) {
							reject(e);
						}
					} else {
						resolve();
					}
					
					/*if (options.options!=undefined) {
						postNode(options.options);
					}*/
				} else {
					var contentdisposition=(""+xhr.getResponseHeader("Content-Disposition")).trim();
					if (contentdisposition.indexOf("attachment;")>-1) {
						contentdisposition=contentdisposition.substr(contentdisposition.indexOf("attachment;")+"attachment;".length).trim();
					}
					var contenttype=(""+xhr.getResponseHeader("Content-Type")).trim();
					if (contenttype.indexOf(";")>-1) {
						contenttype=contenttype.substr(0,contenttype.indexOf(";")).trim();
					}
					if (contentdisposition.indexOf("filename=")>-1) {
						contentdisposition=contentdisposition.substr(contentdisposition.indexOf("filename=")+"filename=".length).trim();
						contentdisposition=contentdisposition.replace(/"/i,"")
						contentdisposition=contentdisposition.replace(/"/i,"")
					}
					safeData(responseText,contentdisposition,contenttype);
				}
			},this),
			error: function(jqXHR, textStatus, textThrow) {
				if(enableProgressElem) {
					if(progressElem!=undefined){
						if (progressElem=="#showprogress") {
									$.unblockUI();
						} else {
							$(progressElem).hide();
						}
					}
				}
				if(errorElem!=undefined&&errorElem!=""){
					$(errorElem).html("Error loading request: "+textStatus);
				}
				reject(Error("Error loading request: "+textStatus));
			}
		});
	},this));

	ajaxpromise.then($.proxy(function(){
		if (options.resolved!=undefined) {
			if (typeof options.resolved ==='function'){
				options.resolved(options);
			}
		}
		if (options.options!=undefined) {
			postNode(options.options);
		}
	},this),$.proxy(function(err){
		if (options.rejected!=undefined) {
			if (typeof options.rejected ==='function'){
				options.rejected(options,err);
			}
		}
	},this));
}

function safeData(data, fileName,contentType) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
   
		blob = new Blob([data], {type: contentType}),
		url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = fileName;
	a.click();
	window.URL.revokeObjectURL(url);    
}

function parseActiveString(labelStart,labelEnd,passiveString){
	this.parsedPassiveString="";
	this.parsedActiveString="";
	this.parsedActiveArr=[];
	this.passiveStringIndex=0;
	this.passiveStringArr=Array.from(passiveString);
	
	this.passiveStringLen=this.passiveStringArr.length;
	
	this.labelStartIndex=0;
	this.labelEndIndex=0;
	
	this.labelStartArr=Array.from(labelStart);
	this.labelEndArr=Array.from(labelEnd);
	this.pc='';
	
	this.passiveStringArr.forEach(function(c,i){
		
		if(this.labelEndIndex==0&&this.labelStartIndex<this.labelStartArr.length){
			if(this.labelStartIndex>0&&this.labelStartArr[this.labelStartIndex-1]==pc&&this.labelStartArr[this.labelStartIndex]!=c){
				this.parsedPassiveString+=labelStart.substring(0,this.labelStartIndex);
				this.labelStartIndex=0;
			}
			if(this.labelStartArr[this.labelStartIndex]==c){
				
				this.labelStartIndex++;
				if(this.labelStartIndex==this.labelStartArr.length){
					
				}
			}
			else{
				if(this.labelStartindex>0){
					this.parsedPassiveString+=labelStart.substring(0,this.labelStartIndex);
					this.labelStartIndex=0;
				}
				this.parsedPassiveString+=(c+"");
			}
		}
		else if(this.labelStartIndex==this.labelStartArr.length&&this.labelEndIndex<this.labelEndArr.length){
			if(this.labelEndArr[this.labelEndIndex]==c){
				this.labelEndIndex++;
				if(this.labelEndIndex==this.labelEndArr.length){
					this.parsedActiveArr[this.parsedActiveArr.length]=this.parsedActiveString+"";
					this.parsedActiveString="";
					this.labelEndIndex=0;
					this.labelStartIndex=0;
				}
			}
			else{
				if(this.labelEndIndex>0){
					this.parsedActiveString+=labelEnd.substring(0,this.labelEndIndex);
					this.labelEndIndex=0;
				}
				this.parsedActiveString+=(c+"");
			}
		}
		
		this.pc=c;		
	});
	return [this.parsedPassiveString,this.parsedActiveArr]
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : "";
    
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = decodeURIComponent(a[0]);
        var paramValue = typeof (a[1]) === 'undefined' ? true : decodeURIComponent(a[1]);
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
    
    return obj;
  }
