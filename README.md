什么值得玩
===
# 项目环境搭建
## 环境准备
- 安装node，请参考http://nodejs.org/
- 安装git，请参考http://git-scm.com/
- 安装bower，执行npm install -g bower (Linux环境下可能需要sudo)
- 安装grunt，执行npm install -g grunt-cli (Linux环境下可能需要sudo)
- 安装cordova (原phonegap)，执行npm install -g cordova (Linux环境下可能需要sudo)

## 安装项目依赖
- 安装项目所依赖的js：在项目目录下执行 bower install (该命令会访问github，由于国内网络环境原因，速度会很慢)
- 安装grunt依赖：在项目目录下执行 npm install

## 运行web环境 (可选，开发用)
- 在项目目录下执行 grunt server

## 打包
- 打包web：在项目目录下执行 grunt build --force ，grunt会压缩打包项目并拷贝到cordova的www目录下
- 打包apk：连接手机，并调为USB调试模式，在cordova目录下执行 cordova run android
