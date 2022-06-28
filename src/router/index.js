import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOutPage from '@/views/layOutPage'
const HomePage = () => import('@/views/HomePage')
const MyPage = () => import('@/views/MyPage')
const QuestionPage = () => import('@/views/QuestionPage')
const VideoPage = () => import('@/views/VideoPage')
const LoginPage = () => import('@/views/LoginPage')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: LayOutPage,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: HomePage
      },
      {
        path: '/video',
        component: VideoPage
      },
      {
        path: '/question',
        component: QuestionPage
      },
      {
        path: '/my',
        component: MyPage

      }
    ]
  },
  {
    path: '/login',
    component: LoginPage
  }
]
const router = new VueRouter({
  routes
})

export default router
