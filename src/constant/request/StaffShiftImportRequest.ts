export interface StaffShiftImportRowRequest {
  rowNumber: number;
  email: string;
  workDate: string;
  shiftCode: string;
  originalEmail?: string;
  originalWorkDate?: string;
  originalShiftCode?: string;
}

export interface StaffShiftImportConfirmRequest {
  rows: StaffShiftImportRowRequest[];
}
