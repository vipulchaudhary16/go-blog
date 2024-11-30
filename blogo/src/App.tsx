import { Route, Routes } from 'react-router';
import LoggedInRoute from './routes/LoggedInRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route element={<LoggedInRoute />}>
          <Route path="/blogs" element={<div>Your Blogs</div>} />
          <Route path="/subscriptions" element={<div>Your Subscriptions</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
