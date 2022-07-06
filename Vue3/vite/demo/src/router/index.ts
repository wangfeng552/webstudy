import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";
// import generatedRoutes from "~pages";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    // children: generatedRoutes,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/layout/login/index.vue"),
  },
  {
    path: "/base",
    component: () => import("@/layout/index.vue"),
    name: "base",
    redirect: "/base/brand",
    meta: { title: "basedata", icon: "el-icon-s-data" },
    children: [
      {
        path: "brand",
        component: () => import("@/views/basic-data/brand.vue"),
        name: "brand",
        meta: { title: "brand" },
      },
      {
        path: "global",
        component: () => import("@/views/basic-data/global.vue"),
        name: "global",
        meta: { title: "global" },
      },
      {
        path: "to",
        component: () => import("@/views/basic-data/toQjt.vue"),
        name: "to",
        meta: { title: "to" },
      },
      {
        path: "ref",
        component: () => import("@/views/basic-data/ref.vue"),
        name: "ref",
        meta: { title: "ref" },
      },
      {
        path: "reactive",
        component: () => import("@/views/basic-data/reactive.vue"),
        name: "reactive",
        meta: { title: "reactive" },
      },
      {
        path: "toQjt",
        component: () => import("@/views/basic-data/toQjt.vue"),
        name: "toQjt",
        meta: { title: "toQjt" },
      },
      {
        path: "computed",
        component: () => import("@/views/basic-data/computed.vue"),
        name: "computed",
        meta: { title: "computed" },
      },
      {
        path: "watch",
        component: () => import("@/views/basic-data/watch.vue"),
        name: "watch",
        meta: { title: "watch" },
      },
      {
        path: "parent",
        component: () => import("@/views/basic-data/parent.vue"),
        name: "parent",
        meta: { title: "parent" },
      },
      {
        path: "dongtai",
        component: () => import("@/views/basic-data/dongtai.vue"),
        name: "dongtai",
        meta: { title: "dongtai" },
      },
      {
        path: "ceshi",
        component: () => import("@/views/basic-data/ceshi.vue"),
        name: "ceshi",
        meta: { title: "ceshi" },
      },
      {
        path: "router",
        component: () => import("@/views/basic-data/router.vue"),
        name: "router",
        meta: { title: "router" },
      },
      {
        path: "routerdetail",
        component: () => import("@/views/basic-data/routerDetail.vue"),
        name: "routerdetail",
        meta: { title: "routerdetail" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/ceshi/'),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
}
export default router;
