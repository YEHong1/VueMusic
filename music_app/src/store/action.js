import {
    SET_SINGER,
    SET_PLAY_STATE,
    SET_FULLSCREEN,
    SET_PLAY_LIST,
    SET_SEQUENCE_LIST,
    SET_PLAY_MODE,
    SET_CURRENT_INDEX,
    SET_LOVE_SONGARR,
    ADD_LOVE_SONG
} from "./mutations-types";
import {shuffle} from "../common/js/util";

const actions = {
    //设置歌手信息
    setSingerInfo({commit, state}, singer){
        commit(SET_SINGER, singer)
    },
    //设置播放状态
    setPlayState({commit, state}, flag){
        commit(SET_PLAY_STATE, flag);
    },
    //设置是否全屏播放
    setIsFullScreen({commit}, flag){
        commit(SET_FULLSCREEN, flag)
    },
    //设置歌曲列表
    setPlayList({commit}, list){
        commit(SET_PLAY_LIST, list)
    },
    //设置播放队列
    setSequenceList({commit, state, getters}){
        let list = [];
        let index = 0;
        if(state.mode === 0){
            for(let i=0; i<state.playList.length; i++){
                list.push(state.playList[i])
            }
            index = list.findIndex((item)=>{
                return item.id === getters.currentSong.id
            });

        }else if(state.mode === 1){
            list.push(state.playList[state.currentIndex]);
            index = 0;
        }else if(state.mode === 2){
            //随机播放
            for(let i=0; i<state.playList.length; i++){
                list.push(state.playList[i])
            }
            list = shuffle(list);
            index = list.findIndex((item)=>{
                return item.id === getters.currentSong.id
            });
        }

        commit(SET_CURRENT_INDEX, index);
        commit(SET_SEQUENCE_LIST, list)
    },
    //设置播放模式
    setPlayMode({commit}, mode){
        commit(SET_PLAY_MODE, mode)
    },
    //设置播放索引
    setCurrentIndex({commit}, index){
        commit(SET_CURRENT_INDEX, index)
    },
    //初始化设置喜欢的歌曲数组
    setLoveSongArr({commit}){
        commit(SET_LOVE_SONGARR);
    },
    //添加/删除 喜欢的歌曲
    addLoveSong({commit}, song){
        commit(ADD_LOVE_SONG, song);
    }
};

export default actions;
