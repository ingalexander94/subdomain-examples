export interface UserAuth {
  id_user: number;
  user_names: string;
  user_surnames: string;
  user_email: string;
  user_state: boolean;
  roles: Roles[];
}

export interface Roles {
  id_role: number;
  role_name: string;
  role_state: number;
}

export interface AuthState {
  user: UserAuth | null;
}

export interface ForgotResponse {
  ok: boolean;
  error: string | null;
}

export interface LoginResponse {
  ok: boolean;
  data: { tokem: string; user: UserAuth } | null;
  error: string | null;
}
