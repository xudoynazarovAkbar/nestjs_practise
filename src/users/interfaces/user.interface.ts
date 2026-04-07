import { ADMIN, USER } from '../constants/roles';

export type Roles = typeof USER | typeof ADMIN;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Roles;
}
