import { User } from '@/types/user';

export const getIfUserHasSubscribedToGivenUser = (session: User, to_user_id: number) => {
  return session.subscribed_to?.some((subscription) => subscription.to_id === to_user_id);
};
