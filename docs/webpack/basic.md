### 01. webpack 构建流程
#### options 参数初始化
- 解析 shell 语句，提取命令行参数，与项目中的配置文件比如 webpack.config.js 整合成 options 对象，它里面包含了之后构建阶段所需的所有重要信息，比如 entry、output、plugins 插件集合、module 模块配置如包含的 Loaders 等
#### 开始编译
- webpack 接收 options 参数，实例化 compiler 对象，执行 run 方法，这里是 webpack 实际真正的入口，执行 run 会调用 compile 方法，生成 compilation 对象，正式开始编译和构建
#### 模块构建
- compiler 触发 make 方法，调用 Compilation.addEntry，根据 options 参数中的 entry 字段找到入口文件，在 addEntry 中调用私有方法 _addModuleChain 执行模块创建和 build module，包括使用对应的 Loader 处理资源，递归分析当前模块的依赖，对每个依赖模块进行build
- 所有模块及其依赖模块 build 完成之后，webpack 监听 seal 事件调用对应插件对构建后的结果进行封装，要逐次对 module 和 chunk 进行整理，生成编译后的代码，合并、拆分、生成 hash，同时这一步也是对源码进行优化和功能添加的关键关节
#### 文件生成
- emit assets。调用 compilation 对象的 createChunkAssets 方法生成打包后的代码，最终输出 bundle 文件
- - -
### 02. 热更新原理
- - -
### 03. Tree shaking 原理
- 一个模块可能有多个方法，Tree shaking 就是利用 ES 模块的特性，只会将代码中实际用到的方法打入 bundle ，没有用到的方法会在 uglify 阶段擦除
- - -
### 04. 可以做哪些优化
#### 构建过程优化
>使用 speed-measure-webpack-plugin 分析构建过程中每个 loader 和 plugin 消耗的时间
- 多进程多实例构建提升打包速度
    - webpack3 中使用 Hapypack 进行多进程多实例的构建，webpack4 中推荐使用 thread-loader
    - terser-webpack-plugin 多进程并行压缩代码，构造函数中传入 parallel: true 开启
- 缩小构建目标。loader 中配置 include；合理配置 resolve.alias 和 resolve.extensions
- 充分利用缓存提升二次构建速度。开启 babel-loader 的缓存，terser-webpack-plugin 的缓存，构造函数中传入 cache: true；使用 hard-source-webpack-plugin 对模块进行缓存
#### 生成代码优化
>使用 webpack-bundle-analyzer 插件查看打包后文件的体积
- optimize-css-assets-webpack-plugin 压缩 CSS
- terser-webpack-plugin 压缩 JS
- url-loader 配置 limit 参数
- image-webpack-loader 压缩图片
- Tree shaking
    - 对有副作用的代码不生效，因此在package.json 里声明 sideEffects 数组，这些文件不进行 Treeshaking 优化；设为 false 则表示全部进行 Treeshaking 优化
