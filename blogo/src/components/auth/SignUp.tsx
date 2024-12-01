import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { UserDataSignUp } from '@/types/user';
import useApiCall from '@/hooks/user-api-call';
import authApi from '@/api/authApi';
import { useToast } from '@/hooks/use-toast';

type Props = {};

function SignUp({}: Props) {
  const form = useForm<UserDataSignUp>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const { loading, error, data, execute } = useApiCall({ apiCall: authApi.createUser });
  const { toast } = useToast();

  const onSubmit = (data: UserDataSignUp) => {
    execute(data);
  };

  useEffect(() => {
    if (data) {
      toast({ description: 'User Created Successfully' });
    }

    if (error) {
      toast({ description: 'Something went wrong' });
    }
  }, [data, error]);

  return (
    <div className="centered-full-screen">
      <p>
        <strong>Create Your Account, to start with bloGO</strong>
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormField
            rules={{ required: 'First Name is required' }}
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">
            Sign Up <span>{loading && 'Loading...'}</span>
          </Button>
        </form>
        <p>
          Already have an account?{' '}
          <Link className="hyperlink" to={'/login'}>
            logIn
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default SignUp;
