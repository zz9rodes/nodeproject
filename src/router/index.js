import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:()=>import('../views/HomeView.vue')
      
    },
    {
      path: '/insription',
      name: 'inscription',
      component:()=>import('../views/Inscription.vue')
      
    },
    {
      path: '/list_proposition',
      name: 'list_proposition',
      component: () => import('../views/Mes_proposition.vue')
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
    },
    {
      path:'/messagerie',
      name:'messagerie',
      component:()=>import('../views/Message.vue')
    },
    {
      path:'/updating',
      name:'updating,',
      component:()=>import('../views/UpdatePasswork.vue')
    },
    {
      path:'/UpdatePasswork',
      name:'UpdatePasswork',
      component:()=>import('../views/ResetPasswork.vue')
    }
  ]
})

export default router
