@echo off
setlocal

set MAVEN_VERSION=3.9.5
set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\maven-%MAVEN_VERSION%

if not exist "%MAVEN_HOME%\bin\mvn.cmd" (
    echo Maven not found. Please install Maven manually.
    echo.
    echo Download from: https://maven.apache.org/download.cgi
    echo Extract to: %MAVEN_HOME%
    pause
    exit /b 1
)

"%MAVEN_HOME%\bin\mvn.cmd" %*