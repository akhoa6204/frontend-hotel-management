import { AssignmentInfoResponse } from "./AssignmentInfoResponse";
import { UserShortResponse } from "./UserShortResponse";

export type StaffShiftResponse = {
  staff: UserShortResponse;
  assignments: AssignmentInfoResponse[];
};
