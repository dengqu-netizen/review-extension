import struct
import zlib

def create_simple_png(size, filename):
    # 创建一个简单的蓝色PNG图标
    width = height = size
    
    # PNG文件头
    png_header = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    ihdr_chunk = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT chunk - 蓝色像素数据
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # 过滤类型
        for x in range(width):
            raw_data += b'\x0d\x6e\xfd'  # RGB: #0d6efd (蓝色)
    
    compressed_data = zlib.compress(raw_data, 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed_data) & 0xffffffff
    idat_chunk = struct.pack('>I', len(compressed_data)) + b'IDAT' + compressed_data + struct.pack('>I', idat_crc)
    
    # IEND chunk
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    iend_chunk = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    # 写入文件
    with open(filename, 'wb') as f:
        f.write(png_header + ihdr_chunk + idat_chunk + iend_chunk)
    
    print(f'Created {filename}')

# 创建三个尺寸的图标
create_simple_png(16, 'icon16.png')
create_simple_png(48, 'icon48.png')
create_simple_png(128, 'icon128.png')
print('All icons created successfully!')
