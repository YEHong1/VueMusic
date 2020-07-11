<template>
    <div class="swiper-container" @click="showToast">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in bannerInfo" :key="index">
                <img :src="item.picUrl" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/css/swiper.css'
    import {getBanner} from "../../api";

    export default {
        name: "Banner",
        data(){
            return{
                bannerInfo: []
            }
        },
        mounted() {
            getBanner().then(res=>{
                if(res.data.code === 0){
                    this.bannerInfo = res.data.data.slider;
                }
            })
        },
        methods: {
            showToast(){
                alert('因数据问题，只有歌手界面可以进入详情页')
            }
        },
        watch: {
            bannerInfo(newValue){
                if(newValue.length){
                    this.$nextTick(()=>{
                        new Swiper('.swiper-container', {
                            //可选选项，自动滑动
                            autoplay: true,
                            loop: true,
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                            },
                        });
                    })
                }
            }
        },
    }
</script>

<style scoped>
    .swiper-container{
        width: 10rem;
        height: 4rem;
    }

    .swiper-container img{
        width: 10rem;
        height: 4rem;
    }

    div.swiper-pagination .swiper-pagination-bullet-active{
        background: red;
    }
</style>
