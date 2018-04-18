/**
 * Created by zhangyao 2018/04/12
 */
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import qs from 'qs'
import store from '@/store'
import { getToken } from '@/utils/auth'

const AxiosIns = axios.create({ // process.env.BASE_API
  baseURL: process.env.BASE_API_1,
  timeout: 20000,
  ContentType: 'application/x-www-form-urlencoded'
  // ContentType: 'application/json',
})
let timer = []
let delay = 300

class GLoading {
  constructor(ops) {
    this.loadingIns = {
      close() {
      }
    }
    this.options = Object.assign({
      fullscreen: true,
      text: '加载中'
    }, ops)
  }

  open() {
    this.loadingIns = Loading.service(this.options)
  }

  close() {
    try {
      this.loadingIns.close()
    } catch (e) {
      // //Console.log(e);
    }
  }
}

var load = new GLoading()
AxiosIns.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (config.showFullLoading !== 'close') {
    timer.push(setTimeout(() => {
      // 开启转圈圈
      load.open()
    }, delay))
  }

  // config.data = qs.stringify(config.data)
  return config
}, (error) => {
  return Promise.reject(error)
})

AxiosIns.interceptors.response.use(response => {
  for (var t of timer) {
    clearTimeout(t)
  }
  // 请求结束 清除转圈圈
  load.close()
  try {
    if (response.data) {
      // let res = response.data
      // if (res.code !== '0000') {
      //   Message({
      //     message: res.msg,
      //     type: 'error'
      //   })
      // }
      /**
       * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
       * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
       */
      //     if (res.code !== 20000) {
      //       Message({
      //         message: res.message,
      //         type: 'error',
      //         duration: 5 * 1000
      //       });
      //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //           confirmButtonText: '重新登录',
      //           cancelButtonText: '取消',
      //           type: 'warning'
      //         }).then(() => {
      //           store.dispatch('FedLogOut').then(() => {
      //             location.reload();// 为了重新实例化vue-router对象 避免bug
      //           });
      //         })
      //       }
      //       return Promise.reject('error');
      //     }
    }
  } catch (error) {
    // console.log(error)
  }
  return response.data
}, (error) => {
  for (var v of timer) {
    clearTimeout(v)
  }
  // 关闭转圈圈
  load.close()
  Message({
    message: error.message,
    type: 'error'
  })
  // try {
  //   //401跳登录
  //   // if(error.response.data.Code === 401){
  //   //   setTimeout(()=>{
  //   //     Vue.$router.push({
  //   //       name : 'userLogin'
  //   //     })
  //   //   },100)
  //   // }
  // } catch (e) {
  //   console.log(e);
  // }
  return Promise.reject(error)
})
export default AxiosIns
