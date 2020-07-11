<template>
    <div class="musicList">
        <div class="avatar" :style="setBg" ref="avatar">
            <div class="filter"></div>
        </div>
        <div class="header" ref="header">
            {{name}}
            <div class="back iconfont iconback" @click="$router.back()">
            </div>
        </div>

        <SongList :maxTransitionY="maxTransitionY" :avatarHeight="avatarHeight" @updateAvatar="updateAvatarHeight" @updateHeaderBgOpacity="updateHeaderBgOpacity"/>
    </div>

</template>

<script>
    import SongList from "../SongList/SongList";

    export default {
        name: "MusicList",
        props: ['name', 'avatar', 'id'],
        data(){
            return{
                maxTransitionY: 0,
                avatarHeight: 0
            }
        },
        computed: {
            setBg(){
                return `backgroundImage: url(${this.avatar})`
            },
        },
        components: {
            SongList
        },
        methods: {
            updateAvatarHeight(changeY){
                this.$refs.avatar.style.height = `${this.avatarHeight + changeY}px`;
            },

            updateHeaderBgOpacity(opacity){
                this.$refs.header.style.background = `rgba(34, 34, 34, ${opacity})`
            },
        },
        created() {
            if(!this.id){
                this.$router.replace('/singer');
            }
        },
        mounted() {
            this.maxTransitionY = (this.$refs.avatar.clientHeight - this.$refs.header.clientHeight);
            this.avatarHeight = this.$refs.avatar.clientHeight;
        }
    }
</script>

<style scoped>
    .header{
        position: fixed;
        top: 0;
        width: 10rem;
        height: 1.067rem;
        text-align: center;
        line-height: 1.067rem;
        color: #FFFFFF;
        font-size: 0.48rem;
        z-index: 99;
        background: rgba(34,34,34, 0);
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

    .avatar{
        width: 10rem;
        height: 7rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }

    .filter{
        width: 100%;
        height: 100%;
        background: rgba(7,17,27,.4);
    }
</style>
