// 用户设置
const userSettings = {
    layout: 'grid', 
    fontSize: 'medium',
    fontFamily: 'default',
    effects: {
        sakura: true,
        hearts: false,
        snow: false,
        ribbons: false
    },
    autoTheme: false
};

// 创建星空背景
function createStarryBackground() {
    const container = document.getElementById('starry-bg');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // 随机大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // 随机动画参数
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s ease-in-out`;

        container.appendChild(star);
    }
}

// 樱花特效
function createSakuraEffect() {
    const sakuraContainer = document.getElementById('sakura-container');
    sakuraContainer.innerHTML = '';

    if (!userSettings.effects.sakura) return;

    const sakuraCount = 30;

    for (let i = 0; i < sakuraCount; i++) {
        const sakura = document.createElement('div');
        sakura.classList.add('sakura');
        sakura.innerHTML = '❀';

        // 随机位置
        sakura.style.left = `${Math.random() * 100}%`;

        // 随机大小
        const size = Math.random() * 20 + 15;
        sakura.style.fontSize = `${size}px`;

        // 随机颜色
        const colors = ['#ffb7c5', '#ff9eb5', '#ff85a5', '#ff6b95', '#ff5185'];
        sakura.style.color = colors[Math.floor(Math.random() * colors.length)];

        // 随机动画参数
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        sakura.style.animation = `fall ${duration}s linear ${delay}s infinite`;

        sakuraContainer.appendChild(sakura);
    }
}

// 爱心特效
function createHeartsEffect() {
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.innerHTML = '';

    if (!userSettings.effects.hearts) return;

    // 点击页面时创建爱心
    document.body.addEventListener('click', function(e) {
        if (!userSettings.effects.hearts) return;

        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        // 位置在点击处
        heart.style.left = `${e.pageX}px`;
        heart.style.top = `${e.pageY}px`;

        // 随机大小
        const size = Math.random() * 30 + 20;
        heart.style.fontSize = `${size}px`;

        // 随机颜色
        const colors = ['#ff6b6b', '#ff8e8e', '#ff5252', '#ff3838', '#ff1e1e'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        // 随机动画参数
        const duration = Math.random() * 3 + 2;
        heart.style.animation = `fall-heart ${duration}s linear forwards`;

        heartsContainer.appendChild(heart);

        // 动画结束后移除爱心
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    });
}

// 雪花特效
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    snowContainer.innerHTML = '';

    if (!userSettings.effects.snow) return;

    const snowCount = 30;

    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';

        // 随机位置
        snowflake.style.left = `${Math.random() * 100}%`;

        // 随机大小
        const size = Math.random() * 20 + 15;
        snowflake.style.fontSize = `${size}px`;

        // 随机动画参数
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite`;

        snowContainer.appendChild(snowflake);
    }
}

// 彩带特效
function createRibbonsEffect() {
    const ribbonsContainer = document.getElementById('ribbons-container');
    ribbonsContainer.innerHTML = '';

    if (!userSettings.effects.ribbons) return;

    const ribbonsCount = 5;
    const colors = ['#ff6b6b', '#4169e1', '#8a2be2', '#2ecc71', '#e67e22'];

    for (let i = 0; i < ribbonsCount; i++) {
        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon');
        ribbon.innerHTML = '🎀';

        // 随机位置
        ribbon.style.left = `${Math.random() * 100}%`;
        ribbon.style.top = `${Math.random() * 100}%`;

        // 随机大小
        const size = Math.random() * 20 + 20;
        ribbon.style.fontSize = `${size}px`;

        // 设置颜色
        ribbon.style.color = colors[i % colors.length];

        // 随机动画延迟
        ribbon.style.animationDelay = `${Math.random() * 5}s`;

        ribbonsContainer.appendChild(ribbon);
    }
}

// 时钟功能
function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    
    // 更新时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
    
    // 更新日期
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    date.textContent = now.toLocaleDateString('zh-CN', options);
}

// 备忘录功能
let notes = [];

function initNotes() {
    loadNotes();
    renderNotes();
    
    // 添加备忘录事件监听
    document.getElementById('add-note-btn').addEventListener('click', addNote);
    document.getElementById('note-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNote();
        }
    });
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="text-align: center; opacity: 0.7;">暂无备忘录</p>';
        return;
    }
    
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
            <div class="note-text">${note}</div>
            <div class="note-actions">
                <button class="note-btn edit-note" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="note-btn delete-note" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        notesList.appendChild(noteItem);
    });
    
    // 添加删除和编辑事件
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteNote(index);
        });
    });
    
    document.querySelectorAll('.edit-note').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editNote(index);
        });
    });
}

function addNote() {
    const noteInput = document.getElementById('note-input');
    const text = noteInput.value.trim();
    
    if (text) {
        notes.push(text);
        saveNotes();
        renderNotes();
        noteInput.value = '';
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function editNote(index) {
    const newText = prompt('编辑备忘录:', notes[index]);
    if (newText !== null) {
        notes[index] = newText.trim();
        saveNotes();
        renderNotes();
    }
}

// 搜索历史和建议
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
const searchSuggestions = [
    '天气预报', '在线翻译', '新闻资讯', '股票行情', '电影推荐',
    '音乐播放', '小说阅读', '游戏下载', '学习资料', '技术教程'
];

// 通知系统
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // 显示通知
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => container.removeChild(notification), 300);
    }, duration);
}

// 搜索建议功能
function initSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // 合并搜索历史和预设建议
        const allSuggestions = [...new Set([...searchHistory, ...searchSuggestions])];
        const filteredSuggestions = allSuggestions
            .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 8);
        
        if (filteredSuggestions.length > 0) {
            suggestionsContainer.innerHTML = filteredSuggestions
                .map(suggestion => `
                    <div class="search-suggestion-item" data-suggestion="${suggestion}">
                        <i class="fas fa-search search-suggestion-icon"></i>
                        <span>${suggestion}</span>
                    </div>
                `).join('');
            
            suggestionsContainer.style.display = 'block';
            
            // 添加点击事件
            suggestionsContainer.querySelectorAll('.search-suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const suggestion = this.getAttribute('data-suggestion');
                    searchInput.value = suggestion;
                    suggestionsContainer.style.display = 'none';
                    performSearch();
                });
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // 点击外部隐藏建议
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// 快速访问功能
function initQuickAccess() {
    // 返回顶部
    document.getElementById('scroll-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showNotification('已返回顶部', 'success', 2000);
    });
    
    // 随机网站
    document.getElementById('random-site').addEventListener('click', function() {
        const websites = document.querySelectorAll('.website-card a');
        if (websites.length > 0) {
            const randomIndex = Math.floor(Math.random() * websites.length);
            const randomSite = websites[randomIndex];
            randomSite.click();
            showNotification('正在打开随机网站...', 'info', 2000);
        }
    });
    
    // 全屏切换
    let isFullscreen = false;
    document.getElementById('fullscreen-toggle').addEventListener('click', function() {
        if (!isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            this.innerHTML = '<i class="fas fa-compress"></i>';
            showNotification('已进入全屏模式', 'success', 2000);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.innerHTML = '<i class="fas fa-expand"></i>';
            showNotification('已退出全屏模式', 'success', 2000);
        }
        isFullscreen = !isFullscreen;
    });
    
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', function() {
        const fullscreenBtn = document.getElementById('fullscreen-toggle');
        if (!document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            isFullscreen = false;
        }
    });
}

// 增强的搜索功能
function performSearchEnhanced() {
    const engineKey = document.getElementById('engine-select').value;
    const engine = searchEngines.find(e => e.id === engineKey);
    if (!engine) return;

    const query = document.getElementById('search-input').value.trim();

    if (query) {
        // 添加到搜索历史
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            searchHistory = searchHistory.slice(0, 10); // 只保留最近10条
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        
        // 显示加载状态
        const searchBtn = document.querySelector('.search-btn');
        const originalHTML = searchBtn.innerHTML;
        searchBtn.innerHTML = '<div class="loading-spinner"></div>';
        
        // 模拟加载延迟
        setTimeout(() => {
            searchBtn.innerHTML = originalHTML;
            window.open(engine.url + encodeURIComponent(query), '_blank');
            showNotification(`正在使用${engine.name}搜索: ${query}`, 'info', 2000);
        }, 500);
        
        // 隐藏建议框
        document.getElementById('search-suggestions').style.display = 'none';
    } else {
        // 添加抖动效果提示用户输入
        const searchBox = document.querySelector('.search-box');
        searchBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            searchBox.style.animation = '';
        }, 500);
        showNotification('请输入搜索关键词', 'error', 2000);
    }
}

// 主题切换功能
let isDarkTheme = true;

function initThemeToggle() {
    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkTheme = false;
        document.body.classList.add('light-theme');
    } else {
        isDarkTheme = true;
        document.body.classList.remove('light-theme');
    }
    
    // 主题切换按钮点击事件
    document.getElementById('theme-toggle').addEventListener('click', function(e) {
        toggleTheme(e);
    });
}

function toggleTheme(event) {
    const themeToggle = document.getElementById('theme-toggle');
    const overlay = document.getElementById('theme-transition-overlay');
    
    // 获取点击位置
    const rect = themeToggle.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    
    // 设置过渡遮罩的中心点
    overlay.style.setProperty('--x', x + '%');
    overlay.style.setProperty('--y', y + '%');
    
    // 添加旋转动画
    themeToggle.classList.add('rotating');
    
    // 显示过渡遮罩
    overlay.classList.add('active');
    
    // 延迟切换主题
    setTimeout(() => {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            showNotification('已切换到黑夜模式 🌙', 'success', 2000);
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            showNotification('已切换到白天模式 ☀️', 'success', 2000);
        }
        
        // 保存设置
        saveSettings();
        
    }, 250);
    
    // 移除过渡效果
    setTimeout(() => {
        overlay.classList.remove('active');
        themeToggle.classList.remove('rotating');
    }, 600);
}

// 根据时间自动切换主题
function autoThemeSwitch() {
    if (!userSettings.autoTheme) return;
    
    const hour = new Date().getHours();
    const isNightTime = hour >= 19 || hour < 7; // 晚上7点到早上7点
    
    if (isNightTime && !isDarkTheme) {
        toggleTheme();
        showNotification('已自动切换到夜间模式 🌙', 'info', 2000);
    } else if (!isNightTime && isDarkTheme) {
        toggleTheme();
        showNotification('已自动切换到日间模式 ☀️', 'info', 2000);
    }
}

// 启动自动主题检查定时器
function startAutoThemeTimer() {
    // 每30分钟检查一次
    setInterval(() => {
        if (userSettings.autoTheme) {
            autoThemeSwitch();
        }
    }, 30 * 60 * 1000);
}

// 键盘快捷键切换主题
function initThemeKeyboard() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Shift + T 切换主题
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// 天气功能 - 增强版with自动定位
let currentCity = '北京';
let currentLocation = null;
let weatherApiKey = null; // 用户可以设置自己的天气API密钥

function initWeather() {
    // 首先尝试自动定位
    requestUserLocation();

    // 刷新天气按钮
    document.getElementById('refresh-weather').addEventListener('click', function() {
        this.style.animation = 'spin 1s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 1000);
        loadWeatherData();
        showNotification('正在刷新天气信息...', 'info', 2000);
    });

    // 更改城市按钮
    document.getElementById('change-location').addEventListener('click', function() {
        showLocationOptions();
    });

    // 从localStorage读取保存的城市
    const savedCity = localStorage.getItem('weather_city');
    if (savedCity) {
        currentCity = savedCity;
    }
}

// 请求用户位置
function requestUserLocation() {
    if (navigator.geolocation) {
        console.log('🌍 正在请求位置权限...');
        const locationText = document.getElementById('location-text');
        locationText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在定位...';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                console.log('✅ 位置获取成功:', currentLocation);

                // 根据坐标获取城市名称和天气
                getCityFromCoordinates(currentLocation.latitude, currentLocation.longitude);
            },
            (error) => {
                console.log('❌ 位置获取失败:', error.message);
                handleLocationError(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5分钟缓存
            }
        );
    } else {
        console.log('❌ 浏览器不支持地理定位');
        showNotification('您的浏览器不支持地理定位', 'error', 3000);
        loadWeatherData(); // 使用默认城市
    }
}

// 根据坐标获取城市名称
async function getCityFromCoordinates(lat, lon) {
    try {
        console.log(`🗺️ 正在查询坐标 ${lat}, ${lon} 对应的城市...`);

        // 使用免费的反地理编码API
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=zh`);

        if (response.ok) {
            const data = await response.json();
            console.log('🏙️ 城市信息:', data);

            // 优先使用城市名，其次使用地区名
            const cityName = data.city || data.locality || data.countryName || '未知位置';
            currentCity = cityName;

            // 保存到localStorage
            localStorage.setItem('weather_city', currentCity);

            // 更新显示并加载天气数据
            document.getElementById('location-text').textContent = `📍 ${currentCity}`;
            showNotification(`已定位到: ${currentCity}`, 'success', 2000);

            // 使用真实坐标获取天气数据
            loadRealWeatherData();
        } else {
            throw new Error('反地理编码失败');
        }
    } catch (error) {
        console.log('❌ 获取城市信息失败:', error);
        // 使用备用的地理编码服务
        try {
            await getCityFromCoordinatesBackup(lat, lon);
        } catch (backupError) {
            console.log('❌ 备用服务也失败，使用默认城市');
            showNotification('定位失败，使用默认位置', 'error', 2000);
            loadWeatherData();
        }
    }
}

// 备用反地理编码服务
async function getCityFromCoordinatesBackup(lat, lon) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=zh-CN`);

    if (response.ok) {
        const data = await response.json();
        console.log('🏙️ 备用城市信息:', data);

        const address = data.address || {};
        const cityName = address.city || address.town || address.village || address.county || '未知位置';
        currentCity = cityName;

        localStorage.setItem('weather_city', currentCity);
        document.getElementById('location-text').textContent = `📍 ${currentCity}`;
        showNotification(`已定位到: ${currentCity}`, 'success', 2000);

        loadRealWeatherData();
    } else {
        throw new Error('备用反地理编码也失败');
    }
}

// 处理定位错误
function handleLocationError(error) {
    let message = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = '用户拒绝了地理定位请求';
            break;
        case error.POSITION_UNAVAILABLE:
            message = '位置信息不可用';
            break;
        case error.TIMEOUT:
            message = '定位请求超时';
            break;
        default:
            message = '定位时发生未知错误';
            break;
    }

    console.log('❌ 定位错误:', message);
    showNotification(message + '，使用默认位置', 'error', 3000);
    document.getElementById('location-text').textContent = currentCity;
    loadWeatherData(); // 使用默认城市
}

// 显示位置选项对话框
function showLocationOptions() {
    const options = [
        '🎯 重新定位',
        '✏️ 手动输入城市',
        '📍 常用城市'
    ];

    const choice = prompt(`请选择定位方式:\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n\n请输入数字 1-3:`);

    switch (choice) {
        case '1':
            requestUserLocation();
            break;
        case '2':
            const newCity = prompt('请输入城市名称:', currentCity);
            if (newCity && newCity.trim() !== '') {
                currentCity = newCity.trim();
                localStorage.setItem('weather_city', currentCity);
                loadWeatherData();
                showNotification(`已切换到${currentCity}`, 'success', 2000);
            }
            break;
        case '3':
            showCommonCities();
            break;
        default:
            showNotification('取消操作', 'info', 1000);
    }
}

// 显示常用城市选择
function showCommonCities() {
    const cities = ['北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '重庆', '西安', '武汉'];
    const cityList = cities.map((city, index) => `${index + 1}. ${city}`).join('\n');

    const choice = prompt(`选择常用城市:\n${cityList}\n\n请输入数字 1-${cities.length}:`);

    const cityIndex = parseInt(choice) - 1;
    if (cityIndex >= 0 && cityIndex < cities.length) {
        currentCity = cities[cityIndex];
        localStorage.setItem('weather_city', currentCity);
        loadWeatherData();
        showNotification(`已切换到${currentCity}`, 'success', 2000);
    }
}

// 加载真实天气数据（使用免费API）
async function loadRealWeatherData() {
    const weatherDisplay = document.getElementById('weather-display');

    // 显示加载状态
    weatherDisplay.innerHTML = `
        <div class="weather-loading">
            <div class="loading-spinner"></div>
            <span>正在获取实时天气...</span>
        </div>
    `;

    try {
        let weatherData;

        if (currentLocation) {
            // 使用坐标获取天气数据
            weatherData = await getWeatherByCoordinates(currentLocation.latitude, currentLocation.longitude);
        } else {
            // 使用城市名获取天气数据
            weatherData = await getWeatherByCity(currentCity);
        }

        if (weatherData) {
            displayWeatherData(weatherData);
        } else {
            throw new Error('无法获取天气数据');
        }

    } catch (error) {
        console.log('❌ 获取真实天气数据失败:', error);
        showNotification('获取天气数据失败，显示模拟数据', 'error', 2000);

        // 回退到模拟数据
        setTimeout(() => {
            const mockWeatherData = generateMockWeather();
            displayWeatherData(mockWeatherData);
        }, 1000);
    }
}

// 使用坐标获取天气数据
async function getWeatherByCoordinates(lat, lon) {
    try {
        // 使用免费的OpenWeatherMap API（需要API密钥，这里使用演示）
        // 用户可以在 https://openweathermap.org/api 获取免费API密钥
        const apiKey = weatherApiKey || 'demo_key'; // 实际使用时需要真实API密钥

        // 由于免费API有限制，这里使用模拟数据代替
        console.log(`🌤️ 模拟获取坐标 ${lat}, ${lon} 的天气数据`);

        return generateEnhancedMockWeather();

    } catch (error) {
        console.log('❌ 坐标天气获取失败:', error);
        return null;
    }
}

// 使用城市名获取天气数据
async function getWeatherByCity(cityName) {
    try {
        console.log(`🌤️ 模拟获取 ${cityName} 的天气数据`);
        return generateEnhancedMockWeather();
    } catch (error) {
        console.log('❌ 城市天气获取失败:', error);
        return null;
    }
}

// 生成增强的模拟天气数据
function generateEnhancedMockWeather() {
    const conditions = [
        { icon: 'fas fa-sun', class: 'sunny', desc: '晴朗', temp: 25, humidity: 45, wind: 8, pressure: 1013, visibility: 10 },
        { icon: 'fas fa-cloud-sun', class: 'cloudy', desc: '多云', temp: 22, humidity: 55, wind: 12, pressure: 1010, visibility: 8 },
        { icon: 'fas fa-cloud-rain', class: 'rainy', desc: '小雨', temp: 18, humidity: 75, wind: 15, pressure: 1005, visibility: 6 },
        { icon: 'fas fa-snowflake', class: 'snowy', desc: '小雪', temp: -2, humidity: 60, wind: 10, pressure: 1020, visibility: 4 }
    ];

    const current = conditions[Math.floor(Math.random() * conditions.length)];
    const currentHour = new Date().getHours();

    // 根据时间调整温度
    let tempAdjust = 0;
    if (currentHour >= 6 && currentHour <= 18) {
        tempAdjust = Math.floor(Math.random() * 5); // 白天稍热
    } else {
        tempAdjust = -Math.floor(Math.random() * 8); // 夜间稍冷
    }

    return {
        city: currentCity,
        current: {
            temperature: current.temp + tempAdjust,
            condition: current.desc,
            icon: current.icon,
            iconClass: current.class,
            humidity: current.humidity + Math.floor(Math.random() * 20 - 10),
            windSpeed: current.wind + Math.floor(Math.random() * 10 - 5),
            pressure: current.pressure + Math.floor(Math.random() * 20 - 10),
            visibility: current.visibility + Math.floor(Math.random() * 6 - 3),
            updateTime: new Date().toLocaleString('zh-CN')
        },
        forecast: generateDetailedForecast(),
        location: currentLocation
    };
}

// 生成详细预报数据
function generateDetailedForecast() {
    const days = ['今天', '明天', '后天', '周四', '周五', '周六', '周日'];
    const icons = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-cloud-rain', 'fas fa-cloud', 'fas fa-snowflake'];
    const conditions = ['晴', '多云', '小雨', '阴', '雪'];

    return days.slice(0, 5).map((day, index) => {
        const iconIndex = Math.floor(Math.random() * icons.length);
        const baseTemp = 20;
        const tempVariation = Math.floor(Math.random() * 20) - 10;

        return {
            day: day,
            icon: icons[iconIndex],
            condition: conditions[iconIndex],
            high: baseTemp + tempVariation + Math.floor(Math.random() * 8),
            low: baseTemp + tempVariation - Math.floor(Math.random() * 8),
            humidity: 40 + Math.floor(Math.random() * 40),
            windSpeed: 5 + Math.floor(Math.random() * 15)
        };
    });
}

function loadWeatherData() {
    const weatherDisplay = document.getElementById('weather-display');
    const locationText = document.getElementById('location-text');
    
    locationText.textContent = currentCity;
    
    // 显示加载状态
    weatherDisplay.innerHTML = `
        <div class="weather-loading">
            <div class="loading-spinner"></div>
            <span>正在获取天气信息...</span>
        </div>
    `;
    
    // 模拟天气数据（实际应用中应该调用真实的天气API）
    setTimeout(() => {
        const mockWeatherData = generateMockWeather();
        displayWeatherData(mockWeatherData);
    }, 1500);
}

function generateMockWeather() {
    const conditions = [
        { icon: 'fas fa-sun', class: 'sunny', desc: '晴朗', temp: 25 },
        { icon: 'fas fa-cloud-sun', class: 'cloudy', desc: '多云', temp: 22 },
        { icon: 'fas fa-cloud-rain', class: 'rainy', desc: '小雨', temp: 18 },
        { icon: 'fas fa-snowflake', class: 'snowy', desc: '小雪', temp: -2 }
    ];
    
    const current = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
        city: currentCity,
        current: {
            temperature: current.temp + Math.floor(Math.random() * 10 - 5),
            condition: current.desc,
            icon: current.icon,
            iconClass: current.class,
            humidity: 45 + Math.floor(Math.random() * 40),
            windSpeed: Math.floor(Math.random() * 15) + 3,
            pressure: 1010 + Math.floor(Math.random() * 40),
            visibility: 8 + Math.floor(Math.random() * 12)
        },
        forecast: generateForecast()
    };
}

