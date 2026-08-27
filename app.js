// 实用工具箱 - 主脚本
(function() {
  'use strict';

  // 分类配置
  const CATEGORIES = [
    { id: 'all', name: '全部', icon: '📦' },
    { id: '文本工具', name: '文本工具', icon: '📝' },
    { id: '计算工具', name: '计算工具', icon: '🧮' },
    { id: '转换工具', name: '转换工具', icon: '🔄' },
    { id: '开发工具', name: '开发工具', icon: '💻' },
    { id: '颜色工具', name: '颜色工具', icon: '🎨' },
    { id: '图片工具', name: '图片工具', icon: '🖼️' },
    { id: '生活工具', name: '生活工具', icon: '🏠' },
    { id: '时间工具', name: '时间工具', icon: '⏰' },
    { id: '安全工具', name: '安全工具', icon: '🔐' }
  ];

  let currentCategory = 'all';
  let currentPage = 'home';

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    renderCategories();
    renderCategoryGrid();
    renderTools();
    bindEvents();
    initAdSense();
    handleHash();
  });

  // 主题切换
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark');
    document.getElementById('themeToggle').textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
  }

  // 渲染分类侧边栏
  function renderCategories() {
    const list = document.getElementById('categoryList');
    list.innerHTML = CATEGORIES.map(cat => {
      const count = cat.id === 'all' ? TOOLS.length : TOOLS.filter(t => t.category === cat.id).length;
      return `<div class="category-item ${currentCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        <span class="cat-icon">${cat.icon}</span>
        <span class="cat-name">${cat.name}</span>
        <span class="cat-count">${count}</span>
      </div>`;
    }).join('');
  }

  // 渲染首页分类卡片
  function renderCategoryGrid() {
    const grid = document.getElementById('categoryGrid');
    const cats = CATEGORIES.filter(c => c.id !== 'all');
    grid.innerHTML = cats.map(cat => {
      const count = TOOLS.filter(t => t.category === cat.id).length;
      return `<div class="category-card" data-cat="${cat.id}">
        <div class="cat-card-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${count} 个工具</p>
      </div>`;
    }).join('');
  }

  // 渲染工具网格
  function renderTools(keyword) {
    const grid = document.getElementById('toolsGrid');
    let filtered = TOOLS;
    if (currentCategory !== 'all') {
      filtered = filtered.filter(t => t.category === currentCategory);
    }
    if (keyword && keyword.trim()) {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(kw) ||
        t.desc.toLowerCase().includes(kw) ||
        t.category.toLowerCase().includes(kw)
      );
    }
    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-secondary)">未找到匹配的工具</div>';
      return;
    }
    grid.innerHTML = filtered.map(t => `
      <div class="tool-card" data-tool="${t.id}">
        <div class="tool-icon">${t.icon}</div>
        <h3 class="tool-name">${t.name}</h3>
        <p class="tool-desc">${t.desc}</p>
        <span class="tool-cat">${t.category}</span>
      </div>
    `).join('');
  }

  // 显示工具详情
  function showTool(toolId) {
    const tool = TOOLS.find(t => t.id === toolId);
    if (!tool) return;
    document.getElementById('toolsGrid').style.display = 'none';
    const detail = document.getElementById('toolDetail');
    detail.style.display = 'block';
    detail.innerHTML = `
      <button class="btn back-btn" onclick="window._backToList()">← 返回工具列表</button>
      <div class="tool-detail-header">
        <div class="tool-detail-icon">${tool.icon}</div>
        <div>
          <h2>${tool.name}</h2>
          <p>${tool.desc}</p>
          <span class="tool-cat">${tool.category}</span>
        </div>
      </div>
      <div class="ad-slot"><div class="ad-placeholder"><span class="ad-label">📢 广告</span><span class="ad-text">支持我们持续提供免费工具</span></div></div>
      <div class="tool-detail-body">${tool.html}</div>
      <div class="ad-slot"><div class="ad-placeholder"><span class="ad-label">📢 广告</span><span class="ad-text">您的支持是我们更新的动力</span></div></div>
      <div class="tool-guide">
        <h3>使用说明</h3>
        <p>本工具在浏览器本地运行，您的数据不会上传到任何服务器，安全可靠。</p>
        <ul>
          <li>在输入框中填写需要处理的数据</li>
          <li>点击相应按钮执行操作</li>
          <li>结果会实时显示在输出区域</li>
          <li>可随时复制结果或下载文件</li>
        </ul>
      </div>
    `;
    // 执行工具JS
    try {
      const script = document.createElement('script');
      script.textContent = tool.js;
      detail.appendChild(script);
    } catch(e) {
      console.error('工具脚本执行失败:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 返回工具列表
  window._backToList = function() {
    document.getElementById('toolDetail').style.display = 'none';
    document.getElementById('toolsGrid').style.display = 'grid';
  };

  // 页面切换
  function switchPage(page) {
    currentPage = page;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.nav === page);
    });
    if (page === 'tools') {
      document.getElementById('toolDetail').style.display = 'none';
      document.getElementById('toolsGrid').style.display = 'grid';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 绑定事件
  function bindEvents() {
    // 主题切换
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // 导航
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage(this.dataset.nav);
        history.pushState(null, '', '#' + this.dataset.nav);
      });
    });

    // 分类侧边栏点击
    document.getElementById('categoryList').addEventListener('click', function(e) {
      const item = e.target.closest('.category-item');
      if (!item) return;
      currentCategory = item.dataset.cat;
      renderCategories();
      renderTools();
    });

    // 首页分类卡片点击
    document.getElementById('categoryGrid').addEventListener('click', function(e) {
      const card = e.target.closest('.category-card');
      if (!card) return;
      currentCategory = card.dataset.cat;
      renderCategories();
      renderTools();
      switchPage('tools');
      history.pushState(null, '', '#tools');
    });

    // 工具卡片点击
    document.getElementById('toolsGrid').addEventListener('click', function(e) {
      const card = e.target.closest('.tool-card');
      if (!card) return;
      showTool(card.dataset.tool);
    });

    // 搜索
    const searchInput = document.getElementById('searchInput');
    let searchTimer;
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimer);
      const kw = this.value;
      searchTimer = setTimeout(() => {
        if (kw.trim()) {
          switchPage('tools');
          currentCategory = 'all';
          renderCategories();
          renderTools(kw);
          document.getElementById('searchCount').textContent = `找到 ${TOOLS.filter(t => t.name.toLowerCase().includes(kw.toLowerCase()) || t.desc.toLowerCase().includes(kw.toLowerCase())).length} 个相关工具`;
        } else {
          document.getElementById('searchCount').textContent = '';
          renderTools();
        }
      }, 300);
    });

    // footer工具链接
    document.querySelectorAll('[data-tool]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        switchPage('tools');
        showTool(this.dataset.tool);
      });
    });

    // 浏览器前进后退
    window.addEventListener('popstate', handleHash);
  }

  // 处理hash路由
  function handleHash() {
    const hash = location.hash.replace('#', '') || 'home';
    if (['home', 'tools', 'about', 'privacy', 'terms'].includes(hash)) {
      switchPage(hash);
    } else {
      switchPage('home');
    }
  }

  // AdSense初始化
  function initAdSense() {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch(e) {}
  }

})();
