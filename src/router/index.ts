import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/articles/IndexView.vue'
import CreateView from '@/views/articles/CreateView.vue'
import ShowView from '@/views/articles/ShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', redirect: '/articles' },
    { path: '/', redirect: { name: 'articles.index' } },
    { path: '/articles', name: 'articles.index', component: IndexView },
    { path: '/article/new', name: 'modal.create', component: CreateView },
    { path: '/article/:id', name: 'article.show', component: ShowView },
  ],
})

export default router
