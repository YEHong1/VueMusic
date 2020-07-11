import axios from 'axios';

const BaseUrl = '/api';
// const BaseUrl = '';

//首页banner图
export function getBanner() {
    return axios.get(`${BaseUrl}/getBanner`)
}

//热门推荐
export function getDiscList() {
    return axios.get(`${BaseUrl}/getDiscList`)
}

//获取歌手列表
export function getSingerList() {
    return axios.get(`${BaseUrl}/getSingerList`)
}

//根据歌手id获取歌曲列表
export function getSongs(singerId) {
    return axios.get(`${BaseUrl}/getSongs?singerId=${singerId}`)
}

//获取排行榜歌单列表
export function getRankList() {
    return axios.get(`${BaseUrl}/getRankList`)
}

//获取热门搜索数据
export function getPopularSearches() {
    return axios.get(`${BaseUrl}/getPopularSearches`)
}

//根据关键词搜索
export function searchSong(searchKey, page) {
    return axios.get(`${BaseUrl}/search?searchKey=${searchKey}&page=${page}`)
}
