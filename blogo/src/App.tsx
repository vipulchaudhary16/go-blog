import { Route, Routes } from 'react-router';
import LoggedInRoute from './routes/LoggedInRoute';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import { Toaster } from './components/ui/toaster';
import BlogForm from './components/form/Blog';
import BlogList from './components/blog/BlogList';
import ReadBlog from './components/blog/ReadBlog';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<LoggedInRoute />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<ReadBlog />} />
          <Route path="/subscriptions" element={<div>Your Subscriptions</div>} />

          <Route path="/form/blog/:id" element={<BlogForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
