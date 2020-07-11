<template>
    <div class="search">
        <!--搜索框-->
        <div class="searchBox">
            <input type="text" placeholder="搜索歌曲、歌手" v-model="keyWord">
            <div class="closeBtn" @click="clearValue" v-show="keyWord">
                <i class="iconfont iconclose"/>
            </div>
        </div>

        <!--符合搜索条件的列表-->
        <ul class="searchList" v-show="keyWord">
            <li>我曾 - 阿瑟斯都</li>
            <li>我曾 - 张三</li>
            <li>我曾用心爱着你 - 闫妮</li>
            <li>我曾把完整的镜子打碎 - 起名有点难</li>
            <li>我曾把完整的镜子打碎 - 我去问就考虑对方</li>
            <li>我曾 - 阿瑟斯都</li>
            <li>我曾 - 张三</li>
            <li>我曾用心爱着你 - 闫妮</li>
            <li>我曾把完整的镜子打碎 - 起名有点难</li>
            <li>我曾把完整的镜子打碎 - 我去问就考虑对方</li>
            <li>我曾 - 阿瑟斯都</li>
            <li>我曾 - 张三</li>
            <li>我曾用心爱着你 - 闫妮</li>
            <li>我曾把完整的镜子打碎 - 起名有点难</li>
            <li>我曾把完整的镜子打碎 - 我去问就考虑对方</li>
            <li>我曾 - 阿瑟斯都</li>
        </ul>

        <div v-show="!keyWord">
            <!--热门搜索-->
            <div class="popularSearch">
                <h1 class="title">热门搜索</h1>
                <ul class="keyList">
                    <li v-for="(keyWorld, index) in popularKeyList" :key="index">{{keyWorld.k}}</li>
                </ul>
            </div>
            <!--搜索历史-->
            <div class="history">
                <div class="title">
                    <span>搜索历史</span>
                    <i class="iconfont icondelect"/>
                </div>

                <ul class="historyList">
                    <li>
                        <span>邓紫棋</span>
                        <i class="iconfont iconclose"/>
                    </li>
                    <li>
                        <span>陈奕迅</span>
                        <i class="iconfont iconclose"/>
                    </li>
                    <li>
                        <span>李克勤</span>
                        <i class="iconfont iconclose"/>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {getPopularSearches, searchSong} from "../../api";

    export default {
        name: "Search",
        data(){
            return{
                keyWord: '',
                popularKeyList: [],
                searchResult: []
            }
        },
        methods:{
            clearValue(){
                this.keyWord = "";
            },
        },
        watch:{
            keyWord(newValue){
                if(!newValue){return}

                searchSong(newValue, 1).then(res=>{
                    if(res.data.code === 0){
                        this.searchResult = res.data.data.song.list;
                    }
                })
            },
        },
        mounted() {
            getPopularSearches().then(res=>{
                if(res.data.code === 0){
                    this.popularKeyList = res.data.data.hotkey.slice(0, 10);
                }
            })
        },
    }
</script>

<style scoped lang="less">
    @searchBoxBg: #333333;

    .search{
        width: 10rem;
    }
    .searchBox{
        position: relative;
        width: 8.933rem;
        height: 1.067rem;
        margin: 0.533rem auto;
        background-color: @searchBoxBg;
        border-radius: 0.1rem;
    }

    .searchBox input{
        position: absolute;
        top: 0;
        left: 0.4rem;
        width: 7.707rem;
        height: 100%;
        line-height: 1.067rem;
        padding: 0;
        background: transparent;
        border: none;
        color: #FFFFFF;
    }

    .closeBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        right: 0.4rem;
        width: 0.427rem;
        height: 0.427rem;
        border-radius: 50%;
        background-color: #222222;
        color: #333333;
        transform: translateY(-50%);
    }

    .popularSearch{
        width: 8.933rem;
        margin: 0 auto;
        color: rgba(255,255,255,.5);
    }

    .popularSearch > h1{
        font-size: 0.38rem;
        margin-bottom: 0.533rem;
        font-weight: normal;
    }

    .keyList{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .keyList li{
        color: rgba(255,255,255,.3);
        font-size: 0.373rem;
        padding: 0.067rem 0.133rem;
        background-color: #333333;
        border-radius: 0.1rem;
        margin-bottom: 0.36rem;
        margin-right: 0.5rem;
    }

    .history{
        width: 8.933rem;
        margin: 0.3rem auto 0;
    }

    .history .title{
        display: flex;
        width: 100%;
        height: 1.067rem;
        justify-content: space-between;
        align-items: center;
        color: rgba(255,255,255,.5);
    }

    .title span{
        font-size: 0.38rem;
        font-weight: normal;
    }
    .title i{
        font-size: 0.3rem;
    }

    .historyList li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 1.067rem;
        font-size: 0.427rem;
        color: rgba(255,255,255,.5);
    }

    .historyList li i{
        font-size: 0.45rem;
        color: rgba(255,255,255,.2);
    }

    .searchList{
        width: 8.933rem;
        height: 6.25rem;
        margin: -0.36rem auto 0;
        padding-bottom: 0.36rem;
        background-color: #333333;
        overflow: scroll;
    }

    .searchList li{
        font-size: 0.36rem;
        color: #ccc;
        margin-top: 0.36rem;
        padding-left: 0.36rem;
    }

    /*移除右侧滚动条*/
    ::-webkit-scrollbar{width:0;height:1px}
    ::-webkit-scrollbar-thumb{border-radius:5px;-webkit-box-shadow:inset 0 0 5px rgba(0,0,0,.2);background:rgba(0,0,0,.2)}
</style>
