import { createRouter, createWebHistory } from "vue-router";
import StopWatch from "../views/StopWatch.vue";
import Weather from "../views/Weather.vue";
import Location from "../views/Location.vue";
import Photo from "../views/Photo.vue";
import Game from "../views/Game.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Stopwatch",
      component: StopWatch,
    },
    {
      path: "/Weather",
      name: "Weather",
      component: Weather,
    },
    {
      path: "/Location",
      name: "Location",
      component: Location,
    },
    {
      path: "/Photo",
      name: "Photo",
      component: Photo,
    },
    {
      path: "/Game",
      name: "Game",
      component: Game,
    },
  ],
});

export default router;
