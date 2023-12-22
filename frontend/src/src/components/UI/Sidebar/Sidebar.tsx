import { modulesGlobalRoutes } from "src/models";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { useContext } from "react";
import { SettingsContext } from "src/context/settings";

const Sidebar = () => {
  const settingsContext = useContext(SettingsContext);
  const {
    settingsState: { translated_text },
  } = settingsContext;

  return (
    <aside className={styles.sidebar}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/24/%C3%81lvaro_Uribe_%28cropped%29.jpg"
        alt="Avatar"
      />
      <ul className={styles.sidebar__modules}>
        {modulesGlobalRoutes.map(({ path }) => (
          <li key={path}>
            <NavLink
              to={`/private/${path}`}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              {translated_text[path]}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