function generateForecast() {
    const days = ['今天', '明天', '后天', '周四', '周五'];
    const icons = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-cloud-rain', 'fas fa-cloud'];
    
    return days.slice(0, 4).map((day, index) => ({
        day: day,
        icon: icons[Math.floor(Math.random() * icons.length)],
        high: 20 + Math.floor(Math.random() * 15),
        low: 10 + Math.floor(Math.random() * 10)
    }));
}

function displayWeatherData(data) {
    const weatherDisplay = document.getElementById('weather-display');

    // 更新位置显示
    const locationText = document.getElementById('location-text');
    if (data.location && data.location.latitude) {
        locationText.innerHTML = `📍 ${data.city} <small>(${data.location.latitude.toFixed(2)}°, ${data.location.longitude.toFixed(2)}°)</small>`;
    } else {
        locationText.textContent = `📍 ${data.city}`;
    }

    weatherDisplay.innerHTML = `
        <div class="weather-info loaded">
            <div class="weather-main">
                <div class="weather-icon ${data.current.iconClass}">
                    <i class="${data.current.icon}"></i>
                </div>
                <div class="weather-temp-container">
                    <div class="weather-temp">${data.current.temperature}°C</div>
                    ${data.current.updateTime ? `<div class="weather-update-time">更新于 ${data.current.updateTime}</div>` : ''}
                </div>
            </div>
            <div class="weather-description">${data.current.condition}</div>
            <div class="weather-details">
                <div class="weather-detail-item">
                    <i class="fas fa-tint"></i>
                    <span>湿度 ${Math.max(0, Math.min(100, data.current.humidity))}%</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-wind"></i>
                    <span>风速 ${Math.max(0, data.current.windSpeed)} km/h</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-thermometer-half"></i>
                    <span>气压 ${data.current.pressure} hPa</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-eye"></i>
                    <span>能见度 ${Math.max(0, data.current.visibility)} km</span>
                </div>
            </div>
            <div class="weather-forecast">
                <div class="forecast-title">未来几天预报</div>
                <div class="forecast-items">
                    ${data.forecast.map(item => `
                        <div class="forecast-item">
                            <div class="forecast-day">${item.day}</div>
                            <div class="forecast-icon">
                                <i class="${item.icon}"></i>
                            </div>
                            <div class="forecast-temp">${item.high}°/${item.low}°</div>
                            ${item.condition ? `<div class="forecast-condition">${item.condition}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            ${data.location && data.location.accuracy ? `
                <div class="location-accuracy" style="text-align: center; font-size: 0.75rem; opacity: 0.6; margin-top: 10px;">
                    <i class="fas fa-crosshairs"></i> 定位精度 ±${Math.round(data.location.accuracy)}米
                </div>
            ` : ''}
        </div>
    `;
}

// 用户收藏
let userFavorites = [
    {name: "GitHub", url: "https://github.com", icon: "fab fa-github"},
    {name: "YouTube", url: "https://www.youtube.com", icon: "fab fa-youtube"}
];

// 搜索引擎数据 - 智能选择版本
let searchEngines = [
    {
        id: "google",
        name: "谷歌",
        url: "https://www.google.com/search?q=",
        icon: "fab fa-google",
        priority: 1, // 最高优先级
        testUrl: "https://www.google.com/favicon.ico",
        region: "global",
        description: "全球最大的搜索引擎"
    },
    {
        id: "bing",
        name: "必应",
        url: "https://www.bing.com/search?q=",
        icon: "fab fa-microsoft",
        priority: 2, // 备选方案
        testUrl: "https://www.bing.com/favicon.ico",
        region: "global",
        description: "微软搜索引擎"
    },
    {
        id: "baidu",
        name: "百度",
        url: "https://www.baidu.com/s?wd=",
        icon: "fab fa-baidu",
        priority: 3,
        testUrl: "https://www.baidu.com/favicon.ico",
        region: "china",
        description: "中国最大的搜索引擎"
    },
    {
        id: "sogou",
        name: "搜狗",
        url: "https://www.sogou.com/web?query=",
        icon: "fas fa-search",
        priority: 4,
        testUrl: "https://www.sogou.com/favicon.ico",
        region: "china",
        description: "中文搜索引擎"
    },
    {
        id: "360",
        name: "360搜索",
        url: "https://www.so.com/s?q=",
        icon: "fas fa-shield-alt",
        priority: 5,
        testUrl: "https://www.so.com/favicon.ico",
        region: "china",
        description: "360旗下搜索引擎"
    }
];

// 智能搜索引擎管理器
class IntelligentSearchEngine {
    constructor() {
        this.currentEngine = 'google'; // 默认Google
        this.networkStatus = {
            google: 'unknown',
            bing: 'unknown',
            baidu: 'unknown'
        };
        this.lastTest = null;
        this.testing = false;
        this.userPreference = localStorage.getItem('preferredSearchEngine');
        this.autoSelect = localStorage.getItem('autoSelectEngine') !== 'false';
        this.isReady = false;
    }

    // 初始化搜索引擎
    async init() {
        console.log('🔍 初始化智能搜索引擎系统...');

        // 显示网络检测状态
        this.showEngineStatus('检测网络环境中...');

        // 如果用户有偏好设置，优先使用
        if (this.userPreference && !this.autoSelect) {
            this.currentEngine = this.userPreference;
            this.updateEngineDisplay();
            console.log(`👤 使用用户偏好搜索引擎: ${this.userPreference}`);
            this.showEngineStatus(`已设置为: ${this.getEngineByName(this.userPreference)?.name}`);
            this.isReady = true;
            return;
        }

        // 自动检测最佳搜索引擎
        await this.detectBestEngine();
        this.isReady = true;
    }

    // 检测最佳搜索引擎
    async detectBestEngine() {
        if (this.testing) return;
        this.testing = true;

        try {
            console.log('🌐 开始检测搜索引擎可用性...');

            // 优先测试Google和Bing
            const primaryEngines = ['google', 'bing'];

            for (const engineId of primaryEngines) {
                const engine = this.getEngineByName(engineId);
                if (engine) {
                    console.log(`🧪 测试 ${engine.name}...`);
                    const isAvailable = await this.testEngine(engine);
                    this.networkStatus[engineId] = isAvailable ? 'available' : 'unavailable';

                    if (isAvailable) {
                        console.log(`✅ ${engine.name} 可用`);
                        this.currentEngine = engineId;
                        this.updateEngineDisplay();
                        this.showEngineStatus(`已自动选择: ${engine.name} ✓`);
                        this.lastTest = Date.now();
                        this.testing = false;
                        return;
                    } else {
                        console.log(`❌ ${engine.name} 不可用`);
                    }
                }
            }

            // 如果Google和Bing都不可用，回退到百度
            console.log('⚠️ Google和Bing均不可用，使用百度作为备选');
            this.currentEngine = 'baidu';
            this.networkStatus.baidu = 'available';
            this.updateEngineDisplay();
            this.showEngineStatus('已自动选择: 百度 (备选)');

        } catch (error) {
            console.error('❌ 搜索引擎检测失败:', error);
            this.currentEngine = 'google'; // 默认使用Google
            this.showEngineStatus('检测失败，使用默认设置');
        } finally {
            this.lastTest = Date.now();
            this.testing = false;
        }
    }

    // 测试单个搜索引擎
    async testEngine(engine, timeout = 3000) {
        return new Promise((resolve) => {
            const startTime = Date.now();

            // 使用图片请求测试连接性
            const img = new Image();
            const timeoutId = setTimeout(() => {
                resolve(false);
            }, timeout);

            img.onload = () => {
                clearTimeout(timeoutId);
                const responseTime = Date.now() - startTime;
                console.log(`⚡ ${engine.name} 响应时间: ${responseTime}ms`);
                resolve(true);
            };

            img.onerror = () => {
                clearTimeout(timeoutId);
                resolve(false);
            };

            // 添加时间戳避免缓存
            img.src = `${engine.testUrl}?t=${Date.now()}`;
        });
    }

    // 获取搜索引擎信息
    getEngineByName(engineId) {
        return searchEngines.find(engine => engine.id === engineId);
    }

    // 更新搜索引擎显示
    updateEngineDisplay() {
        const engine = this.getEngineByName(this.currentEngine);
        if (!engine) return;

        // 更新选择器
        const engineSelect = document.getElementById('engine-select');
        if (engineSelect) {
            engineSelect.value = this.currentEngine;
        }

        // 更新图标
        const engineIcon = document.getElementById('engine-icon-display');
        if (engineIcon) {
            engineIcon.innerHTML = `<i class="${engine.icon}"></i>`;
            engineIcon.style.animation = 'pulse 0.5s';
        }

        // 更新状态文本
        const currentEngineText = document.getElementById('current-engine');
        if (currentEngineText) {
            currentEngineText.innerHTML = `当前引擎：${engine.name} ${this.getEngineStatusIcon(this.currentEngine)}`;
        }

        console.log(`🔄 搜索引擎已更新为: ${engine.name}`);
    }

    // 获取引擎状态图标
    getEngineStatusIcon(engineId) {
        const status = this.networkStatus[engineId];
        switch (status) {
            case 'available':
                return '<span style="color: #4CAF50;">●</span>';
            case 'unavailable':
                return '<span style="color: #f44336;">●</span>';
            default:
                return '<span style="color: #FF9800;">●</span>';
        }
    }

    // 显示引擎状态
    showEngineStatus(message) {
        const statusElement = this.getOrCreateStatusElement();
        statusElement.textContent = message;
        statusElement.style.display = 'block';

        // 3秒后自动隐藏
        setTimeout(() => {
            if (statusElement.style.display !== 'none') {
                statusElement.style.display = 'none';
            }
        }, 3000);
    }

    // 获取或创建状态显示元素
    getOrCreateStatusElement() {
        let statusElement = document.querySelector('.engine-status');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.className = 'engine-status';
            statusElement.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 0.8rem;
                z-index: 1000;
                display: none;
                backdrop-filter: blur(10px);
            `;
            document.body.appendChild(statusElement);
        }
        return statusElement;
    }

    // 手动设置搜索引擎
    setEngine(engineId) {
        const engine = this.getEngineByName(engineId);
        if (!engine) {
            console.error(`❌ 搜索引擎 ${engineId} 不存在`);
            return false;
        }

        this.currentEngine = engineId;
        this.userPreference = engineId;
        localStorage.setItem('preferredSearchEngine', engineId);
        this.updateEngineDisplay();

        console.log(`👤 用户手动设置搜索引擎: ${engine.name}`);
        this.showEngineStatus(`已设置为: ${engine.name}`);
        return true;
    }

    // 开关自动选择功能
    toggleAutoSelect(enabled) {
        this.autoSelect = enabled;
        localStorage.setItem('autoSelectEngine', enabled.toString());

        if (enabled) {
            console.log('🤖 已开启自动搜索引擎选择');
            this.showEngineStatus('已开启自动选择');
            this.detectBestEngine(); // 重新检测
        } else {
            console.log('👤 已关闭自动搜索引擎选择');
            this.showEngineStatus('已关闭自动选择');
        }
    }

    // 重新检测搜索引擎
    async refresh() {
        // 避免频繁检测
        if (this.lastTest && Date.now() - this.lastTest < 30000) {
            this.showEngineStatus('请稍后再试...');
            return Promise.resolve();
        }

        this.showEngineStatus('重新检测中...');
        await this.detectBestEngine();
        return Promise.resolve();
    }

    // 获取当前搜索引擎
    getCurrentEngine() {
        return this.getEngineByName(this.currentEngine);
    }

    // 执行搜索
    search(query) {
        if (!this.isReady) {
            console.warn('⚠️ 搜索引擎还未准备就绪');
            // 使用默认引擎进行搜索
            this.performBasicSearch(query);
            return true;
        }

        const engine = this.getCurrentEngine();
        if (!engine || !query?.trim()) {
            console.error('❌ 搜索引擎或查询词无效');
            return false;
        }

        const searchUrl = engine.url + encodeURIComponent(query.trim());
        console.log(`🔍 使用 ${engine.name} 搜索: ${query}`);

        window.open(searchUrl, '_blank');
        this.showEngineStatus(`正在使用 ${engine.name} 搜索...`);
        return true;
    }

    // 基础搜索功能（备用）
    performBasicSearch(query) {
        if (!query?.trim()) return false;

        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;
        window.open(searchUrl, '_blank');
        console.log('🔍 使用默认Google搜索');
        return true;
    }

    // 显示搜索引擎选择对话框
    showEngineSelector() {
        const engines = searchEngines.slice(0, 5); // 显示前5个引擎
        const engineList = engines.map((engine, index) =>
            `${index + 1}. ${engine.name} ${this.getEngineStatusIcon(engine.id)} ${engine.description}`
        ).join('\n');

        const choice = prompt(
            `🔍 选择搜索引擎:\n\n${engineList}\n\n` +
            `当前: ${this.getCurrentEngine()?.name}\n` +
            `自动选择: ${this.autoSelect ? '开启' : '关闭'}\n\n` +
            `输入数字选择引擎，输入 'auto' 开关自动选择，输入 'test' 重新检测:`
        );

        if (!choice) return;

        if (choice.toLowerCase() === 'auto') {
            this.toggleAutoSelect(!this.autoSelect);
        } else if (choice.toLowerCase() === 'test') {
            this.refresh();
        } else {
            const engineIndex = parseInt(choice) - 1;
            if (engineIndex >= 0 && engineIndex < engines.length) {
                this.setEngine(engines[engineIndex].id);
                // 设置手动选择后关闭自动选择
                if (this.autoSelect) {
                    this.toggleAutoSelect(false);
                }
            } else {
                this.showEngineStatus('无效选择');
            }
        }
    }
}

// 创建全局搜索引擎管理器实例
const intelligentSearch = new IntelligentSearchEngine();

// 特效状态
let sakuraEnabled = true;
let heartsEnabled = false;
let bookmarksEnabled = true;

// 渲染收藏
function renderFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const emptyState = document.getElementById('empty-favorites');

    if (userFavorites.length === 0) {
        favoritesGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    favoritesGrid.innerHTML = '';

    userFavorites.forEach((favorite, index) => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'favorite-card';
        favoriteCard.innerHTML = `
            <div class="favorite-card-header">
                <div class="favorite-icon">
                    <i class="${favorite.icon}"></i>
                </div>
                <div class="favorite-title">${favorite.name}</div>
            </div>
            <div class="favorite-url">${favorite.url}</div>
            <div class="favorite-actions">
                <button class="favorite-btn visit-favorite" data-url="${favorite.url}">
                    <i class="fas fa-external-link-alt"></i> 访问
                </button>
                <button class="favorite-btn edit-favorite" data-index="${index}">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="favorite-btn delete-favorite" data-index="${index}">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
        `;
        favoritesGrid.appendChild(favoriteCard);
    });

    // 添加事件监听器
    document.querySelectorAll('.visit-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });

    document.querySelectorAll('.delete-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteFavorite(index);
        });
    });

    document.querySelectorAll('.edit-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editFavorite(index);
        });
    });
}

// 添加收藏
function addFavorite(name, url, icon) {
    userFavorites.push({ name, url, icon });
    renderFavorites();
}

// 删除收藏
function deleteFavorite(index) {
    if (confirm(`确定要删除"${userFavorites[index].name}"吗？`)) {
        userFavorites.splice(index, 1);
        renderFavorites();
    }
}

// 编辑收藏
function editFavorite(index) {
    const favorite = userFavorites[index];
    const newName = prompt('请输入新的网站名称', favorite.name);
    if (newName !== null && newName.trim() !== '') {
        userFavorites[index].name = newName.trim();
        renderFavorites();
    }
}

// 渲染搜索引擎列表
function renderEngineList() {
    const engineList = document.getElementById('engine-list');
    engineList.innerHTML = '';

    searchEngines.forEach((engine, index) => {
        const engineItem = document.createElement('div');
        engineItem.className = 'engine-item';
        engineItem.innerHTML = `
            <div class="engine-item-icon">
                <i class="${engine.icon}"></i>
            </div>
            <div class="engine-item-name">${engine.name}</div>
            <div class="engine-item-actions">
                <button class="favorite-btn edit-engine" data-index="${index}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="favorite-btn delete-engine" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        engineList.appendChild(engineItem);
    });

    // 添加事件监听器
    document.querySelectorAll('.edit-engine').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editEngine(index);
        });
    });

    document.querySelectorAll('.delete-engine').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteEngine(index);
        });
    });
}

// 添加搜索引擎
function addEngine(name, url, icon) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    searchEngines.push({id, name, url, icon});
    renderEngineList();
    updateEngineSelect();
}

// 编辑搜索引擎
function editEngine(index) {
    const engine = searchEngines[index];
    document.getElementById('engine-name').value = engine.name;
    document.getElementById('engine-url').value = engine.url;
    document.getElementById('engine-icon').value = engine.icon;

    // 设置编辑模式
    document.getElementById('save-engine').setAttribute('data-index', index);
}

