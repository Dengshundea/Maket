import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
      {
          path: '/', // 访问路径
          redirect: '/login'  // 重定向到指定地址
          // redirect: {
          //   name :'home'
          // } // 重定向到路线的名称
      },
      {
          path: '/login', // 访问路径
          name : 'login',
          component: Login // 视图组件
      },
      {
          path: '/home',
          name : 'home',
          meta: { requiresAuth: true }, //添加需要控制的标志
          component: () => import('./views/Home.vue'),
          children:[
              {
                  path: '/home/User',
                  name : 'user',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Account/User.vue')
              },
              {
                  path: '/home/AddUser',
                  name : 'adduser',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Account/AddUser.vue')
              },
              {
                  path: '/home/ChangePassword',
                  name : 'changepassword',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Account/ChangePassword.vue')
              },
              {
                  path: '/home/Product',
                  name : 'product',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Product/Product.vue')
              },
              {
                  path: '/home/AddProduct',
                  name : 'addproduct',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Product/AddProduct.vue')
              },
              {
                  path: '/home/shopStock',
                  name : 'shopstock',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Stock/shopStock.vue')
              },
              {
                  path: '/home/addStock',
                  name : 'addstock',
                  meta: { requiresAuth: true },
                  component: () => import('./views/module/Stock/addStock.vue')
              },
          ]
      }
  ],
})

router.beforeEach((to,from,next)=>{
    //next()确定向后放行
    //next('/')拦截
    // if(to.name==='login'){ //名称验证不通用
    //     next()
    // }
    // debugger
    if(to.meta.requiresAuth){ //需要验证
        //获取登陆通行证
        const token = localStorage.getItem('token');
        //如果有验证信息，就放行
        if(token){
            next()
        }else{ //打回到登陆页面
            next('/login')
        }
    }else{
        next()//不需要验证，直接放行
    }
})

export default router
