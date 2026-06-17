import { LoginRequest } from "@constant/request/LoginRequest";
import httpClient from "..";
import { AuthenticationResponse } from "@constant/response/AuthenticationResponse";
import { RegisterRequest } from "@constant/request/RegisterRequest";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import { IntrospectResponse } from "@constant/response/IntrospectResponse";

const BASE_URL = "/auth";

class AuthService {
  static async login(request: LoginRequest): Promise<AuthenticationResponse> {
    const { data } = await httpClient.post(`${BASE_URL}/login`, request);

    return data;
  }

  static async register(request: RegisterRequest): Promise<UserShortResponse> {
    const { data } = await httpClient.post(`${BASE_URL}/register`, request);

    return data;
  }

  static async introspect(request: {
    token: string;
  }): Promise<IntrospectResponse> {
    const { data } = await httpClient.post(`${BASE_URL}/introspect`, request);

    return data;
  }

  static async logout(request: { token: string }): Promise<void> {
    await httpClient.post(`${BASE_URL}/logout`, request);
  }

  static async refresh(request: {
    token: string;
  }): Promise<AuthenticationResponse> {
    const { data } = await httpClient.post(`${BASE_URL}/refresh`, request);

    return data;
  }
}

export default AuthService;
