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

          {/* Mobile Mockup - WhatsApp Style */}
          <div className="flex-1 relative w-full max-w-[400px] lg:max-w-[450px] animate-float">
            <div className="relative rounded-[2.5rem] border-8 border-gray-900 bg-gradient-to-b from-dark-800 to-dark-900 shadow-2xl overflow-hidden h-[650px] ring-1 ring-brand-500/10">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-dark-900 rounded-full shadow-inner shadow-black/40 z-20" />

              {/* Status Bar Mock */}
              <div className="h-7 bg-dark-800/80 backdrop-blur-lg w-full flex justify-between px-6 items-center text-[10px] text-gray-300 border-b border-gray-800/70 relative z-10">
                <span>19:30</span>
                <div className="flex gap-2 items-center">
                  <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />5G</span>
                  <span>78%</span>
                </div>
              </div>

              {/* WhatsApp Header */}
              <div className="bg-dark-800/90 backdrop-blur-lg p-3 flex items-center gap-3 border-b border-gray-700/70 shadow-sm relative z-10">
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
                  <p className="text-xs text-brand-400">Online agora</p>
                </div>
              </div>

              {/* Chat Content */}
              <div
                className="h-full p-4 space-y-4 overflow-hidden bg-dark-950/95"
                style={{
                  backgroundImage: "url('/images/whatsapp_bg.png')",
                  backgroundSize: '280px',
                  backgroundRepeat: 'repeat'
                }}
              >
                {/* Date Divider */}
                <div className="flex justify-center mb-4">
                  <span className="bg-dark-800/80 backdrop-blur text-gray-300 text-[10px] px-2 py-1 rounded-lg uppercase shadow-sm border border-gray-800/60">Hoje</span>
                </div>

                {/* Message: User Audio */}
                <div className="flex justify-end">
                  <div className="bg-[#075e54] text-white rounded-3xl rounded-br-sm px-3 py-2 max-w-[85%] text-sm shadow-md border border-[#0a7c68]/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"></path><path d="M9 10a3 3 0 0 0 6 0"></path><path d="M5 10a7 7 0 0 0 14 0"></path><line x1="12" y1="19" x2="12" y2="21"></line><line x1="8" y1="21" x2="16" y2="21"></line></svg></div>
                      <div className="flex-1">
                        <div className="h-1.5 bg-white/40 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-white/80 animate-pulse" />
                        </div>
                        <p className="text-[11px] text-white/80 mt-1">0:33   • "Arroz, frango grelhado, salada e suco de laranja"</p>
                      </div>
                    </div>
                    <div className="text-[10px] text-white/70 text-right mt-1 flex justify-end items-center gap-1">
                      12:30 <span className="text-brand-100">✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Message: AI Response */}
                <div className="flex justify-start w-full">
                  <div className="bg-dark-800/90 text-white rounded-3xl rounded-bl-sm p-3 max-w-[90%] text-sm shadow border border-gray-800/60 backdrop-blur">
                    <p className="font-bold text-brand-400 text-xs mb-1">Mácia AI</p>
                    <p className="mb-2">Recebi seu áudio e registrei a refeição:</p>
                    <div className="bg-dark-900/70 rounded-xl p-3 mb-2 text-xs space-y-2 border border-gray-800">
                      <div className="flex justify-between"><span>Arroz branco (1 concha)</span> <span>130 kcal</span></div>
                      <div className="flex justify-between"><span>Frango grelhado (120g)</span> <span>198 kcal</span></div>
                      <div className="flex justify-between"><span>Salada verde</span> <span>25 kcal</span></div>
                      <div className="flex justify-between"><span>Suco de laranja (200ml)</span> <span>90 kcal</span></div>
                    </div>
                    <p className="text-xs">Total estimado: <strong>~443 kcal</strong>. Equilíbrio ok. Que tal incluir fibra e água até o fim da tarde?</p>
                    <div className="text-[10px] text-gray-400 text-right mt-1">12:31</div>
                  </div>
                </div>

                {/* Message: AI Prompt */}
                <div className="flex justify-start w-full">
                  <div className="bg-dark-800/90 text-white rounded-3xl rounded-bl-sm p-3 max-w-[75%] text-sm shadow border border-gray-800/60 backdrop-blur">
                    <p className="text-xs text-gray-300">Quando quiser, segure o microfone e descreva seu próximo prato. Eu registro em segundos. 🎙️</p>
                    <div className="text-[10px] text-gray-500 text-right mt-1">12:32</div>
                  </div>
                </div>

              </div>

              {/* Footer Input Mock */}
              <div className="absolute bottom-0 w-full bg-dark-800/95 backdrop-blur-lg p-2 px-3 flex items-center gap-2 pb-6 border-t border-gray-700/60">
                <div className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"><span className="text-xl">+</span></div>
                <div className="flex-1 bg-dark-700/90 rounded-full h-11 px-4 flex items-center text-gray-400 text-sm border border-gray-700/70">
                  Segure para gravar um áudio
                </div>
                <div className="w-11 h-11 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                   <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"></path><path d="M9 10a3 3 0 0 0 6 0"></path><path d="M5 10a7 7 0 0 0 14 0"></path><line x1="12" y1="19" x2="12" y2="21"></line><line x1="8" y1="21" x2="16" y2="21"></line></svg>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
