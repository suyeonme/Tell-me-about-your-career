#!/usr/bin/env sh

# 커밋 대상 파일에 console.log가 포함되어있는지 확인
if git diff --cached --name-only --diff-filter=ACMRT | xargs grep -i 'console\.log' --with-filename --line-number; then
  echo "[COMMIT REJECT] Please remove console.log"
  exit 1
fi
