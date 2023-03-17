import Vue from 'vue'
import VueRouter from 'vue-router'





Vue.use(VueRouter)

const routes = [
  {
    
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),

  },
  {
    //一级路由
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [{
        //二级路由
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue'),

      },
      {
        //二级路由
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Menu.vue'),

      },
      {
        //二级路由
        path: 'shopbag',
        name: 'Shopbag',
        component: () => import('../views/Shopbag.vue'),

      },
      {
        //二级路由
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue'),

      },

    ]
  },
  {
    //一级路由
    path: '/detail:pid',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),

  },
  {
    //一级路由
    path: '/like',
    name: 'Like',
    component: () => import('../views/Like.vue'),

  },
  {
    //一级路由
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue'),

  },
  {
    
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),

  },
  {
    
    path: '/newaddress',
    name: 'NewAddress',
    component: () => import('../views/NewAddress.vue'),

  },
  {
    
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue'),

  },
  {
    
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),

  },
  {
    
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue'),

  },
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  }


]

const router = new VueRouter({
  routes
})

export default router