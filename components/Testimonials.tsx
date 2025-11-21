import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Beatriz Souza",
      role: "Perdeu 4kg em 3 semanas",
      text: "Eu sempre esquecia de abrir o app de dieta. No WhatsApp é impossível esquecer porque uso o dia todo. A Mácia é muito simpática!",
      avatar: "/images/avatar-beatriz.svg"
    },
    {
      name: "Rafael Mendes",
      role: "Praticante de Crossfit",
      text: "A precisão dos macros me surpreendeu. Eu tiro foto do prato e ela já me diz quanto de proteína tem. Essencial pra minha rotina.",
      avatar: "/images/avatar-rafael.svg"
    },
    {
      name: "Dra. Elena Costa",
      role: "Nutricionista Parceira",
      text: "Recomendo para todos os meus pacientes. A adesão ao plano alimentar aumenta drasticamente quando a barreira de entrada é menor.",
      avatar: "/images/avatar-elena.svg"
    }
  ];

  return (
    <section className="py-24 bg-dark-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">O que dizem os usuários</h2>
          <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-dark-800 p-8 rounded-2xl border border-gray-800 relative group hover:bg-dark-700/50 transition-colors">
              <div className="absolute -top-4 left-8 bg-brand-600 text-white p-2 rounded-full shadow-lg">
                <Quote size={16} fill="currentColor" />
              </div>
              
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">"{review.text}"</p>

              <div className="flex items-center gap-4 border-t border-gray-700 pt-6">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30" />
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-brand-400 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};