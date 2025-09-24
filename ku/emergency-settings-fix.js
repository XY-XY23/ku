// ===== 紧急设置菜单修复 =====
// 这个脚本会在页面加载完成后立即运行，确保设置菜单工作正常

window.emergencySettingsFix = function() {
    console.log('🚨 紧急设置菜单修复启动');

    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');

    if (!settingsToggle || !settingsMenu) {
        console.error('❌ 关键元素未找到');
        return false;
    }

    // 强制重置所有样式和事件
    settingsToggle.onclick = null;
    settingsMenu.className = 'settings-menu';

    // 添加点击事件
    settingsToggle.addEventListener('click', function(e) {
        e.preventDefault();

        console.log('🎛️ 紧急修复：设置按钮被点击');

        // 切换显示/隐藏
        if (settingsMenu.style.display === 'block') {
            settingsMenu.style.display = 'none';
            console.log('❌ 菜单已隐藏');
        } else {
            // 强制显示菜单
            settingsMenu.style.display = 'block';
            settingsMenu.style.position = 'absolute';
            settingsMenu.style.top = '100%';
            settingsMenu.style.right = '0';
            settingsMenu.style.background = 'rgba(26, 26, 46, 0.95)';
            settingsMenu.style.padding = '15px';
            settingsMenu.style.borderRadius = '15px';
            settingsMenu.style.width = '320px';
            settingsMenu.style.zIndex = '9999';
            settingsMenu.style.opacity = '1';
            settingsMenu.style.visibility = 'visible';
            settingsMenu.style.transform = 'translateY(0)';

            console.log('✅ 菜单已强制显示');
        }
    });

    // 添加点击外部关闭功能
    document.addEventListener('click', function(e) {
        if (!settingsToggle.contains(e.target) && !settingsMenu.contains(e.target)) {
            settingsMenu.style.display = 'none';
        }
    });

    console.log('✅ 紧急修复完成');
    return true;
};

// 多种方式确保修复脚本运行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.emergencySettingsFix);
} else {
    setTimeout(window.emergencySettingsFix, 100);
}

// 也在window.load时运行
window.addEventListener('load', function() {
    setTimeout(window.emergencySettingsFix, 200);
});

// 提供手动运行选项
console.log('🔧 紧急修复已加载，可手动运行: emergencySettingsFix()');