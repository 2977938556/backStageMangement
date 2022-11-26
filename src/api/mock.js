import Mock from 'mockjs'



// 首页销量数据
import homeData from '@/mock/homeData'
// 用户管理数据
import userList from '@/mock/user'

import login from '@/mock/login'


// 获取首页数据
Mock.mock("/api/home/getData", homeData.getStatisticalData)



// 获取登录数据
Mock.mock(/api\/login\/getLogin/, "post", login.getMenu)


// 用户管理页面

// 获取用户列表
Mock.mock(/api\/user\/getUser/, userList.getUserList)
// 增加用户列表
Mock.mock('/api/user/createUser', "post", userList.createUser)
//删除用户
Mock.mock('/api/user/deleteUser', "post", userList.deleteUser)
//批量删除用户
Mock.mock('/api/user/batchUser', "post", userList.batchremove)
//更新用户
Mock.mock('/api/user/updateUser', "post", userList.updateUser)



