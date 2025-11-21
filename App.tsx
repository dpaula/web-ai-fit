import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { PreRegisterForm } from './components/PreRegisterForm';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { Button } from './components/Button';

function App() {
  const scrollToForm = () => {
    document.getElementById('cadastro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-dark-950/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Logo />
          <Button variant="outline" className="hidden sm:flex border-gray-700 hover:border-brand-500 hover:text-brand-400 text-sm px-4 py-2 h-auto" onClick={scrollToForm}>
            Acesso Antecipado
          </Button>
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