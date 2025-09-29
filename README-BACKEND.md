# 星辰导航 - 用户管理系统

一个功能丰富的个性化导航系统,集成了完整的用户认证、管理和云端同步功能。

## 🌟 项目特性

### 前端功能
- ✅ **用户认证系统**
  - 用户注册(用户名/邮箱/密码验证)
  - 用户登录(支持用户名或邮箱登录)
  - JWT Token认证
  - 记住我功能
  - 密码强度检测

- ✅ **个人中心**
  - 用户信息展示
  - 头像显示
  - 个人资料编辑
  - 设置云端同步

- ✅ **管理员功能**
  - 用户列表查看
  - 用户搜索过滤
  - 用户状态管理(封禁/解封)
  - 角色权限管理
  - 用户删除
  - 数据统计展示

- ✅ **导航核心功能**
  - 多搜索引擎支持
  - 网站卡片管理
  - 收藏夹功能
  - 备忘录功能
  - 天气信息
  - 时钟显示

### 后端功能
- ✅ **Spring Boot 3.2.0**
- ✅ **Spring Security + JWT认证**
- ✅ **JPA + H2/MySQL数据库**
- ✅ **RESTful API设计**
- ✅ **全局异常处理**
- ✅ **CORS跨域配置**
- ✅ **用户设置云端存储**

## 📁 项目结构

```
ku/
├── backend/                    # Spring Boot后端
│   ├── src/main/java/com/xingchen/navigation/
│   │   ├── config/            # 配置类
│   │   │   ├── CorsConfig.java
│   │   │   └── SecurityConfig.java
│   │   ├── controller/        # 控制器
│   │   │   ├── AuthController.java
│   │   │   └── AdminController.java
│   │   ├── dto/              # 数据传输对象
│   │   │   ├── LoginRequest.java
│   │   │   ├── RegisterRequest.java
│   │   │   ├── AuthResponse.java
│   │   │   ├── UserDTO.java
│   │   │   └── ApiResponse.java
│   │   ├── entity/           # 实体类
│   │   │   └── User.java
│   │   ├── repository/       # 数据访问层
│   │   │   └── UserRepository.java
│   │   ├── service/          # 业务逻辑层
│   │   │   └── UserService.java
│   │   ├── security/         # 安全相关
│   │   │   ├── JwtTokenProvider.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── CustomUserDetailsService.java
│   │   ├── exception/        # 异常处理
│   │   │   ├── BusinessException.java
│   │   │   ├── ResourceNotFoundException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   └── NavigationApplication.java
│   ├── src/main/resources/
│   │   └── application.yml
│   └── pom.xml
│
├── ku/                        # 前端项目
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css
│   │   │   └── auth.css      # 认证相关样式
│   │   └── js/
│   │       ├── app.js
│   │       └── auth.js       # 认证管理
│   ├── index.html            # 主页
│   └── admin.html            # 管理员页面
│
└── README-BACKEND.md          # 本文档
```

## 🚀 快速开始

### 前置要求
- Java 17+
- Maven 3.6+
- Node.js (可选,用于前端开发服务器)

### 后端启动

1. **进入后端目录**
```bash
cd backend
```

2. **编译项目**
```bash
mvn clean install
```

3. **启动应用**
```bash
mvn spring-boot:run
```

后端将运行在 `http://localhost:8080`

### 前端启动

1. **直接打开HTML文件**
```bash
# 使用浏览器打开
ku/index.html
```

2. **或使用HTTP服务器(推荐)**
```bash
# 使用Python
cd ku
python -m http.server 8000

# 或使用Node.js
npx http-server -p 8000
```

前端将运行在 `http://localhost:8000`

## 🔧 配置说明

### 后端配置 (application.yml)

```yaml
# 数据库配置
spring:
  datasource:
    # 开发环境: H2内存数据库
    url: jdbc:h2:mem:navigationdb

    # 生产环境: MySQL (取消注释并修改)
    # url: jdbc:mysql://localhost:3306/navigation_db
    # username: root
    # password: your_password

# JWT配置
jwt:
  secret: your-secret-key-change-in-production
  expiration: 86400000  # 24小时
  refresh-expiration: 604800000  # 7天

# CORS配置
cors:
  allowed-origins: http://localhost:*,http://127.0.0.1:*,file://
```

### 前端配置 (auth.js)

```javascript
// API基础地址
constructor() {
    this.API_BASE = 'http://localhost:8080/api';
}
```

## 📡 API接口文档

### 认证接口

#### 用户注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "nickname": "测试用户"
}
```

#### 用户登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "testuser",
  "password": "password123"
}
```

