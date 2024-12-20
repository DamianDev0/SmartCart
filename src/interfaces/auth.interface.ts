export interface LoginResponse {
  code: number;
  message: string;
  token: string;
  data: {
    accessToken: string;
    id: string;
    name: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  fingerprintId?: string
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  fingerprintId?: string
}

export interface RegisterResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    email: string;
  };
}
