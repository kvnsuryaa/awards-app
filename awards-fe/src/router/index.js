import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

// components
import Auth from "../pages/Auth/index.vue";
import Dashboard from "../pages/Dashboard/index.vue";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes,
});

router.beforeEach((to, from, next) => {
  const auth_token = store.getters["auth/token"];
  if (to.meta.requiresAuth && !auth_token) {
    console.log("Forbidden");
    return next("/auth");
  } else if (to.name === "Auth" && auth_token) {
    return next("/");
  } else {
    return next();
  }
});

export default router;
