<template>
    <div>
        <img src="./loading.gif" alt="">
        <p>{{text}}</p>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props: {
            text: String
        }
    }
</script>

<style scoped>
    div{
        width: 10rem;
        text-align: center;
    }

    img{
        width: 0.6rem;
        height: 0.6rem;
        margin-top: 0.667rem;
    }

    p{
        line-height: 0.267rem;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.2rem;
        margin-top: 0.25rem;
    }
</style>
