					//--------------------------------------------------------------------------------
					//Theme - Next
					//--------------------------------------------------------------------------------
					this.editor.commands.addCommand(
						{
							name:'Theme Next',
							bindKey: {
								win:'Alt-N',mac:'Command-N',
								sender:'editor|cli'
							},
							exec:dojo.hitch(
								this,
								function(env,args,request){
									console.log(this.idx_theme);
									this.idx_theme++;
									this.idx_theme%=this.arr_theme.length;
									this.editor.setTheme("ace/theme/"+this.arr_theme[this.idx_theme]);
								}
							)
						}
					);