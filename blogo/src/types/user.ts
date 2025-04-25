import { Subscription } from './subscription';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subscribed_to?: Subscription[];
}

export interface UserDataSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserDateLogIn {
  email: string;
  password: string;
}
