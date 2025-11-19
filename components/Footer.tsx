import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold">M</div>
                <span className="text-xl font-bold text-white tracking-tight">My AI Fit</span>
             </div>
             <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Autevia Tecnologia.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-brand-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left">
             <a href="#" className="text-xs text-slate-600 hover:text-slate-400 mr-4">Termos de Uso</a>
             <a href="#" className="text-xs text-slate-600 hover:text-slate-400">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};