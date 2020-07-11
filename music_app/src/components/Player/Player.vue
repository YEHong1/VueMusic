<template>
    <div class="player" v-if="this.playList.length">
        <transition name="normal">
            <div class="fullScreen" v-show="this.isFullScreen">
                <div class="blurBg" :style="{backgroundImage: `url(${currentSong.image})`}"></div>
                <div class="header">
                    <i class="back iconfont iconback" @click="$store.dispatch('setIsFullScreen', false)"/>
                    {{currentSong.name}}
                </div>
                <h2 class="singer">{{currentSong.singer}}/{{currentSong.album}}</h2>
                <div class="swiper">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <!--CD唱片旋转-->
                                <div class="cd_wrapp rotateCd"
                                     :style="{animationPlayState: `${this.isPlaying? 'running' : 'paused'}`}">
                                    <img :src="currentSong.image" alt="">
                                </div>
                                <!--歌词-->
                                <p class="lyrics">怎么就刚好 碰到你</p>
                            </div>
                            <div class="swiper-slide">Slide 2</div>
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="progress_wrapper">
                        <!--歌曲已播放时间-->
                        <span>{{formatDate(currentTime)}}</span>
                        <!--进度条-->
                        <div class="progress_bar_box">
                            <div class="progress_bar" @touchstart="changeDuration" ref="progress_bar">
                                <div class="innerBar" ref="innerBar"
                                     :style="{width: `${currentTime/currentSong.duration * 100}%`}"></div>
                                <div class="point" ref="point" :style="{left: `${currentTime/currentSong.duration * 100}%`}"></div>
                            </div>
                        </div>
                        <!--歌曲总时长-->
                        <span>{{duration}}</span>
                    </div>
                    <div class="btnList">
                        <i class="iconfont" :class="[
                            {'iconliebiaoxunhuan': this.mode=== 0},
                            {'icondanquxunhuan': this.mode=== 1},
                            {'iconsuijibofang': this.mode=== 2},
                        ]"
                            @click="changeMode"
                        />
                        <i class="iconfont iconlast" @click="prevSong"/>
                        <i class="iconfont" :class="[{'iconstop': isPlaying}, {'iconbofang': !isPlaying}]"
                           @click="togglePlay"/>
                        <i class="iconfont iconnext-copy" @click="nextSong"/>
                        <i class="iconfont iconxihuan" :style="{color: isLoveSong(currentSong.id) ? 'rgb(237, 63, 45)' : '#999999'}" @click="saveLoveSong(currentSong)"/>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="mini">
            <div class="mini_control" v-show="!this.isFullScreen" @click="$store.dispatch('setIsFullScreen', true)">
                <img :src="currentSong.image" alt="">
                <div class="songInfo">
                    <p>{{currentSong.name}}</p>
                    <p>{{currentSong.name}} / {{currentSong.album}}</p>
                </div>
                <i class="iconfont" :class="[{'iconstop': isPlaying}, {'iconbofang': !isPlaying}]" @click.stop="togglePlay"/>
                <i class="iconfont iconliebiao" @click.stop="showPlayList = true"/>
            </div>
        </transition>

        <div class="songListView" v-show="showPlayList">
            <div class="container">
                <div class="listBox">
                    <h1 class="titleBox">
                        <i class="iconfont" :class="[
                            {'iconliebiaoxunhuan': this.mode=== 0},
                            {'icondanquxunhuan': this.mode=== 1},
                            {'iconsuijibofang': this.mode=== 2},
                        ]"
                           @click="changeMode"
                        >
                            <span class="modeType">{{this.mode === 0 ? '顺序播放' : this.mode === 1 ? '单曲循环' : '随机播放'}}</span>
                        </i>

                        <i class="iconfont icondelect delectIcon" @click="clearPlayList"/>
                    </h1>
                    <div class="playScrollView">
                        <ul class="playList">
                            <li v-for="(song, index) in sequenceList" :key="index" @click="changePlay($event, index)">
                                <i class="iconfont iconbofang" :style="{visibility: song.id === currentSong.id ? 'visible' : 'hidden'}"/>
                                <p>{{song.name}}</p>
                                <i class="iconfont iconxihuan"
                                   :style="{color: isLoveSong(song.id) ? 'rgb(237, 63, 45)' : '#999999'}"
                                   @click.stop="saveLoveSong(song)"
                                />
                                <i class="iconfont iconclose"/>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="closeBtn" @click="showPlayList = false">关闭</div>
            </div>
        </div>

        <!--音频控件-->
        <audio
            ref="audio"
            @timeupdate="timeUpdate"
            :src="mp3"
        />
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import BScroll from 'better-scroll'
    import 'swiper/css/swiper.css'
    import {mapState, mapGetters} from 'vuex';
    import mp3 from '../../common/陀飞轮-陈奕迅.mp3'

    export default {
        name: "Player",
        data(){
            return{
                //当前歌曲已播放的秒数
                currentTime: 0,
                mp3,
                showPlayList: false
            }
        },
        computed: {
            ...mapState(['isPlaying','isFullScreen', 'playList', 'sequenceList','mode', 'currentIndex', 'loveSongArr']),
            ...mapGetters(['currentSong']),
            //歌曲总时间
            duration(){
                let num = this.currentSong.duration;
                let minute = Math.floor(num / 60);
                let second = num % 60;
                if(second < 10){
                    second = '0' + second;
                }
                return `${minute}:${second}`
            },
        },
        methods: {
            togglePlay(){
                if(this.isPlaying){
                    this.$refs.audio.pause();
                }else {
                    this.$refs.audio.play();
                }
                this.$store.dispatch('setPlayState', !this.isPlaying);
            },
            prevSong(){
                let index = this.currentIndex - 1;
                if(index < 0){
                    index = this.sequenceList.length - 1;
                }
                this.$refs.audio.currentTime = 0;
                this.$store.dispatch('setCurrentIndex', index)
            },
            nextSong(){
                let index = this.currentIndex + 1;
                if(index >= this.sequenceList.length){
                    index = 0;
                }
                this.$refs.audio.currentTime = 0;
                this.$store.dispatch('setCurrentIndex', index)
            },
            timeUpdate(e){
                this.currentTime = Math.floor(e.target.currentTime);
            },
            //格式化时间
            formatDate(num){
                let minute = Math.floor(num / 60);
                let second = num % 60;
                if(second < 10){
                    second = '0' + second;
                }
                return `${minute}:${second}`
            },
            //改变歌曲得播放进度
            changeDuration(e){
                //进度条的宽度
                let barWidth = e.currentTarget.clientWidth;
                //点击距离左侧的距离
                let s = e.changedTouches[0].clientX - e.currentTarget.offsetLeft;
                //设置currentTime
                this.currentTime = Math.floor(s / barWidth * this.currentSong.duration);
                this.$refs.audio.currentTime = this.currentTime;
            },
            //改变歌曲播放模式
            changeMode(){
                let mode = this.mode;
                mode += 1;
                if(mode > 2){
                    mode = 0
                }

                this.$store.dispatch('setPlayMode', mode);
                this.$store.dispatch('setSequenceList');
            },
            //保存喜欢的歌曲
            saveLoveSong(song){
                this.$store.dispatch('addLoveSong', song)
            },
            //切换歌曲
            changePlay(event, index){
                // this.$refs.audio.currentTime = 0;
                this.$store.dispatch('setCurrentIndex', index);
                let top = event.currentTarget.clientHeight * index;
                this.playScrollView.scrollTo(0, -top, 500)

            },
            clearPlayList(){
                this.showPlayList = false;
                this.$store.dispatch('setPlayList', []);
                this.$store.dispatch('setPlayState', false);
            },
            //歌曲是否被标记为喜欢
            isLoveSong(id){
                for(let i=0; i<this.loveSongArr.length; i++){
                    if(this.loveSongArr[i].id === id){
                        return true
                    }
                }
                return false
            }
        },
        watch:{
            currentSong(newValue, oldValue){
                this.$nextTick(()=>{
                    if(newValue.id !== oldValue.id){
                        this.$refs.audio.currentTime = 0;
                        this.$refs.audio.play();
                        this.$store.dispatch('setPlayState', true);
                    }


                    //实例化swiper
                    this.swwiper = new Swiper('.swiper-container', {
                        autoplay: false,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    });
                })
            },
            //监听currentTime，当他大于等于currentSong.duration时，切换下一首歌曲
            currentTime(newValue){
                if(newValue >= Number(this.currentSong.duration)){
                    this.nextSong();
                }
            },
            //播放列表
            sequenceList(){
                this.$nextTick(()=>{
                    this.playScrollView = new BScroll('.playScrollView', {
                        click: true
                    })
                })
            },

        },
    }
