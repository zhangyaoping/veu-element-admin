import {param2Obj} from '@/utils'
import { parseQueryString } from '@/utils'
const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  users: {
    roles: ['users'],
    token: 'users',
    introduction: '我是主管',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal users'
  }
}
export default {
  loginByUsername: config => {
    // const {username} = parseQueryString(config.body)
    const {username} = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const {token} = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
