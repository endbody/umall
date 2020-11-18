import Vue from "vue"
import axios from "axios"
import qs from "qs"
import { errorAlert } from "./alert"
import store from "../store/index"
import router from "../router"


let baseUrl = "/api"
Vue.prototype.$img = "http://localhost:3000"

// 响应拦截
axios.interceptors.response.use(res => {

    console.log(res.config.url)
    console.log(res)

    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    // if(res.config.url==baseUrl+"/api/menulist"){
    //     res.data.msg="登录已过期或访问权限受限"
    // }

    if (res.data.msg === "登录已过期或访问权限受限") {//掉线了
        //清除登录信息
        store.dispatch("changeUser", {})
        //跳转到登录页
        router.push("/login")
    }

    return res;
})

axios.interceptors.request.use(req => {//请求拦截
    if (req.url !== baseUrl + "/login") {
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})

// 菜单管理列表请求

export const reqMenuList = () => {
    return axios({
        method: "get",
        url: baseUrl + "/api/menulist",
    })
}


//菜单管理列表添加请求

export const reqMenuAdd = (form) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/menuadd",
        data: qs.stringify(form)
    })
}

//菜单管理列表删除请求

export const reqMenuDel = (id) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/menudelete",
        data: qs.stringify({
            id
        })
    })
}


//菜单管理列表修改请求

export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//菜单管理交互请求

export const reqMenuListAll = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}



// 修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}


// ===========================角色添加开始=============================

export const resRolAdd = (user) => {//角色添加
    return axios({
        method: "post",
        url: baseUrl + "/api/roleadd",
        data: qs.stringify(user)
    })
}


export const resRolList = () => {//角色列表
    return axios({
        method: "get",
        url: baseUrl + "/api/rolelist"
    })
}

export const resRolDel = (id) => {//角色删除
    console.log(id)
    return axios({
        method: "post",
        url: baseUrl + "/api/roledelete",
        data: qs.stringify({ id })
    })
}


export const reqRolDetail = (id) => {//角色详情
    return axios({
        method: "get",
        url: baseUrl + "/api/roleinfo",
        params: {
            id
        }
    })
}


export const reqRolEdit = (user) => {//角色详情
    return axios({
        method: "post",
        url: baseUrl + "/api/roleedit",
        data: qs.stringify(user)
    })
}

// ===========================角色添加结束====================================


// ===========================管理员列表开始====================================

// 参数格式{size,page}
export const resUserList = (p) => {//管理员列表
    console.log(p)
    return axios({
        method: "get",
        url: baseUrl + "/api/userlist",
        params: p
    })
}


export const resUserDetail = (uid) => {//管理圆详情
    return axios({
        method: "get",
        url: baseUrl + "/api/userinfo",
        params: {
            uid
        }
    })
}

export const resUserUpdate = (user) => {//管理圆修改
    return axios({
        method: "post",
        url: baseUrl + "/api/useredit",
        data: qs.stringify(user)
    })
}


export const reqUserDel = (uid) => {//管理圆删除
    return axios({
        method: "post",
        url: baseUrl + "/api/userdelete",
        data: qs.stringify({ uid })
    })
}

export const reqUserAdd = (user) => {//管理圆添加
    return axios({
        method: "post",
        url: baseUrl + "/api/useradd",
        data: qs.stringify(user)
    })
}

export const reqUserCount = (user) => {//管理圆总数
    return axios({
        method: "get",
        url: baseUrl + "/api/usercount"
    })
}

// ===========================管理员列表结束====================================

// ===========================管理员登陆开始====================================

export const reqUserLogin = (user) => {//管理圆总数
    return axios({
        method: "post",
        url: baseUrl + "/api/userlogin",
        data: user
    })
}

// ===========================管理员登陆结束====================================






// ===========================商品分类开始====================================

// 参数格式{size,page}
export const resCateList = (list) => {//商品分类列表

    return axios({
        method: "get",
        url: baseUrl + "/api/catelist",
        params: list
    })
}


export const resCateDetail = (id) => {//商品分类获取（一条）
    return axios({
        method: "get",
        url: baseUrl + "/api/cateinfo",
        params: {
            id
        }
    })
}

export const resCateUpdate = (cate) => {//商品分类修改

    let d = new FormData();
    for (let key in cate) {
        d.append(key, cate[key])
    }


    return axios({
        method: "post",
        url: baseUrl + "/api/cateedit",
        data: d
    })
}


export const reqCateDel = (id) => {//商品分类删除
    return axios({
        method: "post",
        url: baseUrl + "/api/catedelete",
        data: qs.stringify({ id })
    })
}

export const reqCateAdd = (cate) => {//商品分类添加

    let d = new FormData();
    for (let key in cate) {
        d.append(key, cate[key])
    }

    return axios({
        method: "post",
        url: baseUrl + "/api/cateadd",
        data: d
    })
}


// ===========================商品分类结束====================================




// ===========================商品规格列表开始====================================

// 参数格式{size,page}
export const resSpecsList = (list) => {//商品规格列表（分页）

    console.log(list)
    return axios({
        method: "get",
        url: baseUrl + "/api/specslist",
        params: list
    })
}


