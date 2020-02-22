# 自选股小程序taro重构版本

## 背景

前期版本使用了wepy2.x版本开发了自选股小程序。在开发过程中虽然发现了wepy2.x相比于1.x版本有了很多的改进，更加的接近于vue。利用监听数据的变化来动态的改变UI。但在某些场景下，仍然会有问题。特别是对数组的操作中。

刚好，很久没有应用react了，在不用，之前的学习都要忘了。刚好在react方向上的小程序框架，taro无论github上，还是taro的社区中，反响都不错。而且去看了taro的文档，同样做的十分详细清楚，为开发人员提供了很多的便利。也就借武汉疫情远程办公期间，事情还不是很多，重构一下该小程序。

## 软件架构
软件架构说明
1. 前端技术栈：React Redux

## 安装教程

1. 联系 beyondaverage0908@gmail.com 

## 使用说明

#### 本地开发调试
```js
1. yarn
2. yarn dev:weapp
```
#### 发布版本
```js
1. yarn build:weapp
2. 使用小程序开发者工具，发布版本迭代
```
## 参与贡献
1. 使用master分支作为生产分支
2. 克隆项目后先切到master分支，从该分支切出到自己的分支完成开发, 合并master分支代码解决冲突
3. 提交merge request 给 其他开发者 Code Review 进行代码合入

## 注意事项

无目
