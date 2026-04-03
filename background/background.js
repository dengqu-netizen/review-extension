/**
 * Review Extension Background Service Worker
 * 原型评审标注工具 - 后台服务
 *
 * @author dengqu
 * @version 1.0.0
 * @description 负责扩展生命周期管理和全局功能
 */

// 扩展安装或更新时
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('原型评审标注工具已安装');
  } else if (details.reason === 'update') {
    console.log('原型评审标注工具已更新到版本', chrome.runtime.getManifest().version);
  }
});

// 监听来自content script或popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 预留消息处理接口
  if (request.action === 'ping') {
    sendResponse({ status: 'ok' });
  }
  return true;
});
