import VueRouter, { Route } from 'vue-router'
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module 'vue/types/vue' {
    interface Vue {
        $Message: any,
        $modal: any,
        $router: VueRouter,
        $route: Route,
    }
}