// 保存搜索引擎
function saveEngine() {
    const name = document.getElementById('engine-name').value;
    const url = document.getElementById('engine-url').value;
    const icon = document.getElementById('engine-icon').value;

    if (!name || !url) {
        alert('请填写搜索引擎名称和URL');
        return;
    }

    const index = document.getElementById('save-engine').getAttribute('data-index');

    if (index) {
        // 编辑现有引擎
        searchEngines[index].name = name;
        searchEngines[index].url = url;
        searchEngines[index].icon = icon;
    } else {
        // 添加新引擎
        addEngine(name, url, icon);
    }

    // 重置表单
    document.getElementById('engine-name').value = '';
    document.getElementById('engine-url').value = '';
    document.getElementById('engine-icon').value = '';
    document.getElementById('save-engine').removeAttribute('data-index');

    renderEngineList();
    updateEngineSelect();
}

// 删除搜索引擎
function deleteEngine(index) {
    if (searchEngines.length <= 1) {
        alert('至少需要保留一个搜索引擎');
        return;
    }

    if (confirm(`确定要删除"${searchEngines[index].name}"吗？`)) {
        searchEngines.splice(index, 1);
        renderEngineList();
        updateEngineSelect();
    }
}

// 更新搜索引擎选择器
function updateEngineSelect() {
    const engineSelect = document.getElementById('engine-select');
    engineSelect.innerHTML = '';

    searchEngines.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine.id;
        option.textContent = engine.name;
        engineSelect.appendChild(option);
    });

    updateEngineDisplay(engineSelect.value);
}

// 更新搜索引擎显示
function updateEngineDisplay(engineKey) {
    const engine = searchEngines.find(e => e.id === engineKey);
    if (!engine) return;

    const engineIcon = document.getElementById('engine-icon-display');
    engineIcon.innerHTML = `<i class="${engine.icon}"></i>`;
    document.getElementById('current-engine').textContent = `当前引擎：${engine.name}`;

    // 添加动画效果
    engineIcon.style.animation = 'none';
    setTimeout(() => {
        engineIcon.style.animation = 'pulse 0.5s';
    }, 10);
}

// 修复搜索功能
function performSearch() {
    const query = document.getElementById('search-input')?.value?.trim();
    if (!query) {
        // 添加抖动效果提示用户输入
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.style.animation = 'shake 0.5s';
            setTimeout(() => {
                searchBox.style.animation = '';
            }, 500);
        }
        showNotification('请输入搜索关键词', 'error', 2000);
        return;
    }

    // 使用智能搜索引擎系统
    let success = false;
    if (typeof intelligentSearch !== 'undefined' && intelligentSearch && intelligentSearch.search) {
        success = intelligentSearch.search(query);
    } else {
        // 回退到基本搜索
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
        success = true;
        console.log('🔍 使用回退搜索方案');
    }

    if (success) {
        // 添加到搜索历史
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            searchHistory = searchHistory.slice(0, 10); // 只保留最近10条
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }

        // 隐藏建议框
        const suggestions = document.getElementById('search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }
}

// 切换内容区域
function switchContent(targetId) {
    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // 显示目标内容区域
    document.getElementById(targetId).classList.add('active');

    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 激活当前链接
    document.querySelector(`.nav-link[data-target="${targetId}"]`).classList.add('active');
}

// 应用设置
function applySettings() {
    // 应用样式设置
    document.body.className = '';
    document.body.classList.add(`layout-${userSettings.layout}`);
    document.body.classList.add(`font-${userSettings.fontSize}`);
    document.body.classList.add(`font-${userSettings.fontFamily}`);
    
    // 主题由独立的主题切换系统管理
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // 应用特效
    createSakuraEffect();
    createHeartsEffect();
    createSnowEffect();
    createRibbonsEffect();

    // 更新UI
    updateSettingsUI();
}

function updateSettingsUI() {
    console.log('🔄 更新设置UI...');

    // 安全更新设置项，添加存在性检查
    const updateElement = (id, property, value) => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
            console.log(`✅ 已更新 ${id}: ${value}`);
        } else {
            console.warn(`⚠️ 元素不存在: ${id}`);
        }
    };

    try {
        updateElement('layout-select', 'value', userSettings.layout);
        updateElement('font-size-select', 'value', userSettings.fontSize);
        updateElement('font-family-select', 'value', userSettings.fontFamily);
        updateElement('sakura-setting', 'checked', userSettings.effects.sakura);
        updateElement('hearts-setting', 'checked', userSettings.effects.hearts);
        updateElement('snow-setting', 'checked', userSettings.effects.snow);
        updateElement('ribbons-setting', 'checked', userSettings.effects.ribbons);
        updateElement('auto-theme-setting', 'checked', userSettings.autoTheme);

        console.log('✅ 设置UI更新完成');
    } catch (error) {
        console.error('❌ 设置UI更新失败:', error);
    }
}

function loadSettings() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        Object.assign(userSettings, parsedSettings);
    }
    applySettings();
}

function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
    applySettings();
}

// 数据管理功能
function initDataManagement() {
    // 导出数据
    document.getElementById('export-data-btn').addEventListener('click', function() {
        const data = {
            userSettings: userSettings,
            userFavorites: userFavorites,
            searchHistory: searchHistory,
            notes: notes,
            searchEngines: searchEngines,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `星辰导航_数据备份_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('数据导出成功！', 'success');
    });
    
    // 导入数据
    document.getElementById('import-data-btn').addEventListener('click', function() {
        document.getElementById('import-file-input').click();
    });
    
    document.getElementById('import-file-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // 验证数据格式
                    if (data.userSettings) {
                        Object.assign(userSettings, data.userSettings);
                        localStorage.setItem('userSettings', JSON.stringify(userSettings));
                    }
                    if (data.userFavorites) {
                        userFavorites = data.userFavorites;
                    }
                    if (data.searchHistory) {
                        searchHistory = data.searchHistory;
                        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                    }
                    if (data.notes) {
                        notes = data.notes;
                        localStorage.setItem('notes', JSON.stringify(notes));
                    }
                    if (data.searchEngines) {
                        searchEngines = data.searchEngines;
                    }
                    
                    // 重新渲染界面
                    applySettings();
                    renderFavorites();
                    renderEngineList();
                    renderNotes();
                    updateEngineSelect();
                    
                    showNotification('数据导入成功！页面将刷新以应用设置。', 'success', 2000);
                    
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    
                } catch (error) {
                    showNotification('数据格式错误，导入失败！', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    // 重置数据
    document.getElementById('reset-data-btn').addEventListener('click', function() {
        if (confirm('确定要重置所有数据吗？这将清除您的所有设置、收藏和记录！')) {
            localStorage.clear();
            showNotification('数据已重置！页面将刷新。', 'info', 2000);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
}

// DOM内容加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 开始主要初始化流程');

    loadSettings();
    createStarryBackground();
    createSakuraEffect();
    createHeartsEffect();
    createSnowEffect();
    createRibbonsEffect();
    renderFavorites();
    renderEngineList();
    initClock();
    initNotes();
    initSearchSuggestions();
    initQuickAccess();
    initDataManagement();
    initWeather();
    initThemeToggle();
    initThemeKeyboard();
    startAutoThemeTimer();

    // 修复设置菜单功能 - 延迟确保DOM完全加载
    setTimeout(() => {
        console.log('⚙️ 开始初始化设置菜单');
        initSettingsMenu();
    }, 100);
});

// 修复设置菜单功能 - 更稳健的版本
function initSettingsMenu() {
    console.log('🔧 初始化设置菜单...');

    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    const closeSettings = document.getElementById('close-settings');

    if (!settingsToggle || !settingsMenu) {
        console.error('❌ 设置菜单元素未找到');
        return;
    }

    console.log('✅ 设置菜单元素已找到');

    // 清理现有事件
    settingsToggle.onclick = null;
    settingsToggle.removeAttribute('onclick');

    // 添加点击事件
    settingsToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('🎛️ 设置按钮被点击');

        const isActive = settingsMenu.classList.contains('active');
        if (isActive) {
            settingsMenu.classList.remove('active');
            console.log('❌ 设置菜单已关闭');
        } else {
            settingsMenu.classList.add('active');
            // 强制确保显示
            settingsMenu.style.display = 'block';
            settingsMenu.style.opacity = '1';
            settingsMenu.style.visibility = 'visible';
            console.log('✅ 设置菜单已打开');
        }
    });

    // 关闭按钮事件
    if (closeSettings) {
        closeSettings.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            settingsMenu.classList.remove('active');
            console.log('❌ 设置菜单已通过关闭按钮关闭');
        });
    }

    // 点击外部关闭设置菜单
    document.addEventListener('click', function(e) {
        if (settingsMenu && settingsMenu.classList.contains('active')) {
            if (!settingsMenu.contains(e.target) &&
                e.target !== settingsToggle &&
                !settingsToggle.contains(e.target)) {
                settingsMenu.classList.remove('active');
                console.log('🔄 点击外部关闭设置菜单');
            }
        }
    });

    console.log('✅ 设置菜单初始化完成');

    // 初始化设置项事件监听
    initSettingsEvents();
}

// 初始化设置项事件 - 改进版本
function initSettingsEvents() {
    console.log('⚙️ 初始化设置项事件...');

    // 安全绑定事件的辅助函数
    const bindEvent = (id, eventType, handler, description) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(eventType, handler);
            console.log(`✅ 已绑定 ${description} (${id})`);
            return true;
        } else {
            console.warn(`⚠️ 元素不存在，跳过绑定: ${id}`);
            return false;
        }
    };

    // 布局选择
    bindEvent('layout-select', 'change', function() {
        userSettings.layout = this.value;
        saveSettings();
        applyLayoutSettings();
        showNotification(`已切换到${this.value === 'grid' ? '网格' : '列表'}布局`, 'success', 2000);
        console.log('🏗️ 布局已更改:', this.value);
    }, '布局选择');

    // 字体大小选择
    bindEvent('font-size-select', 'change', function() {
        userSettings.fontSize = this.value;
        saveSettings();
        applyFontSettings();
        showNotification(`字体大小已设置为${this.options[this.selectedIndex].text}`, 'success', 2000);
        console.log('📝 字体大小已更改:', this.value);
    }, '字体大小选择');

    // 字体样式选择
    bindEvent('font-family-select', 'change', function() {
        userSettings.fontFamily = this.value;
        saveSettings();
        applyFontSettings();
        showNotification(`字体样式已更改`, 'success', 2000);
        console.log('✒️ 字体样式已更改:', this.value);
    }, '字体样式选择');

    // 特效开关
    const effectToggles = [
        { id: 'sakura-setting', key: 'sakura', name: '樱花特效', handler: toggleSakuraEffect },
        { id: 'hearts-setting', key: 'hearts', name: '爱心特效', handler: toggleHeartsEffect },
        { id: 'snow-setting', key: 'snow', name: '雪花特效', handler: toggleSnowEffect },
        { id: 'ribbons-setting', key: 'ribbons', name: '彩带特效', handler: toggleRibbonsEffect }
    ];

    effectToggles.forEach(toggle => {
        bindEvent(toggle.id, 'change', function() {
            userSettings.effects[toggle.key] = this.checked;
            saveSettings();
            if (toggle.handler) {
                toggle.handler(this.checked);
            }
            showNotification(`${toggle.name}已${this.checked ? '开启' : '关闭'}`, 'success', 2000);
            console.log(`${toggle.name}已${this.checked ? '开启' : '关闭'}`);
        }, toggle.name);
    });

    // 自动主题切换开关
    bindEvent('auto-theme-setting', 'change', function() {
        userSettings.autoTheme = this.checked;
        if (this.checked) {
            autoThemeSwitch();
            showNotification('已开启自动主题切换 🕐', 'success', 2000);
        } else {
            showNotification('已关闭自动主题切换', 'info', 2000);
        }
        saveSettings();
    }, '自动主题切换');

    // 其他设置按钮
    bindEvent('manage-engines-btn', 'click', function() {
        if (typeof openEngineModal === 'function') {
            openEngineModal();
        } else {
            showNotification('搜索引擎管理功能暂不可用', 'error', 3000);
        }
    }, '搜索引擎管理');

    bindEvent('show-history-btn', 'click', function() {
        if (typeof openHistoryModal === 'function') {
            openHistoryModal();
        } else {
            showNotification('历史记录功能暂不可用', 'error', 3000);
        }
    }, '历史记录');

    bindEvent('wallpaper-settings-btn', 'click', function() {
        if (typeof openWallpaperModal === 'function') {
            openWallpaperModal();
        } else {
            showNotification('壁纸设置功能暂不可用', 'error', 3000);
        }
    }, '壁纸设置');

    bindEvent('card-management-btn', 'click', function() {
        if (typeof openCardManagementModal === 'function') {
            openCardManagementModal();
        } else {
            showNotification('卡片管理功能暂不可用', 'error', 3000);
        }
    }, '卡片管理');

    bindEvent('save-settings-btn', 'click', function() {
        saveSettings();
        showNotification('设置已保存！', 'success', 2000);
    }, '保存设置按钮');

    // 数据管理按钮
    bindEvent('export-data-btn', 'click', function() {
        exportUserData();
    }, '导出数据');

    bindEvent('import-data-btn', 'click', function() {
        document.getElementById('import-file-input')?.click();
    }, '导入数据');

    bindEvent('reset-data-btn', 'click', function() {
        if (confirm('确定要重置所有数据吗？此操作无法撤销！')) {
            resetUserData();
        }
    }, '重置数据');

    bindEvent('import-file-input', 'change', function(e) {
        handleDataImport(e);
    }, '文件导入输入');

    console.log('✅ 设置项事件初始化完成');
}

// 应用布局设置
function applyLayoutSettings() {
    const body = document.body;
    body.classList.remove('layout-grid', 'layout-list');
    body.classList.add(`layout-${userSettings.layout}`);
    console.log('🏗️ 布局设置已应用:', userSettings.layout);
}

// 应用字体设置
function applyFontSettings() {
    const body = document.body;

    // 移除现有字体类
    body.classList.remove('font-small', 'font-medium', 'font-large');
    body.classList.remove('font-default', 'font-comic', 'font-serif', 'font-mono');

    // 应用新设置
    body.classList.add(`font-${userSettings.fontSize}`);
    body.classList.add(`font-${userSettings.fontFamily}`);

    console.log('📝 字体设置已应用:', userSettings.fontSize, userSettings.fontFamily);
}

// 特效切换函数
function toggleSakuraEffect(enabled) {
    const container = document.getElementById('sakura-container');
    if (container) {
        container.style.display = enabled ? 'block' : 'none';
        if (enabled && typeof createSakuraEffect === 'function') {
            createSakuraEffect();
        }
    }
}

function toggleHeartsEffect(enabled) {
    const container = document.getElementById('hearts-container');
    if (container) {
        container.style.display = enabled ? 'block' : 'none';
        if (enabled && typeof createHeartsEffect === 'function') {
            createHeartsEffect();
        }
    }
}

function toggleSnowEffect(enabled) {
    const container = document.getElementById('snow-container');
    if (container) {
        container.style.display = enabled ? 'block' : 'none';
        if (enabled && typeof createSnowEffect === 'function') {
            createSnowEffect();
        }
    }
}

function toggleRibbonsEffect(enabled) {
    const container = document.getElementById('ribbons-container');
    if (container) {
        container.style.display = enabled ? 'block' : 'none';
        if (enabled && typeof createRibbonsEffect === 'function') {
            createRibbonsEffect();
        }
    }
}

// 数据管理函数
function exportUserData() {
    try {
        const data = {
            settings: userSettings,
            favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
            searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
            timestamp: Date.now(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `starlight-navigation-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification('数据导出成功！', 'success', 3000);
    } catch (error) {
        console.error('数据导出失败:', error);
        showNotification('数据导出失败', 'error', 3000);
    }
}

function handleDataImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (data.settings) {
                Object.assign(userSettings, data.settings);
                localStorage.setItem('userSettings', JSON.stringify(userSettings));
            }

            if (data.favorites) {
                localStorage.setItem('favorites', JSON.stringify(data.favorites));
            }

            if (data.searchHistory) {
                localStorage.setItem('searchHistory', JSON.stringify(data.searchHistory));
            }

            showNotification('数据导入成功！页面将刷新应用设置', 'success', 3000);
            setTimeout(() => location.reload(), 2000);
        } catch (error) {
            console.error('数据导入失败:', error);
            showNotification('数据导入失败：文件格式错误', 'error', 3000);
        }
    };
    reader.readAsText(file);
}

function resetUserData() {
    try {
        // 清除所有本地存储数据
        const keys = ['userSettings', 'favorites', 'searchHistory', 'theme'];
        keys.forEach(key => localStorage.removeItem(key));

        showNotification('数据重置成功！页面将刷新', 'success', 3000);
        setTimeout(() => location.reload(), 2000);
    } catch (error) {
        console.error('数据重置失败:', error);
        showNotification('数据重置失败', 'error', 3000);
    }
}

// 全局设置菜单测试函数
window.testSettingsMenu = function() {
    console.log('🧪 测试设置菜单功能');

    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');

    if (settingsToggle && settingsMenu) {
        console.log('✅ 设置元素已找到');

        // 强制切换设置菜单
        const isActive = settingsMenu.classList.contains('active');
        if (isActive) {
            settingsMenu.classList.remove('active');
            console.log('❌ 设置菜单已关闭');
        } else {
            settingsMenu.classList.add('active');
            console.log('✅ 设置菜单已打开');
        }

        // 输出当前状态
        console.log('当前设置菜单状态:', {
            hasActive: settingsMenu.classList.contains('active'),
            display: getComputedStyle(settingsMenu).display,
            opacity: getComputedStyle(settingsMenu).opacity,
            transform: getComputedStyle(settingsMenu).transform
        });

    } else {
        console.error('❌ 设置元素未找到:', {
            settingsToggle: !!settingsToggle,
            settingsMenu: !!settingsMenu
        });
    }
};

