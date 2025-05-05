import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LexicalEditor from '../common/RichTextEditor/RichTextEditor';
import Heading from '../common/Heading';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import FormFooter from '../common/Form/FormFooter';
import { Input } from '../ui/input';
import useApiCall from '@/hooks/user-api-call';
import blogApi from '@/api/blogApi';
import { toast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router';
import useFetchData from '@/hooks/use-fetch-data';
import { useHeader } from '@/contexts/HeaderContext';

const BlogForm = () => {
  const { id } = useParams();
  const form = useForm<any>({
    defaultValues: {
      post: '',
      title: '',
    },
  });
  const navigate = useNavigate();
  const { setHeaderTitle } = useHeader();

  const { loading, error, data, execute } = useApiCall({ apiCall: blogApi.createBlog });
  const { data: fetchData } = useFetchData({
    apiCall: blogApi.getBlog,
    payload: id?.toString(),
  });

  const onSubmit = (data: any) => {
    execute({
      ...data,
      id: id != 'new' ? parseInt(id ?? '') : null,
      tags: data.tags?.split(',').map((tag: string) => tag.trim()),
    });
  };

  useEffect(() => {
    form.reset();
  }, [id]);

  useEffect(() => {
    if (fetchData?.data) {
      form.setValue('title', fetchData.data.title);
      form.setValue('post', fetchData.data.post);
      form.setValue('tags', fetchData.data.tags?.join(', '));
    }
    setHeaderTitle(`${id !== 'new' ? `Updating ${fetchData?.data?.title}` : 'Writing a new blog'}`);
  }, [fetchData]);

  useEffect(() => {
    if (data?.data?.id) {
      toast({ description: `Blog ${id === 'new' ? 'Created' : 'Updated'}` });
      navigate(`/blog/${data?.data?.id}`);
    }
  }, [data]);

  if (error) {
    toast({ description: 'Something went wrong' });
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <Heading level={3}>Start your blog....</Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <div className="w-2/3">
              <FormField
                rules={{ required: 'Title' }}
                control={form.control}
                name="title"
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
            </div>
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Add tags (comma separated)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            rules={{ required: 'Please write something...' }}
            control={form.control}
            name="post"
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
        <FormFooter
          createProps={{
            loading,
            onCreate: form.handleSubmit(onSubmit),
          }}
          createText={id != 'new' ? 'Update' : 'Create'}
        />
      </Form>
    </div>
  );
};

export default BlogForm;
