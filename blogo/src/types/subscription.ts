import { User } from './user';

export interface Subscription {
  id: number;
  from_id: number;
  to_id: number;
  from_user: User;
  to_user: User;
  created_at: string;
}
