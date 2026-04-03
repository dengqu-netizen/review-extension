#!/usr/bin/env python3
"""
生成评审标注插件图标
设计理念：文档 + 标注气泡 + 对勾
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_review_icon(size):
    """创建评审标注图标"""
    # 创建透明背景
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 计算缩放比例
    scale = size / 128

    # 背景圆形 - 渐变蓝紫色
    padding = int(8 * scale)
    bg_color = (102, 126, 234, 255)  # #667eea
    draw.ellipse([padding, padding, size-padding, size-padding],
                 fill=bg_color)

    # 绘制文档图标（白色）
    doc_left = int(size * 0.25)
    doc_top = int(size * 0.2)
    doc_right = int(size * 0.75)
    doc_bottom = int(size * 0.7)
    doc_color = (255, 255, 255, 255)

    # 文档主体
    draw.rounded_rectangle(
        [doc_left, doc_top, doc_right, doc_bottom],
        radius=int(3 * scale),
        fill=doc_color
    )

    # 文档上的横线（表示文本）
    line_color = (102, 126, 234, 255)
    line_width = int(2 * scale)
    line_spacing = int(8 * scale)

    for i in range(3):
        y = doc_top + int(15 * scale) + i * line_spacing
        draw.line(
            [doc_left + int(8 * scale), y,
             doc_right - int(8 * scale), y],
            fill=line_color,
            width=line_width
        )

    # 绘制标注气泡（红色，右下角）
    bubble_size = int(size * 0.35)
    bubble_x = int(size * 0.65)
    bubble_y = int(size * 0.65)
    bubble_color = (239, 68, 68, 255)  # #ef4444

    # 气泡圆形
    draw.ellipse(
        [bubble_x - bubble_size//2, bubble_y - bubble_size//2,
         bubble_x + bubble_size//2, bubble_y + bubble_size//2],
        fill=bubble_color
    )

    # 气泡上的数字 "1"
    try:
        # 尝试使用系统字体
        font_size = int(bubble_size * 0.6)
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        font = ImageFont.load_default()

    text = "!"
    # 获取文本边界框
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    text_x = bubble_x - text_width // 2
    text_y = bubble_y - text_height // 2 - int(2 * scale)

    draw.text((text_x, text_y), text, fill=(255, 255, 255, 255), font=font)

    return img

# 生成不同尺寸的图标
sizes = [16, 48, 128]
script_dir = os.path.dirname(os.path.abspath(__file__))

for size in sizes:
    icon = create_review_icon(size)
    icon.save(os.path.join(script_dir, f'icon{size}.png'))
    print(f'✓ 已生成 icon{size}.png')

print('\n图标生成完成！')
print('设计说明：')
print('- 蓝紫色圆形背景（#667eea）- 代表专业和科技感')
print('- 白色文档图标 - 代表原型/页面')
print('- 红色标注气泡带感叹号 - 代表评审标注')
