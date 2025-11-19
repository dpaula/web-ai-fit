import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-20 pb-32 lg:pt-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl bg-brand-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
              Novidade: Integração completa via WhatsApp
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Seu Nutricionista
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-600">
                Agora vive no WhatsApp
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Sem aplicativos complexos. Sem dietas impossíveis. Apenas converse com nossa IA, envie fotos das suas refeições e atinja suas metas de forma natural.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button onClick={onCtaClick} className="text-lg px-8">
                Começar 1 Semana Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-slate-500">
                Não requer cartão de crédito
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                Contador de Calorias
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                Diário Alimentar
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-500" />
                Metas Personalizadas
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none">
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700 p-6 shadow-2xl">
              {/* Mock Chat UI */}
              <div className="bg-[#0b141a] rounded-3xl overflow-hidden border border-slate-800 h-[500px] flex flex-col">
                {/* Chat Header */}
                <div className="bg-[#202c33] p-4 flex items-center gap-3 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xl">
                    AI
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">My AI Fit</h3>
                    <p className="text-xs text-brand-400">Online agora</p>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
                  
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-[#005c4b] text-[#e9edef] rounded-t-lg rounded-bl-lg p-3 max-w-[80%] text-sm shadow-sm">
                      <p>Comi 2 ovos mexidos e uma fatia de pão integral com café.</p>
                      <span className="text-[10px] text-slate-300 block text-right mt-1">08:30</span>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-[#202c33] text-[#e9edef] rounded-t-lg rounded-br-lg p-3 max-w-[85%] text-sm shadow-sm">
                      <p className="font-bold text-brand-400 mb-1">Café da Manhã Registrado! ✅</p>
                      <p>Calorias estimadas: <strong>240 kcal</strong></p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-xs">
                        <li>2 Ovos: ~140 kcal</li>
                        <li>Pão Integral: ~90 kcal</li>
                        <li>Café (preto): ~10 kcal</li>
                      </ul>
                      <p className="mt-2">Faltam <strong>1.760 kcal</strong> para sua meta diária. Bom começo! 💪</p>
                      <span className="text-[10px] text-slate-400 block text-right mt-1">08:30</span>
                    </div>
                  </div>

                   {/* User Message Photo */}
                   <div className="flex justify-end mt-4">
                    <div className="bg-[#005c4b] text-[#e9edef] rounded-t-lg rounded-bl-lg p-1 max-w-[60%] text-sm shadow-sm">
                      <div className="bg-slate-800 rounded h-32 w-full mb-1 flex items-center justify-center overflow-hidden">
                         <img src="https://picsum.photos/400/300?food" alt="Almoço" className="w-full h-full object-cover opacity-80" />
                      </div>
                      <p className="px-2 pb-1">Almoço de hoje</p>
                      <span className="text-[10px] text-slate-300 block text-right pr-2">12:15</span>
                    </div>
                  </div>

                </div>

                {/* Chat Input */}
                <div className="bg-[#202c33] p-3 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400">
                     +
                   </div>
                   <div className="flex-1 bg-[#2a3942] rounded-lg h-9 px-3 flex items-center text-slate-400 text-sm">
                     Digite uma mensagem
                   </div>
                   <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white">
                     <ArrowRight className="w-4 h-4" />
                   </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};