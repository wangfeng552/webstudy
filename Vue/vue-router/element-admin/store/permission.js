import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    /*2022-3-1 add */
    // https://www.cnblogs.com/haoxianrui/p/13676619.html
    const component = tmp.component
    if (route.component) {
      if (component === "Layout") {
        tmp.component = Layout
      } else {
        tmp.component = (resolve) => require([`@/views/${component}`], resolve)
      }
    }
    /**结束 */
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      let  resRoute = [  {
        path: '/permission',
        component: 'Layout',
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
          title: 'permission',
          icon: 'lock',
          roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
          {
            path: 'page',
            component: 'permission/page',
            name: 'PagePermission',
            meta: {
              title: 'pagePermission',
              roles: ['admin',] // or you can only set roles in sub nav
            }
          },
        ]
      },]
      if (roles.includes('admin')) {

  
        // accessedRoutes = asyncRoutes || []
        accessedRoutes = filterAsyncRoutes(resRoute, roles)
      } else {
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        accessedRoutes = filterAsyncRoutes(resRoute, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
