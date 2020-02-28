#!/bin/env bash
for i in `seq 0 1 32`;do
	curl\
		-X POST\
		-H "Content-type: application/json" --data '{"pass":"1234","action":"createUser","params":{"name":"usr'$i'","pass":"1234"}}'\
		"http://localhost:1111/lib/sjs/tst/dbUser.js"
done
