import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import Test from '../views/Test.vue'
import Results from '../views/Results.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/personal-info',
    name: 'PersonalInfo',
    component: PersonalInfo
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/results',
    name: 'Results',
    component: Results
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router