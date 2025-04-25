import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import useApiCall from '@/hooks/user-api-call';
import subscriptionApi from '@/api/subscriptionApi';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useSession } from '@/contexts/UserContext';
import { getIfUserHasSubscribedToGivenUser } from '@/helpers/subscription';

const BlogFooter = ({ blog }: any) => {
  const { user } = blog;
  const session = useSession();

  const {
    error: subscribe_error,
    loading: subscribe_loading,
    data: subscribe_data,
    execute: subscribe,
  } = useApiCall({ apiCall: subscriptionApi.subscribeUser });

  const {
    error: unsubscribe_error,
    loading: unsubscribe_loading,
    data: unsubscribe_data,
    execute: unsubscribe,
  } = useApiCall({ apiCall: subscriptionApi.unsubscribeUser });

  const isAlreadySubscribed =
    session.user && getIfUserHasSubscribedToGivenUser(session.user, user.id);

  const handleSubscribe = () => {
    if (isAlreadySubscribed) {
      unsubscribe(user.id);
    } else subscribe(user.id);
  };

  useEffect(() => {
    if (subscribe_data || unsubscribe_data) {
      toast({ description: subscribe_data?.data.message || unsubscribe_data?.data?.message });
    }

    if (subscribe_error || unsubscribe_error) {
      toast({ description: 'Something went wrong' });
    }
  }, [subscribe_data, unsubscribe_data, subscribe_error, unsubscribe_error]);

  return (
    <div className="border-t flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{user.first_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-semibold m-0">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-sm text-gray-500 m-0">{user.email}</p>
        </div>
      </div>
      <Button className=" text-white px-4 py-2 rounded-md " onClick={() => handleSubscribe()}>
        {isAlreadySubscribed ? 'Unsubscribe' : 'Subscribe'}{' '}
        {(unsubscribe_loading || subscribe_loading) ?? '...'}
      </Button>
    </div>
  );
};

export default BlogFooter;
