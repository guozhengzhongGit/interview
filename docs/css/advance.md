### 01. 某个盒子内的文字是动态的，希望文字少的时候居中显示，文字超过一行的时候靠左显示，怎么实现？
```
.box {
  text-align: center;
}
.content {
  display: inline-block;
  text-align: left;
}
```
[效果在这里](https://codepen.io/bryance/pen/MWadOeP)
### 02. 水平居中
- 内联元素，父元素设置 text-align: center
- 块级元素
- 定宽
    - 元素本身设置 margin: 0 auto
    - 父级元素相对定位，元素本身绝对定位，left: 50%；margin-left 设置为负方向自身宽度的一半
- 不定宽
    - 元素自身 display: inline-block；父元素设置 text-align: center；
    - 绝对定位 left: 50% + transform: translateX(-50%)
    - flex 布局使用 justify-content: center；
    
[效果在这里](https://codepen.io/bryance/pen/GRpaOvm)
### 03. 垂直居中
- line-height 实现单行文本垂直居中
#### 单行文本垂直居中
```
<!-- html -->
<div class="container">
  <span class="content">单行文本</span>
</div>

/* css */
.container {
  background-color: #f1f1f1;
}
.content {
    background-color: #aee8e2;
    line-height: 50px;
}
```
给 span 标签加上 display: inline-block 也可保持效果
#### 多行文本垂直居中
```
<!-- html -->
<div class="container">
  <span class="content">
    这里会有很多文字<br />模拟一行显示不下导致<br />自动换行的效果
  </span>
</div>

/* css */
.container {
  background-color: #f1f1f1;
  line-height: 200px;
  font-size: 0;
}
.content {
  background-color: #aee8e2;
  line-height: 1.4;
  font-size: 14px;
  vertical-align: middle;
  display: inline-block;
}
```
- 父级元素相对定位，子元素绝对定位，top 值为 50%，再设置 transform: translateY(-50%)
- 父级元素设置 display: table；子元素设置 display: table-cell；vertical-align: middle
- 弹性盒子，父元素设置 display: flex；align-items: center；
[效果在这里](https://codepen.io/bryance/pen/ExVzojy?editors=1100)
### 04. 水平垂直居中
#### 居中的元素知道宽高
- 绝对居中
```
<div class="center">
  <p>绝对居中</p>
</div>

.center {
  position: relative;
  width: 300px;
  height: 300px;
  background: #ddd;
}
.center p {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #1890ff;
}
```
- 绝对定位 left: 50%；top: 50% + margin-left 和 margin-top 分别为负的自身宽高的一半
```
<div class="margin">
  <p>负margin为自身宽高的一半</p>
</div>

.margin {
  width: 300px;
  height: 300px;
  background: #ddd;
  position: relative;
}
.margin > p {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
  background: #1890ff;
}
```
#### 居中的元素不知道宽高
- 绝对定位 left: 50%；top: 50% + transform: translate(-50%, -50%)
```
<div class="transform">
  <p>绝对定位+transform</p>
</div>

.transform {
  position: relative;
  width: 300px;
  height: 300px;
  background: #ddd;
}
.transform > p {
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```
- 父元素 设置 line-height 和 text-align: center；子元素设置 display: inline-block； vertical-align: middle;
```
<div class="line-height">
  <p>line-height</p>
</div>

.line-height {
  width: 300px;
  line-height: 300px;
  background: #ddd;
  text-align: center;
}
.line-height > p {
  display: inline-block;
  vertical-align: middle;
}
```
- table 布局。table 单元格中的内容天然垂直居中，只要设置 td 为 text-align: center；再给其中包含的 div 一个 display: inline-block 就可以
- display: table-cell；原理同上
```
<div class="table-cell">
  <p>table-cell</p>
</div>

.table-cell {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  background: #ddd;
  width: 300px;
  height: 300px;
}
```
- flex 布局
- grid 布局
```
<div class="grid">
  <p>grid布局</p>
</div>

.grid {
  display: grid;
  width: 300px;
  height: 300px;
  background: #ddd;
}
.grid > p {
  align-self: center;
  justify-self: center;
}
```

[效果在这里](https://codepen.io/bryance/pen/KKdLZxd)
### 05. 实现一个在页面里垂直居中的 div，距离屏幕两边各有 10px 的空隙，且宽高比始终为 2:1；div 内部有水平垂直居中的标题
- 给定一个块级元素 padding-bottom: 50% 即可得到一个宽高比始终为 2:1 的矩形
- 绝对定位子元素宽高设置为百分比，计算基准值为相对定位父元素的 content+padding
```
<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #ddd;
  width: 100%;
  height: 100%;
}
.outer {
  margin: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
}
.inner {
  width: 100%;
  padding-bottom: 50%;
  background: aqua;
  position: relative;
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<div class="outer">
  <div class="inner">
    <span class="content">这是标题</span>
  </div>
</div>
```
[效果在这里](https://codepen.io/bryance/pen/NWGVzEp?editors=1100)
- 使用 calc 函数计算，配合 vw 单位，给定 height 为 width 值的一半
```
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.wraper {
  height: 100%;
  margin: 0 10px;
  position: relative;
}
.content {
  width: 100%;
  height: calc(50vw - 10px);
  background: aqua;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

<div class="wraper">
  <p class="content">这是标题</p>
</div>
```
[效果在这里](https://codepen.io/bryance/pen/VwvOBav)
### 06. 实现一个品字形布局
```
<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
div {
  width: 50px;
  line-height: 50px;
  text-align: center;
}
.box1 {
  background-color: aqua;
  margin: 0 auto;
}
.box2 {
  background-color: antiquewhite;
  float: left;
  margin-left: 50%;
  transform: translateX(-100%);
}
.box3 {
  float: left;
  background-color: blueviolet;
  transform: translateX(-100%);
}
</style>

<div class="box1">1</div>
<div class="box2">2</div>
<div class="box3">3</div>
```
[效果在这里](https://codepen.io/bryance/pen/bGVyjjM)
### 07. 左侧定宽右侧自适应的两栏布局
- 左侧定宽左浮动，右侧 margin-left 为左侧宽度
```
<div class="outer">
  <aside class="left">左侧定宽200px</aside>
  <main class="right">右侧自适应</main>
</div>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.outer {
  height: 100%;
}
.left {
  height: 100%;
  float: left;
  width: 200px;
  background: antiquewhite;
}
.right {
  height: 100%;
  margin-left: 200px;
  background: aqua;
}
</style>
```
- 左侧定宽左浮动，右侧 overflow-hidden 触发 BFC
```
<div class="outer">
  <aside class="left">左侧定宽200px</aside>
  <main class="right">右侧自适应</main>
</div>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.outer {
  height: 100%;
}
.left {
  height: 100%;
  float: left;
  width: 200px;
  background: antiquewhite;
}
.right {
  height: 100%;
  background: aqua;
  overflow: hidden;
}
</style>
```
- 设置父元素 display 为 table，子元素 display 为 table-cell 单元格会自动分配空间，但**margin**会失效
```
<div class="outer">
  <aside class="left">左侧定宽200px</aside>
  <main class="right">右侧自适应</main>
</div>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.outer {
  width: 100%;
  height: 100%;
  display: table;
}
.left {
  display: table-cell;
  height: 100%;
  width: 200px;
  background: antiquewhite;
}
.right {
  display: table-cell;
  height: 100%;
  background: aqua;
}
</style>
```
- 利用定位实现(砌砖头)
```
<div class="outer">
  <aside class="left">左侧定宽200px</aside>
  <main class="right">右侧自适应</main>
</div>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.outer {
  height: 100%;
  position: relative;
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: antiquewhite;
}
.right {
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  bottom: 0;
  background: aqua;
}
</style>
```
- flex 实现
```
<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.outer {
  height: 100%;
  display: flex;
}
.left {
  width: 200px;
  background: antiquewhite;
}
.right {
  flex: 1;
  background: aqua;
}
</style>

<div class="outer">
  <aside class="left">左侧定宽200px</aside>
  <main class="right">右侧自适应</main>
</div>
```
- grid 布局实现
### 08. 右侧定宽左侧自适应的两栏布局
- 浮动+overflow: hidden **需要交换两个子元素的HTML位置**
```
<div class="outer">
  <!--  需要浮动的子元素放到上面来-->
  <main class="right">右侧定宽200px</main>
  <aside class="left">左侧自适应</aside>
</div>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.outer {
  height: 100%;
}
.left {
  height: 100%;
  text-align: right;
  background: antiquewhite;
  overflow: hidden;
}
.right {
  width: 200px;
  height: 100%;
  background: aqua;
  float: right;
}
</style>
```
### 09. 一列不定一列自适应的两栏布局
### 10. 两端对齐布局实现
### 14. 多列等高布局实现
- 使用负margin。父级容器 overflow: hidden；多列子容器指定宽度左浮动，设置 margin-bottom: -9999px; padding-bottom: 9999px;
- 父元素设置display为table，子元素设置display为table-cell。天然等高，推荐使用。
### 21. 三列布局
#### 圣杯布局(两侧定宽，中间元素自适应)
- 两侧元素各自朝各自的方向浮动，中间元素设置对于的 margin 值即可。**但在HTML书写顺序上需要将右侧盒子放在中间元素的前面**。原因是浮动元素位置不能高于前面的非浮动元素，因此会下沉到下一行，无法显示到同一行上。
#### 双飞翼布局(两侧定宽，中间元素自适应)
#### flex 布局
### 22. 多列等分布局
- 全部左浮动，设置宽度百分比
- 使用 display: table；设置布局行为 table-layout: fixed；设定宽度；所以子元素均设置 display为table-cell
- flex 布局
- column 布局
