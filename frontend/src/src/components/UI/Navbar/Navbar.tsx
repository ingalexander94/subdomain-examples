import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/auth";
import { UIContext } from "src/context/ui";
import { publicRoutes } from "src/models";
import styles from "./navbar.module.css";
import { Sidebar } from "../Sidebar";
import { CustomStorage } from "src/lib";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { setUserAuth, authState } = authContext;
  const uiContext = useContext(UIContext);
  const { toggleCheking } = uiContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    toggleCheking();
    setUserAuth(null);
    CustomStorage.removeToken();
    toggleCheking();
    navigate(`/${publicRoutes.LOGIN}`, { replace: true });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__menu}>
        <input type="checkbox" name="toggle_menu" id="toggle_menu" />
        <label htmlFor="toggle_menu">
          <i></i>
        </label>
        <Sidebar />
        <h4>MAPI</h4>
      </div>
      <ul className={styles.navbar__items}>
        <li>{authState.user?.roles[0].role_name}</li>
        <li>
          <button
            title="Cerrar sesión"
            className={styles.logout}
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
