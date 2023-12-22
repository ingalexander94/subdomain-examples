import { RouteUI } from "src/interfaces";

export const publicRoutes = {
  LOGIN: "login",
  RECOVERY: "recovery",
  FORGOT: "forgot",
};

export const privateRoutes = {
  PRIVATE: "private",
  DASHBOARD: "dashboard",
  HOME: "home",
  SETTINGS: "settings",
};

export const modulesGlobalRoutes: RouteUI[] = [
  { path: "home" },
  { path: "dashboard" },
  { path: "settings" },
];
