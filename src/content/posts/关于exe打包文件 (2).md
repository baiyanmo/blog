---
title:关于exe文件打包
published: 2025-11-10
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---

# 关于exe文件打包

###### .py/.pyw  → 需要安装 Python 才能运行

**.py 文件:**

- 用 `python.exe` 运行
- **会显示控制台窗口**(黑色命令行窗口)
- 适合命令行程序、脚本、后台任务

**.pyw 文件:**

- 用 `pythonw.exe` 运行
- **不显示控制台窗口**(纯GUI程序)
- 适合图形界面程序、桌面应用

###### .bat      → 只是命令脚本，还是要调用其他程序

###### .exe      → 完全独立，任何 Windows 电脑都能运行

---

### pyinstaller --onefile --windowed --name "PDF转Word转换器" PDF转Word.pyw

- `--onefile`: 打包成单个exe文件

- `--windowed`: 无控制台窗口(GUI程序)

- `--clean`: 清理缓存重新打包

- `--name`: 指定exe名称

- ---

### pyinstaller --clean PDF转Word转换器.spec

###### 生成spec文件

```pyi-makespec --onefile --windowed PDF转Word.pyw```

---

### 关于spec文件的配置

```# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['PDF转Word.pyw'],
    pathex=[],
    binaries=[],
    datas=[],
    hiddenimports=['pdf2docx', 'pdf2docx.converter', 'fitz', 'docx', 'docx.shared', 'PIL', 'PIL.Image', 'lxml', 'lxml.etree'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['matplotlib', 'numpy', 'scipy', 'pandas', 'pytest', 'IPython', 'notebook', 'setuptools', 'pkg_resources'],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='PDF转Word转换器',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='NONE',
)```
```

**spec文件完整配置详解:**

------

## **1. Analysis - 代码分析阶段**

### **当前配置解析:**

**hiddenimports** - 强制包含的模块:

- `pdf2docx, pdf2docx.converter` - PDF转换核心引擎
- `fitz` - PyMuPDF的导入名(PDF处理备用方案)
- `docx, docx.shared` - Word文档创建库
- `PIL, PIL.Image` - 图像处理(提取PDF中的图片)
- `lxml, lxml.etree` - XML解析(docx内部格式)

**excludes** - 排除的模块:

- `matplotlib, numpy, scipy, pandas` - 科学计算库(不需要,且体积大)
- `pytest, IPython, notebook` - 开发工具(运行时不需要)
- `setuptools, pkg_resources` - 打包工具(避免依赖冲突)

## **2. PYZ - Python代码归档**

- `a.pure`: Analysis收集的所有.py文件
- 压缩后嵌入exe,提高加载速度

## **3. EXE - 可执行文件生成**

exe = EXE(
    pyz,                            # Python代码归档
    a.scripts,                      # 启动脚本
    a.binaries,                     # 二进制依赖(.dll等)
    a.datas,                        # 数据文件
    [],                             # 额外文件(此处为空)
    
    name='PDF转Word转换器',          # 生成的exe文件名
    debug=False,                    # 调试模式(True会输出详细日志)
    bootloader_ignore_signals=False,# 引导程序是否忽略信号
    strip=False,                    # 是否去除调试符号(Linux/Mac)
    upx=True,                       # 启用UPX压缩(可减小30-50%体积)
    upx_exclude=[],                 # 排除UPX压缩的文件
    runtime_tmpdir=None,            # 运行时临时目录
    console=False,                  # 是否显示控制台(False=纯GUI程序)
    disable_windowed_traceback=False,# 是否禁用窗口化异常追踪
    argv_emulation=False,           # macOS参数模拟
    target_arch=None,               # 目标架构(None=当前系统)
    codesign_identity=None,         # macOS代码签名
    entitlements_file=None,         # macOS权限文件
    icon='NONE',                    # 程序图标(.ico文件路径)
)

### **关键配置说明:**

**name** - 输出文件名

- 当前: `PDF转Word转换器.exe`
- 可改为任意名称(支持中文)

**console** - 控制台窗口

- `False` = GUI程序(无黑窗口) ✅
- `True` = 命令行程序(有控制台)

**upx** - 压缩

- `True` = 启用UPX压缩(推荐)
- `False` = 不压缩(启动稍快但体积大)

**icon** - 程序图标

- `'NONE'` = 使用默认图标
- `'icon.ico'` = 使用自定义图标
- 示例: `icon='logo.ico'`

**debug** - 调试模式

- `False` = 正常运行 ✅
- `True` = 输出详细日志(排查问题用)

## **常见自定义示例:**

### **添加图标:**

```icon='assets/app.ico',              # 需要准备.ico格式图标```

### **添加数据文件(如配置/图片):**

```datas=[
datas=[
    ('config.json', '.'),           # 源文件 -> 打包到根目录
    ('images/*', 'images'),         # 整个文件夹 -> 打包到images/
],
```

###  **添加DLL文件:**

```binaries=[
binaries=[
    ('lib/custom.dll', '.'),        # 第三方DLL
],
```

### **启用调试模式:**

```
debug=True,                         # exe运行时会打印详细信息
console=True,
```
