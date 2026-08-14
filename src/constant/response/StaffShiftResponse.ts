import type { AssignmentInfoResponse } from "./AssignmentInfoResponse";
import type { UserShortResponse } from "./UserShortResponse";

export type StaffShiftResponse = {
  staff: UserShortResponse;
  assignments: AssignmentInfoResponse[];
};
