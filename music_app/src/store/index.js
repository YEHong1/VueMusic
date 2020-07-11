import Vue from 'vue'
import VueX from 'vuex'
import state from "./state";
import actions from "./action";
import mutations from "./mutations";
import getters from "./getter";

Vue.use(VueX);

export default new VueX.Store({
    state,
    actions,
    mutations,
    getters
})
