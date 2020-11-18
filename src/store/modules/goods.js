import { reqGoodsList,reqGoodsCount } from "../../utils/http"


const state = {
    list: [],
    size:2,
    page:1,
    count:0
}


const mutations = {

    changeList(state, arr) {
        state.list = arr
    },
    changPage(state,page){
        state.page = page
    },
    changeCount(state,count){
        state.count = count;
    }
}


const actions = {
    reqList(context,bool) {
        let obj = bool ? bool : {size:context.state.size,page:context.state.page}
        reqGoodsList(obj).then(res => {

            let list=res.data.list?res.data.list:[]
            if(list.length==0&&context.state.page>1){
                context.commit("changPage",context.state.page-1)
                context.dispatch("reqList");
                return;
            }

            context.commit("changeList", res.data.list)
        })
    },
    reqCount(context){
        reqGoodsCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total)
        })
    },
    changPages(context,page){
        console.log(page);
        context.commit("changPage",page)
        context.dispatch("reqList")
    }
   
}

const getters = {
    list(state) {
        return state.list
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
    },
    count(state){
        return state.count
    }
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
}

