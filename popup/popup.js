/**
 * Review Assistant - Prototype Review Tool
 * Copyright (c) 2026 dengqu
 * Licensed under MIT License
 * https://github.com/dengqu-netizen/review-extension
 */

// 原型评审标注工具 - Popup Script
// 负责语言切换和简单展示

// 语言检测和切换
const userLang = navigator.language.startsWith('zh') ? 'zh' : 'en';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
});

// 应用语言
function applyLanguage() {
  // 获取所有带有 data-zh 和 data-en 属性的元素
  const elements = document.querySelectorAll('[data-zh][data-en]');

  elements.forEach(element => {
    const zhText = element.getAttribute('data-zh');
    const enText = element.getAttribute('data-en');

    // 根据语言设置文本内容
    if (userLang === 'zh') {
      element.textContent = zhText;
      // 如果是 p 标签且包含换行符，需要转换为 <br>
      if (element.tagName === 'P' && zhText.includes('&#10;')) {
        element.innerHTML = zhText.replace(/&#10;/g, '<br>');
      }
    } else {
      element.textContent = enText;
      // 如果是 p 标签且包含换行符，需要转换为 <br>
      if (element.tagName === 'P' && enText.includes('&#10;')) {
        element.innerHTML = enText.replace(/&#10;/g, '<br>');
      }
    }
  });

  // 更新 HTML lang 属性
  document.documentElement.lang = userLang === 'zh' ? 'zh-CN' : 'en';
}
