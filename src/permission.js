
import router, { asyncRoutes } from './router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  // console.log(getToken)
  console.log(store.state.user.token)
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.getters.userId) {
        // 有token,要去的不是login，就直接放行
        // 进一步获取用户信息
        // 发ajax---派发action来做
        await store.dispatch('user/getUserInfo')

        await store.dispatch('permission/generateRoutes', asyncRoutes)
      }
      next()
      NProgress.done()
    }
  } else {
    whiteList.includes(to.path) ? next() : next('/login')
    NProgress.done()
  }
})

// import { Message } from 'element-ui'
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false })

// router.beforeEach(async(to, from, next) => {
//   NProgress.start()
//   document.title = getPageTitle(to.meta.title)
//   const hasToken = getToken()
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasRoles = store.getters.roles && store.getters.roles.length > 0
//       if (hasRoles) {
//         next()
//       } else {
//         try {
//           const { roles } = await store.dispatch('user/getInfo')
//           const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
//           router.addRoutes(accessRoutes)
//           next({ ...to, replace: true })
//         } catch (error) {
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })
