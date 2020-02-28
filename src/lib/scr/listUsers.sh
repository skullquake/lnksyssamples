#!/bin/env bash
curl\
	-X POST\
	-H "Content-type: application/json" --data '{"pass":"1234","action":"listUsers"}'\
	"http://localhost:1111/lib/sjs/tst/dbUser.js"
