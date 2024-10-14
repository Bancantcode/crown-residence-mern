import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login';
import About from './pages/About';
// import Header from './components/Header';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
