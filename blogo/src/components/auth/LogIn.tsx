import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router';
import useApiCall from '@/hooks/user-api-call';
import authApi from '@/api/authApi';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

type Props = {};

function LogIn({}: Props) {
  const form = useForm<any>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { loading, error, data, execute } = useApiCall({ apiCall: authApi.logIn });
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    execute(data);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.token);
      navigate('/');
      toast({ description: 'User Logged In Successfully' });
      window.location.reload();
    }

    if (error) {
      toast({ description: 'Something went wrong' });
    }
  }, [data, error]);

  return (
    <div className="centered-full-screen">
      <p>
        <strong>Log In to Your Account!!</strong>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormField
            rules={{ required: 'Email is required' }}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">LogIn {loading && 'Loading...'}</Button>
        </form>
      </Form>
      <p>
        Don't have an account?{' '}
        <Link className="hyperlink" to={'/sign-up'}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LogIn;
