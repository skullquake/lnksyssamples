GO=go
SRC=./a.go
BIN=./a
SRVPORT=1112
DBPORT	= 6001
DBPATH	= ./db
DBHOST	= 127.0.0.1
DBNAM	= test
DBUSRNAM= test
DBUSRPAS= 1
DBUSRROL= NOSUPERUSER
BAKROT=./bak
BAKDIR=$(BAKROT)/$(DIRNAM)
ERRLOG=./log/err.log
LOGFMT="%Y%m%d_%H%M_%S_%3N"
LODTSTDUR=10s
$(BIN): $(SRC)
	$(GO)\
		build\
		$(SRC)
.phony:clean
clean:
	rm $(BIN)
.phony:		\
	run	\
	dbrm	\
	dbmk	\
	dbinit	\
	dbstart	\
	dbstop	\
	dbpsql	\
	dbsize	\
	dbdrop \
	backup \
	clean 

run: $(BIN) ./db  dbinit ./db//postmaster.pid
	mkdir -p ./log
	$(eval DIRNAM=$(shell date +"%Y%m%d%H%M%S%3N"))
	$(BIN) 2> ./log/err/err_$(DIRNAM).log
dbmk: 
	initdb \
		$(DBPATH)
	cp ./res/db/* $(DBPATH)
dbdrop:
	printf "DROP DATABASE $(DBNAM);"|\
		psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		postgres
dbinit:dbstart
	printf "create database $(DBNAM);CREATE USER $(DBUSRNAM) WITH PASSWORD '$(DBUSRNAM)' CREATEDB;ALTER USER $(DBUSRNAM) WITH $(DBUSRROL);GRANT ALL PRIVILEGES ON SCHEMA public TO $(DBUSRNAM);"|\
		psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		postgres
dbrm:./db
	rm \
		-r $(DBPATH)
dbstart:./db
	pg_ctl \
		-D $(DBPATH) \
		-o "-p $(DBPORT)" \
		start
dbstop:
	pg_ctl \
		-D $(DBPATH) \
		-o "-p $(DBPORT)" \
		stop 
dbpsql:
	psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		$(DBNAM)
dbpsqlusr:
	psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		-U test \
		$(DBNAM)
dbvacuum:
	printf "vacuum full;"|\
		psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		$(DBNAM)
dbsize:
	printf "\
		select pg_database_size('$(DBNAM)'),pg_size_pretty( pg_database_size('$(DBNAM)'));\
		"|\
		psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		$(DBNAM)

tst_server:
	@#no action
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"foo":"getSessionData","params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#invalid action type
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":1,"params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#no params
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"getSessionData"}'\
		http://localhost:$(SRVPORT)/server.js
	@#invalid params type
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"getSessionData","params":"invalid"}'\
		http://localhost:$(SRVPORT)/server.js
	@#nonexistent action
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"doesNotExist","params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#create
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"create","params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#update
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"create","params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#get
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"get","params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#getSession
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"getSession","params":{}}'\
		http://localhost:$(SRVPORT)/server.js
	@#getSessionData no token
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"getSessionData","params":{"foo":"bar"}}'\
		http://localhost:$(SRVPORT)/server.js

	@#getSessionData no token
	@curl\
		-X POST\
		-H "Content-type: application/json"\
		-d '{"action":"getSessionData","params":{"token":1234}}'\
		http://localhost:$(SRVPORT)/server.js

tst_formdata:
	@curl\
		-X POST\
		-F 'foo=bar'\
		"http://localhost:$(SRVPORT)/tst/parameters.html?baz=qux"
tst_fileupload:
	@curl\
		-F "f0=@./index.html" \
		-F "f1=@./index.html" \
		-F "f2=@./index.html" \
		-F "f3=@./index.html" \
		"http://localhost:$(SRVPORT)/tst/parameters.html"
tst_json:
	@curl\
		-H "Content-type: application/json"\
		-H "hdrFoo: hdrBar"\
		-H "hdrBaz: hdrQux"\
		--data '{"jsonFoo":"jsonBar"}'\
		"http://localhost:$(SRVPORT)/tst/parameters.html"
lodtst_all:lodtst_goja lodtst_addresource lodtst_formdata lodtst_db_query lodtst_db_exec
	echo $@
$(eval TIMESTAMP= $(shell date +$(LOGFMT)))
$(eval REPORTDIR= ./log/lodtst/$(TIMESTAMP))
lodtst_dir:
	@mkdir -p $(REPORTDIR)
lodtst_goja: lodtst_dir
	echo $@
	$(eval REPORTFILE= $(REPORTDIR)/$@.json)
	@bombardier\
		-m GET\
		-d $(LODTSTDUR)\
		http://localhost:$(SRVPORT)/tst/lod/goja.js\
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
		http://localhost:$(SRVPORT)/tst/lod/fib.js\
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
postfiles:
	_=$(shell ls ./scr|grep a)
backup:
	$(eval DIRNAM= $(shell date +"%Y%m%d%H%M%S%3N"))
	@printf "Backing up to $(DIRNAM)..."
	@mkdir -p $(BAKDIR)
	@mkdir -p $(BAKDIR)/res/js/lnksys
	@cp -r ./*.go $(BAKDIR)
	@cp -r ./*.html $(BAKDIR)
	@cp -r ./*.js $(BAKDIR)
	@cp -r ./tst $(BAKDIR)
	@cp -r ./res/js/lnksys/* $(BAKDIR)/res/js/lnksys
	@cp -r ./scr $(BAKDIR)
	@printf "done\n"
	@#7z a -t7z -m0=lzma2 -mx=9 -mfb=64 -md=1024m -ms=on $(BAKDIR).7z $(BAKDIR)
backupdbscr:
	$(eval _= $(shell ./xas ls|while read FILE;do ./xas cat $$FILE>./scr/$$FILE;done))



