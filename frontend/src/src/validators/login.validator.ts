import * as Yup from "yup";

interface InitialStateFormLogin {
  user_email: string;
  user_password: string;
}

export class LoginValidatorForm {
  static initialState: InitialStateFormLogin = {
    user_email: "",
    user_password: "",
  };

  static validatorSchemaLogin = Yup.object({
    user_email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "No es un correo válido"
      )
      .required("El correo es necesario"),
    user_password: Yup.string()
      .min(6, "Debe tener mínimo 6 caracteres")
      .max(20, "Debe tener máximo 20 caracteres")
      .required("La contraseña es necesaria"),
  });
}
