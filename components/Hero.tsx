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
              Entre na Lista de Espera
            </h1>
            
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Já no ar e liberando acessos aos poucos: fale com a <strong>Mácia AI</strong> por áudio, ela entende, registra calorias e macros na hora, mostra saldo diário e evolução semanal — tudo direto no WhatsApp, sem instalar app.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-3">
              <Button onClick={onCtaClick} className="w-full sm:w-auto text-lg h-14 px-8 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-[0_0_30px_-5px_rgba(37,211,102,0.4)]">
                Entrar na Lista de Espera
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <p className="text-sm text-brand-200 mb-12 max-w-xl mx-auto lg:mx-0">
              Liberamos novos grupos toda semana. Cadastre-se para entrar no próximo lote; usar seu convite garante +1 semana grátis acumulativa já no onboarding.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-800 pt-8">
              {[
                "Registro por Áudio",
                "Sem burocracia",
                "Nutri 24h por dia"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                  <CheckCircle className="w-4 h-4 text-brand-500" />
                  {item}
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-6 max-w-xl mx-auto lg:mx-0">
              Indique amigos e ganhe semanas grátis — cada indicação concluída soma +1 semana, 100% acumulativas.
            </p>
          </div>

          {/* Mobile Mockup - WhatsApp real screenshot */}
          <div className="flex-1 relative w-full max-w-[420px] lg:max-w-[460px] animate-float">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_30%,rgba(37,211,102,0.20),transparent_55%)] blur-3xl opacity-80 pointer-events-none" />
            <div className="relative rounded-[2.4rem] border-[10px] border-dark-900 bg-gradient-to-b from-dark-800 to-dark-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_30px_90px_-50px_rgba(37,211,102,0.55)] overflow-hidden h-[680px] ring-1 ring-brand-500/20">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(37,211,102,0.18),transparent_30%)] pointer-events-none" />

              {/* Real screenshot framed inside the device */}
              <div className="absolute inset-[12px] rounded-[1.75rem] overflow-hidden shadow-inner shadow-black/60 bg-black/60">
                <img
                  src="/images/whatsapp-real-preview.jpg"
                  alt="Prévia real da Macia AI no WhatsApp"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900/35" />
              </div>

              {/* Overlays for context */}
              <div className="absolute top-5 left-5 text-[11px] px-3 py-1.5 rounded-full bg-dark-900/70 border border-white/10 backdrop-blur-md text-white shadow-lg">
                Prévia real no WhatsApp
              </div>
              <div className="absolute bottom-6 right-6 px-3 py-2 rounded-xl bg-dark-900/75 border border-white/10 backdrop-blur-md text-[11px] text-gray-100 shadow-lg">
                <p className="font-semibold text-brand-300">Macros instantâneas</p>
                <p className="text-[10px] text-gray-200">595 kcal · 58 g proteína</p>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-dark-900 rounded-b-2xl shadow-inner shadow-black/40" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
