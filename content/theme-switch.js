/**
 * 主题切换彩蛋 — 拖动手柄切换深色/浅色面板
 *
 * 交互流程：
 * 1. 鼠标悬停面板左上角 1s → 手柄旋转出现
 * 2. 向右拖动手柄（带弹性阻力）→ 面板颜色实时过渡
 * 3. 拖到卡扣位置松手 → 主题切换完成
 * 4. 中途松手 → 手柄弹回 + 颜色恢复
 *
 * 独立模块，仅依赖 DOM class 约定：
 * - .dq-review-panel（面板）
 * - .dq-light-theme（亮色主题标记）
 * - .dq-review-comment-list（评论列表面板）
 */
(function () {
  'use strict';

  // ==================== 配置 ====================
  const HOVER_DELAY = 1000;        // 悬停触发延迟 ms
  const LOCK_THRESHOLD = 0.75;     // 拖到 75% 即卡扣
  const HIDE_DELAY = 800;          // 松手后手柄消失延迟 ms
  const STORAGE_KEY = 'dq-review-theme';

  // ==================== 状态 ====================
  let panel = null;
  let track = null;
  let handle = null;
  let hotzone = null;
  let hoverTimer = null;
  let hideTimer = null;
  let isDragging = false;
  let isLocked = false;
  let trackWidth = 0;
  let dragStartX = 0;
  let isLightTheme = false;
  let lastProgress = 0;

  // ==================== 初始化 ====================
  function init() {
    // 等面板出现
    const observer = new MutationObserver(() => {
      panel = document.querySelector('.dq-review-panel');
      if (panel && !panel.querySelector('.dq-theme-hotzone')) {
        setup();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 面板可能已经存在
    panel = document.querySelector('.dq-review-panel');
    if (panel && !panel.querySelector('.dq-theme-hotzone')) {
      setup();
    }
  }

  // ==================== 构建 DOM ====================
  function setup() {
    // 从面板实际 class 同步当前主题状态（content.js 可能已自动检测并设置）
    isLightTheme = panel.classList.contains('dq-light-theme');

    // 读取存储的主题（覆盖自动检测）
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        if (result[STORAGE_KEY] !== undefined) {
          const stored = result[STORAGE_KEY] === 'light';
          if (stored !== isLightTheme) {
            isLightTheme = stored;
            applyThemeClass(isLightTheme);
          }
        }
      });
    }

    // 确保面板有 position 上下文
    const panelStyle = getComputedStyle(panel);
    if (panelStyle.position === 'static') {
      panel.style.position = 'relative';
    }

    // 热区
    hotzone = document.createElement('div');
    hotzone.className = 'dq-theme-hotzone';
    panel.appendChild(hotzone);

    // 轨道
    track = document.createElement('div');
    track.className = 'dq-theme-track';
    panel.appendChild(track);

    // 手柄
    handle = document.createElement('div');
    handle.className = 'dq-theme-handle';
    track.appendChild(handle);

    // 事件绑定：热区、轨道、手柄都能保持手柄可见
    hotzone.addEventListener('mouseenter', onHotzoneEnter);
    hotzone.addEventListener('mouseleave', onHotzoneLeave);
    track.addEventListener('mouseenter', onTrackEnter);
    track.addEventListener('mouseleave', onTrackLeave);
    handle.addEventListener('mouseenter', onTrackEnter);  // 手柄上也取消隐藏
    handle.addEventListener('mousedown', onDragStart);

    // content.js 的 detectAndSwitchTheme 可能在 setup 之后执行，延迟同步一次
    setTimeout(() => {
      isLightTheme = panel.classList.contains('dq-light-theme');
    }, 500);
  }

  // ==================== 热区悬停 ====================
  function onHotzoneEnter() {
    if (isDragging || isLocked) return;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(showHandle, HOVER_DELAY);
  }

  function onHotzoneLeave() {
    clearTimeout(hoverTimer);
    if (!isDragging && !isLocked) {
      scheduleHide();
    }
  }

  function onTrackEnter() {
    // 鼠标进入轨道区域，取消隐藏
    clearTimeout(hideTimer);
  }

  function onTrackLeave() {
    if (!isDragging && !isLocked) {
      scheduleHide();
    }
  }

  function showHandle() {
    if (!track || !handle) return;
    track.classList.add('dq-visible');
    // 重置手柄位置到左侧
    handle.style.setProperty('left', '0px', 'important');
    handle.classList.remove('dq-handle-snapback', 'dq-handle-locked', 'dq-dragging');
    // 触发旋转入场
    requestAnimationFrame(() => {
      handle.classList.add('dq-handle-visible');
    });
    clearTimeout(hideTimer);
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideHandle, HIDE_DELAY);
  }

  function hideHandle() {
    if (isDragging || isLocked) return;
    if (handle) {
      handle.classList.remove('dq-handle-visible');
    }
    setTimeout(() => {
      if (!isDragging && !isLocked && track) {
        track.classList.remove('dq-visible', 'dq-near-lock');
      }
    }, 400);
  }

  // ==================== 拖动逻辑 ====================
  function onDragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isLocked) return;

    isDragging = true;
    // 同步当前主题状态（防止和 content.js 自动检测不一致）
    isLightTheme = panel.classList.contains('dq-light-theme');
    trackWidth = track.getBoundingClientRect().width;
    dragStartX = e.clientX;
    // 关闭 transition，让 left 由 JS 直接控制
    handle.style.setProperty('transition', 'none', 'important');
    handle.classList.add('dq-dragging');
    handle.classList.remove('dq-handle-snapback');
    clearTimeout(hideTimer);

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    // 弹性阻力：开始轻松跟手，越往右越费力
    // 用 1 - e^(-k*ratio) 曲线：起点斜率=k，渐近线=1
    const ratio = Math.max(0, dx / trackWidth);
    const k = 1.8; // 起点斜率（越大开始越跟手）
    const progress = Math.min(1 - Math.exp(-k * ratio), 1);
    const pos = progress * trackWidth;

    handle.style.setProperty('left', pos + 'px', 'important');
    lastProgress = progress;

    // 接近卡扣位置时显示微光
    if (progress >= LOCK_THRESHOLD) {
      track.classList.add('dq-near-lock');
    } else {
      track.classList.remove('dq-near-lock');
    }

    // 实时颜色过渡
    applyColorProgress(progress);
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    handle.classList.remove('dq-dragging');
    // 恢复 transition（由 CSS class 控制）
    handle.style.removeProperty('transition');

    if (lastProgress >= LOCK_THRESHOLD) {
      // 卡扣！切换主题
      lockHandle();
    } else {
      // 弹回
      snapBack();
    }
  }

  // ==================== 卡扣 & 弹回 ====================
  function lockHandle() {
    isLocked = true;
    handle.classList.add('dq-handle-locked');
    handle.style.setProperty('left', trackWidth + 'px', 'important');
    track.classList.remove('dq-near-lock');

    // 切换主题
    isLightTheme = !isLightTheme;
    applyThemeClass(isLightTheme);
    saveTheme(isLightTheme);

    // 短暂停留后收起
    setTimeout(() => {
      isLocked = false;
      handle.style.setProperty('left', '0px', 'important');
      handle.classList.remove('dq-handle-locked');
      hideHandle();
    }, 600);
  }

  function snapBack() {
    handle.classList.add('dq-handle-snapback');
    handle.style.setProperty('left', '0px', 'important');
    // 恢复颜色
    applyColorProgress(0);
    track.classList.remove('dq-near-lock');
    scheduleHide();
  }

  // ==================== 主题应用 ====================

  // 深色主题基准色
  const DARK = {
    panelBg: [45, 45, 45],       // #2d2d2d
    panelBorder: [64, 64, 64],   // #404040
    btnSecBg: [64, 64, 64],      // #404040
    btnSecColor: [224, 224, 224], // #e0e0e0
    iconColor: [255, 255, 255, 0.6],
    dragColor: [255, 255, 255, 0.5],
  };
  // 浅色主题基准色
  const LIGHT = {
    panelBg: [255, 255, 255],    // #ffffff
    panelBorder: [229, 231, 235],// #e5e7eb
    btnSecBg: [243, 244, 246],   // #f3f4f6
    btnSecColor: [31, 41, 55],   // #1f2937
    iconColor: [0, 0, 0, 0.6],
    dragColor: [0, 0, 0, 0.6],
  };

  function lerp(a, b, t) { return a + (b - a) * t; }

  function lerpColor(from, to, t) {
    const r = Math.round(lerp(from[0], to[0], t));
    const g = Math.round(lerp(from[1], to[1], t));
    const b = Math.round(lerp(from[2], to[2], t));
    if (from.length > 3 || to.length > 3) {
      const a = lerp(from[3] ?? 1, to[3] ?? 1, t);
      return `rgba(${r},${g},${b},${a.toFixed(2)})`;
    }
    return `rgb(${r},${g},${b})`;
  }

  /** 根据拖动进度实时插值面板颜色 */
  function applyColorProgress(progress) {
    if (!panel) return;
    const from = isLightTheme ? LIGHT : DARK;
    const to = isLightTheme ? DARK : LIGHT;
    const t = Math.max(0, Math.min(progress, 1));

    panel.style.setProperty('background', lerpColor(from.panelBg, to.panelBg, t), 'important');
    panel.style.setProperty('border-color', lerpColor(from.panelBorder, to.panelBorder, t), 'important');

    // 次要按钮
    panel.querySelectorAll('.dq-review-btn-secondary').forEach((btn) => {
      btn.style.setProperty('background', lerpColor(from.btnSecBg, to.btnSecBg, t), 'important');
      btn.style.setProperty('color', lerpColor(from.btnSecColor, to.btnSecColor, t), 'important');
    });

    // 图标按钮
    panel.querySelectorAll('.dq-review-btn-icon').forEach((btn) => {
      btn.style.setProperty('color', lerpColor(from.iconColor, to.iconColor, t), 'important');
    });

    // 拖动手柄颜色
    const dragHandle = panel.querySelector('.dq-review-panel-drag-handle');
    if (dragHandle) {
      dragHandle.style.setProperty('color', lerpColor(from.dragColor, to.dragColor, t), 'important');
    }
  }

  /** 应用主题 class（最终态） */
  function applyThemeClass(light) {
    if (!panel) return;
    // 清除内联过渡色
    panel.style.removeProperty('background');
    panel.style.removeProperty('border-color');
    panel.querySelectorAll('.dq-review-btn-secondary').forEach((btn) => {
      btn.style.removeProperty('background');
      btn.style.removeProperty('color');
    });
    panel.querySelectorAll('.dq-review-btn-icon').forEach((btn) => {
      btn.style.removeProperty('color');
    });
    const dragHandle = panel.querySelector('.dq-review-panel-drag-handle');
    if (dragHandle) dragHandle.style.removeProperty('color');

    if (light) {
      panel.classList.add('dq-light-theme');
    } else {
      panel.classList.remove('dq-light-theme');
    }
    // 同步评论列表面板
    const commentList = document.querySelector('.dq-review-comment-list');
    if (commentList) {
      if (light) {
        commentList.classList.add('dq-light-theme');
      } else {
        commentList.classList.remove('dq-light-theme');
      }
    }
  }

  /** 持久化主题选择 */
  function saveTheme(light) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ [STORAGE_KEY]: light ? 'light' : 'dark' });
    }
  }

  // ==================== 启动 ====================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
