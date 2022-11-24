import $https from './respon'

// 01 获取销量数据
export let GetHome = () => $https({ method: 'get', url: "/home/getData" })



// 获取用户列表数据
export let GetUserList = (params) => $https({ method: "get", url: "/user/getUser", params: params })

// 增加用户列表
export let CreateUser = (data = {}) => $https({ method: "post", url: "/user/createUser", data: data })

//删除用户
export let DeleteUser = (data = {}) => $https({ method: "post", url: "/user/deleteUser", data: data })

//批量删除用户
export let BatchUser = (data = {}) => $https({ method: "post", url: "/user/batchUser", data: data })
// 更新用户
export let updateUser = (data = {}) => $https({ method: "post", url: "/user/updateUser", data: data })
