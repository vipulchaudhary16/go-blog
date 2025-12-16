import { useCallback, useEffect } from 'react';
import userApi from '@/api/userApi';
import useFetchData from '@/hooks/use-fetch-data';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import subscriptionApi from '@/api/subscriptionApi';
import useApiCall from '@/hooks/user-api-call';
import Loader from '../common/Loader';
import { toast } from '@/hooks/use-toast';

const Subscriptions = () => {
  const { data, loading, error, refetch } = useFetchData({
    apiCall: userApi.userSubscriptions,
  });
  const {
    error: unsubscribe_error,
    loading: unsubscribe_loading,
    data: unsubscribe_data,
    execute: unsubscribe,
  } = useApiCall({ apiCall: subscriptionApi.unsubscribeUser });

  const handleUnsubscribe = useCallback(
    async (id: number) => {
      try {
        await unsubscribe(id);
      } catch (err) {
        console.error('Unsubscribe failed', err);
      }
    },
    [refetch]
  );

  useEffect(() => {
    if (error) {
      toast({ description: 'Something went wrong' });
    } else if (unsubscribe_error) {
      toast({ description: 'Unsubscribe failed' });
    } else if (unsubscribe_data) {
      toast({ description: 'Unsubscribed successfully' });
      refetch();
    }
  }, [unsubscribe_error, unsubscribe_data, error, refetch]);

  const subscriptions = data?.data || [];

  if (loading) return <Loader />;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.length === 0 ? (
        <div>No subscriptions found</div>
      ) : (
        subscriptions.map((sub: any) => (
          <Card key={sub.id} className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {sub.to_user?.first_name} {sub.to_user?.last_name}
              </CardTitle>
              <CardDescription>Subscribed to: {sub.to_user?.email}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600">You subscribed to this user on:</p>
              <p className="font-medium">{new Date(sub.created_at).toLocaleString()}</p>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button variant="destructive" onClick={() => handleUnsubscribe(sub.id)}>
                {unsubscribe_loading ? 'Unsubscribing...' : 'Unsubscribe'}
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default Subscriptions;
