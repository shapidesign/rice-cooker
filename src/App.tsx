import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cooking from './pages/Cooking';
import History from './pages/History';
import Achievements from './pages/Achievements';
import Guide from './pages/Guide';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cooking" element={<Cooking />} />
          <Route path="/history" element={<History />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
