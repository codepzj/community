export interface ResidentVO {
    id: number;
    username: string;
    password: string;
    email: string;
    avatar: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface ResidentReq {
  id: number;
  email: string;
  phone: string;
  address: string;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  role_id: number;
}

export interface LoginForm extends LoginReq {
  remember: boolean;
}

export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginVO {
  exist: boolean;
  user: User;
}
