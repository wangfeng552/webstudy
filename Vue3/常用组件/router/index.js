import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index"),
    name: "login",
  },
  {
    path: "/register/:id",
    component: () => import("../views/login/register"),
    name: "register",
  },
  { path: "/:pathMatch(.*)", component: () => import("../views/404") },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
