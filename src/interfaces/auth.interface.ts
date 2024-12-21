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
  fingerprintId?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  fingerprintId?: string;
}

export interface RegisterResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    email: string;
  };
}


export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  userId: string | null;
  token: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
}
