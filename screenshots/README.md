# 截图准备指南

## 截图存放位置

截图文件存放在 `screenshots/` 目录中，**仅用于展示和备份**。

**重要说明：**
- 截图**不会**包含在扩展安装包中
- 截图是在 Chrome Web Store 发布时**直接上传**的
- 文件名可以随意命名，建议使用描述性名称

## 文件命名建议

虽然没有强制要求，但建议使用清晰的命名：

```
screenshots/
├── 01-popup-interface.png          # Popup 界面
├── 02-review-panel.png             # 评审面板
├── 03-annotation-example.png       # 标注示例
├── 04-export-checklist.png         # 导出功能
└── 05-english-interface.png        # 英文界面
```

## 截图要求

### 尺寸要求
- **推荐尺寸**：1280x800 像素
- **备选尺寸**：640x400 像素
- **格式**：PNG 或 JPG
- **大小**：每张最大 5MB

### 数量要求
- **最少**：1 张
- **最多**：5 张
- **推荐**：3-5 张

## 需要准备的截图

### 1. Popup 界面截图（必需）

**如何截图：**
1. 在 Chrome 中加载扩展
2. 点击扩展图标，打开 Popup 页面
3. 使用截图工具截取整个 Popup 窗口
4. 确保显示：
   - 古钱币 logo
   - "评审助手" 标题
   - 功能介绍
   - "双击 ESC 键" 提示

**保存为：** `screenshots/01-popup-interface.png`

---

### 2. 评审面板截图

**如何截图：**
1. 打开任意 HTML 页面（可以是本地测试页面）
2. 双击 ESC 键呼出评审面板
3. 截取包含评审面板的页面
4. 确保显示：
   - 浮动的评审面板
   - 评论列表（如果有）
   - 面板上的按钮和功能

**保存为：** `screenshots/02-review-panel.png`

---

### 3. 标注示例截图

**如何截图：**
1. 在测试页面上添加几个评审标注
2. 截取显示标注气泡的页面
3. 确保显示：
   - 页面元素上的标注气泡
   - 标注的序号和优先级
   - 评论表单（如果打开）

**保存为：** `screenshots/03-annotation-example.png`

---

### 4. 导出功能截图（可选）

**如何截图：**
1. 点击"导出"按钮
2. 截取导出的 Markdown 文件内容
3. 或者截取导出对话框

**保存为：** `screenshots/04-export-checklist.png`

---

### 5. 英文界面截图（可选）

**如何截图：**
1. 将浏览器语言切换为英文
2. 重新打开 Popup 页面
3. 截取英文界面

**保存为：** `screenshots/05-english-interface.png`

---

## 截图工具推荐

### macOS
- **系统自带**：
  - `Cmd + Shift + 4`：区域截图
  - `Cmd + Shift + 5`：截图工具栏
- **第三方**：
  - Snagit
  - CleanShot X

### Windows
- **系统自带**：
  - `Win + Shift + S`：截图工具
  - Snipping Tool
- **第三方**：
  - Snagit
  - Greenshot

### Chrome 扩展
- **Awesome Screenshot**
- **Nimbus Screenshot**

---

## 截图优化建议

1. **清晰度**：确保截图清晰，文字可读
2. **尺寸统一**：所有截图使用相同尺寸（1280x800）
3. **内容完整**：不要裁剪掉重要功能
4. **背景干净**：避免杂乱的背景
5. **突出重点**：可以添加箭头或高亮标注关键功能

---

## 上传到 Chrome Web Store

在 Chrome Web Store 开发者控制台中：

1. 进入"商店信息"页面
2. 找到"截图"部分
3. 点击"上传截图"
4. 选择 `screenshots/` 目录中的图片
5. 拖动调整截图顺序
6. 保存

**注意：**
- 截图会按顺序显示在商店页面
- 第一张截图最重要，会作为主图展示
- 可以随时更新截图

---

## .gitignore 配置

如果截图文件较大，可以选择不提交到 Git：

```gitignore
# 截图文件（可选）
screenshots/*.png
screenshots/*.jpg
```

但建议至少提交一张主要截图到 README 中展示。

---

## 当前状态

- [x] 创建 screenshots 目录
- [ ] 准备 Popup 界面截图
- [ ] 准备评审面板截图
- [ ] 准备标注示例截图
- [ ] 准备导出功能截图（可选）
- [ ] 准备英文界面截图（可选）

---

## 快速开始

1. 在 Chrome 中加载扩展（开发者模式）
2. 按照上面的步骤逐一截图
3. 保存到 `screenshots/` 目录
4. 等待 Chrome Web Store 开发者账号准备好后上传

**截图准备好后，就可以随时发布到 Chrome Web Store 了！**
