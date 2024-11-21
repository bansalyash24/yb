// import React from 'react';
// import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProductList from './components/ProductList/ProductList';
// import './App.css';
import EventPage from './pages/EventPage/EventPage';
import SingleEvent from './pages/SingleEvent/SingleEvent';
import CreateEvent from './pages/CreateEvent/CreateEvent';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event/:id" element={<SingleEvent />} />
      <Route path="/" element={<Signup />} />
    </Routes>
  </Router>
  );
}

export default App;
