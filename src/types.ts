export type ApiIntegrationStatus = 'Synced' | 'API Error' | 'Manual Entry';

export interface TruckData {
  Truck_ID: string;
  Origin_Factory: string;
  Destination_Port: string;
  API_Integration_Status: ApiIntegrationStatus;
  Delay_Minutes: number;
  CO2_Emissions_Kg: number;
}

export interface PortDelayAggregate {
  port: string;
  avgDelay: number;
  truckCount: number;
  errorCount: number;
}
