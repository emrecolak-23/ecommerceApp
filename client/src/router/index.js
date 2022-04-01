import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../view/HomePage.vue'
import RegisterPage from '../view/RegisterPage.vue'
import LoginPage from '../view/LoginPage.vue'
import DashboardPage from '../view/DashboardPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/:id',
    name: 'CategoryPage',
    component: HomePage
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router