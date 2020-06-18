### 01. DIV+CSS 布局的好处
- 代码精简，结构与样式分离，更易于维护
- 结合 H5 语义化标签可以写出结构更加良好的页面，更有利于 SEO
- 结合 CSS3 可以实现更丰富的页面效果，提升用户体验
### 02. CSS 选择器种类及优先级
- !important
- html 标签上使用 style 写内联样式
- id 选择器
- 类、属性、伪类选择器
- 标签、关系选择器
- 通配符
### 03. a 标签样式问题
- 在书写伪类样式时保证正确的顺序：link-visited-hover-active
### 04. 盒模型
- 在布局和计算样式时，我们把页面中的元素抽象成一个个的盒子，盒子尺寸包含content、padding、border、margin 四部分。计算方式有两种，标准盒模型 boxsizing: content-box 和 border-box。在标准盒模型中，指定的宽度只是内容区域，盒子占据的页面大小要加上内边距，边框和外边距；而 border-box 指定的宽度是内容加内边距加边框的总和。设置的背景色都会在内容区域和内边距区域生效。
### 05. border-box 的应用场景
- 对于可替换元素 `input` 和文本域 `textarea` 等，设置 display: block 是无法100% 自适应父容器的，只能通过设定 width: 100% 来充满父容器，这时推荐使用 box-sizing: border-box，以免在设置 padding 等样式时宽度超过父容器