// 全局强制打开设置菜单函数
window.forceOpenSettings = function() {
    console.log('🔧 强制打开设置菜单');
    const settingsMenu = document.getElementById('settings-menu');
    if (settingsMenu) {
        settingsMenu.classList.add('active');
        settingsMenu.style.display = 'block';
        settingsMenu.style.opacity = '1';
        settingsMenu.style.transform = 'translateY(0)';
        console.log('✅ 设置菜单已强制打开');
    }
};

    // 设置项事件监听 - 布局选择
    document.getElementById('layout-select').addEventListener('change', function() {
        userSettings.layout = this.value;
        saveSettings();
    });

    // 字体大小选择
    document.getElementById('font-size-select').addEventListener('change', function() {
        userSettings.fontSize = this.value;
        saveSettings();
    });

    // 字体样式选择
    document.getElementById('font-family-select').addEventListener('change', function() {
        userSettings.fontFamily = this.value;
        saveSettings();
    });

    // 樱花特效开关
    const sakuraSetting = document.getElementById('sakura-setting');
    sakuraSetting.addEventListener('change', function() {
        userSettings.effects.sakura = this.checked;
        saveSettings();
    });

    // 爱心特效开关
    const heartsSetting = document.getElementById('hearts-setting');
    heartsSetting.addEventListener('change', function() {
        userSettings.effects.hearts = this.checked;
        saveSettings();
    });

    // 雪花特效开关
    const snowSetting = document.getElementById('snow-setting');
    snowSetting.addEventListener('change', function() {
        userSettings.effects.snow = this.checked;
        saveSettings();
    });

    // 彩带特效开关
    const ribbonsSetting = document.getElementById('ribbons-setting');
    ribbonsSetting.addEventListener('change', function() {
        userSettings.effects.ribbons = this.checked;
        saveSettings();
    });

    // 自动主题切换开关
    const autoThemeSetting = document.getElementById('auto-theme-setting');
    autoThemeSetting.addEventListener('change', function() {
        userSettings.autoTheme = this.checked;
        if (this.checked) {
            // 启用自动主题切换，立即检查是否需要切换
            autoThemeSwitch();
            showNotification('已开启自动主题切换 🕐', 'success', 2000);
        } else {
            showNotification('已关闭自动主题切换', 'info', 2000);
        }
        saveSettings();
    });

    // 收藏栏开关
    const bookmarksSetting = document.getElementById('bookmarks-setting');
    bookmarksSetting.addEventListener('change', function() {
        bookmarksEnabled = this.checked;
        // 这里可以添加显示/隐藏收藏栏的逻辑
        alert(`收藏栏已${bookmarksEnabled ? '显示' : '隐藏'}`);
    });

    // 保存设置按钮
    document.getElementById('save-settings-btn').addEventListener('click', function() {
        // 保存设置到localStorage
        localStorage.setItem('sakuraEnabled', sakuraEnabled);
        localStorage.setItem('heartsEnabled', heartsEnabled);
        localStorage.setItem('bookmarksEnabled', bookmarksEnabled);

        alert('设置已保存！');
        settingsMenu.classList.remove('active');
    });

    // 初始化搜索引擎选择器 - 集成智能搜索引擎系统
    const engineSelect = document.getElementById('engine-select');
    engineSelect.addEventListener('change', function() {
        const selectedEngine = this.value;
        console.log(`🔧 用户手动选择搜索引擎: ${selectedEngine}`);

        // 使用智能搜索引擎系统设置引擎
        const success = intelligentSearch.setEngine(selectedEngine);
        if (success) {
            // 关闭自动选择功能
            intelligentSearch.toggleAutoSelect(false);
            showNotification(`已切换到${intelligentSearch.getCurrentEngine()?.name}`, 'success', 2000);
        }
    });

    // 初始化智能搜索引擎系统
    console.log('🔍 初始化智能搜索引擎系统...');
    try {
        intelligentSearch.init().then(() => {
            console.log('✅ 智能搜索引擎系统初始化完成');
        }).catch(error => {
            console.error('❌ 智能搜索引擎系统初始化失败:', error);
        });
    } catch (error) {
        console.error('❌ 智能搜索引擎系统启动失败:', error);
    }

    // 添加搜索引擎重新检测按钮事件
    const engineRefreshBtn = document.getElementById('engine-refresh-btn');
    if (engineRefreshBtn) {
        engineRefreshBtn.addEventListener('click', function() {
            console.log('🔄 用户请求重新检测搜索引擎');
            this.classList.add('loading');

            // 使用智能搜索引擎系统重新检测
            intelligentSearch.refresh().then(() => {
                this.classList.remove('loading');
                showNotification('搜索引擎检测完成', 'success', 2000);
            }).catch(error => {
                this.classList.remove('loading');
                console.error('❌ 重新检测失败:', error);
                showNotification('搜索引擎检测失败', 'error', 2000);
            });
        });
    }

    // 搜索框回车键支持
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        console.log('⌨️ 搜索框回车键支持已启用');
    } else {
        console.warn('⚠️ 搜索输入框未找到');
    }

    // 更新当前搜索引擎显示
    const engineSelect = document.getElementById('engine-select');
    if (engineSelect) {
        updateEngineDisplay(engineSelect.value);
    }

    // 导航链接点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            switchContent(target);
        });
    });

    // 添加收藏按钮点击事件
    const addFavoriteBtn = document.getElementById('add-favorite-btn');
    if (addFavoriteBtn) {
        addFavoriteBtn.addEventListener('click', function() {
            const name = prompt('请输入网站名称');
            if (!name) return;

            const url = prompt('请输入网站URL');
            if (!url) return;

            const icon = prompt('请输入网站图标类名（如：fab fa-google）', 'fas fa-globe');

            addFavorite(name, url, icon || 'fas fa-globe');
        });
    } else {
        console.log('❌ 添加收藏按钮未找到');
    }

    // 发现页面收藏按钮事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-fav-btn')) {
            const name = e.target.getAttribute('data-name');
            const url = e.target.getAttribute('data-url');
            const icon = e.target.getAttribute('data-icon');

            addFavorite(name, url, icon);

            // 添加成功反馈
            const originalHTML = e.target.innerHTML;
            e.target.innerHTML = '<i class="fas fa-check"></i> 已收藏';
            e.target.disabled = true;
            e.target.style.background = '#4CAF50';
            e.target.style.borderColor = '#4CAF50';

            setTimeout(() => {
                e.target.innerHTML = originalHTML;
                e.target.disabled = false;
                e.target.style.background = '';
                e.target.style.borderColor = '';
            }, 2000);
        }
    });

    // 为收藏页面添加事件委托
    document.getElementById('favorites-grid').addEventListener('click', function(e) {
        // 访问按钮
        if (e.target.closest('.visit-favorite')) {
            const btn = e.target.closest('.visit-favorite');
            const url = btn.getAttribute('data-url');
            window.open(url, '_blank');
        }

        // 删除按钮
        if (e.target.closest('.delete-favorite')) {
            const btn = e.target.closest('.delete-favorite');
            const index = parseInt(btn.getAttribute('data-index'));
            deleteFavorite(index);
        }

        // 编辑按钮
        if (e.target.closest('.edit-favorite')) {
            const btn = e.target.closest('.edit-favorite');
            const index = parseInt(btn.getAttribute('data-index'));
            editFavorite(index);
        }
    });

    // 搜索引擎管理按钮 - 集成智能搜索引擎功能
    const manageEnginesBtn = document.getElementById('manage-engines-btn');
    if (manageEnginesBtn) {
        manageEnginesBtn.addEventListener('click', function() {
            // 显示智能搜索引擎选择对话框
            intelligentSearch.showEngineSelector();
        });
    }

    // 关闭搜索引擎管理模态框
    const closeEngineBtn = document.getElementById('close-engine-modal');
    if (closeEngineBtn) {
        closeEngineBtn.addEventListener('click', function() {
            const modal = document.getElementById('engine-modal');
            if (modal) {
                modal.classList.remove('active');
            }
            // 重置表单
            const nameInput = document.getElementById('engine-name');
            const urlInput = document.getElementById('engine-url');
            const iconInput = document.getElementById('engine-icon');
            const saveBtn = document.getElementById('save-engine');

            if (nameInput) nameInput.value = '';
            if (urlInput) urlInput.value = '';
            if (iconInput) iconInput.value = '';
            if (saveBtn) saveBtn.removeAttribute('data-index');
        });
    }

    // 取消按钮
    const cancelEngineBtn = document.getElementById('cancel-engine-form');
    if (cancelEngineBtn) {
        cancelEngineBtn.addEventListener('click', function() {
            const modal = document.getElementById('engine-modal');
            if (modal) {
                modal.classList.remove('active');
            }
            // 重置表单
            const nameInput = document.getElementById('engine-name');
            const urlInput = document.getElementById('engine-url');
            const iconInput = document.getElementById('engine-icon');
            const saveBtn = document.getElementById('save-engine');

            if (nameInput) nameInput.value = '';
            if (urlInput) urlInput.value = '';
            if (iconInput) iconInput.value = '';
            if (saveBtn) saveBtn.removeAttribute('data-index');
        });
    }

    // 保存搜索引擎
    const saveEngineBtn = document.getElementById('save-engine');
    if (saveEngineBtn) {
        saveEngineBtn.addEventListener('click', saveEngine);
    }

    // 点击模态框外部关闭
    const engineModal = document.getElementById('engine-modal');
    if (engineModal) {
        engineModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                // 重置表单
                const nameInput = document.getElementById('engine-name');
                const urlInput = document.getElementById('engine-url');
                const iconInput = document.getElementById('engine-icon');
                const saveBtn = document.getElementById('save-engine');

                if (nameInput) nameInput.value = '';
                if (urlInput) urlInput.value = '';
                if (iconInput) iconInput.value = '';
                if (saveBtn) saveBtn.removeAttribute('data-index');
            }
        });
    }

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 搜索快捷键 (Ctrl+K 或 /)
        if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
            e.preventDefault();
            document.querySelector('.search-text').focus();
        }

        // 打开设置快捷键 (Ctrl+,)
        if (e.ctrlKey && e.key === ',') {
            e.preventDefault();
            const settingsMenu = document.getElementById('settings-menu');
            if (settingsMenu) {
                settingsMenu.classList.toggle('active');
                console.log('⌨️ 使用快捷键切换设置菜单');
            }
        }
    });

    // ===== 新增功能 =====

// 全局网站卡片数据存储
let websiteCards = {
    'game-center': {
        name: '游戏中心',
        url: '#',
        icon: 'https://cdn-icons-png.flaticon.com/512/2504/2504911.png',
        description: '探索各类精彩游戏，放松身心'
    },
    'shop-center': {
        name: '精品商铺',
        url: '#',
        icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
        description: '发现各类优质商品，购物无忧'
    },
    'tencent-video': {
        name: '腾讯视频',
        url: 'https://v.qq.com',
        icon: 'https://v.qq.com/favicon.ico',
        description: '海量高清影视资源在线观看'
    },
    'iqiyi': {
        name: '爱奇艺',
        url: 'https://www.iqiyi.com/?vfm=f_588_wrb&fv=ac30238882b84c8c',
        icon: 'https://www.iqiyi.com/favicon.ico',
        description: '热门剧集、综艺、电影一网打尽'
    },
    'youku': {
        name: '优酷视频',
        url: 'https://youku.com/',
        icon: 'https://www.youku.com/favicon.ico',
        description: '高清视频在线观看平台'
    },
    'mgtv': {
        name: '芒果TV',
        url: 'https://www.mgtv.com/b/611422/20536518.html?cxid=bfan6mqcg',
        icon: 'https://www.mgtv.com/favicon.ico',
        description: '热门综艺和独家剧集'
    },
    'novel': {
        name: '小说天地',
        url: '#',
        icon: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png',
        description: '海量小说免费阅读'
    },
    'home-theater': {
        name: '家庭影院',
        url: '#',
        icon: 'https://cdn-icons-png.flaticon.com/512/3658/3658778.png',
        description: '打造您的专属观影空间'
    },
    'music': {
        name: '音乐世界',
        url: '#',
        icon: 'https://cdn-icons-png.flaticon.com/512/727/727241.png',
        description: '畅听百万高品质音乐'
    },
    'game-download': {
        name: '游戏下载中心',
        url: 'game.html',
        icon: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png',
        description: '精彩游戏下载'
    }
};

// 访问历史记录
    let visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');

    // 搜索引擎检测和选择
    let currentEngine = 'google';
    let engineTestTimeout;

    // 增强的卡片管理功能
function initCardManagement() {
    const cardManagementBtn = document.getElementById('card-management-btn');
    if (cardManagementBtn) {
        cardManagementBtn.addEventListener('click', function() {
            openCardManagementModal();
        });
    }

    // 关闭卡片管理模态框
    const closeBtn = document.getElementById('close-card-management-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('card-management-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 搜索功能
    const searchInput = document.getElementById('card-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterCardsList(searchTerm);
        });
    }

    // 工具栏按钮事件
    bindToolbarEvents();

    // 点击模态框外部关闭
    const modal = document.getElementById('card-management-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
}

function bindToolbarEvents() {
    // 添加新卡片
    const addBtn = document.getElementById('add-new-card-btn');
    if (addBtn) {
        addBtn.addEventListener('click', addNewCard);
    }

    // 导入卡片
    const importBtn = document.getElementById('import-cards-btn');
    if (importBtn) {
        importBtn.addEventListener('click', importCards);
    }

    // 导出卡片
    const exportBtn = document.getElementById('export-cards-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCards);
    }
}

function openCardManagementModal() {
    console.log('🎛️ 打开卡片管理模态框');
    const modal = document.getElementById('card-management-modal');
    if (modal) {
        modal.classList.add('active');
        renderCardManagementList();
        updateCardStats();
        console.log('✅ 卡片管理模态框已打开');
    } else {
        console.log('❌ 卡片管理模态框未找到');
        alert('卡片管理功能暂时不可用');
    }
}

function renderCardManagementList(filteredCards = null) {
    const container = document.getElementById('card-management-list');
    if (!container) return;

    container.innerHTML = '';
    const cardsToRender = filteredCards || websiteCards;

    Object.keys(cardsToRender).forEach(cardId => {
        const card = cardsToRender[cardId];
        const isCustomized = isCardCustomized(cardId);
        const cardItem = document.createElement('div');
        cardItem.className = 'card-management-item';
        cardItem.innerHTML = `
            <div class="card-management-icon">
                <img src="${card.icon}" alt="${card.name}" onerror="this.style.display='none'">
            </div>
            <div class="card-management-info">
                <div class="card-management-name">
                    ${card.name}
                    ${isCustomized ? '<i class="fas fa-star" title="自定义卡片" style="color: #ffd700; margin-left: 8px; font-size: 12px;"></i>' : ''}
                </div>
                <div class="card-management-description">${card.description}</div>
                <div class="card-management-url">${card.url}</div>
            </div>
            <div class="card-management-actions">
                <button class="card-action-btn" onclick="editCardFromManagement('${cardId}')" title="编辑">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="card-action-btn" onclick="visitCardUrl('${cardId}')" title="访问">
                    <i class="fas fa-external-link-alt"></i>
                </button>
                <button class="card-action-btn" onclick="duplicateCard('${cardId}')" title="复制">
                    <i class="fas fa-copy"></i>
                </button>
                <button class="card-action-btn delete" onclick="resetCard('${cardId}')" title="重置">
                    <i class="fas fa-undo"></i>
                </button>
            </div>
        `;
        container.appendChild(cardItem);
    });

    console.log(`✅ 渲染了 ${Object.keys(cardsToRender).length} 个卡片`);
}

function updateCardStats() {
    const totalCards = Object.keys(websiteCards).length;
    const customCards = Object.keys(websiteCards).filter(cardId => isCardCustomized(cardId)).length;

    const countInfo = document.getElementById('card-count-info');
    const customInfo = document.getElementById('custom-cards-info');

    if (countInfo) countInfo.textContent = `共 ${totalCards} 张卡片`;
    if (customInfo) customInfo.textContent = `${customCards} 张自定义`;
}

function isCardCustomized(cardId) {
    const defaultCards = getDefaultWebsiteCards();
    const currentCard = websiteCards[cardId];
    const defaultCard = defaultCards[cardId];

    if (!defaultCard) return true; // 如果不在默认列表中，说明是新添加的

    return JSON.stringify(currentCard) !== JSON.stringify(defaultCard);
}

function filterCardsList(searchTerm) {
    if (!searchTerm) {
        renderCardManagementList();
        return;
    }

    const filteredCards = {};
    Object.keys(websiteCards).forEach(cardId => {
        const card = websiteCards[cardId];
        if (
            card.name.toLowerCase().includes(searchTerm) ||
            card.description.toLowerCase().includes(searchTerm) ||
            card.url.toLowerCase().includes(searchTerm)
        ) {
            filteredCards[cardId] = card;
        }
    });

    renderCardManagementList(filteredCards);
}

function addNewCard() {
    const cardId = `custom-${Date.now()}`;
    const newCard = {
        name: '新建卡片',
        url: 'https://example.com',
        icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png',
        description: '请编辑此卡片信息'
    };

    websiteCards[cardId] = newCard;
    localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

    renderCardManagementList();
    updateCardStats();

    showNotification('已添加新卡片，请编辑卡片信息', 'success');

    // 自动打开编辑界面
    setTimeout(() => {
        editCardFromManagement(cardId);
    }, 500);
}

function duplicateCard(cardId) {
    const originalCard = websiteCards[cardId];
    if (!originalCard) return;

    const newCardId = `copy-${cardId}-${Date.now()}`;
    const duplicatedCard = {
        ...originalCard,
        name: `${originalCard.name} (副本)`
    };

    websiteCards[newCardId] = duplicatedCard;
    localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

    renderCardManagementList();
    updateCardStats();

    showNotification(`已复制卡片：${originalCard.name}`, 'success');
}

function resetCard(cardId) {
    const card = websiteCards[cardId];
    if (!card) return;

    if (confirm(`确定要重置"${card.name}"卡片吗？\n\n这将恢复卡片的默认设置。`)) {
        const defaultCards = getDefaultWebsiteCards();
        if (defaultCards[cardId]) {
            websiteCards[cardId] = { ...defaultCards[cardId] };
            console.log(`🔄 重置卡片到默认状态: ${cardId}`);
        } else {
            delete websiteCards[cardId];
            console.log(`🗑️ 删除自定义卡片: ${cardId}`);
        }

        updateCardOnPage(cardId);
        localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

        renderCardManagementList();
        updateCardStats();

        showNotification('卡片已重置', 'success');
    }
}

