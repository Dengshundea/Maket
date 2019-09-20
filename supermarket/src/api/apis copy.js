// 1. 准备
    // 引入axios模块
    import axios from 'axios';

    // 抽取公共"接口域名"地址
    const baseUrl = 'http://127.0.0.1:666';

// 2. 执行
    // 定义接口地址
    // const listUser = baseUrl + '/user/listUser'
    export const listUser = ()=>{
        return axios
                  .get(baseUrl+'/user/listUser')
                  .then(({data})=>{
                    return data // 直接返回数据对象
                  })
                   //.then((resp)=>{
                     //return resp.data // 直接返回数据对象
                   //})
         
    }

// 3. 结果
// module.exports = listUser
// export default {    // import apis from '@/api.js'
//     listUser
// }

/**
 * 
 * axios.get(listUser).then(()=>{})
 * 
 * 
 * axios响应对象
 * 
 *   config:  axios的配置对象
 *   data  :  响应的数据对象 【响应结果】
 *   headers: 响应头信息
 *   request: ajax对象
 *   status:  状态码
 *   statusText: 状态信息
 */
