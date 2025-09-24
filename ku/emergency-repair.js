// ===== 项目紧急修复脚本 =====
// 这个脚本会修复项目中的关键功能问题

console.log('🚑 启动项目紧急修复...');

// 1. 修复搜索功能
function repairSearchFunction() {
    console.log('🔧 修复搜索功能...');

    // 确保搜索按钮可用
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchInput) {
        // 移除旧的事件监听器
        searchBtn.onclick = null;

        // 添加新的搜索功能
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                window.open(searchUrl, '_blank');
                console.log('✅ 搜索已执行:', query);
            } else {
                alert('请输入搜索关键词');
            }
        });

        // 回车键支持
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        console.log('✅ 搜索功能修复完成');
    } else {
        console.warn('⚠️ 搜索元素未找到');
    }
}

// 2. 修复设置菜单
function repairSettingsMenu() {
    console.log('🔧 修复设置菜单...');

    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');

    if (settingsToggle && settingsMenu) {
        // 清理现有事件
        settingsToggle.onclick = null;
        // 移除所有可能的事件监听器
        const newToggle = settingsToggle.cloneNode(true);
        settingsToggle.parentNode.replaceChild(newToggle, settingsToggle);

        // 重新获取新的元素引用
        const freshToggle = document.getElementById('settings-toggle');

        // 添加新的点击事件
        freshToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isActive = settingsMenu.classList.contains('active');
            if (isActive) {
                settingsMenu.classList.remove('active');
                settingsMenu.style.display = 'none';
                console.log('❌ 设置菜单已隐藏');
            } else {
                settingsMenu.classList.add('active');
                settingsMenu.style.display = 'block';
                settingsMenu.style.opacity = '1';
                settingsMenu.style.visibility = 'visible';
                settingsMenu.style.transform = 'translateY(0)';
                console.log('✅ 设置菜单已显示');
            }
        });

        // 处理关闭按钮
        const closeBtn = document.getElementById('close-settings');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                settingsMenu.classList.remove('active');
                settingsMenu.style.display = 'none';
                console.log('❌ 通过关闭按钮隐藏菜单');
            };
        }

        // 点击外部关闭
        document.addEventListener('click', function(e) {
            if (!freshToggle.contains(e.target) && !settingsMenu.contains(e.target)) {
                if (settingsMenu.classList.contains('active')) {
                    settingsMenu.classList.remove('active');
                    settingsMenu.style.display = 'none';
                    console.log('❌ 通过点击外部隐藏菜单');
                }
            }
        });

        console.log('✅ 设置菜单修复完成');
    } else {
        console.warn('⚠️ 设置菜单元素未找到');
    }
}

// 3. 修复导航功能
function repairNavigation() {
    console.log('🔧 修复导航功能...');

    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.onclick = function(e) {
                e.preventDefault();

                const target = this.getAttribute('data-target');
                if (target) {
                    // 隐藏所有内容区域
                    document.querySelectorAll('.content-section').forEach(section => {
                        section.classList.remove('active');
                    });

                    // 显示目标内容区域
                    const targetElement = document.getElementById(target);
                    if (targetElement) {
                        targetElement.classList.add('active');
                    }

                    // 更新导航状态
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');

                    console.log('✅ 导航到:', target);
                }
            };
        });

        console.log('✅ 导航功能修复完成');
    } else {
        console.warn('⚠️ 导航链接未找到');
    }
}

// 4. 修复主题切换
function repairThemeToggle() {
    console.log('🔧 修复主题切换...');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = function() {
            const body = document.body;
            const isLight = body.classList.contains('light-theme');

            if (isLight) {
                body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                console.log('🌙 已切换到暗色主题');
            } else {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                console.log('☀️ 已切换到亮色主题');
            }
        };

        // 加载保存的主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }

        console.log('✅ 主题切换修复完成');
    } else {
        console.warn('⚠️ 主题切换按钮未找到');
    }
}

// 5. 修复时钟功能
function repairClock() {
    console.log('🔧 修复时钟功能...');

    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    if (clockElement || dateElement) {
        function updateClock() {
            const now = new Date();

            if (clockElement) {
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                clockElement.textContent = `${hours}:${minutes}:${seconds}`;
            }

            if (dateElement) {
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                };
                dateElement.textContent = now.toLocaleDateString('zh-CN', options);
            }
        }

        // 立即更新一次
        updateClock();

        // 每秒更新
        setInterval(updateClock, 1000);

        console.log('✅ 时钟功能修复完成');
    } else {
        console.warn('⚠️ 时钟元素未找到');
    }
}

// 6. 添加通知系统
function createNotificationSystem() {
    console.log('🔧 创建通知系统...');

    // 创建通知容器
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(notificationContainer);
    }

    // 全局通知函数
    window.showNotification = function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 10px;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transform: translateX(100%);
            transition: all 0.3s ease;
            pointer-events: auto;
            backdrop-filter: blur(10px);
        `;

        // 设置颜色
        if (type === 'success') {
            notification.style.background = 'rgba(76, 175, 80, 0.9)';
        } else if (type === 'error') {
            notification.style.background = 'rgba(244, 67, 54, 0.9)';
        }

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        notificationContainer.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notificationContainer.removeChild(notification);
                }
            }, 300);
        }, duration);
    };

    console.log('✅ 通知系统创建完成');
}

// 执行所有修复
function executeAllRepairs() {
    console.log('🚑 开始执行所有修复...');

    try {
        createNotificationSystem();
        repairSearchFunction();
        repairSettingsMenu();
        repairNavigation();
        repairThemeToggle();
        repairClock();

        console.log('✅ 所有修复完成');

        // 显示成功通知
        if (typeof showNotification === 'function') {
            showNotification('项目修复完成！所有核心功能已恢复正常', 'success', 5000);
        }

        return true;
    } catch (error) {
        console.error('❌ 修复过程中出现错误:', error);
        return false;
    }
}

// 等待DOM加载完成后执行修复
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', executeAllRepairs);
} else {
    executeAllRepairs();
}

// 也在window.load时执行，确保所有元素都已加载
window.addEventListener('load', function() {
    setTimeout(executeAllRepairs, 500);
});

// 提供手动修复选项
window.emergencyRepair = executeAllRepairs;

console.log('🔧 紧急修复脚本已加载，可手动运行: emergencyRepair()');