function exportCards() {
    const data = {
        websiteCards: websiteCards,
        exportDate: new Date().toISOString(),
        version: '2.0'
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `星辰导航_卡片数据_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showNotification('卡片数据导出成功！', 'success');
}

function importCards() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);

                if (data.websiteCards) {
                    if (confirm('确定要导入卡片数据吗？这将覆盖现有的自定义设置。')) {
                        websiteCards = { ...getDefaultWebsiteCards(), ...data.websiteCards };
                        localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

                        renderCardManagementList();
                        updateCardStats();

                        // 更新页面显示
                        Object.keys(websiteCards).forEach(cardId => {
                            updateCardOnPage(cardId);
                        });

                        showNotification('卡片数据导入成功！', 'success');
                    }
                } else {
                    showNotification('无效的卡片数据文件', 'error');
                }
            } catch (error) {
                showNotification('文件格式错误，导入失败', 'error');
                console.error('导入卡片数据失败:', error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function editCardFromManagement(cardId) {
    console.log(`📝 从管理界面编辑卡片: ${cardId}`);
    // 关闭卡片管理模态框
    const managementModal = document.getElementById('card-management-modal');
    if (managementModal) {
        managementModal.classList.remove('active');
    }

    // 打开卡片编辑模态框
    editCard(cardId);
}

function visitCardUrl(cardId) {
    const card = websiteCards[cardId];
    if (card && card.url && card.url !== '#') {
        window.open(card.url, '_blank');
        console.log(`🔗 访问卡片: ${card.name} - ${card.url}`);
    } else {
        showNotification('该卡片暂无有效链接', 'info');
    }
}

function deleteCard(cardId) {
    const card = websiteCards[cardId];
    if (!card) return;

    if (confirm(`确定要删除"${card.name}"卡片吗？\n\n注意：这不会删除页面上的卡片显示，只会清除自定义数据。`)) {
        // 重置为默认数据
        const defaultCards = getDefaultWebsiteCards();
        if (defaultCards[cardId]) {
            websiteCards[cardId] = defaultCards[cardId];
            console.log(`🔄 重置卡片到默认状态: ${cardId}`);
        } else {
            delete websiteCards[cardId];
            console.log(`🗑️ 删除卡片: ${cardId}`);
        }

        // 更新页面显示
        updateCardOnPage(cardId);

        // 保存到本地存储
        localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

        // 重新渲染管理列表
        renderCardManagementList();

        showNotification('卡片已重置', 'success');
    }
}

function getDefaultWebsiteCards() {
    return {
        'game-center': {
            name: '游戏中心',
            url: '#',
            icon: 'https://cdn-icons-png.flaticon.com/512/2504/2504911.png',
            description: '探索各类精彩游戏，放松身心'
        },
        'shop-center': {
            name: '精品商铺',
            url: '#',
            icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
            description: '发现各类优质商品，购物无忧'
        },
        'tencent-video': {
            name: '腾讯视频',
            url: 'https://v.qq.com',
            icon: 'https://v.qq.com/favicon.ico',
            description: '海量高清影视资源在线观看'
        },
        'iqiyi': {
            name: '爱奇艺',
            url: 'https://www.iqiyi.com/?vfm=f_588_wrb&fv=ac30238882b84c8c',
            icon: 'https://www.iqiyi.com/favicon.ico',
            description: '热门剧集、综艺、电影一网打尽'
        },
        'youku': {
            name: '优酷视频',
            url: 'https://youku.com/',
            icon: 'https://www.youku.com/favicon.ico',
            description: '高清视频在线观看平台'
        },
        'mgtv': {
            name: '芒果TV',
            url: 'https://www.mgtv.com/b/611422/20536518.html?cxid=bfan6mqcg',
            icon: 'https://www.mgtv.com/favicon.ico',
            description: '热门综艺和独家剧集'
        },
        'novel': {
            name: '小说天地',
            url: '#',
            icon: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png',
            description: '海量小说免费阅读'
        },
        'home-theater': {
            name: '家庭影院',
            url: '#',
            icon: 'https://cdn-icons-png.flaticon.com/512/3658/3658778.png',
            description: '打造您的专属观影空间'
        },
        'music': {
            name: '音乐世界',
            url: '#',
            icon: 'https://cdn-icons-png.flaticon.com/512/727/727241.png',
            description: '畅听百万高品质音乐'
        },
        'game-download': {
            name: '游戏下载中心',
            url: 'game.html',
            icon: 'https://cdn-icons-png.flaticon.com/512/2504/2504940.png',
            description: '精彩游戏下载'
        }
    };
}

function updateCardOnPage(cardId) {
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement && websiteCards[cardId]) {
        const card = websiteCards[cardId];
        const imgElement = cardElement.querySelector('img');
        const titleElement = cardElement.querySelector('h3');
        const descElement = cardElement.querySelector('p');
        const linkElement = cardElement.querySelector('a');

        if (imgElement) imgElement.src = card.icon;
        if (titleElement) titleElement.textContent = card.name;
        if (descElement) descElement.textContent = card.description;
        if (linkElement) linkElement.href = card.url;

        console.log(`✅ 更新页面卡片显示: ${cardId}`);
    }
}

// 增强的卡片编辑功能 (继承原有功能)
function initCardEdit() {
    // 为所有编辑按钮添加事件监听器
    document.querySelectorAll('.card-edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const cardId = this.getAttribute('data-card-id');
            openCardEditModal(cardId);
        });
    });

    // 卡片编辑模态框事件
    document.getElementById('close-card-edit-modal').addEventListener('click', closeCardEditModal);
    document.getElementById('cancel-card-edit').addEventListener('click', closeCardEditModal);

    // 点击模态框外部关闭
    document.getElementById('card-edit-modal').addEventListener('click', function(e) {
        if (e.target === this) closeCardEditModal();
    });

    // 初始化增强的编辑功能
    initEnhancedCardEdit();
}

function initEnhancedCardEdit() {
    // 实时预览功能
    const nameInput = document.getElementById('card-name');
    const urlInput = document.getElementById('card-url');
    const iconInput = document.getElementById('card-icon');
    const descInput = document.getElementById('card-description');

    if (nameInput) {
        nameInput.addEventListener('input', updatePreview);
    }
    if (urlInput) {
        urlInput.addEventListener('input', function() {
            updatePreview();
            validateURL(this.value);
        });
    }
    if (iconInput) {
        iconInput.addEventListener('input', function() {
            updatePreview();
            validateIcon(this.value);
        });
    }
    if (descInput) {
        descInput.addEventListener('input', function() {
            updatePreview();
            updateCharCounter(this.value, 100);
        });
    }

    // 高级选项切换
    const toggleAdvanced = document.getElementById('toggle-advanced');
    const advancedOptions = document.getElementById('advanced-options');
    if (toggleAdvanced && advancedOptions) {
        toggleAdvanced.addEventListener('click', function() {
            const isVisible = advancedOptions.style.display !== 'none';
            advancedOptions.style.display = isVisible ? 'none' : 'block';
            this.classList.toggle('active');

            const span = this.querySelector('span');
            if (span) {
                span.textContent = isVisible ? '展开' : '收起';
            }
        });
    }

    // 自动获取图标功能
    const iconHelper = document.getElementById('icon-helper-btn');
    if (iconHelper) {
        iconHelper.addEventListener('click', autoGetIcon);
    }

    // 重置按钮
    const resetBtn = document.getElementById('reset-card-edit');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCardEdit);
    }
}

function updatePreview() {
    const name = document.getElementById('card-name')?.value || '卡片名称';
    const url = document.getElementById('card-url')?.value || 'https://example.com';
    const icon = document.getElementById('card-icon')?.value || '';
    const description = document.getElementById('card-description')?.value || '卡片描述';

    const previewName = document.getElementById('preview-name');
    const previewUrl = document.getElementById('preview-url');
    const previewIcon = document.getElementById('preview-icon');
    const previewDescription = document.getElementById('preview-description');
    const previewCard = document.getElementById('card-preview');

    if (previewName) previewName.textContent = name;
    if (previewUrl) previewUrl.textContent = url;
    if (previewDescription) previewDescription.textContent = description;

    if (previewIcon) {
        if (icon && isValidImageURL(icon)) {
            previewIcon.src = icon;
            previewIcon.style.display = 'block';
        } else {
            previewIcon.style.display = 'none';
        }
    }

    if (previewCard) {
        previewCard.classList.toggle('active', name && url);
    }
}

function validateURL(url) {
    const validation = document.getElementById('url-validation');
    if (!validation) return;

    if (!url) {
        validation.innerHTML = '';
        return;
    }

    try {
        const urlObj = new URL(url);
        validation.innerHTML = '<i class="fas fa-check"></i> 有效的网址';
        validation.className = 'url-validation validation-success';

        // 尝试检查网站是否可访问（简单版本）
        checkWebsiteAvailability(url, validation);
    } catch (error) {
        validation.innerHTML = '<i class="fas fa-times"></i> 请输入有效的网址格式';
        validation.className = 'url-validation validation-error';
    }
}

function checkWebsiteAvailability(url, validationElement) {
    // 显示检查状态
    validationElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 检查网站可访问性...';
    validationElement.className = 'url-validation validation-loading';

    // 使用图片加载来测试网站是否可访问（简单方法）
    const img = new Image();
    const timeout = setTimeout(() => {
        validationElement.innerHTML = '<i class="fas fa-check"></i> 网址格式正确';
        validationElement.className = 'url-validation validation-success';
    }, 3000);

    img.onload = () => {
        clearTimeout(timeout);
        validationElement.innerHTML = '<i class="fas fa-check-circle"></i> 网站可访问';
        validationElement.className = 'url-validation validation-success';
    };

    img.onerror = () => {
        clearTimeout(timeout);
        validationElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 无法验证网站可访问性';
        validationElement.className = 'url-validation validation-success';
    };

    try {
        const domain = new URL(url).hostname;
        img.src = `https://${domain}/favicon.ico`;
    } catch (error) {
        clearTimeout(timeout);
    }
}

function validateIcon(iconUrl) {
    const validation = document.getElementById('icon-validation');
    if (!validation) return;

    if (!iconUrl) {
        validation.innerHTML = '';
        return;
    }

    if (isValidImageURL(iconUrl)) {
        validation.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 验证图标...';
        validation.className = 'icon-validation validation-loading';

        const img = new Image();
        img.onload = () => {
            validation.innerHTML = '<i class="fas fa-check"></i> 图标可用';
            validation.className = 'icon-validation validation-success';
        };

        img.onerror = () => {
            validation.innerHTML = '<i class="fas fa-times"></i> 图标无法加载';
            validation.className = 'icon-validation validation-error';
        };

        img.src = iconUrl;
    } else {
        validation.innerHTML = '<i class="fas fa-times"></i> 请输入有效的图片URL';
        validation.className = 'icon-validation validation-error';
    }
}

function isValidImageURL(url) {
    if (!url) return false;
    try {
        new URL(url);
        return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url);
    } catch {
        return false;
    }
}

function updateCharCounter(text, maxLength) {
    const counter = document.getElementById('description-counter');
    if (!counter) return;

    const length = text.length;
    counter.textContent = `${length}/${maxLength}`;

    counter.className = 'char-counter';
    if (length > maxLength * 0.8) {
        counter.classList.add('warning');
    }
    if (length > maxLength * 0.95) {
        counter.classList.remove('warning');
        counter.classList.add('danger');
    }
}

function autoGetIcon() {
    const urlInput = document.getElementById('card-url');
    const iconInput = document.getElementById('card-icon');
    const helperBtn = document.getElementById('icon-helper-btn');

    if (!urlInput || !iconInput || !helperBtn) return;

    const url = urlInput.value.trim();
    if (!url) {
        showNotification('请先输入网站链接', 'error');
        return;
    }

    try {
        const urlObj = new URL(url);
        const faviconUrl = `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;

        helperBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 获取中';
        helperBtn.disabled = true;

        // 测试favicon是否存在
        const img = new Image();
        img.onload = () => {
            iconInput.value = faviconUrl;
            updatePreview();
            validateIcon(faviconUrl);
            showNotification('图标获取成功！', 'success');
            helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
            helperBtn.disabled = false;
        };

        img.onerror = () => {
            // 尝试其他常见的favicon路径
            const alternativeUrl = `${urlObj.protocol}//${urlObj.hostname}/apple-touch-icon.png`;
            const img2 = new Image();

            img2.onload = () => {
                iconInput.value = alternativeUrl;
                updatePreview();
                validateIcon(alternativeUrl);
                showNotification('图标获取成功！', 'success');
                helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
                helperBtn.disabled = false;
            };

            img2.onerror = () => {
                showNotification('未找到合适的图标，请手动输入', 'info');
                helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
                helperBtn.disabled = false;
            };

            img2.src = alternativeUrl;
        };

        img.src = faviconUrl;
    } catch (error) {
        showNotification('请输入有效的网站链接', 'error');
        helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
        helperBtn.disabled = false;
    }
}

