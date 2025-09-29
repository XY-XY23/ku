# 启动说明

## 当前状态

✅ **前端** - 已准备就绪
⚠️ **后端** - 需要Maven来构建

## 启动选项

### 选项1: 先运行前端（推荐快速查看UI）

前端可以独立运行查看界面效果：

```bash
# 方法1: 直接打开HTML文件
在文件管理器中双击打开: ku/index.html

# 方法2: 使用Python HTTP服务器
cd ku
python -m http.server 8000
# 然后访问 http://localhost:8000
```

**注意**: 前端可以正常查看UI，但登录/注册功能需要后端支持。

### 选项2: 安装Maven后启动完整系统

#### Windows系统安装Maven:

1. **下载Maven**
   - 访问: https://maven.apache.org/download.cgi
   - 下载: apache-maven-3.9.5-bin.zip

2. **解压并配置**
   ```cmd
   # 解压到 C:\Program Files\Apache\maven
   # 添加到环境变量:
   # MAVEN_HOME = C:\Program Files\Apache\maven
   # Path 中添加: %MAVEN_HOME%\bin
   ```

3. **验证安装**
   ```cmd
   mvn -version
   ```

4. **启动后端**
   ```cmd
   cd backend
   mvn spring-boot:run
   ```

#### Linux/Mac系统安装Maven:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install maven

# macOS (使用Homebrew)
brew install maven

# CentOS/RHEL
sudo yum install maven

# 验证安装
mvn -version

# 启动后端
cd backend
mvn spring-boot:run
```

### 选项3: 使用Docker（最简单）

创建 `backend/Dockerfile`:

```dockerfile
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

然后运行:
```bash
cd backend
docker build -t navigation-backend .
docker run -p 8080:8080 navigation-backend
```

### 选项4: 使用在线IDE（临时测试）

可以使用 Gitpod 或 GitHub Codespaces 在线运行：
1. 将代码推送到GitHub
2. 使用 Codespaces 打开
3. 内置Maven环境，直接运行

## 当前可以做什么

### 1. 查看前端界面

即使没有后端，你也可以：

```bash
# 启动前端
cd ku
python -m http.server 8000
```

访问 http://localhost:8000 可以看到：
- ✅ 完整的导航界面
- ✅ 登录/注册模态框UI
- ✅ 用户菜单界面
- ✅ 所有视觉特效
- ⚠️ 登录功能暂不可用（需要后端）

### 2. 查看管理员面板界面

访问 http://localhost:8000/admin.html 可以看到：
- ✅ 管理面板UI设计
- ✅ 用户列表表格
- ✅ 统计卡片样式
- ⚠️ 数据加载需要后端

### 3. 查看后端代码结构

```bash
# 查看项目结构
tree backend/src -L 3

# 查看配置文件
cat backend/src/main/resources/application.yml

# 查看API接口
cat backend/src/main/java/com/xingchen/navigation/controller/AuthController.java
```

## 推荐流程

### 快速体验（仅前端UI）

```bash
cd ku
python -m http.server 8000
# 访问 http://localhost:8000
```

可以看到完整的界面设计和交互效果。

### 完整体验（前端+后端）

1. **安装Maven**（选择上述任一方法）
2. **启动后端**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
3. **启动前端**
   ```bash
   cd ku
   python -m http.server 8000
   ```
4. **访问应用**
   - 前端: http://localhost:8000
   - 后端API: http://localhost:8080/api
   - H2控制台: http://localhost:8080/api/h2-console

## 需要帮助？

- 查看 QUICKSTART.md - 详细启动指南
- 查看 README-BACKEND.md - 完整技术文档
- 查看 PROJECT-SUMMARY.md - 项目总览

## 快速测试API（安装Maven后）

```bash
# 注册用户
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123","nickname":"管理员"}'

# 登录
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"admin","password":"admin123"}'
```

---

**当前建议**: 先运行前端查看UI效果，然后安装Maven以启用完整功能。