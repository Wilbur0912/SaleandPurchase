import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./components/TutorialsList")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./components/Tutorial")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial")
  },
  {
    path: "/sales/:id",
    name: "sales-details",
    component: () => import("./components/Sale")
  },
  {
    path: "/",
    alias: "/sales",
    name: "sales",
    component: () => import("./components/SalesList")
  },
  {
    path: "/addSale",
    name: "addSale",
    component: () => import("./components/AddSale")
  },
  {
    path: "/sale",
    name: "sale",
    component: () => import("./components/Sale")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;