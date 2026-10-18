@echo off
title Halal Motion Videos
cd /d "%~dp0"
set PORT=4000
set URL=http://localhost:%PORT%

echo ===================================================
echo             Halal Motion Videos
echo ===================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Node.js is not installed or not in PATH.
  echo Please install Node.js 22+ from https://nodejs.org
  echo.
  pause
  exit /b 1
)

echo Starting Halal Motion Videos server on %URL% ...
echo Keep this window open while working.
echo.

start "" "%URL%"
node tools/dashboard/server.mjs
pause
