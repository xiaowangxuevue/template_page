import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "App",
    redirect: { name: "Index" },
    component: () => import("@/App.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/index"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
