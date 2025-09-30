// 认证管理类
class AuthManager {
    constructor() {
        this.API_BASE = 'http://localhost:8080/api';
        this.token = localStorage.getItem('authToken');
        this.refreshToken = localStorage.getItem('refreshToken');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    // 初始化
    init() {
        this.checkAuthStatus();
        this.setupPasswordStrength();
    }

    // 检查认证状态
    checkAuthStatus() {
        if (this.token && this.currentUser) {
            this.showUserMenu();
            // 验证token是否有效
            this.validateToken();
        } else {
            this.showAuthButtons();
        }
    }

    // 验证token
    async validateToken() {
        try {
            const response = await this.apiCall('/auth/me', 'GET');
            if (response.success) {
                this.currentUser = response.data;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.updateUserDisplay();
            }
        } catch (error) {
            console.error('Token验证失败:', error);
            this.logout();
        }
    }

    // API调用封装
    async apiCall(endpoint, method = 'GET', data = null) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options = {
            method,
            headers
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(this.API_BASE + endpoint, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || '请求失败');
        }

        return result;
    }

    // 注册
    async register(username, email, password, nickname) {
        try {
            const response = await this.apiCall('/auth/register', 'POST', {
                username,
                email,
                password,
                nickname: nickname || username
            });

            if (response.success) {
                this.handleAuthSuccess(response.data);
                showNotification('注册成功!', 'success');
                closeModal('register-modal');
                return true;
            }
        } catch (error) {
            showNotification(error.message || '注册失败', 'error');
            return false;
        }
    }

    // 登录
    async login(usernameOrEmail, password) {
        try {
            const response = await this.apiCall('/auth/login', 'POST', {
                usernameOrEmail,
                password
            });

            if (response.success) {
                this.handleAuthSuccess(response.data);
                showNotification('登录成功!', 'success');
                closeModal('login-modal');
                return true;
            }
        } catch (error) {
            showNotification(error.message || '登录失败', 'error');
            return false;
        }
    }

    // 处理认证成功
    handleAuthSuccess(data) {
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        this.currentUser = {
            id: data.userId,
            username: data.username,
            email: data.email,
            nickname: data.nickname,
            avatar: data.avatar,
            role: data.role
        };

        localStorage.setItem('authToken', this.token);
        localStorage.setItem('refreshToken', this.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.showUserMenu();
        this.updateUserDisplay();

        // 触发登录后的同步
        if (typeof syncAfterLogin === 'function') {
            syncAfterLogin();
        }
    }

    // 退出登录
    logout() {
        this.token = null;
        this.refreshToken = null;
        this.currentUser = null;

        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');

        this.showAuthButtons();
        showNotification('已退出登录', 'info');
    }

    // 显示用户菜单
    showUserMenu() {
        document.getElementById('user-menu').style.display = 'block';
        document.getElementById('auth-buttons').style.display = 'none';
    }

    // 显示登录按钮
    showAuthButtons() {
        document.getElementById('user-menu').style.display = 'none';
        document.getElementById('auth-buttons').style.display = 'block';
    }

    // 更新用户显示
    updateUserDisplay() {
        if (!this.currentUser) return;

        const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        const avatar = this.currentUser.avatar || defaultAvatar;

        document.getElementById('user-nickname').textContent = this.currentUser.nickname;
        document.getElementById('user-avatar').src = avatar;
        document.getElementById('dropdown-avatar').src = avatar;
        document.getElementById('dropdown-username').textContent = this.currentUser.username;
        document.getElementById('dropdown-email').textContent = this.currentUser.email;

        // 显示/隐藏管理员菜单
        if (this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SUPER_ADMIN') {
            document.getElementById('admin-menu-item').style.display = 'flex';
        } else {
            document.getElementById('admin-menu-item').style.display = 'none';
        }
    }

    // 更新用户资料
    async updateProfile(data) {
        try {
            const response = await this.apiCall('/auth/profile', 'PUT', data);
            if (response.success) {
                this.currentUser = { ...this.currentUser, ...response.data };
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.updateUserDisplay();
                showNotification('资料更新成功', 'success');
                return true;
            }
        } catch (error) {
            showNotification(error.message || '更新失败', 'error');
            return false;
        }
    }

    // 获取用户设置
    async getUserSettings() {
        try {
            const response = await this.apiCall('/auth/settings', 'GET');
            if (response.success && response.data) {
                return JSON.parse(response.data);
            }
            return null;
        } catch (error) {
            console.error('获取设置失败:', error);
            return null;
        }
    }

    // 保存用户设置
    async saveUserSettings(settings) {
        try {
            const response = await this.apiCall('/auth/settings', 'POST', JSON.stringify(settings));
            if (response.success) {
                showNotification('设置已同步到云端', 'success');
                return true;
            }
        } catch (error) {
            showNotification(error.message || '同步失败', 'error');
            return false;
        }
    }

    // 设置密码强度检测
    setupPasswordStrength() {
        const passwordInput = document.getElementById('register-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                const strength = this.calculatePasswordStrength(password);
                this.updatePasswordStrengthUI(strength);
            });
        }
    }

    // 计算密码强度
    calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 6) strength += 20;
        if (password.length >= 10) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    }

    // 更新密码强度UI
    updatePasswordStrengthUI(strength) {
        const fill = document.getElementById('strength-fill');
        const text = document.getElementById('strength-text');

        fill.style.width = strength + '%';

        if (strength < 40) {
            fill.style.background = '#ff6b6b';
            text.textContent = '弱';
            text.style.color = '#ff6b6b';
        } else if (strength < 70) {
            fill.style.background = '#ffa500';
            text.textContent = '中等';
            text.style.color = '#ffa500';
        } else {
            fill.style.background = '#51cf66';
            text.textContent = '强';
            text.style.color = '#51cf66';
        }
    }
}

