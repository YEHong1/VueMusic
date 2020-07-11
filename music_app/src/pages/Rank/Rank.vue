<template>
    <div class="rank">
        <ul class="rankList" v-if="rankList.length" @click="showToast">
            <li v-for="(rank, index) in rankList" :key="index">
                <div class="left">
                    <img v-lazy="rank.picUrl" alt="">
                </div>
                <ul class="right">
                    <li v-for="(song, index) in rank.songList" :key="index">
                        {{`${index + 1}${song.songname}-${song.singername}`}}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getRankList} from "../../api";
    import BScroll from 'better-scroll'

    export default {
        name: "Rank",
        data(){
            return{
                rankList: []
            }
        },
        mounted() {
            getRankList().then(res=>{
                if(res.data.code === 0){
                    this.rankList = res.data.data.topList
                }
            })
        },
        methods: {
            showToast(){
                alert('因数据问题，只有歌手界面可以进入详情页')
            }
        },
        watch:{
            rankList(newValue){
                if(newValue.length){
                    this.$nextTick(()=>{
                        this.rankScroll = new BScroll('.rank',{
                            click: true
                        })
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .rank{
        position: fixed;
        top: 2.347rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-color: #222222;
    }

    .rankList > li{
        display: flex;
        flex-direction: row;
        width: 8.933rem;
        height: 2.667rem;
        padding-top: 0.533rem;
        margin: 0 auto;
    }

    .left, .left img{
        width: 2.667rem;
        height: 2.667rem;
    }

    .right{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 0.533rem;
        width: 6.267rem;
        height: 2.667rem;
        background-color: #333333;
    }

    .right li{
        width: 5.2rem;
        height: 0.693rem;
        line-height: 0.693rem;
        font-size: 0.32rem;
        color: rgba(255,255,255,.3);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .right li:first-of-type{
        margin-top: 0.267rem;
    }

    .right li:last-of-type{
        margin-bottom: 0.267rem;
    }
</style>
