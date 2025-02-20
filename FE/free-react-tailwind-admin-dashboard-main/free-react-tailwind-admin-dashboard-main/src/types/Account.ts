import { Role } from './Role';

export interface Account {
  id: number;
  code: string;
  email: string;
  fullName: string;
  phone: string;
  roles: Role[];
  enabled: boolean;
  roleIds: number[];
  imageUrl: string;
}
