import { Link } from "react-router-dom";
import { publicRoutes } from "src/models";
import { useFormik } from "formik";
import { RecoveryValidatorForm } from "src/validators";
import { useContext } from "react";
import { SettingsContext } from "src/context/settings";
import { useFetch } from "src/hooks";
import AuthService from "src/services/auth.service";
import Alerts from "src/lib/Alerts";
import styles from "../auth.module.css";

const Recovery = () => {
  const settingsContext = useContext(SettingsContext);
  const { loading, callEndpoint } = useFetch();
  const {
    settingsState: { translated_text },
  } = settingsContext;

  const formik = useFormik({
    initialValues: RecoveryValidatorForm.initialState,
    validationSchema: RecoveryValidatorForm.validatorSchemaRecovery,
    validateOnMount: false,
    onSubmit: async ({ user_email }) => {
      try {
        if (formik.isValid && !loading) {
          const res = await callEndpoint(AuthService.forgot(user_email));
          if (res.data.ok) {
            await Alerts.showPopup(
              "Enlace de recuperación enviada",
              `Revisa la bandeja de entrada del correo ${user_email} para recuperar la contraseña.`
            );
            formik.resetForm();
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
          <p>{translated_text.text_recovery}</p>
          <div
            className={`${styles.authentication__input} ${
              formik.touched.user_email && formik.errors.user_email
                ? styles.authentication__input_error
                : ""
            }`}
          >
            <label htmlFor="user_email">{translated_text.user_email}</label>
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
          <button
            type="submit"
            disabled={!formik.dirty || !formik.isValid || loading}
          >
            {loading ? (
              <i className="fas fa-spinner fa-pulse"></i>
            ) : (
              translated_text.recovery_password
            )}
          </button>
          <Link to={`/${publicRoutes.LOGIN}`}>{translated_text.back}</Link>
        </form>
      </section>
    </article>
  );
};

export default Recovery;
