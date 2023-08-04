interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Geotechnical Engineer'],
  customerRoles: [],
  tenantRoles: ['Project Administrator', 'Fieldwork Technician', 'Finance Manager', 'Geotechnical Engineer'],
  tenantName: 'Company',
  applicationName: 'GeoHUB',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
