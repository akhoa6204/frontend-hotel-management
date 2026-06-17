import { ServiceType } from "src/enums/ServiceType";

export type ServiceResponse = {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  type: ServiceType;
};
