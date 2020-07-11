<template>
    <div class="header">
        <img class="logo" src="../../common/images/logo.png" alt="">
        <span>Vue Music</span>
        <router-link to="/mine" class="mine">
            <i class="iconfont iconwode"/>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader"
    }
</script>

<style scoped>
    .header{
        position: relative;
        width: 10rem;
        height: 1.173rem;
        text-align: center;
    }

    .logo{
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.33rem;
        vertical-align: top;
    }

    span{
        display: inline-block;
        font-size: 0.48rem;
        color: #ffcd32;
        height: 1.173rem;
        line-height: 1.173rem;
    }

    .mine{
        display: inline-block;
        position: absolute;
        width: 0.533rem;
        height: 1.173rem;
        top: 0;
        right: 0.333rem;
        text-decoration: none;
    }

    .iconwode{
        font-size: 0.533rem;
        line-height: 1.173rem;
        color: #ffcd32;
    }

</style>
