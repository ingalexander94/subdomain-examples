import { lazy } from "react";

import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "src/components/RoutesWithNotFound";
import { Navbar } from "src/components/UI/Navbar";
import { privateRoutes } from "src/models";
import styles from "./private.module.css";

const Dashboard = lazy(() => import("src/pages/Private/Dashboard/Dashboard"));
const Home = lazy(() => import("src/pages/Private/Home/Home"));
const Settings = lazy(() => import("src/pages/Private/Settings/Settings"));

const Private = () => {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper__private}>
        <RoutesWithNotFound>
          <Route path="/" element={<Navigate to={privateRoutes.DASHBOARD} />} />
          <Route path={privateRoutes.DASHBOARD} element={<Dashboard />} />
          <Route path={privateRoutes.HOME} element={<Home />} />
          <Route path={privateRoutes.SETTINGS} element={<Settings />} />
        </RoutesWithNotFound>
      </div>
    </>
  );
};

export default Private;