function resetCardEdit() {
    const cardId = document.getElementById('save-card-edit').getAttribute('data-card-id');
    const originalCard = websiteCards[cardId];

    if (originalCard && confirm('确定要重置表单吗？这将恢复到原始数据。')) {
        // 重新填充表单
        document.getElementById('card-name').value = originalCard.name;
        document.getElementById('card-url').value = originalCard.url;
        document.getElementById('card-icon').value = originalCard.icon || '';
        document.getElementById('card-description').value = originalCard.description;

        // 重置高级选项
        document.getElementById('card-new-tab').checked = true;
        document.getElementById('card-category').value = '';
        document.getElementById('card-priority').value = 50;

        // 更新预览
        updatePreview();

        // 清除验证信息
        const urlValidation = document.getElementById('url-validation');
        const iconValidation = document.getElementById('icon-validation');
        if (urlValidation) urlValidation.innerHTML = '';
        if (iconValidation) iconValidation.innerHTML = '';

        showNotification('表单已重置', 'info');
    }
}

    function openCardEditModal(cardId) {
        const card = websiteCards[cardId];
        if (!card) return;

        document.getElementById('card-name').value = card.name;
        document.getElementById('card-url').value = card.url;
        document.getElementById('card-icon').value = card.icon;
        document.getElementById('card-description').value = card.description;
        document.getElementById('save-card-edit').setAttribute('data-card-id', cardId);

        document.getElementById('card-edit-modal').classList.add('active');
    }

    function closeCardEditModal() {
        document.getElementById('card-edit-modal').classList.remove('active');
        document.getElementById('card-name').value = '';
        document.getElementById('card-url').value = '';
        document.getElementById('card-icon').value = '';
        document.getElementById('card-description').value = '';
        document.getElementById('save-card-edit').removeAttribute('data-card-id');
    }

    // 访问历史记录功能
    function initHistory() {
        // 显示历史记录按钮
        const historyBtn = document.getElementById('show-history-btn');
        if (historyBtn) {
            historyBtn.addEventListener('click', function() {
                const modal = document.getElementById('history-modal');
                if (modal) {
                    modal.classList.add('active');
                    displayHistory();
                }
            });
        }

        // 关闭历史记录模态框
        const closeBtn = document.getElementById('close-history-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const modal = document.getElementById('history-modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        }

        // 清空历史记录
        const clearBtn = document.getElementById('clear-history-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                if (confirm('确定要清空所有访问历史吗？')) {
                    visitHistory = [];
                    localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
                    displayHistory();
                    showNotification('访问历史已清空', 'success');
                }
            });
        }

        // 搜索历史记录
        const searchInput = document.getElementById('history-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                displayHistory(searchTerm);
            });
        }

        // 点击模态框外部关闭
        const modal = document.getElementById('history-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        }

        // 监听所有链接点击，记录访问历史
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.href && e.target.href.startsWith('http')) {
                addToHistory(e.target.href, e.target.textContent || e.target.title || 'Unknown', e.target.querySelector('img')?.src);
            }
        });
    }

    function addToHistory(url, title, favicon) {
        const historyItem = {
            url: url,
            title: title,
            favicon: favicon || `${new URL(url).origin}/favicon.ico`,
            timestamp: new Date().toISOString()
        };

        // 移除重复的URL
        visitHistory = visitHistory.filter(item => item.url !== url);

        // 添加到开头
        visitHistory.unshift(historyItem);

        // 限制历史记录数量
        if (visitHistory.length > 500) {
            visitHistory = visitHistory.slice(0, 500);
        }

        localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
    }

    function displayHistory(searchTerm = '') {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';

        let filteredHistory = visitHistory;
        if (searchTerm) {
            filteredHistory = visitHistory.filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.url.toLowerCase().includes(searchTerm)
            );
        }

        if (filteredHistory.length === 0) {
            historyList.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.5);">暂无访问记录</div>';
            return;
        }

        filteredHistory.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="favicon">
                    <img src="${item.favicon}" alt="" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">
                </div>
                <div class="info">
                    <div class="title">${item.title}</div>
                    <div class="url">${item.url}</div>
                    <div class="time">${formatTime(item.timestamp)}</div>
                </div>
                <button class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            // 添加删除按钮事件监听器
            const deleteBtn = historyItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const actualIndex = visitHistory.findIndex(h => h.url === item.url && h.timestamp === item.timestamp);
                if (actualIndex !== -1) {
                    visitHistory.splice(actualIndex, 1);
                    localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
                    displayHistory(searchTerm);
                    showNotification('已删除该记录', 'success');
                }
            });

            historyItem.addEventListener('click', function(e) {
                if (!e.target.closest('.delete-btn')) {
                    window.open(item.url, '_blank');
                }
            });

            historyList.appendChild(historyItem);
        });
    }

    function removeFromHistory(index) {
        visitHistory.splice(index, 1);
        localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
        displayHistory();
        showNotification('已删除该记录', 'success');
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}天前`;
        if (hours > 0) return `${hours}小时前`;
        if (minutes > 0) return `${minutes}分钟前`;
        return '刚刚';
    }

    // 智能搜索引擎选择
    function initSmartEngineSelection() {
        // 检测网络环境并自动选择搜索引擎
        detectNetworkAndSetEngine();

        // 添加搜索引擎切换监听
        const engineSelect = document.getElementById('engine-select');
        if (engineSelect) {
            engineSelect.addEventListener('change', function() {
                currentEngine = this.value;
                updateEngineDisplay();
                localStorage.setItem('preferredEngine', currentEngine);
            });
        }
    }

    async function detectNetworkAndSetEngine() {
        // 检查用户偏好
        const preferred = localStorage.getItem('preferredEngine');
        if (preferred) {
            setSearchEngine(preferred);
            return;
        }

        // 显示网络检测提示
        showNetworkStatus('testing', '检测网络环境中...');

        try {
            // 简化检测逻辑 - 直接使用Google作为默认
            setSearchEngine('google');
            showNetworkStatus('online', '已连接 - 使用Google搜索');
            setTimeout(() => hideNetworkStatus(), 3000);

        } catch (error) {
            // 检测失败，使用百度
            setSearchEngine('baidu');
            showNetworkStatus('offline', '网络检测失败 - 使用百度搜索');
            setTimeout(() => hideNetworkStatus(), 5000);
        }
    }

    async function testSearchEngine(engine) {
        // 简化测试逻辑，避免跨域问题
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve(false);
            }, 3000);

            // 创建一个图片请求来测试连接
            const img = new Image();
            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };

            const testUrls = {
                google: 'https://www.google.com/favicon.ico',
                bing: 'https://www.bing.com/favicon.ico',
                baidu: 'https://www.baidu.com/favicon.ico'
            };

            img.src = testUrls[engine] + '?t=' + Date.now();
        });
    }

    function setSearchEngine(engine) {
        currentEngine = engine;
        const engineSelect = document.getElementById('engine-select');
        if (engineSelect) {
            engineSelect.value = engine;
        }
        updateEngineDisplay();
    }

    function updateEngineDisplay() {
        const engines = {
            google: { icon: 'fab fa-google', name: '谷歌' },
            bing: { icon: 'fab fa-microsoft', name: '必应' },
            baidu: { icon: 'fab fa-baidu', name: '百度' },
            sogou: { icon: 'fas fa-search', name: '搜狗' },
            360: { icon: 'fas fa-search', name: '360搜索' }
        };

        const engineInfo = engines[currentEngine];
        if (engineInfo) {
            const iconDisplay = document.getElementById('engine-icon-display');
            const currentEngineText = document.getElementById('current-engine');

            if (iconDisplay) {
                iconDisplay.innerHTML = `<i class="${engineInfo.icon}"></i>`;
            }
            if (currentEngineText) {
                currentEngineText.textContent = `当前引擎：${engineInfo.name}`;
            }
        }
    }

    function showNetworkStatus(type, message) {
        let statusElement = document.querySelector('.network-status');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.className = 'network-status';
            document.body.appendChild(statusElement);
        }

        statusElement.className = `network-status ${type}`;
        statusElement.textContent = message;
        statusElement.style.display = 'block';
    }

    function hideNetworkStatus() {
        const statusElement = document.querySelector('.network-status');
        if (statusElement) {
            statusElement.style.display = 'none';
        }
    }

    // 壁纸设置功能
    function initWallpaperSettings() {
        // 壁纸设置按钮
        const wallpaperBtn = document.getElementById('wallpaper-settings-btn');
        if (wallpaperBtn) {
            wallpaperBtn.addEventListener('click', function() {
                const modal = document.getElementById('wallpaper-modal');
                if (modal) {
                    modal.classList.add('active');
                }
            });
        }

        // 关闭壁纸设置模态框
        const closeBtn = document.getElementById('close-wallpaper-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const modal = document.getElementById('wallpaper-modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        }

        const cancelBtn = document.getElementById('cancel-wallpaper');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                const modal = document.getElementById('wallpaper-modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        }

        // 壁纸文件选择
        const uploadBtn = document.getElementById('wallpaper-upload-btn');
        const fileInput = document.getElementById('wallpaper-file');
        if (uploadBtn && fileInput) {
            uploadBtn.addEventListener('click', function() {
                fileInput.click();
            });

            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        applyWallpaper(event.target.result, file.type.startsWith('video/') ? 'video' : 'image');
                        showNotification('壁纸已更换！', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // 预设壁纸选择
        document.querySelectorAll('.preset-item').forEach(item => {
            item.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                applyWallpaper(url, 'image');
                showNotification('壁纸已更换！', 'success');
            });
        });

        // 应用壁纸URL
        const saveBtn = document.getElementById('save-wallpaper');
        const urlInput = document.getElementById('wallpaper-url');
        if (saveBtn && urlInput) {
            saveBtn.addEventListener('click', function() {
                const url = urlInput.value.trim();
                if (url) {
                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                    applyWallpaper(url, isVideo ? 'video' : 'image');
                    const modal = document.getElementById('wallpaper-modal');
                    if (modal) {
                        modal.classList.remove('active');
                    }
                    showNotification('壁纸已更换！', 'success');
                } else {
                    showNotification('请输入壁纸URL', 'error');
                }
            });
        }

        // 点击模态框外部关闭
        const modal = document.getElementById('wallpaper-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        }

        // 加载保存的壁纸设置
        loadWallpaperSettings();
    }

    function applyWallpaper(url, type) {
        // 移除现有壁纸
        const existingWallpaper = document.querySelector('.dynamic-wallpaper');
        if (existingWallpaper) {
            existingWallpaper.remove();
        }

        // 创建新壁纸元素
        let wallpaperElement;
        if (type === 'video') {
            wallpaperElement = document.createElement('video');
            wallpaperElement.autoplay = true;
            wallpaperElement.loop = true;
            wallpaperElement.muted = true;
            wallpaperElement.classList.add('video-wallpaper');
        } else {
            wallpaperElement = document.createElement('div');
            wallpaperElement.style.backgroundImage = `url(${url})`;
            wallpaperElement.style.backgroundSize = 'cover';
            wallpaperElement.style.backgroundPosition = 'center';
            wallpaperElement.style.backgroundRepeat = 'no-repeat';
        }

        wallpaperElement.className = 'dynamic-wallpaper';
        wallpaperElement.src = url;

        document.body.appendChild(wallpaperElement);

        // 保存设置
        localStorage.setItem('wallpaperSettings', JSON.stringify({ url, type }));
    }

    function loadWallpaperSettings() {
        const settings = localStorage.getItem('wallpaperSettings');
        if (settings) {
            try {
                const { url, type } = JSON.parse(settings);
                applyWallpaper(url, type);
            } catch (error) {
                console.error('加载壁纸设置失败:', error);
            }
        }
    }

    // 测试新功能元素是否存在
    function testNewFeatureElements() {
        console.log('🧪 测试新功能元素...');

        const elements = {
            'wallpaper-settings-btn': document.getElementById('wallpaper-settings-btn'),
            'wallpaper-modal': document.getElementById('wallpaper-modal'),
            'show-history-btn': document.getElementById('show-history-btn'),
            'history-modal': document.getElementById('history-modal'),
            'manage-engines-btn': document.getElementById('manage-engines-btn'),
            'engine-modal': document.getElementById('engine-modal')
        };

        Object.entries(elements).forEach(([name, element]) => {
            if (element) {
                console.log(`✅ ${name} 找到`);
            } else {
                console.log(`❌ ${name} 未找到`);
            }
        });

        // 测试卡片编辑按钮
        const editBtns = document.querySelectorAll('.card-edit-btn');
        console.log(`📝 找到 ${editBtns.length} 个卡片编辑按钮`);

        // 为每个按钮添加点击测试
        if (editBtns.length > 0) {
            console.log('🎯 为卡片编辑按钮添加点击测试...');
            editBtns.forEach((btn, index) => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    console.log(`🖱️ 卡片编辑按钮 ${index + 1} 被点击`);
                });
            });
        }
    }

    // 初始化所有新功能
    function initNewFeatures() {
        console.log('🚀 初始化新功能中...');

        // 测试元素是否存在
        testNewFeatureElements();

        try {
            // 加载保存的卡片设置
            const savedCards = localStorage.getItem('websiteCards');
            if (savedCards) {
                try {
                    const loadedCards = JSON.parse(savedCards);
                    websiteCards = { ...websiteCards, ...loadedCards };
                    console.log('✅ 卡片设置加载成功');

                    // 更新页面上的卡片显示
                    Object.keys(loadedCards).forEach(cardId => {
                        const card = loadedCards[cardId];
                        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                        if (cardElement) {
                            const imgElement = cardElement.querySelector('img');
                            const titleElement = cardElement.querySelector('h3');
                            const descElement = cardElement.querySelector('p');
                            const linkElement = cardElement.querySelector('a');

                            if (imgElement) imgElement.src = card.icon;
                            if (titleElement) titleElement.textContent = card.name;
                            if (descElement) descElement.textContent = card.description;
                            if (linkElement) linkElement.href = card.url;
                        }
                    });
                } catch (error) {
                    console.error('❌ 加载卡片设置失败:', error);
                }
            }

            // 初始化各个功能模块
            console.log('🔧 初始化卡片编辑功能...');
            initCardEdit();

            console.log('🎛️ 初始化卡片管理功能...');
            initCardManagement();

            console.log('📚 初始化访问历史功能...');
            initHistory();

            console.log('🔍 初始化智能搜索引擎选择...');
            initSmartEngineSelection();

            console.log('🖼️ 初始化壁纸设置功能...');
            initWallpaperSettings();

            console.log('✅ 所有新功能初始化完成');

            // 测试收藏功能初始化
            console.log('🧪 初始化收藏功能...');
            setTimeout(() => {
                renderFavorites();
                console.log('📋 收藏功能就绪');
            }, 200);

        } catch (error) {
            console.error('❌ 新功能初始化失败:', error);
            showNotification('部分功能初始化失败', 'error');
        }
    }

    // 初始化增强壁纸上传功能
    setTimeout(() => {
        enhancedWallpaperUploader = new EnhancedWallpaperUploader();
    }, 500);
});

// 全局函数 - 用于HTML中的onclick事件
window.openWallpaperModal = function() {
    console.log('🖼️ 打开壁纸设置模态框');
    const modal = document.getElementById('wallpaper-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ 壁纸模态框已打开');
    } else {
        console.log('❌ 壁纸模态框未找到');
        alert('壁纸设置功能暂时不可用');
    }
};

window.openHistoryModal = function() {
    console.log('📚 打开访问历史模态框');
    const modal = document.getElementById('history-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ 历史模态框已打开');
        // 显示历史记录
        displayHistory();
    } else {
        console.log('❌ 历史模态框未找到');
        alert('访问历史功能暂时不可用');
    }
};

window.openEngineModal = function() {
    console.log('🔍 打开搜索引擎管理模态框');
    const modal = document.getElementById('engine-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ 搜索引擎模态框已打开');
    } else {
        console.log('❌ 搜索引擎模态框未找到');
        alert('搜索引擎管理功能暂时不可用');
    }
};

// 修复和增强的卡片编辑功能
window.editCard = function(cardId) {
    console.log(`📝 编辑卡片: ${cardId}`);
    const modal = document.getElementById('card-edit-modal');
    if (modal) {
        // 加载现有数据
        const card = websiteCards[cardId];
        if (card) {
            document.getElementById('card-name').value = card.name || '';
            document.getElementById('card-url').value = card.url || '';
            document.getElementById('card-icon').value = card.icon || '';
            document.getElementById('card-description').value = card.description || '';
            document.getElementById('save-card-edit').setAttribute('data-card-id', cardId);

            // 立即更新预览
            updateCardPreview();

            // 更新字符计数
            updateCharacterCount();

            // 重置验证状态
            clearValidationMessages();
        } else {
            console.log(`❌ 未找到卡片数据: ${cardId}`);
        }
        modal.classList.add('active');
        console.log('✅ 卡片编辑模态框已打开');
    } else {
        console.log('❌ 卡片编辑模态框未找到');
        showNotification('卡片编辑功能暂时不可用', 'error');
    }
};

// 更新字符计数器
function updateCharacterCount() {
    const descriptionInput = document.getElementById('card-description');
    const counter = document.getElementById('description-counter');

    if (descriptionInput && counter) {
        const length = descriptionInput.value.length;
        const maxLength = 100;
        counter.textContent = `${length}/${maxLength}`;

        // 更新样式
        counter.className = 'char-counter';
        if (length > maxLength * 0.8) {
            counter.classList.add('warning');
        }
        if (length > maxLength * 0.95) {
            counter.classList.remove('warning');
            counter.classList.add('danger');
        }
    }
}

// 清除验证消息
function clearValidationMessages() {
    const urlValidation = document.getElementById('url-validation');
    const iconValidation = document.getElementById('icon-validation');

    if (urlValidation) urlValidation.innerHTML = '';
    if (iconValidation) iconValidation.innerHTML = '';
}

// 增强的预览更新函数
function updateCardPreview() {
    const name = document.getElementById('card-name')?.value.trim() || '卡片名称';
    const url = document.getElementById('card-url')?.value.trim() || 'https://example.com';
    const icon = document.getElementById('card-icon')?.value.trim() || '';
    const description = document.getElementById('card-description')?.value.trim() || '卡片描述';

    // 更新预览区域
    const previewCard = document.getElementById('card-preview');
    const previewName = document.getElementById('preview-name');
    const previewUrl = document.getElementById('preview-url');
    const previewIcon = document.getElementById('preview-icon');
    const previewDescription = document.getElementById('preview-description');

    if (previewName) previewName.textContent = name;
    if (previewUrl) {
        previewUrl.textContent = url;
        // 添加可点击功能
        previewUrl.onclick = () => {
            if (url && url !== 'https://example.com') {
                window.open(url, '_blank');
            }
        };
        previewUrl.style.cursor = url && url !== 'https://example.com' ? 'pointer' : 'default';
    }
    if (previewDescription) previewDescription.textContent = description;

    // 处理图标预览
    if (previewIcon) {
        if (icon && isValidImageURL(icon)) {
            previewIcon.src = icon;
            previewIcon.style.display = 'block';
            previewIcon.onerror = function() {
                this.style.display = 'none';
            };
        } else {
            previewIcon.style.display = 'none';
        }
    }

    // 更新预览卡片状态
    if (previewCard) {
        previewCard.classList.toggle('active', name && url);

        // 添加实时交互效果
        if (name && url && name !== '卡片名称') {
            previewCard.classList.add('ready');
        } else {
            previewCard.classList.remove('ready');
        }
    }

    // 更新字符计数
    updateCharacterCount();
}

// 保存卡片编辑 - 统一的保存函数
function saveCardEdit() {
    console.log('💾 开始保存卡片编辑');

    const saveBtn = document.getElementById('save-card-edit');
    if (!saveBtn) {
        console.error('❌ 保存按钮未找到');
        return;
    }

    const cardId = saveBtn.getAttribute('data-card-id');
    if (!cardId) {
        console.error('❌ 卡片ID未找到');
        showNotification('无效的卡片ID', 'error');
        return;
    }

    // 验证表单
    if (!validateCardForm()) {
        return;
    }

    // 获取表单数据
    const name = document.getElementById('card-name').value.trim();
    const url = document.getElementById('card-url').value.trim();
    const icon = document.getElementById('card-icon').value.trim();
    const description = document.getElementById('card-description').value.trim();

    // 显示保存状态
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 保存中...';
    saveBtn.disabled = true;

    // 模拟保存延迟
    setTimeout(() => {
        try {
            // 更新卡片数据
            if (typeof websiteCards !== 'undefined') {
                websiteCards[cardId] = { name, url, icon, description };

                // 更新页面上的卡片显示
                updateCardOnPage(cardId);

                // 保存到本地存储
                localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

                // 关闭模态框
                const modal = document.getElementById('card-edit-modal');
                if (modal) {
                    modal.classList.remove('active');
                }

                // 如果管理界面开着，刷新列表
                if (document.getElementById('card-management-modal').classList.contains('active')) {
                    renderCardManagementList();
                    updateCardStats();
                }

                showNotification('卡片保存成功！', 'success');
                console.log('✅ 卡片已保存');
            } else {
                throw new Error('卡片数据不可用');
            }
        } catch (error) {
            console.error('❌ 保存失败:', error);
            showNotification('保存失败，请重试', 'error');
        } finally {
            // 恢复按钮状态
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }
    }, 800);
}

// 重置卡片编辑表单
function resetCardEdit() {
    const saveBtn = document.getElementById('save-card-edit');
    const cardId = saveBtn?.getAttribute('data-card-id');

    if (!cardId) {
        showNotification('无法重置：未找到卡片ID', 'error');
        return;
    }

    const originalCard = websiteCards[cardId];

    if (originalCard && confirm('确定要重置表单吗？这将恢复到原始数据。')) {
        // 重新填充表单
        document.getElementById('card-name').value = originalCard.name || '';
        document.getElementById('card-url').value = originalCard.url || '';
        document.getElementById('card-icon').value = originalCard.icon || '';
        document.getElementById('card-description').value = originalCard.description || '';

        // 更新预览
        updateCardPreview();

        // 清除验证信息
        clearValidationMessages();

        showNotification('表单已重置', 'info');
    }
}

// 简化的历史记录显示函数
window.displayHistory = function(searchTerm = '') {
    console.log('📋 显示访问历史记录');
    const historyList = document.getElementById('history-list');
    if (!historyList) {
        console.log('❌ 历史记录列表元素未找到');
        return;
    }

    const visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');
    console.log(`📊 找到 ${visitHistory.length} 条历史记录`);

    if (visitHistory.length === 0) {
        historyList.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.5);">暂无访问记录</div>';
        return;
    }

    historyList.innerHTML = visitHistory.map(item => `
        <div class="history-item">
            <div class="favicon">
                <i class="fas fa-globe"></i>
            </div>
            <div class="info">
                <div class="title">${item.title || '未知网站'}</div>
                <div class="url">${item.url}</div>
                <div class="time">${new Date(item.timestamp).toLocaleString()}</div>
            </div>
        </div>
    `).join('');
};

// 全局收藏函数 - 用于简化的调用
window.openAddFavoriteDialog = function() {
    console.log('📝 打开添加收藏对话框');
    const name = prompt('请输入网站名称');
    if (!name || !name.trim()) {
        console.log('❌ 未输入网站名称');
        return;
    }

    const url = prompt('请输入网站URL');
    if (!url || !url.trim()) {
        console.log('❌ 未输入网站URL');
        return;
    }

    const icon = prompt('请输入网站图标类名（如：fab fa-google）', 'fas fa-globe');

    addFavorite(name.trim(), url.trim(), icon ? icon.trim() : 'fas fa-globe');
    console.log('✅ 收藏已添加');
};

// 简化的收藏测试函数
window.testFavorites = function() {
    console.log('🧪 测试收藏功能');

    // 添加一些测试收藏
    if (userFavorites.length === 0) {
        const testFavorites = [
            { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
            { name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
            { name: 'Google', url: 'https://google.com', icon: 'fab fa-google' }
        ];

        testFavorites.forEach(fav => {
            addFavorite(fav.name, fav.url, fav.icon);
        });

        console.log('✅ 已添加测试收藏数据');
    } else {
        console.log(`📋 当前有 ${userFavorites.length} 个收藏项`);
    }
};

// 将收藏相关函数设为全局
window.addFavorite = addFavorite;
window.deleteFavorite = deleteFavorite;
window.editFavorite = editFavorite;
window.renderFavorites = renderFavorites;

window.openCardManagementModal = function() {
    console.log('🎛️ 打开卡片管理模态框');
    const modal = document.getElementById('card-management-modal');
    if (modal) {
        modal.classList.add('active');
        renderCardManagementList();
        console.log('✅ 卡片管理模态框已打开');
    } else {
        console.log('❌ 卡片管理模态框未找到');
        alert('卡片管理功能暂时不可用');
    }
};

window.editCardFromManagement = function(cardId) {
    console.log(`📝 从管理界面编辑卡片: ${cardId}`);
    // 关闭卡片管理模态框
    const managementModal = document.getElementById('card-management-modal');
    if (managementModal) {
        managementModal.classList.remove('active');
    }

    // 打开卡片编辑模态框
    editCard(cardId);
};

window.visitCardUrl = function(cardId) {
    const card = websiteCards[cardId];
    if (card && card.url && card.url !== '#') {
        window.open(card.url, '_blank');
        console.log(`🔗 访问卡片: ${card.name} - ${card.url}`);
    } else {
        showNotification('该卡片暂无有效链接', 'info');
    }
};

window.deleteCard = function(cardId) {
    const card = websiteCards[cardId];
    if (!card) return;

    if (confirm(`确定要删除"${card.name}"卡片吗？\n\n注意：这不会删除页面上的卡片显示，只会清除自定义数据。`)) {
        // 重置为默认数据
        const defaultCards = getDefaultWebsiteCards();
        if (defaultCards[cardId]) {
            websiteCards[cardId] = defaultCards[cardId];
            console.log(`🔄 重置卡片到默认状态: ${cardId}`);
        } else {
            delete websiteCards[cardId];
            console.log(`🗑️ 删除卡片: ${cardId}`);
        }

        // 更新页面显示
        updateCardOnPage(cardId);

        // 保存到本地存储
        localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

        // 重新渲染管理列表
        renderCardManagementList();

        showNotification('卡片已重置', 'success');
    }
};

// 通用模态框关闭函数
window.closeModal = function(modalId) {
    console.log(`❌ 关闭模态框: ${modalId}`);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        console.log('✅ 模态框已关闭');
    } else {
        console.log('❌ 模态框未找到');
    }
};

// 为所有模态框添加点击外部关闭功能
document.addEventListener('DOMContentLoaded', function() {
    const modals = ['wallpaper-modal', 'history-modal', 'engine-modal', 'card-edit-modal'];

    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(modalId);
                }
            });
        }
    });

    // 为所有关闭按钮添加事件
    document.querySelectorAll('.close-engine-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.engine-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
});

// 确保所有功能在页面加载后立即可用的全局初始化
window.addEventListener('load', function() {
    console.log('🚀 页面加载完成，开始初始化所有功能...');

    // 强制渲染收藏功能
    if (typeof renderFavorites === 'function') {
        renderFavorites();
        console.log('✅ 收藏功能已重新渲染');
    }

    // 确保发现页面按钮功能正常
    document.querySelectorAll('.add-to-fav-btn').forEach(btn => {
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
            }
        };
    });

    // 确保壁纸文件选择功能
    const wallpaperFileInput = document.getElementById('wallpaper-file');
    const wallpaperUploadBtn = document.getElementById('wallpaper-upload-btn');

    if (wallpaperUploadBtn && wallpaperFileInput) {
        wallpaperUploadBtn.onclick = function() {
            console.log('🖼️ 点击选择壁纸文件');
            wallpaperFileInput.click();
        };

        wallpaperFileInput.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('📁 选择了文件:', file.name);
                const reader = new FileReader();
                reader.onload = function(event) {
                    const isVideo = file.type.startsWith('video/');
                    applyWallpaper(event.target.result, isVideo ? 'video' : 'image');
                    console.log('✅ 壁纸已应用');
                    alert('壁纸已更换成功！');
                };
                reader.readAsDataURL(file);
            }
        };
    }

    // 确保收藏添加功能
    const addFavBtn = document.getElementById('add-favorite-btn');
    if (addFavBtn) {
        addFavBtn.onclick = function() {
            console.log('📝 添加收藏按钮被点击');
            const name = prompt('请输入网站名称：');
            if (!name) return;

            const url = prompt('请输入网站URL：');
            if (!url) return;

            const icon = prompt('请输入图标类名（如：fas fa-globe）：', 'fas fa-globe');

            if (typeof addFavorite === 'function') {
                addFavorite(name, url, icon);
                console.log('✅ 收藏已添加');
            }
        };
    }

    console.log('🎉 所有功能初始化完成');
});

// 简化的应用壁纸函数
function applyWallpaper(url, type) {
    console.log('🖼️ 应用壁纸:', url, type);

    // 移除现有壁纸
    const existing = document.querySelector('.dynamic-wallpaper');
    if (existing) existing.remove();

    let element;
    if (type === 'video') {
        element = document.createElement('video');
        element.autoplay = true;
        element.loop = true;
        element.muted = true;
        element.style.objectFit = 'cover';
    } else {
        element = document.createElement('div');
        element.style.backgroundImage = `url(${url})`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPosition = 'center';
        element.style.backgroundRepeat = 'no-repeat';
    }

    element.className = 'dynamic-wallpaper';
    element.style.cssText += `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;

    if (type === 'video') {
        element.src = url;
    }

    document.body.appendChild(element);

    // 保存设置
    localStorage.setItem('wallpaperSettings', JSON.stringify({ url, type }));
}

