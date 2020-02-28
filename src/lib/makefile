SRV=../srv/srv
BAKROT=./bak
BAKDIR=$(BAKROT)/$(DIRNAM)
ERRLOG=./log/err.log
LOGFMT="%Y%m%d_%H%M_%S_%3N"
LODTSTDUR=10s
.phony:clean 
.phony:		\
	run	\
	backup \
	clean 
run:
	$(SRV)
lodtst_all:lodtst_static lodtst_goja lodtst_addresource lodtst_formdata lodtst_db_query lodtst_db_exec
	echo $@
$(eval TIMESTAMP= $(shell date +$(LOGFMT)))
$(eval REPORTDIR= ./log/lodtst/$(TIMESTAMP))
lodtst_dir:
	@mkdir -p $(REPORTDIR)
lodtst_static: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-m GET\
		-d $(LODTSTDUR)\
		"http://localhost:$(SRVPORT)/jquery.js"\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)
lodtst_static_unparsed: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-m GET\
		-d $(LODTSTDUR)\
		"http://localhost:$(SRVPORT)/!jquery.js!"\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)

lodtst_goja: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-m GET\
		-d $(LODTSTDUR)\
		http://localhost:$(SRVPORT)/lib/sjs/tst/lod/goja.js\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)
lodtst_addresource: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-m GET\
		-d $(LODTSTDUR)\
		http://localhost:$(SRVPORT)/lib/sjs/tst/lod/fib.js\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)
lodtst_formdata: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-d $(LODTSTDUR)\
		-m POST\
		-H "Content-type: multipart/form-data; boundary=1234567890"\
		-b 'foo=bar;\r\nbaz=qux\r\n'\
		http://localhost:$(SRVPORT)/tst/parameters.html\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)
lodtst_db_query: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-d $(LODTSTDUR)\
		-m POST\
		-H "Content-type: application/json"\
		-b '{"cmd":"ls"}'\
		http://localhost:$(SRVPORT)/xaspost.js\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)
lodtst_db_exec: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-d $(LODTSTDUR)\
		-m POST\
		-H "Content-type: application/json"\
		-b '{"cmd":"ls"}'\
		http://localhost:$(SRVPORT)/xaspost.js\
		-o j\
		-p r\
		|jq '.'\
		> $(REPORTFILE)
	@cat $(REPORTFILE)
backup:
	$(eval DIRNAM= $(shell date +"%Y%m%d%H%M%S%3N"))
	@printf "Backing up to $(DIRNAM)..."
	@cp -r ./js $(BAKDIR)
	@cp -r ./sjs $(BAKDIR)
	@printf "done\n"
	@#7z a -t7z -m0=lzma2 -mx=9 -mfb=64 -md=1024m -ms=on $(BAKDIR).7z $(BAKDIR)




