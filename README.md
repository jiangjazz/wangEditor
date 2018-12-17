
# wangEditor_modify

## 修改
```
m1.2.0
新增
- 新增配置参数 uploadCompress，上传图片压缩系数，默认0.7
修改
- 上传图片样式调整
m1.1.1
- 修改了一些说明，测试npm是否正常
m1.1.0
- 上传图片添加压缩功能
m1.0.2
- 添加了一个自定义按钮 hidden，触发自定义方法 hiddenClick
m1.0.1
- 修改了link图标为class w-jzc-icon-link （需自行添加对应图标）
m1.0.0
- 添加了一个自定义按钮 enclosure，触发自定义方法 enclosureClick。
```

## 自定义配置
```
- menu icon缺少图标 w-jzc-icon-hidden、
```

## 介绍
这东西就是个自用的东西，以上

## 使用

```javascript
var E = window.wangEditor
var editor = new E('#div1')
editor.create()
```


## 运行 demo

- 安装或者升级最新版本 node（最低`v6.x.x`）
- 进入目录，安装依赖包 `cd wangEditor && npm i`
- 安装包完成之后，windows 用户运行`npm run win-example`，Mac 用户运行`npm run example`
- 打开浏览器访问[localhost:3000/index.html](http://localhost:3000/index.html)
- 用于 React、vue 或者 angular 可查阅[文档](http://www.kancloud.cn/wangfupeng/wangeditor3/332599)中[其他](https://www.kancloud.cn/wangfupeng/wangeditor3/335783)章节中的相关介绍

## 关于 原作者
如果你感觉有收获，欢迎给 原作者 打赏

![图片](https://camo.githubusercontent.com/e1558b631931e0a1606c769a61f48770cc0ccb56/687474703a2f2f696d61676573323031352e636e626c6f67732e636f6d2f626c6f672f3133383031322f3230313730322f3133383031322d32303137303232383131323233373739382d313530373139363634332e706e67)

