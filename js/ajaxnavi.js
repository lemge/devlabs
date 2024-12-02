document.addEventListener('DOMContentLoaded', function() {
    fetch('/naviinfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            return response.json();
        })
        .then(data => {
            buildNavigation(data);
            handleResponsiveNav(); // 初始化时处理导航栏的响应式
        })
        .catch(error => {
            console.error('获取导航数据失败:', error);
        });
});

function buildNavigation(data) {
    const navContainer = document.getElementById('nav'); // 假设你的导航栏容器的 ID 是 'nav'
    navContainer.innerHTML = ''; // 清空现有内容

    const ul = document.createElement('ul'); // 创建一个无序列表

    data.forEach(item => {
        const li = document.createElement('li'); // 创建列表项
        const a = document.createElement('a'); // 创建链接
        a.href = item.url; // 设置链接地址
        a.textContent = item.title; // 设置链接文本
        li.appendChild(a); // 将链接添加到列表项
        ul.appendChild(li); // 将列表项添加到无序列表
    });

    navContainer.appendChild(ul); // 将无序列表添加到导航容器
}

function handleResponsiveNav() {
    const navContainer = document.getElementById('nav');
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // 设置折叠的屏幕宽度

    function toggleNav() {
        if (mediaQuery.matches) {
            navContainer.classList.add('collapsed'); // 添加折叠类
        } else {
            navContainer.classList.remove('collapsed'); // 移除折叠类
        }
    }

    toggleNav(); // 初始化时调用一次
    mediaQuery.addListener(toggleNav); // 监听窗口大小变化
}
