import './App.css'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
              <LayoutDashboard size={28} />
              <span className="text-xl font-bold">ML Tracker</span>
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
