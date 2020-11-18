export const state = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {}
}

export const mutations = {
    changeUser(state, obj) {
        if (obj.username) {
            state.userInfo = obj
            localStorage.setItem("userInfo", JSON.stringify(obj))
        } else {
            localStorage.removeItem("userInfo")
            state.userInfo = {}
        
        }

    }
}

export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}