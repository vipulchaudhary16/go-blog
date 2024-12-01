import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Link } from 'react-router';

type Props = {};

function LogIn({}: Props) {
  const form = useForm<any>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
          <Button type="submit">LogIn</Button>
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
