// 페이지를 관리해주는 하나의 구성 파일
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  // Hash
  // https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  // pages
  // '/' -> https://google.com/ : 메인페이지를 의미
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})