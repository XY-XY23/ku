// 壁纸设置的额外事件处理
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        // 预设壁纸点击事件
        document.querySelectorAll('.preset-item').forEach(item => {
            item.onclick = function() {
                const url = this.getAttribute('data-url');
                if (url) {
                    if (typeof applyWallpaper === 'function') {
                        applyWallpaper(url, 'image');
                        console.log('✅ 预设壁纸已应用:', url);
                        alert('壁纸已更换！');

                        // 关闭模态框
                        const modal = document.getElementById('wallpaper-modal');
                        if (modal) modal.classList.remove('active');
                    } else {
                        console.error('❌ applyWallpaper 函数未找到');
                    }
                }
            };
        });

        // 应用壁纸URL按钮
        const saveWallpaperBtn = document.getElementById('save-wallpaper');
        const wallpaperUrlInput = document.getElementById('wallpaper-url');

        if (saveWallpaperBtn && wallpaperUrlInput) {
            saveWallpaperBtn.onclick = function() {
                const url = wallpaperUrlInput.value.trim();
                if (url) {
                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                    if (typeof applyWallpaper === 'function') {
                        applyWallpaper(url, isVideo ? 'video' : 'image');
                        const modal = document.getElementById('wallpaper-modal');
                        if (modal) modal.classList.remove('active');
                        console.log('✅ 自定义壁纸已应用:', url);
                        alert('壁纸已更换！');
                    } else {
                        console.error('❌ applyWallpaper 函数未找到');
                    }
                } else {
                    alert('请输入壁纸URL');
                }
            };
        }

        // 取消壁纸设置按钮
        const cancelWallpaperBtn = document.getElementById('cancel-wallpaper');
        if (cancelWallpaperBtn) {
            cancelWallpaperBtn.onclick = function() {
                const modal = document.getElementById('wallpaper-modal');
                if (modal) modal.classList.remove('active');
            };
        }

        console.log('🎨 壁纸设置事件已绑定');
    }, 1000);
});

// 确保导航功能正常工作
window.switchContent = function(targetId) {
    console.log(`📄 切换到页面: ${targetId}`);

    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // 显示目标内容区域
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.add('active');
        console.log(`✅ 页面 ${targetId} 已显示`);

        // 根据页面类型执行特定初始化
        if (targetId === 'favorites') {
            // 重新渲染收藏页面
            if (typeof renderFavorites === 'function') {
                console.log('🔄 重新渲染收藏页面');
                renderFavorites();
            }
        } else if (targetId === 'discover') {
            // 确保发现页面的按钮功能正常
            console.log('🔄 初始化发现页面');
            setTimeout(() => {
                document.querySelectorAll('.add-to-fav-btn').forEach(btn => {
                    if (!btn.onclick) {
                        btn.onclick = function(e) {
                            e.preventDefault();
                            const name = this.getAttribute('data-name');
                            const url = this.getAttribute('data-url');
                            const icon = this.getAttribute('data-icon');

                            if (typeof addFavorite === 'function') {
                                addFavorite(name, url, icon);
                                this.innerHTML = '<i class="fas fa-check"></i> 已收藏';
                                this.style.background = '#4CAF50';
                                setTimeout(() => {
                                    this.innerHTML = '<i class="fas fa-plus"></i>收藏';
                                    this.style.background = '';
                                }, 2000);
                                console.log('✅ 网站已添加到收藏');
                            } else {
                                alert('收藏功能暂时不可用');
                            }
                        };
                    }
                });
                console.log('✅ 发现页面按钮已初始化');
            }, 100);
        }

    } else {
        console.log(`❌ 页面元素 ${targetId} 未找到`);
    }

    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 激活当前链接
    const currentLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
        console.log(`✅ 导航链接 ${targetId} 已激活`);
    }
};

// 强制重新绑定导航事件
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 重新绑定导航事件...');

    // 为所有导航链接添加点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log(`🖱️ 点击导航链接: ${target}`);
            if (target) {
                switchContent(target);
            }
        };
    });

    console.log('✅ 导航事件绑定完成');
});

// 确保搜索功能的全局访问
window.performSearch = function() {
    console.log('🔍 执行搜索 (全局函数)');
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            // 使用智能搜索引擎系统（如果可用）
            if (typeof intelligentSearch !== 'undefined' && intelligentSearch.search) {
                intelligentSearch.search(query);
            } else {
                // 回退到简单搜索
                const engineSelect = document.getElementById('engine-select');
                const engine = engineSelect ? engineSelect.value : 'google';
                const searchUrls = {
                    google: 'https://www.google.com/search?q=',
                    bing: 'https://www.bing.com/search?q=',
                    baidu: 'https://www.baidu.com/s?wd='
                };
                const url = searchUrls[engine] + encodeURIComponent(query);
                window.open(url, '_blank');
                console.log('✅ 搜索已执行 (回退方案)');
            }
        } else {
            alert('请输入搜索关键词');
        }
    }
};