import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Como funciona registrar refeições por áudio?",
        answer:
            "É como contar para um amigo o que você acabou de comer. Você envia um áudio no WhatsApp descrevendo sua refeição, e a Mácia AI transforma isso em um registro completo com calorias, macros e observações úteis para o seu progresso.",
    },
    {
        question: "Preciso instalar algum app?",
        answer:
            "Nada disso. O AI Fit funciona 100% dentro do WhatsApp que você já usa todos os dias. Sem cadastros complicados, telas novas ou downloads.",
    },
    {
        question: "O que a Mácia AI faz com meus áudios?",
        answer:
            "Ela entende sua refeição, identifica os alimentos, calcula calorias e macronutrientes e já atualiza seu diário alimentar automaticamente. Tudo de forma natural e em segundos.",
    },
    {
        question: "Como é o acompanhamento diário?",
        answer:
            "Basta enviar áudios ao longo do dia. A Mácia devolve feedback rápido, dicas inteligentes e mostra sua evolução, metas cumpridas e pontos de atenção na semana.",
    },
    {
        question: "Meus dados estão seguros?",
        answer:
            "Sim. Utilizamos criptografia, boas práticas de segurança e armazenamos apenas o necessário para o seu acompanhamento. Você tem total controle sobre o que compartilha.",
    },
    {
        question: "Como a IA Mácia define minhas metas?",
        answer:
            "Ela analisa seu objetivo (como perder peso, manter ou ganhar massa), cruza com seu perfil atual e cria metas de calorias e macros ajustadas ao seu estilo de vida — evoluindo com o tempo.",
    },
    {
        question: "Quem pode entrar na lista de espera?",
        answer:
            "Qualquer pessoa no Brasil pode participar. E ao indicar um amigo que conclua o pré-cadastro, você ganha 1 semana grátis no AI Fit.",
    },
    {
        question: "O AI Fit funciona 24h por dia?",
        answer:
            "Sim. A Mácia AI está sempre disponível para registrar refeições, tirar dúvidas rápidas e manter seu progresso em dia.",
    },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-dark-950 border-t border-gray-900" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Perguntas Frequentes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Tudo rápido e direto</h2>
          <p className="text-gray-400">Respostas curtas para você decidir agora.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-800 rounded-2xl bg-dark-900/70 backdrop-blur shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-white focus:outline-none"
                >
                  <span className="font-semibold text-sm md:text-base">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`px-6 pb-5 text-sm text-gray-300 transition-[max-height,opacity] duration-200 ease-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  style={{ lineHeight: '1.6' }}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
