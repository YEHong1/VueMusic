# music_app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



1.歌手列表实现思路

获取数据并渲染后实例化better-scroll,监听滚动事件获取滚动距离scrollY，上正下负。
获取每一个分类li距离顶部的距离，存储在数组tops中。每一个分类li距离顶部的高度都为前面所有li的高度(通过clientHeight获取)
从后往前遍历tops,当scrollY大于等于tops[index]时，得到currentIndex, 右侧菜单栏的currentIndex项为当前高亮项

固定分类标题在顶部是一个新的dom，直接固定在列表的顶部，根据currentIndex来得到显示的内容，并且scrollY的值小于0时才显示


2.CD旋转动画的暂停与播放

动画是一个 6s 匀速旋转360°的无限循环动画
通过设置 animationPlayState 为 runing 或 paused来控制动画的播放状态

3.点击进度条，改变歌曲的播放进度

给外层进度条添加touch事件，获取到点击的位置距离屏幕左侧的距离TouchClientX
获取外层进度条的宽度clientWidth 和 距离屏幕左侧的距离offsetLeft
哪么 (TouchClientX - offsetLeft) / clientWidth 就是歌曲播放的进度

4.播放模式的切换

在设置Vuex的时候，就设置了一个歌曲列表playList和播放顺序列表sequenceList
在顺序播放的时候，playList 和 sequenceList的顺序是一致的
单曲循环模式时，sequenceList长度为1，歌曲为当前播放的歌曲
随机播放就是把sequenceList的顺序打乱，发乱方法为遍历sequenceList， 然后[0, i]区间取一个整数j
将arr[i]和arr[j]的值交换




