<template>
    <div>
        <div class="wrapper">
            <ul class="typeList" ref="typeList">
                <li v-for="(singerType, index) in singers" :key="index">
                    <h2>{{singerType.title}}</h2>
                    <ul class="singerList">
                        <li @click="goSingerDetail(item)" v-for="(item, index) in singerType.items" :key="index">
                            <img v-lazy="item.avatarUrl" alt=""/>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>

            <!--右侧字母-->
            <div class="shortCutList">
                <ul>
                    <li :class="{active: index === currentIndex}" v-for="(item, index) in shortCutList"
                        :key="index" @click="scrollToClick(index)">{{item}}</li>
                </ul>
            </div>

            <!--显示当前对应的字母索引-->
            <div class="fixedTitle" v-if="shortCutList.length && scrollY < 0">{{shortCutList[currentIndex]}}</div>

        </div>

        <transition name="slide">
            <router-view/>
        </transition>

    </div>

</template>

<script>
    import {getSingerList} from "../../api";
    import BScroll from 'better-scroll'

    export default {
        name: "Singer",
        data(){
            return{
                singers: [],
                scrollY: 0, //列表向下滚动的距离
                liTops: [], //每一个分类li距离顶部的距离，实质上就是前面所有分类li的高度和
            }
        },
        computed: {
            //计算右侧列表数据
            shortCutList(){
                return this.singers.map((item)=>{
                    return item.title
                })
            },
            //计算当前滚动距离对应的哪一项分类
            currentIndex(){
                let scrollY = Math.abs(this.scrollY);
                for(let i=this.liTops.length-1; i>=0; i--){
                    if(scrollY >= this.liTops[i]){
                        return i
                    }
                }
            },
        },
        methods: {
            //当数据渲染完成后收集每一个分类li对应顶部的距离
            _initTops(){
                let tops = [];
                let top = 0;
                tops.push(top);
                let lis = this.$refs.typeList.children;
                for(let i=0; i<lis.length; i++){
                    top += lis[i].clientHeight;
                    tops.push(top)
                }
                this.liTops = tops;
            },

            //滚动到指定位置
            scrollToClick(index){
                this.scrollList.scrollTo(0, -this.liTops[index], 500);
            },

            //进入歌手详情页
            goSingerDetail(singer){
                this.$router.push(`/singer/${singer.id}`);
                this.$store.dispatch('setSingerInfo', singer)
            },
        },
        mounted() {
            getSingerList().then(res=>{
                this.singers = res.data;
            })
        },
        watch: {
            singers(newValue){
                if(newValue.length){
                    this.$nextTick(()=>{
                        this.scrollList = new BScroll('.wrapper', {
                            click: true,
                            probeType: 3, //不设置probeType的值大于0，不会监听滚动行为
                        });

                        //滚动监听
                        this.scrollList.on('scroll', ({x, y})=>{
                            this.scrollY = y;
                        });

                        this._initTops();
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .wrapper{
        position: fixed;
        width: 100%;
        top: 2.347rem;
        bottom: 0;
        z-index: -1;
    }
    .typeList{
        width: 10rem;
    }

    .typeList > li > h2{
        width: 10rem;
        height: 0.8rem;
        font-size: 0.32rem;
        padding-left: 0.8rem;
        background-color: #333333;
        color: rgba(255, 255, 255, .5);
        line-height: 0.8rem;
    }

    .singerList > li{
        width: 10rem;
        height: 1.867rem;
    }

    .singerList > li > img{
        width: 1.333rem;
        height: 1.333rem;
        border-radius: 50%;
        overflow: hidden;
        margin: 0.26rem 0.4rem 0 0.6rem;
        vertical-align: middle;
    }

    .singerList > li > span{
        font-size: 0.33rem;
        line-height: 1.867rem;
        color: rgba(255, 255, 255, .5);
    }

    .shortCutList{
        position: absolute;
        top: 50%;
        right: 0.125rem;
        transform: translateY(-50%);
        background-color: rgba(0,0,0, .3);
    }

    .shortCutList li{
        font-size: 0.3rem;
        color: rgba(255,255,255,.5);
        text-align: center;
        margin-top: 0.25rem;
    }

    .shortCutList li:first-of-type{
        margin-top: 0;
    }

    li.active{
        color: #ffcd32;
    }

    .fixedTitle{
        position: fixed;
        top: 2.347rem;
        width: 10rem;
        height: 0.8rem;
        font-size: 0.32rem;
        padding-left: 0.8rem;
        background-color: #333333;
        color: rgba(255, 255, 255, .5);
        line-height: 0.8rem;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s
    }

    .slide-enter, .slide-leave-to {
        transform: translateX(100%)
    }
</style>
