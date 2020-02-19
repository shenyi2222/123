import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/register.vue'
import Home from './components/home.vue'
import Welcome from './components/welcome.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/Login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [{
        path: '/welcome', component: Welcome
      }]
    }
  ]
})
