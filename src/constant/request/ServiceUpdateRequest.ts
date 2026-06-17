import { ServiceType } from "src/enums/ServiceType";

export type ServiceUpdateRequest = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  type: ServiceType;
};
