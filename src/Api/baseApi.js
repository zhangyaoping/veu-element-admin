import $axios from './axiosSetting'

export const axiosGet = (url, params, config) => $axios.get(url, Object.assign({}, config, { params }))
export const axiosPost = (url, params, config) => $axios.post(url, params, config)

