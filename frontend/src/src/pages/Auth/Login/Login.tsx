import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { privateRoutes, publicRoutes } from "src/models";
import { LoginValidatorForm } from "src/validators";
import { AuthContext } from "src/context/auth";
import { SettingsContext } from "src/context/settings";
import AuthService from "src/services/auth.service";
import Alerts from "src/lib/Alerts";
import { useFetch } from "src/hooks";
import { CustomStorage } from "src/lib";
import styles from "../auth.module.css";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { setUserAuth } = authContext;
  const settingsContext = useContext(SettingsContext);
  const { loading, callEndpoint } = useFetch();
  const {
    settingsState: { translated_text },
  } = settingsContext;

  const formik = useFormik({
    initialValues: LoginValidatorForm.initialState,
    validationSchema: LoginValidatorForm.validatorSchemaLogin,
    validateOnMount: false,
    onSubmit: async ({ user_email, user_password }) => {
      try {
        if (formik.isValid && !loading) {
          const res = await callEndpoint(
            AuthService.login(user_email, user_password)
          );
          if (res.data.ok) {
            CustomStorage.token = res.data.data.token;
            setUserAuth(res.data.data.user);
            formik.resetForm();
            navigate(`/${privateRoutes.PRIVATE}`, { replace: true });
          }
        }
      } catch (error: any) {
        await Alerts.showToast("error", error.response.data.error);
      }
    },
  });

  return (
    <article className={styles.authentication}>
      <section className={styles.authentication__wrapper}>
        <h3>MAPI</h3>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div
            className={`${styles.authentication__input} ${
              formik.touched.user_email && formik.errors.user_email
                ? styles.authentication__input_error
                : ""
            }`}
          >
            <label htmlFor="user_email">{translated_text.email}</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              placeholder={translated_text.write_email}
              onBlur={formik.handleBlur}
              value={formik.values.user_email}
              onChange={formik.handleChange}
              autoFocus
            />

            {formik.touched.user_email && formik.errors.user_email ? (
              <span className="animate__animated animate__headShake">
                * {formik.errors.user_email}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <div
            className={`${styles.authentication__input} ${
              formik.touched.user_password && formik.errors.user_password
                ? styles.authentication__input_error
                : ""
            }`}
          >
            <label htmlFor="user_password">{translated_text.password}</label>
            <input
              type="password"
              id="user_password"
              name="user_password"
              placeholder={translated_text.write_password}
              onBlur={formik.handleBlur}
              value={formik.values.user_password}
              onChange={formik.handleChange}
            />
            {formik.touched.user_password && formik.errors.user_password ? (
              <span className="animate__animated animate__headShake">
                * {formik.errors.user_password}
              </span>
            ) : (
              <span></span>
            )}
          </div>
          <button
            type="submit"
            disabled={!formik.dirty || !formik.isValid || loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-pulse"></i>
            ) : (
              translated_text.login
            )}
          </button>
          <Link to={`/${publicRoutes.RECOVERY}`}>
            {translated_text.recovery_password}
          </Link>
        </form>
      </section>
    </article>
  );
};

export default Login;