// 创建全局实例
const authManager = new AuthManager();

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    authManager.init();
});

// UI交互函数
function openLoginModal() {
    openModal('login-modal');
}

function openRegisterModal() {
    openModal('register-modal');
}

function switchToRegister() {
    closeModal('login-modal');
    setTimeout(() => openModal('register-modal'), 300);
}

function switchToLogin() {
    closeModal('register-modal');
    setTimeout(() => openModal('login-modal'), 300);
}

function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    await authManager.login(usernameOrEmail, password);
}

async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const nickname = document.getElementById('register-nickname').value;

    if (password !== confirmPassword) {
        showNotification('两次密码输入不一致', 'error');
        return;
    }

    await authManager.register(username, email, password, nickname);
}

function logout() {
    if (confirm('确定要退出登录吗?')) {
        authManager.logout();
        document.getElementById('user-dropdown').style.display = 'none';
    }
}

async function syncSettings() {
    if (!authManager.token) {
        showNotification('请先登录', 'error');
        return;
    }

    // 获取本地设置
    const localSettings = {
        theme: document.body.className,
        bookmarks: JSON.parse(localStorage.getItem('favorites') || '[]'),
        notes: JSON.parse(localStorage.getItem('notes') || '[]'),
        customEngines: JSON.parse(localStorage.getItem('customSearchEngines') || '[]'),
        preferences: {
            layout: localStorage.getItem('layout') || 'grid',
            fontSize: localStorage.getItem('fontSize') || 'medium',
            sakuraEnabled: localStorage.getItem('sakuraEnabled') === 'true'
        }
    };

    await authManager.saveUserSettings(localSettings);
}

async function syncAfterLogin() {
    // 登录后自动拉取云端设置
    const cloudSettings = await authManager.getUserSettings();

    if (cloudSettings && confirm('检测到云端设置，是否恢复?')) {
        // 恢复设置
        if (cloudSettings.theme) {
            document.body.className = cloudSettings.theme;
        }
        if (cloudSettings.bookmarks) {
            localStorage.setItem('favorites', JSON.stringify(cloudSettings.bookmarks));
        }
        if (cloudSettings.notes) {
            localStorage.setItem('notes', JSON.stringify(cloudSettings.notes));
        }
        if (cloudSettings.customEngines) {
            localStorage.setItem('customSearchEngines', JSON.stringify(cloudSettings.customEngines));
        }

        showNotification('设置已恢复', 'success');
        setTimeout(() => location.reload(), 1000);
    }
}

function openUserSettings() {
    showNotification('用户设置功能开发中...', 'info');
}

function openAdminPanel() {
    window.location.href = 'admin.html';
}

// 点击外部关闭用户菜单
document.addEventListener('click', (e) => {
    const userMenu = document.getElementById('user-menu');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenu && userDropdown && !userMenu.contains(e.target)) {
        userDropdown.style.display = 'none';
    }
});