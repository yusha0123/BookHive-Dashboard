export interface LoginResponse {
  access_token: string;
  expires_in: string;
  refresh_expires_in: string;
  refresh_token: string;
  token_type: string;
  'not-before-policy': string;
  session_state: string;
  scope: string;
}
