import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { PreRegisterForm } from './components/PreRegisterForm';
import { Footer } from './components/Footer';

function App() {
  const scrollToForm = () => {
    const formSection = document.getElementById('cadastro');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-brand-500/30">
      {/* Navigation (Simple) */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-emerald-700 flex items-center justify-center text-white font-bold">
               AI
             </div>
             <span className="font-bold text-lg tracking-tight">My AI Fit</span>
          </div>
          <button 
            onClick={scrollToForm} 
            className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            Acesso Antecipado
          </button>
        </div>
      </nav>

      <main>
        <Hero onCtaClick={scrollToForm} />
        <Features />
        <Testimonials />
        <PreRegisterForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;