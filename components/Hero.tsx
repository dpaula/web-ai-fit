import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 overflow-hidden bg-dark-950">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Lista de espera aberta
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Seu Nutricionista <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-pastel-blue">
                Agora no WhatsApp
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Converse com a <strong>Mácia AI</strong>, envie fotos das suas refeições e receba cálculos de calorias e macros instantaneamente. Sem apps complicados.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              <Button onClick={onCtaClick} className="w-full sm:w-auto text-lg h-14 px-8 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-[0_0_30px_-5px_rgba(37,211,102,0.4)]">
                Entrar na Lista de Espera
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-800 pt-8">
              {[
                "Reconhecimento por Foto",
                "Sem burocracia",
                "Nutri 24h por dia"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-brand-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Mockup - WhatsApp Style */}
          <div className="flex-1 relative w-full max-w-[400px] lg:max-w-[450px] animate-float">
            <div className="relative rounded-[2.5rem] border-8 border-gray-800 bg-dark-900 shadow-2xl overflow-hidden h-[650px] ring-1 ring-gray-700">
              
              {/* Status Bar Mock */}
              <div className="h-6 bg-dark-800 w-full flex justify-between px-6 items-center text-[10px] text-gray-400">
                <span>19:30</span>
                <div className="flex gap-1">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-dark-800 p-3 flex items-center gap-3 border-b border-gray-700 shadow-sm relative z-10">
                <div className="w-5">
                   <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                    {/* Local Macia Avatar */}
                    <img src="/images/macia-avatar.svg" alt="Mácia" className="w-full h-full p-0.5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">Mácia AI (Nutri)</h3>
                  <p className="text-xs text-brand-500">Online agora</p>
                </div>
              </div>

              {/* Chat Content */}
              {/* CSS Background Pattern instead of external image */}
              <div className="h-full bg-dark-950 p-4 space-y-4 overflow-hidden" style={{backgroundImage: 'radial-gradient(#1f2937 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
                
                {/* Date Divider */}
                <div className="flex justify-center mb-4">
                  <span className="bg-dark-800 text-gray-400 text-[10px] px-2 py-1 rounded-lg uppercase shadow-sm">Hoje</span>
                </div>

                {/* Message: User Text */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-white rounded-l-lg rounded-tr-lg rounded-br-none p-3 max-w-[85%] text-sm shadow relative group">
                    <p>Almoço de hoje! O que acha?</p>
                    <div className="text-[10px] text-gray-300 text-right mt-1 flex justify-end items-center gap-1">
                      12:30 <span className="text-brand-300">✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Message: User Image */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] p-1 rounded-l-lg rounded-tr-none rounded-br-lg max-w-[85%] shadow">
                     <div className="relative rounded overflow-hidden aspect-[4/3] bg-gray-800 border border-[#005c4b]">
                        {/* Local Salad Image */}
                        <img src="/images/salad-bowl.svg" alt="Salad" className="object-cover w-full h-full" />
                     </div>
                     <div className="text-[10px] text-gray-300 text-right p-1 flex justify-end items-center gap-1">
                      12:30 <span className="text-brand-300">✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Message: AI Response */}
                <div className="flex justify-start w-full">
                  <div className="bg-dark-800 text-white rounded-r-lg rounded-tl-lg rounded-bl-none p-3 max-w-[90%] text-sm shadow border border-gray-800">
                    <p className="font-bold text-brand-500 text-xs mb-1">Mácia AI</p>
                    <p className="mb-2">Belo prato colorido! 🥗 Registrei aqui:</p>
                    <div className="bg-dark-900/50 rounded p-2 mb-2 text-xs space-y-1 border-l-2 border-brand-500">
                      <div className="flex justify-between"><span>Mix de Folhas</span> <span>15 kcal</span></div>
                      <div className="flex justify-between"><span>Tomate Cherry</span> <span>20 kcal</span></div>
                      <div className="flex justify-between"><span>Ovo Cozido</span> <span>78 kcal</span></div>
                      <div className="flex justify-between"><span>Abacate (50g)</span> <span>80 kcal</span></div>
                    </div>
                    <p className="text-xs"><strong>Total: ~193 kcal</strong>. Ótima escolha de gorduras boas e proteína! Continue assim.</p>
                    <div className="text-[10px] text-gray-500 text-right mt-1">12:31</div>
                  </div>
                </div>

              </div>

              {/* Footer Input Mock */}
              <div className="absolute bottom-0 w-full bg-dark-800 p-2 px-3 flex items-center gap-2 pb-6 border-t border-gray-700">
                <div className="p-2 rounded-full text-gray-400"><span className="text-xl">+</span></div>
                <div className="flex-1 bg-dark-700 rounded-full h-10 px-4 flex items-center text-gray-400 text-sm">
                  Mensagem
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-lg">
                   <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};