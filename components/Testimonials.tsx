import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Ricardo Silva",
      role: "Perdeu 5kg em 1 mês",
      content: "Eu odiava ter que abrir app pra registrar comida. Pelo WhatsApp é automático, tiro foto e pronto. Genial!",
      image: "https://picsum.photos/100/100?random=1"
    },
    {
      name: "Ana Paula",
      role: "Nutricionista",
      content: "Indico para meus pacientes que têm dificuldade em manter o diário alimentar. A adesão aumentou 80%.",
      image: "https://picsum.photos/100/100?random=2"
    },
    {
      name: "Carlos Mendes",
      role: "Crossfiter",
      content: "A precisão da contagem de macros me surpreendeu. Consigo bater minha proteína diária sem estresse.",
      image: "https://picsum.photos/100/100?random=3"
    },
    {
        name: "Fernanda Costa",
        role: "Mãe de 2 filhos",
        content: "A praticidade do áudio me salva. Digo o que comi enquanto cuido das crianças e a IA registra tudo.",
        image: "https://picsum.photos/100/100?random=4"
    }
  ];

  return (
    <section className="py-24 bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quem usa, ama</h2>
          <p className="text-slate-400">Junte-se a milhares de usuários que transformaram sua rotina.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-3">
                <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                <div>
                  <h4 className="text-white font-semibold text-sm">{review.name}</h4>
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