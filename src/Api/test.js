import { axiosGet, axiosPost } from './baseApi'

// export const getTestList = (params,config)=>axiosGet('/getTestList',params,config);
// export const postTestList = (params,config)=>axiosPost('/sgw_system_web/sys/shop/getBaseInfo',params,config);

// mock接口
// login
export const loginByUsername = (params, config) => axiosPost('/login/login', params, config)
export const logout = (params, config) => axiosPost('/login/logout', params, config)
export const getUserInfo = (params, config) => axiosGet('/user/info', params, config)

// table
export const getTableList = (params, config) => axiosGet('/article/list', params, config)
export const getFetchPv = (params, config) => axiosGet('/article/pv', params, config)
export const createArticle = (params, config) => axiosPost('/article/create', params, config)
export const updateArticle = (params, config) => axiosPost('/article/update', params, config)

// qiniu  假地址 自行替换
export const getToken = (params, config) => axiosGet('/qiniu/upload/token', params, config)

// 真地址
// // 获取验证码
// export const postSendMessage = (params, config) => axiosPost('/login/sendMessage', params, config);
// // 登录接口
// export const loginByUsername = (params, config) => axiosPost('/login/signIn', params, config);
