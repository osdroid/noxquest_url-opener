#!/bin/bash
google() { echo -n "$@" | curl -G http://127.0.0.1:20000/google/ --data-urlencode @-; }
stackoverflow() { echo -n "$@" | curl -G http://127.0.0.1:20000/stack/ --data-urlencode @-; }
urlopen() { echo -n "$@" | curl -G http://127.0.0.1:20000/abrir/ --data @-; }

