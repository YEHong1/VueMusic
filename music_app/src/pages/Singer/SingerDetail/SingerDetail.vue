<template>
    <div class="wrapper">
        <MusicList :name="singer.name" :avatar="singer.avatarUrl" :id="singer.id"/>
    </div>
</template>

<script>
    import MusicList from "../../../components/MusicList/MusicList";
    import {mapState} from 'vuex'

    export default {
        name: "SingerDetail",
        data(){
            return{
                songs: []
            }
        },
        computed: {
            ...mapState(['singer']),
        },
        components: {
            MusicList
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #222222;
        z-index: 99;
    }
</style>
