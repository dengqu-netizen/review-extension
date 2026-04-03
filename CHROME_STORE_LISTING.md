# Chrome Web Store 发布材料

## 基本信息

- **扩展名称**：评审助手 Review Assistant
- **分类**：生产力工具 (Productivity)
- **语言**：中文、英文

---

## 简短描述（132 字符以内）

### 中文
为 HTML 原型页面添加评审标注，自动生成优化待办表。本地存储，隐私安全。

### English
Add review annotations to HTML prototypes and generate optimization checklists. Local storage, privacy-safe.

---

## 详细描述

### 中文版本

**评审助手 - 让原型评审更高效**

评审助手是一款专为产品经理、设计师和开发者打造的 Chrome 扩展，帮助你在 HTML 原型页面上快速添加评审标注，自动生成优化待办清单。

**✨ 核心功能**

• 交互式标注：直接在页面元素上点击添加评论
• 多种评论类型：问题、建议、决策、待确认等
• 三级优先级：P0（必须修改）、P1（建议修改）、P2（可选优化）
• 一键导出：自动生成 Markdown 格式的优化待办表
• 双语支持：根据浏览器语言自动切换中英文界面
• 本地存储：所有数据仅存储在浏览器本地，不上传服务器

**🚀 使用方法**

1. 打开任意 HTML 原型页面
2. 双击 ESC 键呼出评审面板
3. 点击"开始评审"进入评审模式
4. 点击页面元素添加评论
5. 完成后导出优化待办表

**🔒 隐私保护**

✓ 所有数据仅存储在本地浏览器
✓ 不收集任何个人信息
✓ 不上传到任何服务器
✓ 开源代码，可审计

**🎨 设计理念**

采用中国传统"外圆内方"的古钱币设计，寓意评审工作需要规范（方）与灵活（圆）相结合。

**适用场景**

• 产品原型评审
• UI/UX 设计评审
• 前端页面走查
• 团队协作评审

---

### English Version

**Review Assistant - Make Prototype Reviews More Efficient**

Review Assistant is a Chrome extension designed for product managers, designers, and developers to quickly add review annotations to HTML prototype pages and automatically generate optimization checklists.

**✨ Core Features**

• Interactive Annotations: Click directly on page elements to add comments
• Multiple Comment Types: Issues, suggestions, decisions, pending confirmations
• Three Priority Levels: P0 (Must Fix), P1 (Should Fix), P2 (Nice to Have)
• One-Click Export: Auto-generate optimization checklists in Markdown format
• Bilingual Support: Automatically switches between Chinese and English
• Local Storage: All data stored locally in browser, no server uploads

**🚀 How to Use**

1. Open any HTML prototype page
2. Double press ESC to open the review panel
3. Click "Start Review" to enter review mode
4. Click page elements to add comments
5. Export optimization checklist when done

**🔒 Privacy Protection**

✓ All data stored locally in browser only
✓ No personal information collected
✓ No data uploaded to servers
✓ Open source code, auditable

**🎨 Design Philosophy**

Features a traditional Chinese "ancient coin" design with circular exterior and square interior, symbolizing the balance between standards (square) and flexibility (circle) in review work.

**Use Cases**

• Product prototype reviews
• UI/UX design reviews
• Frontend page walkthroughs
• Team collaboration reviews

---

## 截图要求

Chrome Web Store 要求提供以下截图：

### 必需截图（至少 1 张，最多 5 张）

**尺寸要求：**
- 1280x800 或 640x400（推荐 1280x800）
- PNG 或 JPG 格式
- 最大 5MB

**建议截图内容：**

1. **主界面截图**（必需）
   - 显示 Popup 界面
   - 展示中文界面和古钱币 logo

2. **评审面板截图**
   - 显示浮动评审面板
   - 展示评论列表

3. **标注示例截图**
   - 显示页面上的标注气泡
   - 展示评论表单

4. **导出功能截图**
   - 显示导出的 Markdown 待办表

5. **双语界面截图**
   - 展示英文界面

### 小图标（Store Icon）

**尺寸要求：**
- 128x128 像素
- PNG 格式
- 已有：`icons/icon128.png` ✅

### 宣传图（Promotional Images）- 可选

**小宣传图（Small Promo Tile）：**
- 440x280 像素
- PNG 或 JPG

**大宣传图（Large Promo Tile）：**
- 920x680 像素
- PNG 或 JPG

**侯爵图（Marquee Promo Tile）：**
- 1400x560 像素
- PNG 或 JPG

---

## 隐私政策

**隐私政策 URL**（可选，但推荐）：
- 可以使用 GitHub README 链接：
  `https://github.com/dengqu-netizen/review-extension#privacy`

**隐私实践声明：**

本扩展：
- ✅ 不收集用户数据
- ✅ 不使用 Cookie
- ✅ 不进行网络请求
- ✅ 仅使用 Chrome Storage API 本地存储

---

## 权限说明

在 `manifest.json` 中声明的权限：

- **storage**：用于在本地浏览器存储评审数据
- **activeTab**：用于在当前标签页注入评审功能
- **scripting**：用于动态注入内容脚本

**用户可见的权限说明：**
"读取和更改您在所访问网站上的数据" - 用于在 HTML 页面上添加评审标注

---

## 发布检查清单

### 代码准备
- [x] manifest.json 配置正确
- [x] 所有图标文件齐全（16x16, 48x48, 128x128）
- [x] 代码无明显 bug
- [x] 测试所有核心功能
- [x] 添加版权声明和 LICENSE

### 商店材料
- [ ] 准备 1-5 张截图（1280x800）
- [x] 128x128 图标已准备
- [x] 中英文描述已准备
- [ ] 可选：准备宣传图
- [x] 隐私政策已准备

### 账号准备
- [ ] 注册 Chrome Web Store 开发者账号（$5 USD）
- [ ] 准备支付方式（信用卡/PayPal）

---

## 发布步骤

1. **注册开发者账号**
   - 访问：https://chrome.google.com/webstore/devconsole
   - 支付 $5 USD 注册费（一次性）

2. **打包扩展**
   - 在 Chrome 中访问 `chrome://extensions/`
   - 点击"打包扩展程序"
   - 选择项目根目录
   - 生成 .crx 和 .pem 文件

3. **上传到商店**
   - 登录开发者控制台
   - 点击"新增项目"
   - 上传 .zip 文件（不是 .crx）
   - 填写商店信息
   - 上传截图和图标
   - 提交审核

4. **等待审核**
   - 通常 1-3 个工作日
   - 审核通过后自动发布

---

## 注意事项

1. **首次发布**：审核可能较慢，需要耐心等待
2. **截图质量**：确保截图清晰，展示核心功能
3. **描述准确**：不要夸大功能，避免误导用户
4. **权限最小化**：只申请必需的权限
5. **隐私合规**：明确说明数据使用方式

---

## 后续维护

- 定期更新版本
- 及时回复用户评论
- 修复 bug 和添加新功能
- 保持 GitHub 仓库活跃

---

**准备完成后，访问：**
https://chrome.google.com/webstore/devconsole

**开源仓库：**
https://github.com/dengqu-netizen/review-extension
