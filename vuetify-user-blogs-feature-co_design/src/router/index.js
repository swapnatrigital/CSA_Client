import Vue from 'vue'
import VueRouter from 'vue-router'
 import store from '../store';
import ChennalList from '../views/ChennalList.vue'
import Optimization from '../views/Optimization.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

    routes: [{
        path: '/',
        name: 'home',
        component:ChennalList,
        meta: {
          auth: true,
        },
        beforeEnter: (to, from, next) => {
          const { path } = to;
          if (path === '/login') {
            next({ name: 'Login'});
          }

          const cachedUser = localStorage.getItem('in:user');
          const {
            isLogin,
            userName,
            password
          } = store.state.auth;
          
          const isLoggedIn = isLogin && userName && password;
          if (isLoggedIn)
            next();
          else {
            if (cachedUser) {
              const user = JSON.parse(cachedUser);
              const cachedLogin = user.isLogin && user.userName && user.password;
              if (cachedLogin) {
                store.dispatch('auth/setUser', user);
                next()
              }else{
                next({ name: 'Login' })  
              }
            } else {
              next({
                name: 'Login'
              })
            }
          }
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          guest: true,
        },
      },
      {
        path: '/optimization',
        name: 'optimization',
        component: Optimization
      },
    ]
})

export default router
