const state = {
    //当前歌手信息
    singer: {},
    //是否在播放
    isPlaying: false,
    //播放器是否全屏
    isFullScreen: false,
    //歌曲播放列表
    playList: [],
    //歌曲播放顺序列表
    sequenceList: [],
    //播放模式  0顺序播放   1单曲循环   2随机播放
    mode: 0,
    //当前播放歌曲的索引
    currentIndex: -1,
    //喜欢的歌曲
    loveSongArr: []

};
export default state;
