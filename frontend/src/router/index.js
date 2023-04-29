import { createRouter, createWebHistory } from "vue-router";

// make all paths and names lowercase for consistency - added new paths for Spring 2023
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
    path: '/services',
    name: 'services',
    component: () => import('../components/crudServices.vue'),
    meta: {
      needsAuth: true,
    }
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

export default router;
