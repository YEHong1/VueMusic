const getter = {
    //当前歌曲
    currentSong(state){
        if(state.sequenceList[state.currentIndex]){
            state.sequenceList[state.currentIndex].duration = '278'
        }
        return state.sequenceList[state.currentIndex] || {}
    }
};
export default getter;
