<template>
    <Loading v-if="!songs.length"/>
    <div class="songList" v-else>
        <div class="mask" ref="mask"></div>
        <div class="scrollView">
            <div>
                <div class="nbsp"></div>
                <ul>
                    <li v-for="(song, index) in songs" :key="index" @click="playSong(index, song.id)">
                        <h2>{{song.name}}</h2>
                        <p class="desc">{{song.singer}}&nbsp;&nbsp;&nbsp;{{song.album}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Loading from "../Loading/Loading";
    import {getSongs} from "../../api";
    import {mapState, mapGetters} from 'vuex'
    import BScroll from 'better-scroll'

    export default {
        name: "SongList",
        props: ['maxTransitionY', 'avatarHeight'],
        data(){
            return{
                songs: [],
            }
        },
        components: {
            Loading
        },
        computed: {
            ...mapState(['singer']),
            ...mapGetters(['currentSong'])
        },
        methods: {
            playSong(index, id){
                if(id !== this.currentSong.id){
                    //设置播放模式
                    this.$store.dispatch('setPlayMode', 0);
                    //设置播放状态
                    this.$store.dispatch('setPlayState', true);
                    //设置歌曲列表
                    this.$store.dispatch('setPlayList', this.songs);
                    //设置播放队列
                    this.$store.dispatch('setSequenceList');
                    //设置播放索引
                    this.$store.dispatch('setCurrentIndex', index);
                }

                //设置是否全屏播放
                this.$store.dispatch('setIsFullScreen', true);

            },
        },
        watch:{
            songs(newValue){
                if(newValue.length){
                    this.$nextTick(()=>{
                        this.songScroll = new BScroll('.scrollView', {
                            click: true,
                            probeType: 3,
                        });

                        //滚动监听
                        this.songScroll.on('scroll', ({x, y})=>{

                            let opacity = -y / this.avatarHeight;
                            if(opacity > 1){
                                opacity = 1
                            }else if(opacity < 0){
                                opacity = 0
                            }
                            this.$emit('updateHeaderBgOpacity', opacity);

                            if(Math.abs(y) > this.maxTransitionY && y < 0){
                                y = -this.maxTransitionY;
                            }else if(y >= 0){
                                this.$emit('updateAvatar', y)
                            }
                            this.$refs.mask.style.transform = `translate3d(0,${y}px,0)`
                        });

                    });

                }
            }
        },
        mounted() {
            getSongs(this.singer.id).then(res=>{
                this.songs = res.data.data.list;
            })
        }
    }
</script>

<style scoped>
    .scrollView, .songList{
        position: fixed;
        width: 10rem;
        top: 7rem;
        bottom: 0;
        z-index: 1;
    }

    .nbsp{
        height: 0.5rem;
        width: 10rem;
    }

    ul > li{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 8.4rem;
        height: 1.707rem;
        margin: 0 auto;
    }

    ul{
        margin-top: 0.5rem;
    }

    ul > li > h2{
        height: 0.533rem;
        line-height: 0.533rem;
        font-size: 0.373rem;
        color: #FFFFFF;
    }

    .desc{
        height: 0.533rem;
        line-height: 0.533rem;
        font-size: 0.373rem;
        color: rgba(255,255,255,.3);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .mask{
        position: fixed;
        width: 10rem;
        top: 7rem;
        bottom: -7rem;
        background-color: #222222;
    }
</style>
