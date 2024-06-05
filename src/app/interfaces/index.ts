export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  name: string;
  email: string;
}

export interface Product {
  _id?: string;
  title: string;
  coverUrl: string;
  description: string;
  price: number;
  author: string;
  genre: string;
}

interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  createdTimestamp: number;
  enabled: boolean;
  totp: boolean;
  disableableCredentialTypes: string[];
  requiredActions: string[];
  notBefore: number;
  access: Access;
}
