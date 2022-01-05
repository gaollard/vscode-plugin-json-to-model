### 1. 介绍

data-to-interface 用于 data 到 interface 的转换，您可以对一些路径做自定义处理。可以访问弱化的 web 版本 https://gaollard.github.io/data-to-interface/index.html。

## 2. 安装

安装 vscode 插件 `data-to-interface`，它提供了如下命令：

- `data-to-interface.fromSelectionToCurrent` 从选中的 JSON 字符串 生成 ts interface, 并添加到活动编辑窗口
- `data-to-interface.fromSelectionToFile` 从选中的 JSON 字符串 生成 ts interface, 并填充到一个临时文件
- `data-to-interface.openCustomView` 打开自定义界面 

## 3. 使用

1. 选中 json 字符串。
2. 右击，选用对应的菜单按钮即可。

## 4. 缺点

只能处理JSON中的数据类型：`{} string number Array`，如果是其他类型需要使用自定义path。比如 枚举、函数、自定义类型以及 类型修饰符 readonly optional 等等。

## 5. screenshot

![selection-current](https://webang.github.io/vscode-plugin-data-to-interface/screenshot/selection-current.gif)

![selection-file](https://webang.github.io/vscode-plugin-data-to-interface/screenshot/from-selection.gif)

![操作界面](https://webang.github.io/vscode-plugin-data-to-interface/screenshot/main.png)
