import store from "./store"

const app = createApp(App)
app.use(store)
app.mount("#app")
