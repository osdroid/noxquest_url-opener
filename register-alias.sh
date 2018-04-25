#!/bin/bash
mkdir -p $HOME/var/log/noxquest
FULLPATH=$(readlink -f "$BASH_SOURCE")
PARENT=$(dirname "$FULLPATH")
OPENURL=$PARENT/open-url.sh
alias google="\"$OPENURL\" google"
alias stackoverflow="\"$OPENURL\" stack"
alias urlopen="\"$OPENURL\" url"
# Make it permanent
BASHLINE='#noxquest url-opener alias'
if ! grep -Fxq "$BASHLINE" $HOME/.bashrc; then
    echo 'Adding to .bashrc'
    echo "$BASHLINE" >> $HOME/.bashrc
    echo source "$FULLPATH" >> $HOME/.bashrc
fi

