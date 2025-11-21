import React from 'react';
import { ListChecks, UserPlus, LineChart, Zap, Camera, Lock } from 'lucide-react';

export const Features: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Lista de Espera",
      description: "Inscreva-se abaixo. Liberamos acesso gradualmente para garantir a melhor experiência com nossa IA.",
      icon: <ListChecks className="w-6 h-6" />,
      highlight: "Escassez real: vagas limitadas."
    },
    {
      id: "02",
      title: "Onboarding no WhatsApp",
      description: "Receba uma mensagem da Mácia AI. Ela fará algumas perguntas rápidas para personalizar seu plano nutricional.",
      icon: <UserPlus className="w-6 h-6" />,
      highlight: "Sem formulários chatos."
    },
    {
      id: "03",
      title: "Registro & Evolução",
      description: "Envie fotos ou áudios das suas refeições. A IA calcula tudo e gera gráficos de evolução semanal.",
      icon: <LineChart className="w-6 h-6" />,
      highlight: "Feedback em tempo real."
    }
  ];

  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-dark-800/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Como funciona o <span className="text-brand-500">AI Fit</span>?
          </h2>
          <p className="text-gray-400 text-lg">
            Simplificamos a nutrição eliminando a fricção. Esqueça os aplicativos que exigem centenas de cliques.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-500/0 via-brand-500/30 to-brand-500/0 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 group">
              <div className="bg-dark-800 rounded-2xl p-8 border border-gray-800 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-dark-700 text-brand-500 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-colors shadow-inner ring-1 ring-white/5">
                  {step.icon}
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-bold text-brand-500/10 group-hover:text-brand-500/20 transition-colors font-sans">
                    {step.id}
                  </span>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                
                <p className="text-gray-400 mb-6 flex-1">
                  {step.description}
                </p>

                <div className="text-xs font-medium text-brand-300 bg-brand-500/5 px-3 py-2 rounded-lg border border-brand-500/10">
                  {step.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits / Differentiators */}
        <div className="bg-gradient-to-br from-brand-900/20 to-dark-800 rounded-3xl p-8 md:p-12 border border-brand-500/10">
           <div className="grid md:grid-cols-3 gap-12">
              <div className="flex gap-4">
                 <div className="bg-brand-500/10 p-3 rounded-lg h-fit text-brand-500"><Camera /></div>
                 <div>
                    <h4 className="text-white font-bold text-lg mb-2">Foto Caloria</h4>
                    <p className="text-gray-400 text-sm">Nossa visão computacional identifica alimentos no prato e estima porções com alta precisão.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-brand-500/10 p-3 rounded-lg h-fit text-brand-500"><Zap /></div>
                 <div>
                    <h4 className="text-white font-bold text-lg mb-2">Zero Apps</h4>
                    <p className="text-gray-400 text-sm">Tudo acontece onde você já está o dia todo: no WhatsApp. Sem logins extras.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="bg-brand-500/10 p-3 rounded-lg h-fit text-brand-500"><Lock /></div>
                 <div>
                    <h4 className="text-white font-bold text-lg mb-2">Privacidade</h4>
                    <p className="text-gray-400 text-sm">Seus dados alimentares são seus. Utilizamos criptografia de ponta a ponta.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};