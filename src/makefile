GO=go
SRC=./a.go
BIN=./a
DBPATH	= ./db
DBPORT	= 6000
DBHOST	= 127.0.0.1
DBNAM	= test
DBUSRNAM= test
DBUSRPAS= 1
DBUSRROL= NOSUPERUSER

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
	clean 
run:
	$(BIN)
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
dbinit:
	printf "create database $(DBNAM);CREATE USER $(DBUSRNAM) WITH PASSWORD '$(DBUSRNAM)' CREATEDB;ALTER USER $(DBUSRNAM) WITH $(DBUSRROL);GRANT ALL PRIVILEGES ON SCHEMA public TO $(DBUSRNAM);"|\
		psql \
		-h $(DBHOST) \
		-p $(DBPORT) \
		postgres
dbrm:
	rm \
		-r $(DBPATH)
dbstart:
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
