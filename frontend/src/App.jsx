import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgentFAB from './components/AgentFAB';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Downloads from './pages/Downloads';
import Support from './pages/Support';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 bg-grid-pattern selection:bg-[#007A78] selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>

        {/* Global Floating Action Button for IA Call Center agent */}
        <AgentFAB />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
