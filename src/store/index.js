import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import { state, mutations, getters } from "./mutations"
import actions from "./actions"
import cate from "./modules/cate"
import specs from "./modules/specs"
import vip from "./modules/vip"
import banner from "./modules/banner"
import goods from "./modules/goods"






export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        cate,
        specs,
        vip,
        banner,
        goods
    }
})