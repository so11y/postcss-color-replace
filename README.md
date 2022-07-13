<div align="center">
  <h2>postcss-color-replace</h2>
  <p>用于替换项目中的颜色为你所期望的新颜色</p>
</div>

---

### 介绍

1. postcss-color-replace 可以为你替换主色中亮度10级的所有颜色
2. 比如element ui的主色为`#409EFF`但是还有依赖此颜色的10个维度的颜色都将会被替换
3. 一些简单的项目,可以立即开箱使用,不用在为不同项目不同颜色配置费神,配置量多的话还是建议改其他第三方的文件。
4. 可替换多个颜色,1对1对应。


### 下载

```shell
# 通过npm或yarn安装

# npm
npm i postcss-color-replace

# yarn
yarn add postcss-color-replace
```

### 跳过替换

1. 需要跳过的替换在上一级可以添加注释skip，将会跳过替换

``` css
.text{
    /* skip */
    color:#00000;
}

```


### 示例

1. 更多使用方式可以在项目中playground查看

``` javascript
// next.config.js 中使用
postcss: {
    plugins: [
        require('postcss-color-replace')({
            newColor: ['#00ca65', '#00ca65'],
            oldColor: ['#409EFF', '#3a8ee6']
        })
    ]
}

```

``` javascript
//post.config.js 和 vue-cli 中
module.exports = {
  plugins: [
    require("postcss-color-replace")({
      newColor: process.env.VUE_APP_NEWCOLOR, //需要parse为Array不能是string
      ordColor: process.env.VUE_APP_OLDCOLOR
    })
  ]
};
```
