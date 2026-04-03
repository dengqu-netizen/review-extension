# 评审助手 Review Assistant

<div align="center">

![Logo](icons/icon128.png)

**为 HTML 原型页面添加评审标注，自动生成优化待办表**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://github.com/dengqu-netizen/review-extension)

[English](#english) | [中文](#中文)

</div>

---

## 中文

### ✨ 功能特性

- 🎯 **交互式标注**：在 HTML 原型页面上直接点击添加评审标注
- 📝 **多种评论类型**：支持问题、建议、决策、待确认等多种标注类型
- 🎨 **三级优先级**：P0（必须修改）、P1（建议修改）、P2（可选优化）
- 📊 **自动生成待办表**：一键导出 Markdown 格式的优化待办清单
- 🌍 **中英文双语**：根据浏览器语言自动切换界面语言
- 💾 **本地存储**：所有数据仅存储在浏览器本地，不上传服务器
- 🎨 **古钱币设计**：外圆内方的中国风 logo 设计

### 🚀 快速开始

#### 安装方式

**方式一：从源码安装（开发者模式）**

1. 克隆或下载本仓库
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本项目的根目录

**方式二：从 Chrome Web Store 安装（即将上线）**

待发布到 Chrome Web Store 后，可直接在线安装。

#### 使用方法

1. 打开任意 HTML 原型页面
2. **双击 ESC 键**呼出评审面板
3. 点击"开始评审"进入评审模式
4. 点击页面上的任意元素添加评论
5. 填写评论内容，选择类型和优先级
6. 完成评审后，点击"导出"生成优化待办表

### 📸 界面预览

- **Popup 界面**：简洁的扩展弹窗，显示使用说明
- **评审面板**：浮动面板，显示所有评审标注
- **标注气泡**：页面元素上的可视化标注

### 🎨 设计理念

- **古钱币 Logo**：外圆内方的设计，寓意评审工作需要规范（方）与灵活（圆）相结合
- **中文书法字**："评"字采用楷体，体现中国文化气质
- **简洁界面**：紧凑的布局，突出核心功能

### 📋 技术栈

- **Manifest V3**：使用最新的 Chrome 扩展规范
- **原生 JavaScript**：无框架依赖，轻量高效
- **CSS3**：现代化的界面设计
- **Chrome Storage API**：本地数据存储

### 🔒 隐私保护

- ✅ 所有数据仅存储在本地浏览器
- ✅ 不收集任何个人信息
- ✅ 不上传到任何服务器
- ✅ 开源代码，可审计

### 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### ⚠️ 免责声明

本插件仅供合法用途，使用风险自担，开发者不对使用导致的任何损失负责。

---

## English

### ✨ Features

- 🎯 **Interactive Annotations**: Click directly on HTML prototype pages to add review annotations
- 📝 **Multiple Comment Types**: Support for issues, suggestions, decisions, and pending confirmations
- 🎨 **Three Priority Levels**: P0 (Must Fix), P1 (Should Fix), P2 (Nice to Have)
- 📊 **Auto-generate Checklists**: Export optimization checklists in Markdown format with one click
- 🌍 **Bilingual Support**: Automatically switches interface language based on browser settings
- 💾 **Local Storage**: All data stored locally in browser, no server uploads
- 🎨 **Ancient Coin Design**: Chinese-style logo with circular exterior and square interior

### 🚀 Quick Start

#### Installation

**Option 1: Install from Source (Developer Mode)**

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the project root directory

**Option 2: Install from Chrome Web Store (Coming Soon)**

Will be available for direct installation once published to Chrome Web Store.

#### Usage

1. Open any HTML prototype page
2. **Double press ESC** to open the review panel
3. Click "Start Review" to enter review mode
4. Click any element on the page to add a comment
5. Fill in comment content, select type and priority
6. After completing review, click "Export" to generate optimization checklist

### 📸 Screenshots

- **Popup Interface**: Clean extension popup with usage instructions
- **Review Panel**: Floating panel displaying all review annotations
- **Annotation Bubbles**: Visual markers on page elements

### 🎨 Design Philosophy

- **Ancient Coin Logo**: Circular exterior with square interior, symbolizing the balance between standards (square) and flexibility (circle) in review work
- **Chinese Calligraphy**: "评" character in KaiTi font, reflecting Chinese cultural aesthetics
- **Clean Interface**: Compact layout highlighting core functionality

### 📋 Tech Stack

- **Manifest V3**: Latest Chrome extension specification
- **Vanilla JavaScript**: No framework dependencies, lightweight and efficient
- **CSS3**: Modern interface design
- **Chrome Storage API**: Local data storage

### 🔒 Privacy

- ✅ All data stored locally in browser only
- ✅ No personal information collected
- ✅ No data uploaded to servers
- ✅ Open source code, auditable

### 📄 License

This project is licensed under the [MIT License](LICENSE).

### 🤝 Contributing

Issues and Pull Requests are welcome!

### ⚠️ Disclaimer

This extension is for lawful use only. Use at your own risk. The developer is not responsible for any losses caused by its use.

---

<div align="center">

**Made with ❤️ by dengqu**

[GitHub](https://github.com/dengqu-netizen/review-extension) • [Report Bug](https://github.com/dengqu-netizen/review-extension/issues) • [Request Feature](https://github.com/dengqu-netizen/review-extension/issues)

</div>
