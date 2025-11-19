import React from 'react';
import { ClipboardList, Bot, PieChart, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8 text-brand-400" />,
      title: "1. Lista de Espera",
      desc: "Garanta sua vaga no pré-cadastro. Os convites são liberados em lotes limitados para manter a exclusividade e qualidade do atendimento."
    },
    {
      icon: <Bot className="w-8 h-8 text-brand-400" />,
      title: "2. Onboarding com Mácia AI",
      desc: "Você receberá uma mensagem da Mácia, nossa Nutricionista IA, para um bate-papo inicial. Ela vai entender sua rotina e objetivos."
    },
    {
      icon: <PieChart className="w-8 h-8 text-brand-400" />,
      title: "3. Registro e Evolução",
      desc: "Receba lembretes, registre refeições por áudio e acompanhe seus gráficos de calorias e macronutrientes em tempo real."
    }
  ];

  const benefits = [
    {
      icon: <BrainCircuit />,
      title: "Inteligência Artificial",
      desc: "Reconhecimento avançado de alimentos em fotos e texto natural."
    },
    {
      icon: <Zap />,
      title: "Zero Fricção",
      desc: "Sem formulários longos. É tão fácil quanto conversar com um amigo."
    },
    {
      icon: <ShieldCheck />,
      title: "Privacidade Total",
      desc: "Seus dados são seus. Histórico seguro e confidencial."
    }
  ];

  return (
    <div className="bg-slate-900 py-24 relative">
      {/* How It Works */}
      <div className="container mx-auto px-4 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como funciona?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Simplificamos o processo de ser saudável. Três passos para uma vida melhor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <div className="relative bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full flex flex-col items-center text-center hover:bg-slate-800/80 transition-colors">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-700 shadow-inner">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-start p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-brand-500/30 transition-colors">
              <div className="text-brand-500 mb-4 bg-brand-500/10 p-3 rounded-lg">
                {React.cloneElement(benefit.icon as React.ReactElement, { className: "w-6 h-6" })}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};