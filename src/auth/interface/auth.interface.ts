export interface UserLogin {
  username: string;
  password: string;
}

export interface UserCreate extends UserLogin {
  email: string;
}
