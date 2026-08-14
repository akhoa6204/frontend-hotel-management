import type { ServiceType } from "src/enums/ServiceType";

export type ServiceCreationRequest = {
  name: string;
  description: string;
  basePrice: number;
  type: ServiceType;
};
