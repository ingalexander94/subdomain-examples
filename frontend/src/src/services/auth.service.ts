import axios from "axios";
import { ForgotResponse, LoginResponse } from "src/interfaces";
import Endpoints from "src/models/endpoints.model";
import { loadAbort } from "src/utilities";

export default class AuthService {
  private static API_URL = "http://localhost:4000/api/v1";

  private constructor() {}

  static forgot(user_email: string) {
    const controller = loadAbort();
    return {
      call: axios.post<ForgotResponse>(
        `${this.API_URL}/${Endpoints.forgot}`,
        { user_email },
        { signal: controller.signal }
      ),
      controller,
    };
  }

  static login(user_email: string, user_password: string) {
    const controller = loadAbort();
    return {
      call: axios.post<LoginResponse>(
        `${this.API_URL}/${Endpoints.login}`,
        { user_email, user_password },
        { signal: controller.signal }
      ),
      controller,
    };
  }
}
