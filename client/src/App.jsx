import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import Blog from './pages/Blog';
import Property from './pages/Property';
import ViewProperty from './pages/ViewProperty';
import ReservedProperty from './pages/ReservedProperty';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/property" element={<Property />} />
        <Route path="/properties/:id" element={<ViewProperty />} />
        <Route path="/reserved-property" element={<ReservedProperty />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
