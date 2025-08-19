export interface RegisterUserRequest {
  email: string;
  fullName: string;
  password: string;
  subdomain?: string;
}

export interface RegisterUserResponse {
  id: string;
  email: string;
  fullName: string;
  token: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  id: string;
  email: string;
  fullName: string;
  token: string;
}