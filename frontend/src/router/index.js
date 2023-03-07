import { createRouter, createWebHistory } from "vue-router";

// make all paths and names lowercase for consistency
const routes = [
  {
    path: "/",
    props: true,
    component: () => import("../components/homePage.vue"),
  },
  {
    path: "/intakeform",
    name: "intakeform",
    props: true,
    component: () => import("../components/intakeForm.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/findclient",
    name: "findclient",
    component: () => import("../components/findClient.vue"),
  },
  {
    path: "/updateclient/:id",
    name: "updateclient",
    props: true,
    component: () => import("../components/updateClient.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/eventform",
    name: "eventform",
    component: () => import("../components/eventForm.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/findevents",
    name: "findevents",
    component: () => import("../components/findEvents.vue"),
  },
  {
    path: "/eventdetails/:id",
    name: "eventdetails",
    props: true,
    component: () => import("../components/eventDetails.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/loginPage",
    name: "loginPage",
    component: () => import("../components/loginPage.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const loggedIn = false;
router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (loggedIn) {
      next();
    } else {
      next("/loginPage");
      alert("Please Login for access");
    }
  } else {
    next();
  }
});
export default router;
