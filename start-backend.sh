#!/bin/bash

echo "========================================"
echo "星辰导航 - 后端服务启动脚本"
echo "========================================"
echo ""

# 切换到backend目录
cd "$(dirname "$0")/backend" || exit

echo "[1/3] 检查Java环境..."
if ! command -v java &> /dev/null; then
    echo "[错误] 未检测到Java环境，请先安装Java 17+"
    exit 1
fi
echo "[√] Java环境检测通过"
java -version
echo ""

echo "[2/3] 检查Maven..."
if ! command -v mvn &> /dev/null; then
    echo "[警告] 未检测到Maven，尝试使用Maven Wrapper..."
    if [ -f "./mvnw" ]; then
        echo "[√] 使用Maven Wrapper"
        MVN_CMD="./mvnw"
    else
        echo "[错误] 请先安装Maven或下载Maven Wrapper"
        exit 1
    fi
else
    echo "[√] Maven环境检测通过"
    MVN_CMD="mvn"
fi
echo ""

echo "[3/3] 启动Spring Boot应用..."
echo ""
echo "========================================"
echo "应用信息:"
echo "- 后端地址: http://localhost:8080"
echo "- API前缀: /api"
echo "- H2控制台: http://localhost:8080/api/h2-console"
echo "========================================"
echo ""
echo "启动中,请稍候..."
echo ""

$MVN_CMD spring-boot:run

if [ $? -ne 0 ]; then
    echo ""
    echo "[错误] 应用启动失败"
    exit 1
fi