import { LoginRequest } from "@constant/request/LoginRequest";
import httpPublic from "..";
import { AuthenticationResponse } from "@constant/response/AuthenticationResponse";
import { RegisterRequest } from "@constant/request/RegisterRequest";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import { IntrospectResponse } from "@constant/response/IntrospectResponse";
import { ResetPasswordRequest } from "@constant/request/ResetPasswordRequest";

const BASE_URL = "/auth";

class AuthService {
  static async login(request: LoginRequest): Promise<AuthenticationResponse> {
    const { data } = await httpPublic.post(`${BASE_URL}/login`, request);

    return data;
  }

  static async register(request: RegisterRequest): Promise<UserShortResponse> {
    const { data } = await httpPublic.post(`${BASE_URL}/register`, request);

    return data;
  }

  static async introspect(request: {
    token: string;
  }): Promise<IntrospectResponse> {
    const { data } = await httpPublic.post(`${BASE_URL}/introspect`, request);

    return data;
  }

  static async logout(request: { token: string }): Promise<void> {
    await httpPublic.post(`${BASE_URL}/logout`, request);
  }

  static async refresh(request: {
    token: string;
  }): Promise<AuthenticationResponse> {
    const { data } = await httpPublic.post(`${BASE_URL}/refresh`, request);

    return data;
  }

  static async requestResetPassword(email: string, locale: "VI" | "EN") {
    try {
      await httpPublic.post(`${BASE_URL}/password-reset-requests`, { email, locale });
    } catch (e) {
      throw e;
    }
  }
  static async resetPassword(data: ResetPasswordRequest) {
    try {
      await httpPublic.post(`${BASE_URL}/password-resets`, data);
    } catch (e) {
      throw e;
    }
  }
}

export default AuthService;
