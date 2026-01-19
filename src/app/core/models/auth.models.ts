export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
    picture?: string;
  };
}