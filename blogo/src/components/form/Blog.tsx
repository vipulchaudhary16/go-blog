import LexicalEditor from '../common/RichTextEditor/RichTextEditor';
import Heading from '../common/Heading';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import FormFooter from '../common/Form/FormFooter';
import { Input } from '../ui/input';

const BlogForm = () => {
  const form = useForm<any>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('form submitted', data);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <Heading level={3}>Start your blog....</Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormField
            rules={{ required: 'Title' }}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Give it a beautiful title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            rules={{ required: 'Please write something...' }}
            control={form.control}
            name="content"
            render={({ field }) => {
              console.log(field);
              return (
                <FormItem>
                  <FormControl>
                    <LexicalEditor content={field.value} onContentChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
        <FormFooter onCreate={form.handleSubmit(onSubmit)} />
      </Form>
    </div>
  );
};

export default BlogForm;
