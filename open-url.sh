#!/bin/bash
type=$1
if [ -z $type ]; then
    echo 'No type specified [ google | stack | url ]'
    exit 1
fi

HISTORY_FILE=$HOME/var/log/noxquest/$type.history
history -r $HISTORY_FILE
read -ep 'Query: ' query
history -s "$query"
history -w $HISTORY_FILE
echo -n "$query" | curl -G http://127.0.0.1:20000/$type/ --data-urlencode @-
