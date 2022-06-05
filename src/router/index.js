import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import JobList from "../views/JobList.vue";
import JobDetail from "../views/JobDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/is-ilanlari",
      name: "joblist",
      component: JobList,
    },
    {
      path: "/is-ilani",
      name: "jobdetail",
      component: JobDetail,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});

export default router;