#### 获取当前用户信息
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### 更新用户资料
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "nickname": "新昵称",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### 获取用户设置
```http
GET /api/auth/settings
Authorization: Bearer {token}
```

#### 保存用户设置
```http
POST /api/auth/settings
Authorization: Bearer {token}
Content-Type: application/json

"{\"theme\":\"dark\",\"layout\":\"grid\"}"
```

### 管理员接口

#### 获取所有用户
```http
GET /api/admin/users
Authorization: Bearer {admin-token}
```

#### 封禁用户
```http
POST /api/admin/users/{userId}/ban
Authorization: Bearer {admin-token}
```

#### 解封用户
```http
POST /api/admin/users/{userId}/unban
Authorization: Bearer {admin-token}
```

#### 更新用户角色
```http
PUT /api/admin/users/{userId}/role?role=ADMIN
Authorization: Bearer {admin-token}
```

#### 删除用户
```http
DELETE /api/admin/users/{userId}
Authorization: Bearer {admin-token}
```

## 👤 用户角色

系统支持三种用户角色:

- **USER**: 普通用户
  - 登录/注册
  - 使用导航功能
  - 同步个人设置

- **ADMIN**: 管理员
  - 所有USER权限
  - 访问管理面板
  - 管理用户(封禁/解封/删除)
  - 修改用户角色

- **SUPER_ADMIN**: 超级管理员
  - 所有ADMIN权限
  - 不能被其他管理员操作

## 🗄️ 数据库表结构

### users表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT | 主键 |
| username | VARCHAR(50) | 用户名(唯一) |
| email | VARCHAR(100) | 邮箱(唯一) |
| password | VARCHAR(255) | 加密密码 |
| nickname | VARCHAR(50) | 昵称 |
| avatar | VARCHAR(500) | 头像URL |
| role | VARCHAR(20) | 角色(USER/ADMIN/SUPER_ADMIN) |
| status | VARCHAR(20) | 状态(ACTIVE/BANNED/INACTIVE/DELETED) |
| last_login_time | DATETIME | 最后登录时间 |
| last_login_ip | VARCHAR(50) | 最后登录IP |
| login_count | INT | 登录次数 |
| user_settings | TEXT | 用户设置(JSON) |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

## 🔐 安全特性

1. **密码加密**: 使用BCrypt加密存储
2. **JWT Token**: 无状态认证
3. **Token刷新**: 支持refresh token
4. **CORS保护**: 限制跨域访问
5. **输入验证**: 后端参数校验
6. **异常处理**: 统一错误响应
7. **权限控制**: 基于角色的访问控制

## 🎨 前端功能演示

### 1. 注册/登录
- 精美的模态框设计
- 实时密码强度检测
- 表单验证
- 错误提示

### 2. 用户菜单
- 下拉菜单展示用户信息
- 快速访问个人设置
- 管理员入口(仅管理员可见)
- 退出登录

### 3. 管理面板
- 数据统计卡片
- 用户列表表格
- 搜索过滤
- 批量操作

### 4. 设置同步
- 登录后自动询问是否恢复云端设置
- 一键同步本地设置到云端
- 支持同步主题、收藏、备忘录等

## 📝 开发说明

### 添加新功能

1. **后端添加接口**
```java
@PostMapping("/feature")
public ResponseEntity<ApiResponse<Data>> newFeature() {
    // 实现逻辑
}
```

2. **前端调用接口**
```javascript
async function callFeature() {
    const response = await authManager.apiCall('/feature', 'POST', data);
}
```

### 自定义配置

1. **修改JWT密钥**
   - 编辑 `backend/src/main/resources/application.yml`
   - 修改 `jwt.secret`

2. **切换到MySQL**
   - 取消注释MySQL配置
   - 注释H2配置
   - 修改数据库连接信息

3. **修改API地址**
   - 编辑 `ku/assets/js/auth.js`
   - 修改 `API_BASE` 常量

## 🐛 常见问题

### 1. CORS错误
确保后端的CORS配置包含前端地址:
```yaml
cors:
  allowed-origins: http://localhost:8000,http://127.0.0.1:8000
```

### 2. Token过期
Token默认24小时过期,可以在配置文件中调整:
```yaml
jwt:
  expiration: 86400000  # 毫秒
```

### 3. 管理员权限
首次创建的用户默认为USER角色,需要手动修改数据库将角色改为ADMIN。

开发环境可以直接访问H2控制台:
- URL: http://localhost:8080/api/h2-console
- JDBC URL: jdbc:h2:mem:navigationdb
- 用户名: sa
- 密码: (留空)

## 📄 许可证

MIT License

## 👥 贡献

欢迎提交Issue和Pull Request!

---

**享受您的星辰导航体验! 🌟**