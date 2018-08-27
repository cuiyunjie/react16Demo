1. 递进用2空格，不然遇到复杂的组件，jsx 的 4 格递进会让人崩溃。用空格的原因是避免空格和tab混合出现，会有一些不必要的文件改动。
1.1 字符串用单引号？ jsx 用双引号
2. 无用的代码删掉，包括无用的自动生成的注释，比如文件开头的作者是谁，这些信息svn 里面都有。包括一些去除的功能，避免代码污染。
  代码不允许有 warning
  脚本支持 linux 和 windows，代码中不能包含和环境相关的硬编码，比如规定代码放在 D 盘。
3. 写 CSS 可以用 scss 语法，全局css 参照 BEM 方式。
3.1. scss 全局样式放在 app/components/theme, user 的主题放置在  app/components/theme 里面，以此类推。
3.2. scss 使用 autoprefixer 和 stylelint？
3.3. scss 里面的颜色和基本 layout，z-index 定义在一个 variables.scss (详细参考代码).
3.4. CSS 文件放在 app 里面，通过 import 或者 require 的方式加载，可以获得 autoprefixer 的优化。静态 css 放在static 目录里面。
4. 项目结构分为 user 和 admin
5. app/components 放置多个 user 和 admin 公用的组件，app/user/components 放置 user 公共的组件，以此类推。
6. 项目开发中如有类似的组件，应及时提取抽象，原则上不容忍代码复制。
7. 拖拽功能用 react-dnd 实现
8. 图标用 echarts
9. 开发过程中不懂的代码要及时弄懂，避免错误的代码被反复拷贝引用。
10. 开发过程中发现了好的写法，及时分享并应用。
11. 框架的引入要慎重，减少系统依赖，提高编译和加载速度。如果一定要用，尝试在路由上添加分块。
12. 系统开发流程分为 1-本地开发，2-测试，3-beta和4-线上，理论上后端至少有两套环境（开发和线上），1,2连开发，3，4连线上。    
13. 组件的引用不用相对路径，用 alias 开头，除非同级文件。
14. 文件名全部用小写