import React from 'react';
import '../App.css';
import '../desktop.css'
import NavBar from './NavBar/NavBar';
import AnimatedRoutes from './AnimatedRoutes'
import { HashRouter as Router } from 'react-router-dom';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <NavBar/>
      <AnimatedRoutes/>
      <Footer/>
    </Router>
  );
}

export default App;