import Vue from 'vue'
import VueRouter from 'vue-router'

// import Recommend from "../pages/Recommend/Recommend";
// import Singer from "../pages/Singer/Singer";
// import Rank from "../pages/Rank/Rank";
// import Search from "../pages/Search/Search";
// import SingerDetail from "../pages/Singer/SingerDetail/SingerDetail";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            // 路由懒加载
            component: () => import("../pages/Recommend/Recommend"),
            meta: {
                isShowTop: true
            }
        },
        {
            path: '/singer',
            component: () => import("../pages/Singer/Singer"),
            children: [
                {
                    path: ':id',
                    component: () => import("../pages/Singer/SingerDetail/SingerDetail")
                }
            ],
            meta: {
                isShowTop: true
            }
        },
        {
            path: '/rank',
            component: () => import("../pages/Rank/Rank"),
            meta: {
                isShowTop: true
            }
        },
        {
            path: '/search',
            component: () => import("../pages/Search/Search"),
            meta: {
                isShowTop: true
            }
        },
        {
            path: '/mine',
            component: () => import("../pages/Mine/Mine")
        }
    ]
})
