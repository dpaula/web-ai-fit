import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-gray-900 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
           <Logo size="sm" />
           <p className="text-gray-600 text-sm">© {new Date().getFullYear()} AI Fit. Todos os direitos reservados.</p>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-brand-500 transition-colors">Termos</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand-500 transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  );
};