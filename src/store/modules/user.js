import Api from '@/Api'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit, rootState}, userInfo) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        console.log('res',userInfo)
        Api.testApi.loginByUsername(userInfo).then(res => {
          commit('SET_TOKEN', res.token)
          setToken(res.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        Api.testApi.getUserInfo({token: state.token}).then(res => {
          if (!res) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          console.log(res.roles)
          commit('SET_ROLES', res.roles)
          commit('SET_NAME', res.name)
          commit('SET_AVATAR', res.avatar)
          commit('SET_INTRODUCTION', res.introduction)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        Api.testApi.logout(state.token).then(res => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({commit}, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        Api.testApi.getUserInfo({token: role}).then(res => {
          commit('SET_ROLES', res.roles)
          commit('SET_NAME', res.name)
          commit('SET_AVATAR', res.avatar)
          commit('SET_INTRODUCTION', res.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
