# 🚀 快速开始指南

## 一、环境准备

### 必需软件
1. **Java 17+** - 后端运行环境
   - 下载: https://www.oracle.com/java/technologies/downloads/
   - 验证: `java -version`

2. **Maven 3.6+** - 项目构建工具
   - 下载: https://maven.apache.org/download.cgi
   - 验证: `mvn -v`

### 可选软件
- **MySQL 8.0+** - 生产环境数据库(开发环境使用H2)
- **Node.js** - 用于运行前端开发服务器

## 二、5分钟快速启动

### Windows用户

1. **启动后端**
```cmd
双击运行: start-backend.bat
```

2. **启动前端**
```cmd
# 方法1: 直接打开
双击: ku/index.html

# 方法2: 使用Python服务器
cd ku
python -m http.server 8000
```

### Linux/Mac用户

1. **启动后端**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

2. **启动前端**
```bash
# 方法1: 使用Python
cd ku
python3 -m http.server 8000

# 方法2: 使用Node.js
cd ku
npx http-server -p 8000
```

## 三、首次使用

### 1. 注册管理员账号

访问前端页面 (http://localhost:8000 或 file:///.../index.html)

1. 点击右上角 **"登录"** 按钮
2. 切换到 **"注册"** 标签
3. 填写注册信息:
   - 用户名: `admin`
   - 邮箱: `admin@example.com`
   - 密码: `admin123`
   - 昵称: `管理员`
4. 点击 **"注册"** 按钮

### 2. 升级为管理员

首个注册用户默认为普通用户,需要手动升级为管理员:

**方法1: 通过H2控制台 (开发环境)**

1. 访问 http://localhost:8080/api/h2-console
2. 连接信息:
   - JDBC URL: `jdbc:h2:mem:navigationdb`
   - User Name: `sa`
   - Password: (留空)
3. 点击 **"Connect"**
4. 执行SQL:
```sql
UPDATE USERS SET ROLE = 'ADMIN' WHERE USERNAME = 'admin';
```

**方法2: 通过MySQL (生产环境)**

```sql
USE navigation_db;
UPDATE users SET role = 'ADMIN' WHERE username = 'admin';
```

### 3. 重新登录

1. 退出当前账号(如已登录)
2. 使用管理员账号登录
3. 现在可以看到 **"用户管理"** 菜单项

## 四、功能测试

### 测试注册登录

1. ✅ 打开前端页面
2. ✅ 点击"登录"按钮
3. ✅ 切换到"注册"
4. ✅ 填写表单并提交
5. ✅ 注册成功后自动登录
6. ✅ 查看右上角用户菜单

### 测试管理功能

1. ✅ 以管理员身份登录
2. ✅ 点击用户菜单中的"用户管理"
3. ✅ 查看用户列表和统计
4. ✅ 测试搜索功能
5. ✅ 测试封禁/解封用户
6. ✅ 测试角色更改

### 测试设置同步

1. ✅ 修改一些设置(主题、布局等)
2. ✅ 点击"同步设置"
3. ✅ 退出登录
4. ✅ 重新登录
5. ✅ 选择"恢复云端设置"
6. ✅ 确认设置已恢复

## 五、API测试

### 使用curl测试

**注册用户**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "nickname": "测试用户"
  }'
```

**登录**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "test123"
  }'
```

**获取用户信息**
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 六、常见问题

### Q1: 后端启动失败?

**检查端口占用**
```bash
# Windows
netstat -ano | findstr :8080

# Linux/Mac
lsof -i :8080
```

**解决方案:**
- 关闭占用8080端口的程序
- 或修改 `backend/src/main/resources/application.yml` 中的端口

### Q2: 前端无法连接后端?

**检查CORS配置**

确保 `application.yml` 中的CORS配置包含前端地址:
```yaml
cors:
  allowed-origins: http://localhost:8000,file://
```

**检查API地址**

确保 `ku/assets/js/auth.js` 中的API地址正确:
```javascript
this.API_BASE = 'http://localhost:8080/api';
```

### Q3: Token过期太快?

修改 `application.yml`:
```yaml
jwt:
  expiration: 86400000  # 24小时
  refresh-expiration: 604800000  # 7天
```

### Q4: 忘记管理员密码?

直接在数据库中重置:
```sql
-- H2 (开发环境)
UPDATE USERS SET PASSWORD = '$2a$10$...' WHERE USERNAME = 'admin';

-- 或删除用户重新注册
DELETE FROM USERS WHERE USERNAME = 'admin';
```

## 七、生产环境部署

### 1. 切换到MySQL

编辑 `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/navigation_db?useSSL=false&serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: your_username
    password: your_password
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
```

### 2. 创建数据库

```sql
CREATE DATABASE navigation_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. 修改JWT密钥

**重要!** 生产环境必须修改密钥:
```yaml
jwt:
  secret: your-very-long-and-secure-secret-key-here
```

### 4. 打包部署

```bash
cd backend
mvn clean package -DskipTests

# 运行jar包
java -jar target/navigation-backend-1.0.0.jar
```

### 5. 配置Nginx (可选)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 前端
    location / {
        root /path/to/ku;
        index index.html;
    }

    # 后端API
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 八、技术栈总结

### 后端
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- JWT (jjwt 0.12.3)
- H2/MySQL
- Lombok

### 前端
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 6.4.0

## 九、下一步

- [ ] 添加邮箱验证功能
- [ ] 添加密码重置功能
- [ ] 添加OAuth2第三方登录
- [ ] 添加用户活动日志
- [ ] 添加数据统计图表
- [ ] 添加导出/导入功能

## 十、获取帮助

- 📖 查看详细文档: `README-BACKEND.md`
- 🐛 报告问题: [GitHub Issues]
- 💬 讨论交流: [GitHub Discussions]

---

**祝您使用愉快! 🎉**