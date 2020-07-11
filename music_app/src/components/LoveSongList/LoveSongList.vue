<template>
	<div class="lovePage">
        <ul class="songList">
            <li v-for="(song, index) in loveSongArr" :key="song.id" @click="playSong(index, song.id)">
                <h2>{{song.name}}</h2>
                <p class="desc">{{song.singer}}&nbsp;&nbsp;&nbsp;{{song.album}}</p>
            </li>
        </ul>
	</div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import BScroll from 'better-scroll';

    export default {
        name: "LoveSongList",
        data() {
            return {}
        },
        computed: {
            ...mapState(['loveSongArr']),
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
                    this.$store.dispatch('setPlayList', this.loveSongArr);
                    //设置播放队列
                    this.$store.dispatch('setSequenceList');
                    //设置播放索引
                    this.$store.dispatch('setCurrentIndex', index);
                }

                //设置是否全屏播放
                this.$store.dispatch('setIsFullScreen', true);

            },
        },
        watch: {
            loveSongArr(value){
                if(value.length > 0){
                    this.$nextTick(()=>{
                        this.BScroll = new BScroll('.lovePage');
                    });

                }
            },
        },
        mounted() {
            this.BScroll = new BScroll('.lovePage');
        }
    }
</script>

<style scoped>
    .lovePage{
        position: fixed;
        top: 2.4rem;
        bottom: 0;
        left: 0;
        right: 0;
        color: #cccccc;
        overflow: hidden;
    }

    .songList{
        margin-top: 0.3rem;
        font-size: 0.24rem;
    }

    ul > li{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 8.4rem;
        height: 1.707rem;
        margin: 0 auto;
        border-bottom: 0.013rem solid rgba(255,255,255,.2);
    }

    ul > li > h2{
        height: 0.533rem;
        line-height: 0.533rem;
        font-size: 0.373rem;
        color: #FFFFFF;
    }
</style>
