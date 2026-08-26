@echo off
if not exist .env (
  copy .env.example .env
  echo Edit .env and set ADMIN_PASSWORD, then run this file again.
  exit /b 1
)
for /f "usebackq tokens=1,* delims==" %%A in (".env") do set %%A=%%B
node server.js
