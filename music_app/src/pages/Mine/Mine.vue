<template>
	<div class="minePage">
        <!--头部导航栏-->
		<div class="navBar">
            个人中心
            <div class="back iconfont iconback" @click="$router.back()"/>
        </div>

        <!--Tab页切换-->
        <div class="tab">
            <div class="history"
                 @click="componentName = 'SearchHistory'"
                 :style="{color: componentName==='SearchHistory' ? '#ffcd32' : '#cccccc'}">搜索历史</div>
            <div class="loveSong"
                 @click="componentName = 'LoveSongList'"
                 :style="{color: componentName==='LoveSongList' ? '#ffcd32' : '#cccccc'}">最爱歌曲</div>
        </div>

        <!--动态组件-->
        <Component :is="componentName"/>
	</div>
</template>

<script>
    import SearchHistory from "../../components/SearchHistory/SearchHistory";
    import LoveSongList from "../../components/LoveSongList/LoveSongList";

    export default {
        name: "Mine",
        data(){
            return {
                componentName: 'SearchHistory'
            }
        },
        computed: {

        },
        components: {
            SearchHistory,
            LoveSongList
        }
    }
</script>

<style scoped>
    .minePage{
        width: 100%;
        height: 100%;
    }

    .navBar{
        position: relative;
        height: 1.333rem;
        text-align: center;
        line-height: 1.333rem;
        font-size: 0.45rem;
        box-sizing: border-box;
        color: #cccccc;
    }

    .back{
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        text-align: center;
        line-height: 0.6rem;
        top: 50%;
        transform: translateY(-50%);
        left: 0.38rem;
        font-size: 0.7rem;
        color: #ffcd32;
    }

    .tab{
        display: flex;
        height: 1.067rem;
        border-top: 0.013rem solid #cccccc;
        border-bottom: 0.013rem solid #cccccc;
        color: #cccccc;
        font-size: 0.36rem;
    }

    .tab > div{
        flex: 1;
        height: 100%;
        line-height: 1.067rem;
        text-align: center;
    }

    .history{
        border-right: 0.013rem solid #cccccc;
    }

</style>
