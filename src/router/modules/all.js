import Layout from '@/layout'
// Layout组件中包含
export const employeesRouter = {
  path: '/employees', // 路径
  component: Layout, // 组件
  children: [{
    name: 'employees', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/employees/employees.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '员工管理', icon: 'portray' }
  }]
}
export const departmentsRouter = {
  path: '/departments', // 路径
  component: Layout, // 组件
  children: [{
    name: 'departments', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/departments/departments.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '组织架构', icon: 'platform' }
  }]
}
export const settingRouter = {
  path: '/settings', // 路径
  component: Layout, // 组件
  children: [{
    name: 'settings', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/settings/settings.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '角色管理', icon: 'home' }
  }]
}
export const salarysRouter = {
  path: '/salarys', // 路径
  component: Layout, // 组件
  children: [{
    name: 'salarys', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/salarys/salarys.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '工作', icon: 'recommend' }
  }]
}
export const socialRouter = {
  path: '/socialSecuritys', // 路径
  component: Layout, // 组件
  children: [{
    name: 'social_securitys', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/social_securitys/social_securitys.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '社保', icon: 'warning' }
  }]
}
// export const attendancesRouter = {
//   path: '/attendances', // 路径
//   component: Layout, // 组件
//   children: [{
//     name: 'attendances', // 给路由规则加一个name
//     path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
//     component: () => import('@/views/attendances/attendances.vue '),
//     // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
//     meta: { title: '考勤' }
//   }]
// }
export const approvalsRouter = {
  path: '/approvals', // 路径
  component: Layout, // 组件
  children: [{
    name: 'approvals', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/approvals/approvals.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '审批', icon: 'shenpi' }
  }]
}
export const permissionRouter = {
  path: '/permissions', // 路径
  component: Layout, // 组件
  children: [{
    name: 'permissions', // 给路由规则加一个name
    path: '', // 这里当二级路由的path什么都不写的时候 表示当前路由为默认路由直接渲染对应组件
    component: () => import('@/views/permissions/permissions.vue'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: { title: '权限管理', icon: 'share' }
  }]
}
