import {
    SET_SINGER,
    SET_PLAY_STATE,
    SET_FULLSCREEN,
    SET_PLAY_LIST,
    SET_SEQUENCE_LIST,
    SET_PLAY_MODE,
    SET_CURRENT_INDEX,
    SET_LOVE_SONGARR,
    ADD_LOVE_SONG,
} from "./mutations-types";

const mutations = {
    [SET_SINGER] (state, singer) {
        state.singer = singer;
    },
    [SET_PLAY_STATE] (state, flag) {
        state.isPlaying = flag;
    },
    [SET_FULLSCREEN] (state, flag) {
        state.isFullScreen = flag;
    },
    [SET_PLAY_LIST] (state, list) {
        state.playList = list;
    },
    [SET_SEQUENCE_LIST] (state, list) {
        state.sequenceList = list;
    },
    [SET_PLAY_MODE] (state, modeNum) {
        state.mode = modeNum
    },
    [SET_CURRENT_INDEX] (state, index) {
        state.currentIndex = index;
    },
    [SET_LOVE_SONGARR] (state) {
        let songArr = window.localStorage.getItem('loveSongArr');
        if(!songArr){
            state.loveSongArr = [];
        }else {
            state.loveSongArr = JSON.parse(songArr);
        }
    },
    [ADD_LOVE_SONG] (state, song) {
        let arr = state.loveSongArr;
        let had = false;
        if(arr.length === 0){
            state.loveSongArr.unshift(song);
        }else {
            for(let i=0; i<arr.length; i++){
                if(arr[i].id === song.id){
                    state.loveSongArr.splice(i, 1);
                    had = true;
                    break;
                }
            }

            if(!had){
                state.loveSongArr.unshift(song)
            }
        }

        window.localStorage.setItem('loveSongArr', JSON.stringify(state.loveSongArr));
    }
};
export default mutations;
