// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';

import { env_vars } from "./environments";
import Parse from "parse";

Parse.initialize(env_vars.applicationId, env_vars.javaScriptKey);
Parse.serverURL = env_vars.serverURL;

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='*' element={<h2>404 - Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;