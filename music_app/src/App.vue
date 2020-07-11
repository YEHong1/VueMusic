<template>
    <div id="app">
        <div class="top" ref="top" v-show="$route.meta.isShowTop">
            <HomeHeader/>
            <!--选项卡-->
            <ul class="tab">
                <li>
                    <router-link to="/recommend">
                        <span class="active">推荐</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/singer">
                        <span>歌手</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/rank">
                        <span>排行</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/search">
                        <span>搜索</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>

        <player/>
    </div>
</template>

<script>
    import HomeHeader from "./components/HomeHeader/HomeHeader";
    import Player from "./components/Player/Player";

    export default {
        name: 'App',
        components: {
            HomeHeader,
            Player
        },
        mounted() {
            let loveSongArr = window.localStorage.getItem('loveSongArr');
            if(!loveSongArr){
                loveSongArr = [];
            }else {
                loveSongArr = JSON.parse(loveSongArr);
            }
            this.$store.dispatch('setLoveSongArr', loveSongArr);
        }
    }
</script>

<style>
    #app{
        position: relative;
    }

    .top{
        background: #222222;
    }

    .tab{
        width: 10rem;
        height: 1.173rem;
    }

    .tab li{
        position: relative;
        float: left;
        width: 25%;
        height: 1.173rem;
        line-height: 1.173rem;
        text-align: center;
        font-size: 0.3rem;
    }

    .tab li span{
        position: absolute;
        box-sizing: border-box;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        height: 0.9rem;
        color: rgba(255, 255, 255, .5);
    }

    .router-link-active span{
        border-bottom: #ffcd32 0.05rem solid;;
    }
</style>