export const resSpecsDetail = (id) => {//商品规格获取（一条）
    return axios({
        method: "get",
        url: baseUrl + "/api/specsinfo",
        params: {
            id
        }
    })
}

export const resSpecsUpdate = (specs) => {//商品规格修改
    console.log(specs)
    return axios({
        method: "post",
        url: baseUrl + "/api/specsedit",
        data: qs.stringify(specs)
    })
}


export const reqSpecsDel = (id) => {//商品规格删除
    return axios({
        method: "post",
        url: baseUrl + "/api/specsdelete",
        data: qs.stringify({ id })
    })
}


export const reqSpecsAdd = (specs) => {//商品规格添加

    return axios({
        method: "post",
        url: baseUrl + "/api/specsadd",
        data: qs.stringify(specs)
    })
}


export const reqSpecsCount = (specs) => {//商品规格总数
    return axios({
        method: "get",
        url: baseUrl + "/api/specscount"
    })
}



// ===========================商品规格列表结束====================================



// ===========================会员开始====================================


export const reqMemberList = () => {//会员列表
    return axios({
        method: "get",
        url: baseUrl + "/api/memberlist"
    })
}


export const reqMemberDetail = (uid) => {//会员获取（一条）
    return axios({
        method: "get",
        url: baseUrl + "/api/memberinfo",
        params: {
            uid
        }
    })
}


export const reqMemberUpdate = (vip) => {//会员修改
    console.log(vip)
    return axios({
        method: "post",
        url: baseUrl + "/api/memberedit",
        data: qs.stringify(vip)
    })
}



// ===========================会员结束====================================



// ===========================轮播图开始====================================


export const reqBannerList = () => {//轮播图列表
    return axios({
        method: "get",
        url: baseUrl + "/api/bannerlist"
    })
}


export const reqBannerDetail = (id) => {//轮播图获取（一条）
    return axios({
        method: "get",
        url: baseUrl + "/api/bannerinfo",
        params: {
            id
        }
    })
}


export const reqBannerUpdate = (banner) => {//轮播图修改

    let d = new FormData();
    for (let key in banner) {
        d.append(key,banner[key])
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/banneredit",
        data: d
    })
}



export const reqBannerDel = (id) => {//轮播图删除
    return axios({
        method: "post",
        url: baseUrl + "/api/bannerdelete",
        data: qs.stringify({id})
    })
}



export const reqBannerAdd = (banner) => {//轮播图添加
console.log(banner);
    let d = new FormData();
    for (let key in banner) {
        d.append(key,banner[key])
    }
console.log(d);
    return axios({
        method: "post",
        url: baseUrl + "/api/banneradd",
        data: d
    })
}




// ===========================轮播图结束====================================



// ===========================商品管理开始====================================


export const reqGoodsList = (p) => {//商品列表（分页）
    console.log(p)
    return axios({
        method: "get",
        url: baseUrl + "/api/goodslist",
        params:p,

    })
}


export const reqGoodsDetail = (id) => {//商品获取（一条）
    return axios({
        method: "get",
        url: baseUrl + "/api/goodsinfo",
        params: {
            id
        }
    })
}

export const reqGoodsCount = () => {//商品获取（总数）
    return axios({
        method: "get",
        url: baseUrl + "/api/goodscount",
    })
}


export const reqGoodsUpdate = (goods) => {//商品修改

    let d = new FormData();
    for (let key in goods) {
        d.append(key,goods[key])
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/goodsedit",
        data: d
    })
}



export const reqGoodsDel = (id) => {//商品删除
    return axios({
        method: "post",
        url: baseUrl + "/api/goodsdelete",
        data: qs.stringify({id})
    })
}



export const reqGoodsAdd = (goods) => {//商品添加
    console.log(goods);
    let d = new FormData();
    for (let key in goods) {
        d.append(key,goods[key])
    }
console.log(d);
    return axios({
        method: "post",
        url: baseUrl + "/api/goodsadd",
        data: d
    })
}




// ===========================商品管理结束====================================



// ===========================商品管理开始====================================


export const reqSecksList = (p) => {//限时秒杀列表
    return axios({
        method: "get",
        url: baseUrl + "/api/secklist",
        params:p,

    })
}




export const reqSecksDetail = (id) => {//限时秒杀获取（一条）

    return axios({
        method: "get",
        url: baseUrl + "/api/seckinfo",
        params:{id}
    })
}



export const reqSecksDel = (id) => {//限时秒杀删除
    return axios({
        method: "post",
        url: baseUrl + "/api/seckdelete",
        data: qs.stringify({id})
    })
}



export const reqSecksAdd = (secks) => {//限时秒杀添加
    console.log(secks);
    return axios({
        method: "post",
        url: baseUrl + "/api/seckadd",
        data: qs.stringify(secks)
    })
}

export const reqSecksUpdate = (secks) => {//限时秒杀修改
    console.log(secks);
    return axios({
        method: "post",
        url: baseUrl + "/api/seckedit",
        data: qs.stringify(secks)
    })
}



// ===========================商品管理结束====================================




