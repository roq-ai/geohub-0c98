const mapping: Record<string, string> = {
  companies: 'company',
  'fieldwork-data': 'fieldwork_data',
  invoices: 'invoice',
  jobs: 'job',
  projects: 'project',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
