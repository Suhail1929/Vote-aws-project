import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CandidatView from '../views/CandidatView.vue'
import CreateCandidatView from '../views/CreateCandidatView.vue'
import CandidatDetailsView from '../views/CandidatDetailsView.vue'


const router = createRouter({
  history:  createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/candidat',
      name: 'candidat',
      component: CandidatView,
    },
    {
      path: '/create-candidat',
      name: 'create-candidat',
      component: CreateCandidatView,
    },
    {
      path : '/candidat/:id',
      name: 'candidat-details',
      component: CandidatDetailsView,
    },
  ],
})

export default router
