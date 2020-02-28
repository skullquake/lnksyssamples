#!/bin/env bash
curl\
	-X POST\
	-H "Content-type: application/json" --data '{"action":"initdb","params":{"pass":"1234"}}'\
	"http://localhost:1111/lib/sjs/tst/dbUser.js"
