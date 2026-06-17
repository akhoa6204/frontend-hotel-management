import { SearchEmployee } from "@constant/internal/SearchEmployee";
import { SearchFilter } from "@constant/internal/SearchFilter";
import { ApiResponse } from "@constant/response/ApiResponse";
import { UserShortResponse } from "@constant/response/UserShortResponse";
import { UserRole } from "@enums/UserRole";
import httpClient from "..";
import { EmployeeCreationRequest } from "@constant/request/EmployeeCreationRequest";
import { EmployeeUpdateRequest } from "@constant/request/EmployeeUpdateRequest";
import { EmployeeResetPasswordRequest } from "@constant/request/EmployeeResetPasswordRequest";

const BASE_URL = "/staff/employees";

class StaffEmployeeService {
  static async getList(
    params?: SearchFilter & SearchEmployee,
  ): Promise<ApiResponse<UserShortResponse[]>> {
    return await httpClient.get(BASE_URL, {
      params,
    });
  }

  static async getById(id: string): Promise<UserShortResponse> {
    const { data } = await httpClient.get(`${BASE_URL}/${id}`);

    return data;
  }

  static async create(
    payload: EmployeeCreationRequest,
  ): Promise<UserShortResponse> {
    const { data } = await httpClient.post(BASE_URL, payload);

    return data;
  }

  static async update(
    payload: EmployeeUpdateRequest,
  ): Promise<UserShortResponse> {
    const { id, ...body } = payload;
    const { data } = await httpClient.patch<ApiResponse<UserShortResponse>>(
      `${BASE_URL}/${id}`,
      body,
    );

    return data;
  }

  static async resetPassword(
    payload: EmployeeResetPasswordRequest,
  ): Promise<void> {
    const { id, ...body } = payload;

    await httpClient.patch<ApiResponse<string>>(
      `${BASE_URL}/${id}/password`,
      body,
    );
  }
}

export default StaffEmployeeService;
