import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:()=>import('../views/Inscription.vue')
      
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/contact',
      name:'contact',
      component:()=>import('../views/Contact.vue')
    },
    
    {
      path:'/list_annonce',
      name:'list_annonce',
      component:()=>import('../views/List_annonce.vue'),
      // props:true

    },
    {
      path:'/list_query',
      name:'list_query',
      component:()=>import('../views/Show_query.vue'),
    
    },
    {
      path:'/postuler',
      name:'postuler',
      component:()=>import('../views/Postuler.vue')
    },
    {
      path:'/connexion',
      name:'connexion',
      component:()=>import('../views/Connexion.vue')
    },
    {
      path:'/inscription',
      name:'inscription',
      component:()=>import('../views/Inscription.vue')
    },
    {
      path:'/list_my_annonce',
      name:'list_my_annoncce',
      component:()=>import('../views/My_Annonce.vue')
    }
  ]
})

export default router
