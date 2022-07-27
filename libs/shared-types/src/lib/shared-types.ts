export function sharedTypes(): string {
  return 'shared-types';
}

export interface Email {
  id:       string;
  username: string;
  quota:    number;
  domainId: string;
}
