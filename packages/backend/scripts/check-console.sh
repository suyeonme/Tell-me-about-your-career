#!/usr/bin/env sh

red='\033[0;31m'
green='\033[0;32m'
yellow='\033[0;33m'
no_color='\033[0m'

# 커밋 대상 파일에 console.log가 포함되어있는지 확인
if git diff --cached --name-only | xargs grep -i 'console\.log' --with-filename --line-number;
then
    echo -e "\n${red}COMMIT REJECTED!  Please remove console."
    exit 1;
fi
echo -e "${green}SUCCESS! No console is found."
exit 0;