</script>

<style scoped>
    .fullScreen{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #222222;
        z-index: 999;
    }

    .blurBg{
        position: absolute;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        filter: blur(20px);
        z-index: -1;
    }

    .header{
        position: relative;
        width: 10rem;
        height: 1.067rem;
        z-index: 99;
        text-align: center;
        line-height: 1.067rem;
        font-size: 0.48rem;
        color: #FFFFFF;
    }

    .back{
        position: absolute;
        font-size: 0.5rem;
        color: #ffcd32;
        left: 0.5rem;
        top: 50%;
        transform: rotate(-90deg) translateX(100%);
    }

    .bottom{
        position: absolute;
        width: 10rem;
        height: 2.613rem;
        bottom: 1.333rem;
    }

    .singer{
        height: 0.533rem;
        line-height: 0.533rem;
        font-size: 0.373rem;
        text-align: center;
        color: rgba(255,255,255,.8);
    }

    .swiper{
        position: absolute;
        top: 1.6rem;
        left: 0;
        right: 0;
        bottom: 3.947rem;
    }

    .swiper-container{
        width: 100%;
        height: 100%;
    }

    .cd_wrapp{
        box-sizing: border-box;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        overflow: hidden;
        margin: 0.533rem auto;
        border: 0.267rem solid rgba(36, 36, 36, .2);
    }

    .cd_wrapp > img{
        width: 100%;
        height: 100%;
    }

    .lyrics{
        height: 0.533rem;
        font-size: 0.373rem;
        line-height: 0.533rem;
        text-align: center;
        color: rgba(255, 255, 255, .5);
    }

    .progress_wrapper{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 8rem;
        height: 1.333rem;
        line-height: 1.333rem;
        margin: 0 auto;
    }

    .progress_wrapper > span{
        font-size: 0.32rem;
        color: #FFFFFF;
    }

    .progress_bar_box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 6.1rem;
        height: 0.8rem;
        margin: 0 auto;
    }

    .progress_bar{
        position: relative;
        width: 100%;
        height: 0.107rem;
        background-color: rgba(0,0,0,.3);
    }

    .innerBar{
        position: absolute;
        /*width: 10%;*/
        height: 100%;
        top: 0;
        left: 0;
        background-color: #ffcd32;
    }

    .point{
        position: absolute;
        /*left: 100%;*/
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 0.427rem;
        height: 0.427rem;
        box-sizing: border-box;
        background-color: #ffcd32;
        border-radius: 50%;
        border: 0.08rem solid #FFFFFF;
        transition: .1s;
    }

    .btnList{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 8rem;
        height: 1.067rem;
        margin: 0 auto;
    }

    .btnList i{
        font-size: 0.66rem;
        color: #ffcd32;
    }

    .btnList i:nth-of-type(3){
        font-size: 0.85rem;
    }

    .mini_control{
        display: flex;
        flex-direction: row;
        align-items: center;
        position: fixed;
        width: 10rem;
        height: 1.6rem;
        bottom: 0;
        z-index: 999;
        background-color: #333333;
    }

    .mini_control > img{
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 0.6rem;
    }

    .mini_control .songInfo{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 5.467rem;
        height: 1.333rem;
    }

    .songInfo > p:nth-of-type(1){
        font-size: 0.373rem;
        color: #FFFFFF;
        padding-left: 0.3rem;
    }

    .songInfo > p:nth-of-type(2){
        font-size: 0.32rem;
        color: rgba(255,255,255,.3);
        padding-left: 0.3rem;
    }

    .mini_control > i{
        font-size: 0.7rem;
        color: #ffcd32;
    }

    .mini_control > i:nth-of-type(2){
        margin-left: 0.7rem;
    }

    .normal-enter-active, .normal-leave-active{
        transition: .3s;
    }
    .normal-enter, .normal-leave-to{
        transform: translateY(100%);
        opacity: 0;
    }

    .mini-enter-active, .mini-leave-active{
        transition: .3s;
    }
    .mini-enter, .mini-leave-to{
        transform: translateY(100%);
    }

    @keyframes rotate {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    .rotateCd{
        animation: rotate 6s linear infinite;
    }

    .songListView{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 999;
    }

    .songListView > .container{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 10rem;
        height: 11.467rem;
    }

    .container > .listBox{
        width: 100%;
        height: 10.133rem;
        background-color: #333333;
        overflow: hidden;
    }

    .container > .closeBtn{
        width: 100%;
        height: 1.333rem;
        text-align: center;
        line-height: 1.333rem;
        font-size: 0.427rem;
        color: rgba(255,255,255,.5);
        background-color: #222222;
    }

    .titleBox{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 8.667rem;
        height: 0.8rem;
        color: #ffcd32;
        font-size: 0.8rem;
        margin: 0.533rem auto 0.267rem;
    }

    .titleBox .modeType{
        font-size: 0.373rem;
        color: rgba(255,255,255,.5);
        padding-left: 0.267rem;
    }

    .titleBox i.delectIcon{
        color: rgba(255,255,255,.3);
    }

    .playList > li{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 10rem;
        height: 1.067rem;
        box-sizing: border-box;
        padding: 0 0.8rem 0 0.533rem;
        font-size: 0.373rem;
        color: rgba(255,255,255,.3);
    }

    .playScrollView{
        width: 10rem;
        height: 8.533rem;
        overflow: hidden;
    }

    .playList > li > p{
        width: 7.133rem;
        margin-left: 0.3rem;
    }

    .playList > li > i:nth-of-type(1){margin-left: 0.1rem; color: #ffcd32}
    .playList > li > i:nth-of-type(2){margin-right: 0.2rem}
    .playList > li > i:nth-of-type(3){margin-right: -0.1rem}

</style>
