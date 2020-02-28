#!/bin/env bash
for i in `seq 0 1 32`;do
	for j in `seq 0 1 4`;do
	curl\
		-X POST\
		-H "Content-type: application/json" --data '{"action":"createUserSession","params":{"name":"usr'$i'"}}'\
		"http://localhost:1111/lib/sjs/tst/dbUser.js"
	done
done
