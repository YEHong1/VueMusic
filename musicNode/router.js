let express = require('express');
//1.创建一个路由容器
let router = express.Router();
let axios = require('axios');
let fs = require('fs');

//2.把路由挂载到路由容器中
router.get('/', (req, res) => {
    res.send('Hello World')
});

//轮播图接口
router.get('/getBanner', (req, res)=>{
   fs.readFile('./json/banner.json', function(err, data){
       if(err){
           console.log('文件读取失败', err);
       }else{
           res.send(data)
       }
   })
});

//推荐歌曲
router.get('/getDiscList', (req, res)=>{
    fs.readFile('./json/discList.json', function(err, data){
        if(err){
            console.log('文件读取失败', err);
        }else{
            console.log(data)
            res.send(data)
        }
    })
});

//获取歌手列表
router.get('/getSingerList', (req, res)=>{
    fs.readFile('./json/singer.json', function (error, data) {
        if(error){
            console.log('文件读取失败', error);
        }else {
            data = JSON.parse(data);
            let list = data.data.list;
            let map = {
                hot: {
                    title: '热',
                    items: []
                }
            };

            list.forEach((item, index)=>{
                //前十条为热门
                if(index < 10){
                    map.hot.items.push({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                        avatarUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    })
                }

                let key = item.Findex;
                if(!map[key]){
                    map[key] = {
                        title: key,
                        items: []
                    }
                }

                map[key].items.push({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                    avatarUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                })

            });

            // 为了得到有序列表，我们需要处理 map
            let ret = [];
            let hot = [];
            for (let key in map) {
                let val = map[key];
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === '热') {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            });

            ret.unshift(hot[0]);

            res.send(JSON.stringify(ret))
        }

    });
});

//根据id获取歌手歌曲数据
router.get('/getSongs', (req, res)=>{
    let singerId = req.query.singerId;
    axios.get(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${singerId}&jsonpCallback=jp1`)
        .then(response=>{
            let str = response.data;
            str = str.substring(5, str.length-1);
            let list = JSON.parse(str).data.list;


            let ret = [];
            for(let i=0; i<list.length; i++){
                let singer = [];
                list[i].musicData.singer.forEach((s, index)=>{
                    singer.push(s.name)
                });
                singer = singer.join('/');

                ret.push({
                    id: list[i].musicData.songid,
                    mid: list[i].musicData.songmid,
                    singer,
                    name: list[i].musicData.songname,
                    album: list[i].musicData.albumname,
                    duration: list[i].musicData.interval,
                    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].musicData.albummid}.jpg?max_age=2592000`,
                    // url:  `http://ws.stream.qqmusic.qq.com/${list[i].musicData.songid}.m4a?fromtag=46`
                    url:  `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003LnSNo1ecdc3.m4a?guid=1240955523&vkey=613CCE1ADD13400E3457D3E738B7DEAC09EB3B79429A130CC04D07EE3AE262E9F0DCB0D4119179E9BB81A16BED7F6B3CCCDDB5FED5C03952&uin=0&fromtag=38`
                })
            }
            res.send(JSON.stringify({
                code: 0,
                data: {
                    list: ret
                }
            }))
        })
        .catch(err=>{
            console.log(err)
        })
});

//获取排行榜歌单列表
router.get('/getRankList', (req, res)=>{
    axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp0')
        .then(response=>{
            let str = response.data;
            str = str.substring(4, str.length-1);
            let list = JSON.parse(str);
            res.send(list)
        }).catch(err=>{
        console.log(err);
    })
});

//获取热门搜索数据
router.get('/getPopularSearches', (req, res)=>{
    axios.get('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5')
        .then(value=>{
            res.send(value.data)
        })
        .catch(err=>{
            console.log(err)
        })
});

//搜索
router.get('/search', (req, res)=>{
    let searchKey = req.query.searchKey;
    let page = req.query.page;
    axios.get(`https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=64529143494865367&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${page}&n=10&w=${searchKey}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`)
        .then(value=>{
            res.send(value.data)
        })
        .catch(err=>{
            console.log(err)
        })
});

//把router导出去，给app.js引入并获取router对象
module.exports = router;
