export  default {
    changeUser(context,userInfo){
        console.log(userInfo)
        context.commit("changeUser",userInfo)
     }
}