@echo off
echo ========================================
echo 星辰导航 - 后端服务启动脚本
echo ========================================
echo.

cd /d "%~dp0backend"

echo [1/3] 检查Java环境...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Java环境，请先安装Java 17+
    pause
    exit /b 1
)
echo [√] Java环境检测通过
echo.

echo [2/3] 检查Maven...
mvn -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] 未检测到Maven，尝试使用Maven Wrapper...
    if exist "mvnw.cmd" (
        echo [√] 使用Maven Wrapper
        set MVN_CMD=mvnw.cmd
    ) else (
        echo [错误] 请先安装Maven或下载Maven Wrapper
        pause
        exit /b 1
    )
) else (
    echo [√] Maven环境检测通过
    set MVN_CMD=mvn
)
echo.

echo [3/3] 启动Spring Boot应用...
echo.
echo ========================================
echo 应用信息:
echo - 后端地址: http://localhost:8080
echo - API前缀: /api
echo - H2控制台: http://localhost:8080/api/h2-console
echo - Swagger文档: http://localhost:8080/api/swagger-ui.html (如已配置)
echo ========================================
echo.
echo 启动中,请稍候...
echo.

%MVN_CMD% spring-boot:run

if %errorlevel% neq 0 (
    echo.
    echo [错误] 应用启动失败
    pause
    exit /b 1
)

pause