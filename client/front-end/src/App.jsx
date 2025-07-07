import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/edit/:id" element={<PostForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;