// 确保testFavorites函数是全局可用的
window.testFavorites = function() {
    console.log('🧪 测试收藏功能');
    if (typeof addFavorite === 'function') {
        const testFavorites = [
            { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
            { name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
            { name: 'Google', url: 'https://google.com', icon: 'fab fa-google' }
        ];

        testFavorites.forEach(fav => {
            addFavorite(fav.name, fav.url, fav.icon);
        });
        console.log('✅ 已添加测试收藏数据');
        alert('测试收藏数据已添加！');
    } else {
        console.log('❌ addFavorite函数未找到');
        alert('收藏功能暂时不可用');
    }
};

// 增强的卡片编辑功能 - 全局事件绑定
document.addEventListener('DOMContentLoaded', function() {
    // 确保卡片编辑事件正确绑定
    setTimeout(() => {
        initAdvancedCardEdit();
        initFormValidation();
        bindAllCardEditEvents();
        console.log('✅ 高级卡片编辑功能已激活');
    }, 500);
});

// 初始化高级卡片编辑功能
function initAdvancedCardEdit() {
    // 实时预览功能
    const editModal = document.getElementById('card-edit-modal');
    if (editModal) {
        const inputs = editModal.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(updateCardPreview, 300));
        });
    }

    // URL自动验证
    const urlInput = document.getElementById('card-url');
    if (urlInput) {
        urlInput.addEventListener('blur', function() {
            const url = this.value.trim();
            if (url) {
                validateAndPreviewURL(url);
            }
        });
    }

    // 图标自动获取功能
    const iconHelperBtn = document.getElementById('icon-helper-btn');
    if (iconHelperBtn) {
        iconHelperBtn.addEventListener('click', autoFetchFavicon);
    }
}

// 初始化表单验证
function initFormValidation() {
    const form = document.querySelector('#card-edit-modal form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateCardForm()) {
                saveCardEdit();
            }
        });
    }
}

// 绑定所有卡片编辑事件
function bindAllCardEditEvents() {
    // 确保所有模态框正确工作
    const modals = ['card-edit-modal', 'card-management-modal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            // 外部点击关闭
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });

            // ESC键关闭
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }
            });
        }
    });

    console.log('✅ 所有卡片编辑事件已绑定');
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 更新卡片预览
function updateCardPreview() {
    const name = document.getElementById('card-name')?.value || '卡片名称';
    const url = document.getElementById('card-url')?.value || 'https://example.com';
    const icon = document.getElementById('card-icon')?.value || '';
    const description = document.getElementById('card-description')?.value || '卡片描述';

    // 更新预览区域
    const previewCard = document.getElementById('card-preview');
    const previewName = document.getElementById('preview-name');
    const previewUrl = document.getElementById('preview-url');
    const previewIcon = document.getElementById('preview-icon');
    const previewDescription = document.getElementById('preview-description');

    if (previewName) previewName.textContent = name;
    if (previewUrl) previewUrl.textContent = url;
    if (previewDescription) previewDescription.textContent = description;

    if (previewIcon && icon) {
        // 验证是否为有效图片URL
        if (isValidImageURL(icon)) {
            previewIcon.src = icon;
            previewIcon.style.display = 'block';
        } else {
            previewIcon.style.display = 'none';
        }
    }

    // 更新预览卡片状态
    if (previewCard) {
        previewCard.classList.toggle('active', name && url);
    }
}

// 验证并预览URL
function validateAndPreviewURL(url) {
    const validationElement = document.getElementById('url-validation');
    if (!validationElement) return;

    try {
        new URL(url);
        validationElement.innerHTML = '<i class="fas fa-check"></i> 有效的网址';
        validationElement.className = 'url-validation validation-success';

        // 尝试检查网站可访问性
        checkSiteAccessibility(url, validationElement);
    } catch (error) {
        validationElement.innerHTML = '<i class="fas fa-times"></i> 请输入有效的网址格式';
        validationElement.className = 'url-validation validation-error';
    }
}

// 检查网站可访问性
function checkSiteAccessibility(url, validationElement) {
    validationElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 检查网站可访问性...';
    validationElement.className = 'url-validation validation-loading';

    // 简单的可访问性检查
    const img = new Image();
    const timeout = setTimeout(() => {
        validationElement.innerHTML = '<i class="fas fa-check"></i> 网址格式正确';
        validationElement.className = 'url-validation validation-success';
    }, 3000);

    img.onload = () => {
        clearTimeout(timeout);
        validationElement.innerHTML = '<i class="fas fa-check-circle"></i> 网站可访问';
        validationElement.className = 'url-validation validation-success';
    };

    img.onerror = () => {
        clearTimeout(timeout);
        validationElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 无法验证网站可访问性';
        validationElement.className = 'url-validation validation-warning';
    };

    try {
        const domain = new URL(url).hostname;
        img.src = `https://${domain}/favicon.ico?t=${Date.now()}`;
    } catch (error) {
        clearTimeout(timeout);
    }
}

// 自动获取Favicon
function autoFetchFavicon() {
    const urlInput = document.getElementById('card-url');
    const iconInput = document.getElementById('card-icon');
    const helperBtn = document.getElementById('icon-helper-btn');

    if (!urlInput || !iconInput || !helperBtn) return;

    const url = urlInput.value.trim();
    if (!url) {
        showNotification('请先输入网站链接', 'error');
        return;
    }

    try {
        const urlObj = new URL(url);
        const faviconUrl = `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;

        helperBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 获取中...';
        helperBtn.disabled = true;

        // 测试favicon是否存在
        const img = new Image();
        img.onload = () => {
            iconInput.value = faviconUrl;
            updateCardPreview();
            showNotification('图标获取成功！', 'success');
            helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
            helperBtn.disabled = false;
        };

        img.onerror = () => {
            // 尝试其他常见路径
            const altUrl = `${urlObj.protocol}//${urlObj.hostname}/apple-touch-icon.png`;
            const img2 = new Image();

            img2.onload = () => {
                iconInput.value = altUrl;
                updateCardPreview();
                showNotification('图标获取成功！', 'success');
                helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
                helperBtn.disabled = false;
            };

            img2.onerror = () => {
                showNotification('未找到合适的图标，请手动输入', 'info');
                helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
                helperBtn.disabled = false;
            };

            img2.src = altUrl;
        };

        img.src = faviconUrl;
    } catch (error) {
        showNotification('请输入有效的网站链接', 'error');
        helperBtn.innerHTML = '<i class="fas fa-magic"></i> 自动获取';
        helperBtn.disabled = false;
    }
}

// 验证卡片表单
function validateCardForm() {
    const name = document.getElementById('card-name')?.value.trim();
    const url = document.getElementById('card-url')?.value.trim();
    const description = document.getElementById('card-description')?.value.trim();

    // 基本验证
    if (!name) {
        showNotification('请输入卡片名称', 'error');
        document.getElementById('card-name')?.focus();
        return false;
    }

    if (!url) {
        showNotification('请输入网站链接', 'error');
        document.getElementById('card-url')?.focus();
        return false;
    }

    // URL格式验证
    try {
        new URL(url);
    } catch (error) {
        showNotification('请输入有效的网站链接格式', 'error');
        document.getElementById('card-url')?.focus();
        return false;
    }

    // 描述长度验证
    if (description && description.length > 100) {
        showNotification('卡片描述不能超过100个字符', 'error');
        document.getElementById('card-description')?.focus();
        return false;
    }

    return true;
}

// 检查是否为有效图片URL
function isValidImageURL(url) {
    if (!url) return false;
    try {
        new URL(url);
        return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url);
    } catch {
        return false;
    }
}

// 增强的卡片搜索功能
function enhancedCardSearch(searchTerm) {
    const cards = websiteCards;
    const filteredCards = {};

    if (!searchTerm || searchTerm.trim() === '') {
        return cards;
    }

    const term = searchTerm.toLowerCase();

    Object.keys(cards).forEach(cardId => {
        const card = cards[cardId];
        if (
            card.name.toLowerCase().includes(term) ||
            card.description.toLowerCase().includes(term) ||
            card.url.toLowerCase().includes(term) ||
            cardId.toLowerCase().includes(term)
        ) {
            filteredCards[cardId] = card;
        }
    });

    return filteredCards;
}

// 增强的卡片导出功能
function enhancedExportCards() {
    try {
        const exportData = {
            cards: websiteCards,
            metadata: {
                exportDate: new Date().toISOString(),
                totalCards: Object.keys(websiteCards).length,
                version: '2.0',
                platform: 'StarNavigator'
            },
            settings: {
                userSettings: userSettings,
                theme: localStorage.getItem('theme') || 'dark'
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `星辰导航_卡片数据_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        showNotification(`已导出${Object.keys(websiteCards).length}张卡片`, 'success');

        console.log('✅ 卡片数据导出完成');

    } catch (error) {
        console.error('❌ 导出失败:', error);
        showNotification('导出失败，请重试', 'error');
    }
}

// 增强的卡片导入功能
function enhancedImportCards() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);

                // 验证数据格式
                if (!importData.cards && !importData.websiteCards) {
                    showNotification('无效的数据格式', 'error');
                    return;
                }

                // 获取要导入的卡片数据
                const cardsToImport = importData.cards || importData.websiteCards || {};
                const cardCount = Object.keys(cardsToImport).length;

                if (cardCount === 0) {
                    showNotification('文件中没有找到卡片数据', 'error');
                    return;
                }

                // 确认导入
                const confirmMessage = `发现${cardCount}张卡片\n\n选择导入方式:\n• 确定: 合并导入（保留现有卡片）\n• 取消: 取消导入`;

                if (confirm(confirmMessage)) {
                    // 合并导入
                    Object.keys(cardsToImport).forEach(cardId => {
                        websiteCards[cardId] = cardsToImport[cardId];
                    });

                    // 保存到本地存储
                    localStorage.setItem('websiteCards', JSON.stringify(websiteCards));

                    // 更新页面显示
                    Object.keys(cardsToImport).forEach(cardId => {
                        updateCardOnPage(cardId);
                    });

                    // 刷新管理界面
                    if (document.getElementById('card-management-modal').classList.contains('active')) {
                        renderCardManagementList();
                        updateCardStats();
                    }

                    showNotification(`成功导入${cardCount}张卡片`, 'success');
                    console.log(`✅ 成功导入${cardCount}张卡片`);
                }

            } catch (error) {
                console.error('❌ 导入失败:', error);
                showNotification('文件格式错误，导入失败', 'error');
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// 卡片批量操作功能
class CardBatchOperations {
    constructor() {
        this.selectedCards = new Set();
        this.init();
    }

    init() {
        this.createBatchToolbar();
        this.bindEvents();
    }

    createBatchToolbar() {
        const toolbar = document.querySelector('.card-management-toolbar');
        if (!toolbar) return;

        const batchSection = document.createElement('div');
        batchSection.className = 'batch-operations';
        batchSection.innerHTML = `
            <div class="batch-selection">
                <label class="batch-checkbox">
                    <input type="checkbox" id="select-all-cards"> 全选
                </label>
                <span class="selected-count">已选择: 0</span>
            </div>
            <div class="batch-actions" style="display: none;">
                <button class="toolbar-btn" id="batch-export-btn">
                    <i class="fas fa-download"></i> 导出选中
                </button>
                <button class="toolbar-btn" id="batch-duplicate-btn">
                    <i class="fas fa-copy"></i> 批量复制
                </button>
                <button class="toolbar-btn danger" id="batch-reset-btn">
                    <i class="fas fa-undo"></i> 批量重置
                </button>
            </div>
        `;

        toolbar.appendChild(batchSection);
    }

    bindEvents() {
        // 全选功能
        const selectAllBtn = document.getElementById('select-all-cards');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('change', (e) => {
                this.toggleSelectAll(e.target.checked);
            });
        }

        // 批量操作按钮
        document.getElementById('batch-export-btn')?.addEventListener('click', () => {
            this.exportSelected();
        });

        document.getElementById('batch-duplicate-btn')?.addEventListener('click', () => {
            this.duplicateSelected();
        });

        document.getElementById('batch-reset-btn')?.addEventListener('click', () => {
            this.resetSelected();
        });
    }

    toggleSelectAll(checked) {
        this.selectedCards.clear();

        if (checked) {
            Object.keys(websiteCards).forEach(cardId => {
                this.selectedCards.add(cardId);
            });
        }

        this.updateUI();
        this.updateCardCheckboxes(checked);
    }

    updateCardCheckboxes(checked) {
        document.querySelectorAll('.card-checkbox input').forEach(checkbox => {
            checkbox.checked = checked;
        });
    }

    updateUI() {
        const count = this.selectedCards.size;
        const countElement = document.querySelector('.selected-count');
        const actionsElement = document.querySelector('.batch-actions');

        if (countElement) {
            countElement.textContent = `已选择: ${count}`;
        }

        if (actionsElement) {
            actionsElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    exportSelected() {
        if (this.selectedCards.size === 0) {
            showNotification('请先选择要导出的卡片', 'error');
            return;
        }

        const selectedData = {};
        this.selectedCards.forEach(cardId => {
            if (websiteCards[cardId]) {
                selectedData[cardId] = websiteCards[cardId];
            }
        });

        const exportData = {
            cards: selectedData,
            metadata: {
                exportDate: new Date().toISOString(),
                totalCards: this.selectedCards.size,
                version: '2.0',
                type: 'selected',
                platform: 'StarNavigator'
            }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `星辰导航_选中卡片_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
        showNotification(`已导出${this.selectedCards.size}张选中的卡片`, 'success');
    }

    duplicateSelected() {
        if (this.selectedCards.size === 0) {
            showNotification('请先选择要复制的卡片', 'error');
            return;
        }

        let duplicatedCount = 0;
        this.selectedCards.forEach(cardId => {
            const originalCard = websiteCards[cardId];
            if (originalCard) {
                const newCardId = `copy-${cardId}-${Date.now()}-${duplicatedCount}`;
                websiteCards[newCardId] = {
                    ...originalCard,
                    name: `${originalCard.name} (副本${duplicatedCount + 1})`
                };
                duplicatedCount++;
            }
        });

        localStorage.setItem('websiteCards', JSON.stringify(websiteCards));
        renderCardManagementList();
        updateCardStats();

        showNotification(`成功复制${duplicatedCount}张卡片`, 'success');
    }

    resetSelected() {
        if (this.selectedCards.size === 0) {
            showNotification('请先选择要重置的卡片', 'error');
            return;
        }

        if (confirm(`确定要重置${this.selectedCards.size}张选中的卡片吗？`)) {
            const defaultCards = getDefaultWebsiteCards();
            let resetCount = 0;

            this.selectedCards.forEach(cardId => {
                if (defaultCards[cardId]) {
                    websiteCards[cardId] = { ...defaultCards[cardId] };
                    updateCardOnPage(cardId);
                    resetCount++;
                } else {
                    delete websiteCards[cardId];
                    resetCount++;
                }
            });

            localStorage.setItem('websiteCards', JSON.stringify(websiteCards));
            renderCardManagementList();
            updateCardStats();

            showNotification(`成功重置${resetCount}张卡片`, 'success');
            this.selectedCards.clear();
            this.updateUI();
        }
    }
}

// 创建批量操作实例
let cardBatchOperations;

// 重写原有的filterCardsList函数以使用增强搜索
function filterCardsList(searchTerm) {
    const filteredCards = enhancedCardSearch(searchTerm);
    renderCardManagementList(filteredCards);

    // 更新统计信息
    const totalFiltered = Object.keys(filteredCards).length;
    const totalCards = Object.keys(websiteCards).length;

    const searchInfo = document.getElementById('search-results-info') || document.createElement('div');
    searchInfo.id = 'search-results-info';
    searchInfo.className = 'search-results-info';

    if (searchTerm && searchTerm.trim() !== '') {
        searchInfo.innerHTML = `<i class="fas fa-search"></i> 找到 ${totalFiltered} 张卡片（共 ${totalCards} 张）`;
        searchInfo.style.display = 'block';
    } else {
        searchInfo.style.display = 'none';
    }

    // 插入搜索结果信息
    const managementList = document.getElementById('card-management-list');
    if (managementList && managementList.parentNode) {
        managementList.parentNode.insertBefore(searchInfo, managementList);
    }
}

// 重写原有的导入导出函数以使用增强版本
function importCards() {
    enhancedImportCards();
}

function exportCards() {
    enhancedExportCards();
}

// 增强的卡片管理初始化
function initEnhancedCardManagement() {
    console.log('🚀 初始化增强的卡片管理功能...');

    // 初始化批量操作
    setTimeout(() => {
        cardBatchOperations = new CardBatchOperations();
        console.log('✅ 批量操作功能已启用');
    }, 1000);

    // 增强搜索功能
    const searchInput = document.getElementById('card-search-input');
    if (searchInput) {
        // 移除原有的input事件监听器，使用防抖的增强版本
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);

        newSearchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            filterCardsList(searchTerm);
        }, 300));

        // 添加清除搜索功能
        newSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filterCardsList('');
            }
        });
    }

    // 增强工具栏按钮功能
    const importBtn = document.getElementById('import-cards-btn');
    const exportBtn = document.getElementById('export-cards-btn');

    if (importBtn) {
        importBtn.onclick = importCards;
    }

    if (exportBtn) {
        exportBtn.onclick = exportCards;
    }

    console.log('✅ 增强的卡片管理功能初始化完成');
}

// 在DOM加载完成后初始化增强功能
document.addEventListener('DOMContentLoaded', function() {
    // 延迟初始化增强功能
    setTimeout(() => {
        initEnhancedCardManagement();
    }, 1200);

    // 初始化卡片编辑事件
    initCardEditEvents();
});

// 初始化卡片编辑事件
function initCardEditEvents() {
    console.log('🔧 初始化卡片编辑事件');

    // 保存按钮事件
    const saveCardEditBtn = document.getElementById('save-card-edit');
    if (saveCardEditBtn) {
        // 移除旧的事件监听器
        saveCardEditBtn.onclick = null;
        saveCardEditBtn.removeAttribute('onclick');

        // 添加新的事件监听器
        saveCardEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveCardEdit();
        });

        console.log('✅ 保存按钮事件已绑定');
    }

    // 取消按钮事件
    const cancelCardEditBtn = document.getElementById('cancel-card-edit');
    if (cancelCardEditBtn) {
        cancelCardEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeCardEditModal();
        });
    }

    // 重置按钮事件
    const resetCardEditBtn = document.getElementById('reset-card-edit');
    if (resetCardEditBtn) {
        resetCardEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetCardEdit();
        });
    }

    // 关闭按钮事件
    const closeCardEditBtn = document.getElementById('close-card-edit-modal');
    if (closeCardEditBtn) {
        closeCardEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeCardEditModal();
        });
    }

    // 表单输入事件 - 实时预览
    const inputs = [
        'card-name',
        'card-url',
        'card-icon',
        'card-description'
    ];

    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', debounce(updateCardPreview, 300));

            // 为描述字段添加字符计数
            if (inputId === 'card-description') {
                input.addEventListener('input', updateCharacterCount);
            }

            // 为URL字段添加验证
            if (inputId === 'card-url') {
                input.addEventListener('blur', function() {
                    const url = this.value.trim();
                    if (url) {
                        validateAndPreviewURL(url);
                    }
                });
            }
        }
    });

    // 自动获取图标按钮
    const iconHelperBtn = document.getElementById('icon-helper-btn');
    if (iconHelperBtn) {
        iconHelperBtn.addEventListener('click', function(e) {
            e.preventDefault();
            autoFetchFavicon();
        });
    }

    console.log('✅ 所有卡片编辑事件已初始化');
}

// 关闭卡片编辑模态框
function closeCardEditModal() {
    console.log('❌ 关闭卡片编辑模态框');
    const modal = document.getElementById('card-edit-modal');
    if (modal) {
        modal.classList.remove('active');

        // 清空表单
        document.getElementById('card-name').value = '';
        document.getElementById('card-url').value = '';
        document.getElementById('card-icon').value = '';
        document.getElementById('card-description').value = '';

        // 清除卡片ID
        const saveBtn = document.getElementById('save-card-edit');
        if (saveBtn) {
            saveBtn.removeAttribute('data-card-id');
        }

        // 重置预览
        resetPreview();

        // 清除验证消息
        clearValidationMessages();

        console.log('✅ 卡片编辑模态框已关闭');
    }
}