[效果在这里](https://codepen.io/bryance/pen/ZEbZqrR)
### 06. 哪些 CSS 样式可以继承，哪些不可以继承
- 可以继承：`font-size`、`font-style`、`font-weight`、`font-family`、`line-height`、`color`、`text-align`
- 不能继承：`width`、`height`、`padding`、`margin`、`border`
### 07. line-height
- 属性默认值是 normal，还可以是数值、百分比值以及长度值
- 数值。最终计算值是和当前 font-size 相乘后的值
- 百分比值。最终计算值是和当前 font-size 相乘后的值
- 长度值。即带单位的值
- **不同点在于**，若使用数值，则子元素继承的就是这个值；而使用百分比或者长度值，则子元素继承的是最终计算值

[效果在这里](https://codepen.io/bryance/pen/wvKZQGp)
### 08. 元素尺寸
- offsetWith。元素的 border-box 尺寸。包括 content、padding 和 border，有时候也称为元素偏移尺寸
- clientWith。元素的 padding-box 尺寸。包括 content、padding 但**不包括** border，有时候也称为元素可视尺寸

[效果在这里](https://codepen.io/bryance/pen/JjYVmbw?editors=1111)
### 09. BFC
 - 块级格式化上下文。在页面中形成一块独立的区域，区域内元素的样式不会对外部布局产生任何影响。
 - 特点: 不会发生 margin 重叠；可以用来清除浮动产生的影响。因为子元素浮动就会脱离文档流造成父元素高度塌陷，这样就会对后面元素的布局产生影响；这时候只要把父元素变成一个 BFC，利用 BFC 的特性就可以消除浮动带来的影响了。
 - 触发条件：
 1. html 根元素
 2. float 值不为 none
 3. position 值为 fixed 或 absolute
 4. display 值为 flex、table-cell、inline-block 和 table-caption
 5. overflow 值不是 visible 的块级元素
 - 应用：
 - 清除子元素浮动造成父元素高度塌陷的影响
 - 消除垂直方向外边距重叠
 - 一侧定宽另一侧区域自适应的两栏布局

[效果在这里](https://codepen.io/bryance/pen/dyYLQrz)
### 10. 重排和重绘
##### 重排
- 在页面渲染的流程中，浏览器先解析 `HTML` 构建 `DOM` 树，同时根据 `CSS` 计算出每个 `DOM` 节点的样式；接着进行布局，也就是计算 `DOM` 树中所有**可见元素**的几何位置，确定元素间的几何位置关系，才能继续之后的渲染步骤。而如果我们修改了 `DOM` 元素的几何位置属性比如元素的宽、高等，浏览器需要重新布局，会再次计算，因为其他元素的几何属性和位置信息也会受到影响。重排导致的结果是几乎需要重跑一遍渲染流程，因此会带来高昂地性能开销，也称为回流
##### 重绘
- 仅仅修改了 `DOM` 的样式，比如字体颜色，背景色而没有影响到元素的几何属性，比如设置 `visibility: hidden` 这时浏览器不需要重新计算布局，直接绘制新样式即可，造成的影响要比重排小一些
> 重排一定会造成重绘，重绘不一定导致重排
#### 具体哪些操作会造成重排
- 修改元素的几何属性，比如 width、height、padding、margin、top、left、border 等
- 获取 offsetWidth、clientWidth、scrollTop 等
- 使用 `display: none` 将元素隐藏
- 调用 `getComputedStyle` 或者 IE 里的 `currentStyle` 时浏览器会重新计算样式，也会触发重排
###### 如何规避重排
- 避免使用 `style` 逐条修改样式，应该使用 `class` 合并样式
- 避免使用 `table` 布局
- 不要频繁修改 `DOM`，尽量去批量操作 `DOM`，比如使用 `DocumentFragment`
- 对于像 `window` 的 `resize` 这类事件进行防抖处理
- 使用 transform/opacity 制作动画效果，并将其提升至单独的渲染层开启硬件加速。比如:
```
.el {
  will-change: transform;
  transform: translateZ(0);
}
```
> 在真正的实际情况中，并不是每次涉及到几何尺寸的改变都会进行一次重排。浏览器自身会缓存一个队列，把涉及到重排和重绘的任务放进去，批量去处理。但当我们需要获取一些“即时性”属性值比如 `offsetWidth` 时，浏览器为了得到此时精准的属性值，会将队列中的任务提前出队进行布局计算，这就触发了一次重排。比如：
```
const el = document.querySelector('#app');
el.style.width = '50px';
el.style.height = '50px';
el.style.border = '5px solid red';
el.style.color = 'red';

// 虽然连续设置了三次几何属性宽高和边框以及改变了元素的字体颜色，但只会触发一次重排和一次重绘
```
### 11. 清除浮动的方式
- 额外添加一个有 `clear: both` 样式的标签
- 设置父元素触发 `BFC` 特性，如 `overflow: hidden`;
- 使用伪类
```
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
```

[效果在这里](https://codepen.io/bryance/pen/ExVJGKZ)
### 12. display: inline-block 显示间隙的问题
- 标签之间的换行、空格回车等在字体大小不为 0 的情况下会被浏览器合并解析为一个空白符并占据一定宽度，因此 `inline-block` 元素间就产生了空隙
#### 解决办法
- 把子标签写在同一行
- 父元素设置 font-size: 0; 在子标签里重新设置正确的字体大小
- 浮动子元素

[效果在这里](https://codepen.io/bryance/pen/pojBqrg)
### 13. CSS3 新特性
#### transition 过渡
- 允许的值为
  - 要添加过渡效果的 CSS 属性
  - 过渡所需的时间
  - 效果曲线
  - 延迟
#### CSS3 选择器
- el1~el2: 选择前面是 el1 元素的 el2 元素
- el[attribute^="value"]: 选择属性值以 `value` 开头的 el 元素
- el[attribute$="value"]: 选择属性值以 `value` 结尾的 el 元素
- el[attribute*="value"]: 选择属性值包含 `value` 值的 el 元素
- el:nth-child(2n): 选择父元素下第偶数个子元素的 el 元素
- el:last-child、first-child(CSS2)
- el:nth-of-type(2n): 选择父元素下 el 元素里的第偶数个 el 元素
- el:first-of-type、el:last-of-type
```
<ul>
  <p>额外元素</p>
  <li>li</li>
  <li>li</li>
  <li>li</li>
</ul>
li:nth-of-type(2n) 只找 li 里的第偶数个，最终选中第二个 li
li:nth-child(2n) 在 ul 下所有子元素里找第偶数个子元素是 li，最终选中第一个和第三个li，因为`p`元素是第一个子元素，第一个 li 是第二个子元素，满足偶数的条件
```
[效果在这里](https://codepen.io/bryance/pen/RwrWNoO?editors=1100)
#### flex
- 设置了 display: flex 的称为容器，容器内部的元素称为项目，容器有主轴和交叉轴，作用于容器的有六个属性:
1. flex-direction 决定主轴方向row和column，起点在左还是右
2. flex-wrap 主轴排列不下项目时是否换行显示，默认不换行，缩小项目占据的主轴空间尺寸
3. flex-flow 是前面两个的简写
4. justify-content 项目在主轴上的对齐方式
5. align-items 项目在交叉轴上的对齐方式，默认 stretch，铺满交叉轴的空间，多列等高
6. align-content 存在多跟轴线时的对齐方式
- 项目上也可设置六个属性
1. order 定义项目在容器中的排列顺序，数字越小越靠前
2. flex-basis 在分配剩余空间之前项目占据的主轴空间，浏览器根据这个值判断主轴是否存在剩余空间。默认值为 auto，即项目本身的大小
3. flex-grow 若存在剩余空间，各项目将按这个比例分配剩余空间放大。默认值为 0，即即使有剩余空间，也不放大
4. flex-shrink 缩小比例。若主轴空间不足，则按照这个比例进行缩小，默认值为 1，负值无效
5. flex flex-grow和flex-shrink以及flex-basis的简写
    - 三个属性都取默认值就是flex的默认值即 0 1 auto
    - auto 代表 1 1 auto
    - none 代表 0 0 auto
    - 非负数字，是 flex-grow 的值即 flex: 1 代表 1 1 0%
    - 0 代表 0 1 0%
    - flex 取值为长度或百分比，则为 flex-basis 的值，即 flex: 0% 代表 1 1 0%
    - flex 取值为两个非负数字，则分别为 flex-grow 和 flex-shrink 的值即flex: 2 3 代表 2 3 0%
    - flex 取值为一个非负数字和长度或百分比，则为 flex-grow 和 flex-basis 的值，即 flex: 1 0% 代表 1 1 0%
6. align-self 单独定义自己的对齐方式
#### flex 计算公式
##### 子元素溢出时
1. 计算溢出量
2. 根据各项目自身宽度乘以缩小比例求和计算总权重
3. 然后计算需要缩小的尺寸。溢出量乘以缩小比例乘以自身宽度再除以总权重
4. 使用自身宽度减去需要缩小的尺寸就是元素最终的尺寸
```
.container {
  display: flex;
  width: 600px;
}
.left {
  flex: 1 2 500px;
  background: red;
}
.right {
  flex: 2 1 400px;
  background: green;
}
1. 溢出量为 500 + 400 - 600 = 300
2. 总权重为 2 * 500 + 1 * 400 = 1400
3. 左侧项目需要缩小的尺寸为 2 * 500 * 300 / 1400 = 214.28；右侧项目需要缩小的尺寸为 1 * 400 * 300 / 1400 = 85.72
4. 左侧项目最终尺寸为 500 - 214.28 = 285.72；右侧项目最终尺寸为 400 - 85.72 = 314.28
```
##### 子元素放大时
1. 计算主轴剩余空间
2. 根据放大系数和剩余空间计算各项目可以放大的尺寸
3. 原尺寸加上放大尺寸
```
.container {
  display: flex;
  width: 600px;
}
.left {
  flex: 1 2 300px;
  background: red;
}
.right {
  flex: 2 1 200px;
  background: green;
}
1. 主轴剩余空间为 600 - 300 - 200 = 100
2. left 可放大的空间为 100 * 1 / (2 + 1) = 33.33；right 可放大的空间为 100 * 2 / (2 + 1) = 66.67；
3. left 最终尺寸为 300 + 33.33 = 333.33；right 最终尺寸为 200 + 66.67 = 266.67
```
[效果在这里](https://codepen.io/bryance/pen/wvMKaGe)
#### box-shadow 盒子阴影
- 允许的属性值依次为：水平阴影位置、垂直阴影位置、模糊距离、阴影大小、阴影颜色、inset。
- 其中水平阴影正值向右负值向左，垂直阴影位置正值向下负值向上
- 除了水平和垂直的阴影位置外，其他属性均为可选
```
box-shadow: 0 0 10px #aaa inset;
```

[效果在这里](https://codepen.io/bryance/pen/rNObZEY)
#### text-shadow 文字阴影
- 允许的属性值依次为水平阴影位置、垂直阴影位置、模糊距离、阴影颜色
- 其中水平阴影正值为向右负值向左，垂直阴影位置正值向下负值向上
- 除了水平和垂直的阴影位置外，其他属性值均为可选
```
text-shadow: 2px 2px 4px #000;
```

[效果在这里](https://codepen.io/bryance/pen/LYpvgEX)
#### opacity 透明度
#### border-radius 圆角
- 最多可指定 **4** 个圆角，顺序从左上角开始，按照顺时针方向，依次是右上角、右下角最终回到左下角
- 如果省略一个，则取“对角线”的值，比如省略左下角，就取右上角的值；省略了右下角和左下角的值，就分别对应左上角和右上角的值
```
border-radius: 5px;
border-radius: 5px 10px;
border-radius: 5px 10px 20px;
```

[效果在这里](https://codepen.io/bryance/pen/GRpLYqg)
#### CSS3 动画 animation
- 允许的属性值分别为:
    - name 绑定到选择器的 keyframe 名称
    - duration 完成动画所需的时间
    - timing-function 动画的速度曲线比如 linear(线性)、ease-in 等缓动效果以及自定义的贝塞尔曲线等
    - delay 动画开始前的延迟
    - iteration-count 动画播放次数，infinite 无限播放
    - direction 是否应该正反轮流播放动画 normal/alternate
- 例如一个无限旋转的动画
```
@keyframes rotate-ani {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```
[效果在这里](https://codepen.io/bryance/pen/KKdYbYN)
### 14. 移动端适配
- 使用 `meta` 标签声明 `viewport`
```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```
- 使用媒体查询针对不同尺寸的屏幕实现响应式网页
```
@media (min-width: 321px) and (max-width: 750px) {
  // 代码
}
@media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49),
  (min-device-pixel-ratio: 1.5) and (max-device-pixel-ratio: 2.49) {
  // 代码
}
```
[效果在这里](https://codepen.io/bryance/pen/rNOgwMR#unsupported-modal)
- 使用相对单位 `rem` 来做适配
    - `rem` 是一个相对单位，相对根节点 `html` 的字体大小来做计算；只要根据设备宽度动态的修改根节点的字体大小就可以成比例的对页面布局进行适配
- 使用 `viewport` 单位 `vw` 和 `vh`
    - `vw` 和 `vh` 即将视口宽度和高度等分成 `100` 份，即 `1vw` 等于视口宽度的 `1%`
    - `vmin` 表示 `vw` 和 `vh` 中的较小值
    - `vmax` 表示 `vw` 和 `vh` 中的较大值
    - 缺点：与 `px` 转换时不一定能整除，会带来像素差
    - 当容器使用 `vw`，`margin` 使用 `px` 时，容易造成总宽度超过 `100vw`，影响布局效果；可以使用 `padding` 替代 `margin`，或者 `calc()` 函数计算等方式规避

  
### 15. 移动端 `1px` 边框变粗问题及怎么解决
###### 原因
- 在高分辨率的 `Retina` 屏幕中一个 `css` 像素是由多个物理像素共同渲染而成的。比如 `dpr` 为 `2` 的设备，一个 `css` 像素包含了四个物理像素。
###### 解决
- 使用伪类并根据不同的 dpr 进行 transform 缩放
```
.line1px {
  position: relative;
}
.line1px:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: #000;
  transform-origin: 50% 0%;
}
@media (-webkit-min-device-pixel-ratio: 1.5) and (-webkit-max-device-pixel-ratio: 2.49) {
  .line1px:before {
    transform: scaleY(0.5);
  }
}
@media (-webkit-min-device-pixel-ratio: 2.5) and (-webkit-max-device-pixel-ratio: 3),
  (min-device-pixel-ratio: 2.5) and (max-device-pixel-ratio: 3) {
  .line1px {
    color: #1890ff;
  }
  .line1px:before {
    transform: scaleY(0.333);
  }
}
```
[效果在这里](https://codepen.io/bryance/pen/pojmwNO)
- 制作现成的图片作为 `border-image`。基于媒体查询判断不同的 `dpr` 给定不同的`border-image`
- 与 `border-image` 类似，制作符合条件的边框背景图，模拟在背景上。这两种方式的缺点是需要准备单独的图片，且圆角效果不好处理。
- 也可以使用`svg`
### 16. `rem` 和 `em` 的区别
- `rem` 相对于根节点的字体大小做计算，假设 `html` 的 `font-size` 为 `16px`；则 `1rem=16px`；
- `em` 则相对于当前 `font-size` 做计算，若定义的就是字体大小，则以继承到的字体大小为基准做计算

[效果在这里](https://codepen.io/bryance/pen/qBOGPgG)
### 17. width、height、padding、margin 等百分比值怎么计算
- width 百分比值基于父容器
- height 百分比值基于父容器
- padding 百分比值无论是水平方向还是垂直方向均是相对于父元素的宽度计算的，由此我们可以轻松实现自适应的等比例矩形效果，比如对一个块级元素 padding: 50% 就可以实现一个正方形；padding-bottom: 50%；就得到了一个高度始终为宽度一半的矩形

### 17. 块级元素居右显示
- margin-left: auto