- 使用 SplitChunksPlugin 提取页面公共资源，单独打包成一个文件
- 使用 DLLPlugin
- Scope Hoisting
- 代码分割和动态 import
- - -
### 04. Loader 和 Plugin 的区别
- Loader 主要用来处理对应的资源。将非 JS 文件转化为 webpack 可处理的有效模块添加到依赖图中。其本身是一个函数，接收源文件作为参数，返回转换后的结果
- Plugin 存在于整个打包构建过程中，提供了更多额外的功能比如注入环境变量、进行打包优化等
- - -
### 05. chunk 和 module 的区别
- webpack 把一切资源都看作模块，一个文件对应一个模块
- chunk 是代码块，是一个和多个模块的集合，用于代码的分割与合并
- - -
### 06. hash、contentHash 和 chunkHash
> 文件指纹可用来做版本管理，标记文件更新，没有发生变化的资源依旧可以使用缓存
- hash 和整个项目构建相关。只要项目文件发生变化，就会产生一次新的 Compilation 过程，整个项目的 hash 值就会发生变化
- chunkHash 和 webpack 在打包过程中生成的 chunk 相关，比如不同的 entry 会生成不同的 chunk，一个 chunk 内容发生了改变并不会影响到其他 chunk
- contentHash 完全由文件内容来生成 hash
- - -
### 07. webpack 核心概念
#### 本质
- 一系列插件的集合。基于事件流的工作机制，使用 Tapable 将各个插件有序地串联起来。webpack3 及以前的 tapable 提供 plugin 方法注册插件，apply 方法触发插件的调用；而在 webpack4 中tapable 暴露了很多钩子来为插件创建钩子函数。其中 syncHook 只能通过 tap 方法添加消费者，通过 call 来触发钩子的顺序执行，对于 async 类型的 hook 来说，还能使用 tapAsync、tapPromise 注册，使用 callAsync 和 promise 来执行。比如在 make 阶段，就是使用 tapAsync 注册了一个 DllEntryPlugin，就是在这里调用了 compilation 对象的 addEntry 方法将所有入口模块添加到编译构建队列中，开启编译流程。
#### compiler 对象
- 继承自 Tapable，包含了 webpack 所有的配置信息，options、loaders 和 plugins 等。这个对象在 webpack 启动时实例化生成，是全局唯一的，可以看作是 webpack 实例
#### Compilation 对象
- 继承自 Tapable，负责组织整个打包过程，其中包含了每个构建环节及输出环节所对应的方法，比如 addEntry、_addModuleChain、buildModule、seal、createChunkAssets 等，也包含了所有的 module、chunk 生成的 assets 和用来生成最后打包文件的 template 等
#### 二者异同
- Compiler 只在 webpack 启动时实例化生成，全它是局唯一的，代表了整个 webpack 从启动到关闭的生命周期，它不关心具体细节实现
- compilation 代表的是一次新的编译。根据入口递归遍历依赖、构建对应模块，优化 chunk 等一些列具体的打包过程都是 Compilation 负责的，每当检测到一个文件变化，一次新的 Compilation 将被创建
- - -
### 08. 用过哪些 Loader
- raw-loader
>内联静态资源。可以将不需要被打包的文件直接引入 HTML 模板，例如老旧代码、需要提前运行的 JS 代码比如计算 rem，埋点上报统计脚本，公共的 meta 片段等
- babel-loader
>配合 @babel/preset-env、@babel/preset-react 等 preset 和相关插件转换 ES6 代码和 JSX
- less-loader
>将 less文件 转换为 css
- css-loader
>处理 css 文件
- style-loader
>将 css 以 style 标签的形式注入 DOM 中
- postcss-loader
>提供 CSS 语法扩展，可配合 autoprefixer 插件自动补齐 CSS3 前缀，也可使用 postcss-preset-env
- file-loader
>处理图片和字体等文件
- url-loader
>类似 file-loader，但可以额外设置 limit 参数，文件体积小于该参数会直接转成 base64 编码内联到 HTMl 文档中，不生成单独的文件，减少 HTTP 请求
- eslint-loader
>使用 eslint 检查 JS 代码
- image-webpack-loader
>压缩图片
- - -
### 09. 用过哪些插件
- HotModuleReplacementPlugin
>webpack 内置插件，用于 HMR
- DefinePlugin
>webpack 内置插件，创建在编译时定义的全局常量，可在项目任意源码内访问到，但不能在 node 环境例如 webpack 配置文件中访问到，webpack4 设置 mode 参数以后，会默认生成 process.env.NODE_ENV
- html-webpack-plugin
>生成 HTML 文件，将打包生成的资源自动引入 HTML 中
- mini-css-extract-plugin
>将 CSS 提取为单独的文件
- clean-webpack-plugin
>清理构建目录
- speed-measure-webpack-plugin
>查看构建过程中每个 loader 和 plugin 消耗的时间
- webpack-bundle-analyzer
>查看构建生成的文件体积，针对性做优化
- FriendlyErrorsWebpackPlugin
>优化构建时的命令行显示日志
- optimize-css-assets-webpack-plugin
>压缩生成的 CSS，需要使用 cssnano
- terser-webpack-plugin
> 压缩打包生成的 JS
- SplitChunksPlugin
>
- DllPlugin