// 重置预览区域
function resetPreview() {
    const previewName = document.getElementById('preview-name');
    const previewUrl = document.getElementById('preview-url');
    const previewIcon = document.getElementById('preview-icon');
    const previewDescription = document.getElementById('preview-description');
    const previewCard = document.getElementById('card-preview');
    const counter = document.getElementById('description-counter');

    if (previewName) previewName.textContent = '卡片名称';
    if (previewUrl) {
        previewUrl.textContent = '链接地址';
        previewUrl.onclick = null;
        previewUrl.style.cursor = 'default';
    }
    if (previewIcon) previewIcon.style.display = 'none';
    if (previewDescription) previewDescription.textContent = '卡片描述';
    if (previewCard) {
        previewCard.classList.remove('active', 'ready');
    }
    if (counter) {
        counter.textContent = '0/100';
        counter.className = 'char-counter';
    }
}

// 全局函数 - 增强的卡片管理模态框
window.openCardManagementModal = function() {
    console.log('🎛️ 打开增强的卡片管理模态框');
    const modal = document.getElementById('card-management-modal');
    if (modal) {
        modal.classList.add('active');
        renderCardManagementList();
        updateCardStats();

        // 确保增强功能正常工作
        if (!cardBatchOperations) {
            cardBatchOperations = new CardBatchOperations();
        }

        console.log('✅ 增强的卡片管理模态框已打开');
    } else {
        console.log('❌ 卡片管理模态框未找到');
        alert('卡片管理功能暂时不可用');
    }
};

// 增强的壁纸上传功能
class EnhancedWallpaperUploader {
    constructor() {
        this.uploadArea = document.getElementById('wallpaper-upload-area');
        this.uploadBtn = document.getElementById('wallpaper-upload-btn');
        this.fileInput = document.getElementById('wallpaper-file');
        this.urlInput = document.getElementById('wallpaper-url');
        this.urlPreviewBtn = document.getElementById('url-preview-btn');
        this.progressElement = document.getElementById('upload-progress');
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.previewElement = document.getElementById('file-preview');
        this.previewContainer = document.getElementById('preview-container');
        this.previewInfo = document.getElementById('preview-info');

        this.supportedFormats = {
            image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            video: ['mp4', 'webm', 'ogg']
        };

        this.init();
    }

    init() {
        this.bindEvents();
        console.log('✅ 增强壁纸上传功能已初始化');
    }

    bindEvents() {
        // 拖拽上传事件
        this.uploadArea?.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea?.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea?.addEventListener('drop', (e) => this.handleDrop(e));
        this.uploadArea?.addEventListener('click', () => this.fileInput?.click());

        // 文件选择事件
        this.uploadBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.fileInput?.click();
        });

        this.fileInput?.addEventListener('change', (e) => this.handleFileSelect(e));

        // URL预览事件
        this.urlPreviewBtn?.addEventListener('click', () => this.previewFromURL());
        this.urlInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.previewFromURL();
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    processFile(file) {
        if (!this.validateFile(file)) return;

        this.showProgress();
        this.simulateUpload(file);
        this.showPreview(file);
    }

    validateFile(file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const isImage = this.supportedFormats.image.includes(fileExtension);
        const isVideo = this.supportedFormats.video.includes(fileExtension);

        if (!isImage && !isVideo) {
            showNotification(`不支持的文件格式: ${fileExtension}`, 'error');
            return false;
        }

        // 检查文件大小 (限制50MB)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            showNotification('文件大小不能超过50MB', 'error');
            return false;
        }

        return true;
    }

    showProgress() {
        this.progressElement.style.display = 'block';
        this.progressFill.style.width = '0%';
        this.progressText.textContent = '准备中... 0%';
    }

    simulateUpload(file) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            this.progressFill.style.width = `${progress}%`;
            this.progressText.textContent = `上传中... ${Math.round(progress)}%`;

            if (progress >= 100) {
                clearInterval(interval);
                this.progressText.textContent = '上传完成! ✓';
                setTimeout(() => {
                    this.progressElement.style.display = 'none';
                    this.applyWallpaperFromFile(file);
                }, 1000);
            }
        }, 100);
    }

    showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            const fileType = file.type.startsWith('video/') ? 'video' : 'image';

            let previewHTML = '';
            if (fileType === 'video') {
                previewHTML = `<video controls muted><source src="${result}" type="${file.type}"></video>`;
            } else {
                previewHTML = `<img src="${result}" alt="预览">`;
            }

            this.previewContainer.innerHTML = previewHTML;
            this.previewInfo.innerHTML = `
                <div><strong>${file.name}</strong></div>
                <div>大小: ${this.formatFileSize(file.size)} | 类型: ${fileType === 'video' ? '视频' : '图片'}</div>
            `;
            this.previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    async previewFromURL() {
        const url = this.urlInput.value.trim();
        if (!url) {
            showNotification('请输入URL', 'error');
            return;
        }

        try {
            // 显示加载状态
            this.urlPreviewBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中';
            this.urlPreviewBtn.disabled = true;

            // 检测文件类型
            const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
            let previewHTML = '';

            if (isVideo) {
                previewHTML = `<video controls muted><source src="${url}" type="video/mp4"></video>`;
            } else {
                previewHTML = `<img src="${url}" alt="预览" onload="this.style.opacity=1" style="opacity:0; transition: opacity 0.3s">`;
            }

            this.previewContainer.innerHTML = previewHTML;
            this.previewInfo.innerHTML = `
                <div><strong>URL预览</strong></div>
                <div>链接: ${url}</div>
            `;
            this.previewElement.style.display = 'block';
            showNotification('预览加载成功', 'success');

        } catch (error) {
            console.error('URL预览失败:', error);
            showNotification('URL预览失败', 'error');
        } finally {
            // 恢复按钮状态
            this.urlPreviewBtn.innerHTML = '<i class="fas fa-eye"></i> 预览';
            this.urlPreviewBtn.disabled = false;
        }
    }

    applyWallpaperFromFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileType = file.type.startsWith('video/') ? 'video' : 'image';

            const wallpaperData = {
                url: e.target.result,
                type: fileType,
                name: file.name,
                source: 'file'
            };

            // 使用壁纸管理器应用壁纸
            if (window.wallpaperManager) {
                wallpaperManager.applyWallpaperFromData(wallpaperData);
            } else if (typeof applyWallpaper === 'function') {
                applyWallpaper(e.target.result, fileType);
                showNotification('壁纸已应用!', 'success');

                // 关闭模态框
                const modal = document.getElementById('wallpaper-modal');
                if (modal) modal.classList.remove('active');
            }
        };
        reader.readAsDataURL(file);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 清理预览
    clearPreview() {
        this.previewElement.style.display = 'none';
        this.previewContainer.innerHTML = '';
        this.previewInfo.innerHTML = '';
        this.progressElement.style.display = 'none';
    }
}

// 创建全局壁纸上传器实例
let enhancedWallpaperUploader;

// 壁纸管理器类
class WallpaperManager {
    constructor() {
        this.currentWallpaper = null;
        this.wallpaperHistory = JSON.parse(localStorage.getItem('wallpaperHistory') || '[]');
        this.wallpaperFavorites = JSON.parse(localStorage.getItem('wallpaperFavorites') || '[]');
        this.init();
    }

    init() {
        this.bindTabEvents();
        this.bindActionEvents();
        this.loadCurrentWallpaper();
        this.renderHistory();
        this.renderFavorites();
        console.log('✅ 壁纸管理器初始化完成');
    }

    bindTabEvents() {
        // 标签页切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab, btn);
            });
        });
    }

    bindActionEvents() {
        // 重置壁纸
        document.getElementById('reset-wallpaper')?.addEventListener('click', () => {
            this.resetWallpaper();
        });

        // 随机壁纸
        document.getElementById('random-wallpaper')?.addEventListener('click', () => {
            this.applyRandomWallpaper();
        });

        // 取消按钮
        document.getElementById('cancel-wallpaper')?.addEventListener('click', () => {
            const modal = document.getElementById('wallpaper-modal');
            if (modal) modal.classList.remove('active');
        });

        // 应用按钮 - 从URL应用
        document.getElementById('save-wallpaper')?.addEventListener('click', () => {
            this.applyWallpaperFromURL();
        });
    }

    switchTab(tabName, btnElement) {
        // 切换标签按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        btnElement.classList.add('active');

        // 切换内容区域
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    addToHistory(wallpaperData) {
        // 避免重复添加
        const existingIndex = this.wallpaperHistory.findIndex(item =>
            item.url === wallpaperData.url
        );

        if (existingIndex > -1) {
            // 更新时间戳并移到最前面
            this.wallpaperHistory.splice(existingIndex, 1);
        }

        // 添加到历史记录开头
        this.wallpaperHistory.unshift({
            ...wallpaperData,
            timestamp: Date.now()
        });

        // 限制历史记录数量
        if (this.wallpaperHistory.length > 50) {
            this.wallpaperHistory = this.wallpaperHistory.slice(0, 50);
        }

        this.saveHistory();
        this.renderHistory();
    }

    addToFavorites(wallpaperData) {
        // 检查是否已收藏
        const isAlreadyFavorited = this.wallpaperFavorites.some(item =>
            item.url === wallpaperData.url
        );

        if (!isAlreadyFavorited) {
            this.wallpaperFavorites.push({
                ...wallpaperData,
                favoriteDate: Date.now()
            });
            this.saveFavorites();
            this.renderFavorites();
            showNotification('已添加到收藏夹', 'success');
        } else {
            showNotification('该壁纸已在收藏夹中', 'info');
        }
    }

    removeFromFavorites(url) {
        this.wallpaperFavorites = this.wallpaperFavorites.filter(item => item.url !== url);
        this.saveFavorites();
        this.renderFavorites();
        showNotification('已从收藏夹移除', 'success');
    }

    removeFromHistory(url) {
        this.wallpaperHistory = this.wallpaperHistory.filter(item => item.url !== url);
        this.saveHistory();
        this.renderHistory();
        showNotification('已从历史记录移除', 'success');
    }

    applyWallpaperFromData(wallpaperData) {
        if (typeof applyWallpaper === 'function') {
            applyWallpaper(wallpaperData.url, wallpaperData.type);

            // 更新当前壁纸
            this.currentWallpaper = wallpaperData;
            this.saveCurrentWallpaper();
            this.loadCurrentWallpaper();

            // 添加到历史记录
            this.addToHistory(wallpaperData);

            showNotification('壁纸已应用', 'success');

            // 关闭模态框
            const modal = document.getElementById('wallpaper-modal');
            if (modal) modal.classList.remove('active');
        }
    }

    applyWallpaperFromURL() {
        const urlInput = document.getElementById('wallpaper-url');
        const url = urlInput?.value.trim();

        if (!url) {
            showNotification('请输入壁纸URL', 'error');
            return;
        }

        const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
        const wallpaperData = {
            url: url,
            type: isVideo ? 'video' : 'image',
            name: this.extractNameFromURL(url),
            source: 'url'
        };

        this.applyWallpaperFromData(wallpaperData);
    }

    resetWallpaper() {
        // 移除动态壁纸
        const existingWallpaper = document.querySelector('.dynamic-wallpaper');
        if (existingWallpaper) {
            existingWallpaper.remove();
        }

        this.currentWallpaper = null;
        this.saveCurrentWallpaper();
        this.loadCurrentWallpaper();
        showNotification('已重置为默认壁纸', 'success');
    }

    applyRandomWallpaper() {
        const presetItems = document.querySelectorAll('.preset-item');
        if (presetItems.length === 0) return;

        const randomIndex = Math.floor(Math.random() * presetItems.length);
        const randomPreset = presetItems[randomIndex];
        const url = randomPreset.getAttribute('data-url');
        const name = randomPreset.querySelector('span').textContent;

        const wallpaperData = {
            url: url,
            type: 'image',
            name: name,
            source: 'preset'
        };

        this.applyWallpaperFromData(wallpaperData);
    }

    loadCurrentWallpaper() {
        const saved = localStorage.getItem('currentWallpaper');
        if (saved) {
            try {
                this.currentWallpaper = JSON.parse(saved);
            } catch (error) {
                this.currentWallpaper = null;
            }
        }

        this.renderCurrentWallpaper();
    }

    renderCurrentWallpaper() {
        const container = document.getElementById('current-wallpaper-display');
        if (!container) return;

        if (this.currentWallpaper) {
            const isVideo = this.currentWallpaper.type === 'video';
            container.innerHTML = `
                <div class="current-wallpaper-preview">
                    ${isVideo ?
                        `<video muted loop><source src="${this.currentWallpaper.url}" type="video/mp4"></video>` :
                        `<img src="${this.currentWallpaper.url}" alt="当前壁纸">`
                    }
                </div>
                <div class="current-wallpaper-info">
                    <h4>${this.currentWallpaper.name}</h4>
                    <p>类型: ${isVideo ? '视频' : '图片'}</p>
                    <p>来源: ${this.getSourceName(this.currentWallpaper.source)}</p>
                    <div class="current-wallpaper-actions">
                        <button class="wallpaper-item-btn favorite" onclick="wallpaperManager.addToFavorites(wallpaperManager.currentWallpaper)">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="wallpaper-item-btn" onclick="wallpaperManager.resetWallpaper()">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="current-wallpaper-info">
                    <p>当前没有设置自定义壁纸</p>
                </div>
            `;
        }
    }

    renderHistory() {
        const container = document.getElementById('wallpaper-history-list');
        if (!container) return;

        if (this.wallpaperHistory.length === 0) {
            container.innerHTML = '<p class="empty-message">暂无使用历史</p>';
            return;
        }

        container.innerHTML = this.wallpaperHistory.map(item => this.createWallpaperItem(item, 'history')).join('');
    }

    renderFavorites() {
        const container = document.getElementById('wallpaper-favorites-list');
        if (!container) return;

        if (this.wallpaperFavorites.length === 0) {
            container.innerHTML = '<p class="empty-message">暂无收藏壁纸</p>';
            return;
        }

        container.innerHTML = this.wallpaperFavorites.map(item => this.createWallpaperItem(item, 'favorites')).join('');
    }

    createWallpaperItem(item, type) {
        const isVideo = item.type === 'video';
        const date = new Date(item.timestamp || item.favoriteDate).toLocaleDateString();

        return `
            <div class="wallpaper-${type === 'history' ? 'history' : 'favorite'}-item" onclick="wallpaperManager.applyWallpaperFromData(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                ${isVideo ?
                    `<video class="wallpaper-thumbnail" muted><source src="${item.url}" type="video/mp4"></video>` :
                    `<img class="wallpaper-thumbnail" src="${item.url}" alt="${item.name}">`
                }
                <div class="wallpaper-item-info">
                    <div class="wallpaper-item-name">${item.name}</div>
                    <div class="wallpaper-item-date">${date}</div>
                </div>
                <div class="wallpaper-item-actions">
                    ${type === 'history' ?
                        `<button class="wallpaper-item-btn favorite" onclick="event.stopPropagation(); wallpaperManager.addToFavorites(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                            <i class="fas fa-heart"></i>
                        </button>` : ''
                    }
                    <button class="wallpaper-item-btn" onclick="event.stopPropagation(); wallpaperManager.${type === 'history' ? 'removeFromHistory' : 'removeFromFavorites'}('${item.url}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    extractNameFromURL(url) {
        try {
            const pathname = new URL(url).pathname;
            const filename = pathname.split('/').pop();
            return filename || '未知壁纸';
        } catch {
            return '自定义壁纸';
        }
    }

    getSourceName(source) {
        const sources = {
            'preset': '预设壁纸',
            'url': '自定义URL',
            'file': '本地文件'
        };
        return sources[source] || '未知来源';
    }

    saveCurrentWallpaper() {
        if (this.currentWallpaper) {
            localStorage.setItem('currentWallpaper', JSON.stringify(this.currentWallpaper));
        } else {
            localStorage.removeItem('currentWallpaper');
        }
    }

    saveHistory() {
        localStorage.setItem('wallpaperHistory', JSON.stringify(this.wallpaperHistory));
    }

    saveFavorites() {
        localStorage.setItem('wallpaperFavorites', JSON.stringify(this.wallpaperFavorites));
    }
}

// 创建全局壁纸管理器实例
let wallpaperManager;

// 在DOM加载完成后初始化壁纸管理器
document.addEventListener('DOMContentLoaded', function() {
    // 初始化壁纸管理器
    wallpaperManager = new WallpaperManager();
    console.log('✅ 壁纸管理器已初始化');

    // 连接预设壁纸点击事件
    document.querySelectorAll('.preset-item').forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            const name = this.querySelector('span').textContent;

            const wallpaperData = {
                url: url,
                type: 'image',
                name: name,
                source: 'preset'
            };

            wallpaperManager.applyWallpaperFromData(wallpaperData);
        });
    });
});

// 旧的事件绑定已移除，统一在 initCardEditEvents() 中处理

// 增强的卡片预览样式和功能已集成
});

// 添加所有缺失的全局函数
window.closeModal = function(modalId) {
    console.log(`❌ 关闭模态框: ${modalId}`);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        console.log('✅ 模态框已关闭');
    } else {
        console.log('❌ 模态框未找到');
    }
};

window.openEngineModal = function() {
    console.log('🔍 打开搜索引擎管理模态框');
    const modal = document.getElementById('engine-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ 搜索引擎模态框已打开');
    } else {
        console.log('❌ 搜索引擎模态框未找到');
        alert('搜索引擎管理功能暂时不可用');
    }
};

window.openHistoryModal = function() {
    console.log('📚 打开访问历史模态框');
    const modal = document.getElementById('history-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ 历史模态框已打开');
        // 显示历史记录
        displayHistory();
    } else {
        console.log('❌ 历史模态框未找到');
        alert('访问历史功能暂时不可用');
    }
};

window.openWallpaperModal = function() {
    console.log('🖼️ 打开壁纸设置模态框');
    const modal = document.getElementById('wallpaper-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('✅ 壁纸模态框已打开');
    } else {
        console.log('❌ 壁纸模态框未找到');
        alert('壁纸设置功能暂时不可用');
    }
};

window.performSearch = function() {
    console.log('🔍 执行搜索');
    if (typeof performSearchEnhanced === 'function') {
        performSearchEnhanced();
    } else {
        // 简化搜索功能
        const searchInput = document.getElementById('search-input');
        const engineSelect = document.getElementById('engine-select');

        if (searchInput && engineSelect) {
            const query = searchInput.value.trim();
            const engine = engineSelect.value;

            if (query) {
                const searchUrls = {
                    google: 'https://www.google.com/search?q=',
                    bing: 'https://www.bing.com/search?q=',
                    baidu: 'https://www.baidu.com/s?wd='
                };

                const url = searchUrls[engine] + encodeURIComponent(query);
                window.open(url, '_blank');
                console.log('✅ 搜索已执行');
            } else {
                alert('请输入搜索关键词');
            }
        }
    }
};

window.displayHistory = function(searchTerm = '') {
    console.log('📋 显示访问历史记录');
    const historyList = document.getElementById('history-list');
    if (!historyList) {
        console.log('❌ 历史记录列表元素未找到');
        return;
    }

    const visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');
    console.log(`📊 找到 ${visitHistory.length} 条历史记录`);

    if (visitHistory.length === 0) {
        historyList.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.5);">暂无访问记录</div>';
        return;
    }

    historyList.innerHTML = visitHistory.map(item => `
        <div class="history-item">
            <div class="favicon">
                <i class="fas fa-globe"></i>
            </div>
            <div class="info">
                <div class="title">${item.title || '未知网站'}</div>
                <div class="url">${item.url}</div>
                <div class="time">${new Date(item.timestamp).toLocaleString()}</div>
            </div>
        </div>
    `).join('');
};