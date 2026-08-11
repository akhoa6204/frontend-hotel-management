import type { ShiftResponse } from "./ShiftResponse";
import type { UserShortResponse } from "./UserShortResponse";

export type StaffShiftValidationCode =
  | "EMPLOYEE_NOT_FOUND"
  | "EMPLOYEE_INELIGIBLE"
  | "SHIFT_NOT_FOUND"
  | "INVALID_DATE"
  | "DUPLICATE_ASSIGNMENT"
  | "OVERLAPPING_SHIFT";

export interface StaffShiftImportRowResponse {
  rowNumber: number;
  email: string;
  workDate: string;
  shiftCode: string;
  originalEmail: string;
  originalWorkDate: string;
  originalShiftCode: string;
  employee: UserShortResponse | null;
  shift: ShiftResponse | null;
  status: "VALID" | "INVALID" | "EDITED";
  validationErrors: StaffShiftValidationCode[];
}

export interface StaffShiftImportPreviewResponse {
  summary: {
    totalRows: number;
    validRows: number;
    invalidRows: number;
  };
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  rows: StaffShiftImportRowResponse[];
}

export interface StaffShiftImportResultResponse {
  imported: number;
}
