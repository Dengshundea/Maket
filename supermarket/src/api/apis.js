// 1. 准备
    // 引入axios模块
    import axios from 'axios';

    // 创建axios工程化实例
    const axiosInstance = axios.create({
                            // 配置项名称 : 配置项值
                            // 定义axios的全局请求地址
                            baseURL:'http://127.0.0.1:666'
                          })
    /*封装*/
    function http(type,url,params=null) {
        //定义res;
        let res;
        //判断
        if(type==='get'){
            res=axiosInstance.get(url,{params:params})
        }else{
            res=axiosInstance.post(url,params)
        }
        return res.then(({data})=>data)
    }

// 2. 执行
    // 定义并导出接口地址
         //用户登陆
    export const login =(user)=>{return http('post','/login/checkLogin',user)};

        //获取用户名  token:用户身份令牌
    export const getLoginUsername =(token)=>{return http('post','/login/getCurrentUsername',token)};

        //获取用户角色  token:用户身份令牌
    export const getLoginUserRole =(token)=>{return http('post','/login/getCurrentUserRole',token)};

        // 用户列表接口
    //export const listUser =(data)=>{return http('get','/user/listUser',data)};
        //带查询
    export const listUser =(searchObj)=>{return http('post','/user/listUser',searchObj)};

        //用户添加接口
    export const addUser=(data)=>{return http('post','/user/addUser',data)}

        //用户修改密码接口
    export const changePassword=(data)=>{return http('post','/user/changePwd',data)}

        // 用户删除接口
    export const deleteUser=(id)=>{return http('get','/user/deleteUser',id)}

        // 用户修改接口
    export const updateUser=(data)=>{return http('post','/user/updateUser',data)}

        //商品列表
    export const listProudct=(data)=>{return http('get','/product/getProductList',data)}

        //添加商品接口
    export const addProduct=(data)=>{return http('post','/product/addProduct',data)}

        //库存列表
    export const shopStock =(data)=>{return http('get','/stock/shopStock',data)}

        //添加入库
    export const addStock =(data)=>{return http('get','/stock/addStock',data)}





    //原型如下：
      /*  export const addStock =(stock)=>{
            return axiosInstance
                .post('/stock/addStock',stock)
                .then(({data})=>{
                    return data;
                })
        }*/
