import { Route, Routes } from 'react-router';
import LoggedInRoute from './routes/LoggedInRoute';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<LoggedInRoute />}>
          <Route path="/blogs" element={<div>Your Blogs</div>} />
          <Route path="/subscriptions" element={<div>Your Subscriptions</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
