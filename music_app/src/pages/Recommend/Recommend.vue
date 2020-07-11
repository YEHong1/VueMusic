<template>
    <div class="scrollList">
        <div class="content">
            <Banner/>
            <div class="recommend">热门歌单推荐</div>
            <ul class="recommend_list" v-if="DiscList.length" @click="showToast">
                <li class="item" v-for="(item, index) in DiscList" :key="index">
                    <div class="left">
                        <img v-lazy="item.imgurl" alt="">
                    </div>
                    <div class="right">
                        <h2>{{item.creator.name}}</h2>
                        <p>{{item.dissname}}</p>
                    </div>
                </li>
            </ul>
            <Loading text="正在加载中。。。" v-else/>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Banner from "../../components/Banner/Banner";
    import {getDiscList} from "../../api";
    import Loading from "../../components/Loading/Loading";

    export default {
        name: "Recommend",
        data(){
            return{
                DiscList: []
            }
        },
        components: {
            Banner,
            Loading
        },
        mounted() {
            getDiscList().then(res=>{
                this.DiscList = res.data.data.list;
            })
        },
        methods: {
            showToast(){
                alert('因数据问题，只有歌手界面可以进入详情页')
            }
        },
        watch: {
            DiscList(newValue){
                if(newValue.length){
                    this.$nextTick(()=>{
                        this.scroll = new BScroll('.scrollList', {
                            click: true
                        })
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .scrollList{
        position: fixed;
        top: 2.347rem;
        bottom: 0;
        z-index: -1;
    }

    .recommend{
        width: 10rem;
        height: 1.733rem;
        text-align: center;
        line-height: 1.733rem;
        font-size: 14px;
        color: #ffcd32;
    }

    .item{
        display: flex;
        flex-direction: row;
        height: 2.213rem;
        width: 8.933rem;
        margin: 0 auto;
    }

    .item .left{
        width: 1.6rem;
        height: 1.6rem;
    }

    .item .left img{
        width: 1.6rem;
        height: 1.6rem;
    }

    .item .right{
        height: 1.6rem;
        margin-left: 0.533rem;
    }

    .right h2{
        font-size: 0.373rem;
        color: #FFFFFF;
        margin-top: 0.2rem;
    }

    .right p{
        font-size: 0.373rem;
        color: rgba(255, 255, 255, .3);
        margin-top: 0.5rem;
    }
</style>
