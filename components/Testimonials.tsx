import React, { useMemo } from 'react';
import { Star, Quote, Target } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  age: number;
  goal: string;
  text: string;
  avatar: string;
}

const asset = (file: string) => `${import.meta.env.BASE_URL || '/'}testimonials/${file}`;

const allReviews: Review[] = [
    {
        name: "Marina Duarte",
        role: "Produtora de conteúdo",
        age: 29,
        goal: "Perda de Peso",
        text: "Áudio é vida kkk. Só conto o q comi e a Mácia já joga tudo certinho nas calorias e macros. Ficou muito mais fácil controlar.",
        avatar: "/testimonials/avatar-01.svg",
    },
    {
        name: "Lucas Faria",
        role: "Analista de dados",
        age: 33,
        goal: "Bem-estar",
        text: "Eu só descrevo minha refeição no zap e pronto. Ela registra tudo e me mostra como tá meu dia. Ficou bem mais simples manter a rotina.",
        avatar: "/testimonials/avatar-02.svg",
    },
    {
        name: "Patrícia Nogueira",
        role: "Corredora amadora",
        age: 37,
        goal: "Performance",
        text: "A parte boa é não ter q parar pra montar dieta. Mando áudio dizendo o q comi e a Mácia já ajusta o dia conforme meu treino.",
        avatar: "/testimonials/avatar-03.svg",
    },
    {
        name: "Thiago Amado",
        role: "Dev mobile",
        age: 26,
        goal: "Ganho de Massa",
        text: "Sempre me enrolava com proteína. Agora só descrevo meu prato e ela soma tudo. Tá bem mais fácil manter a meta diária.",
        avatar: "/testimonials/avatar-04.svg",
    },
    {
        name: "Helena Barros",
        role: "Mãe de primeira viagem",
        age: 31,
        goal: "Reeducação",
        text: "O melhor é q dá pra usar no corre do dia. Áudio rápido, Mácia registra, eu vejo o saldo e sigo. Sem app, sem dor de cabeça.",
        avatar: "/testimonials/avatar-05.svg",
    },
    {
        name: "João Victor",
        role: "Estudante de medicina",
        age: 24,
        goal: "Cutting",
        text: "Cutting sempre foi chato. Agora eu só mando áudio falando o q comi e ela calcula pra mim. Muito mais prático.",
        avatar: "/testimonials/avatar-06.svg",
    },
    {
        name: "Simone Ribeiro",
        role: "Gestora de projetos",
        age: 42,
        goal: "Bem-estar",
        text: "Curto q ela resume meu dia no final. Me ajuda a entender onde exagerei e onde fui bem. Áudio é bem natural pra mim.",
        avatar: "/testimonials/avatar-07.svg",
    },
    {
        name: "Caio Teles",
        role: "Fotógrafo",
        age: 35,
        goal: "Perda de Peso",
        text: "Ela registra até o lanche rápido. Só de ver o total do dia eu fiquei mais consciente e já deu resultado.",
        avatar: "/testimonials/avatar-08.svg",
    },
    {
        name: "Renata Valença",
        role: "UX Designer",
        age: 28,
        goal: "Metas de Proteína",
        text: "Eu só descrevo meu almoço e ela já vê se tô batendo proteína ou não. Bem mais fácil de ajustar ao longo do dia.",
        avatar: "/testimonials/avatar-09.svg",
    },
    {
        name: "Guilherme Prado",
        role: "Trader",
        age: 39,
        goal: "Ganho de Massa",
        text: "Tava sempre perdendo refeição. Agora mando áudio quando como e vejo o saldo. Me ajuda a manter o ritmo quando viajo.",
        avatar: "/testimonials/avatar-10.svg",
    },
    {
        name: "Aline Martins",
        role: "Nutri esportiva",
        age: 34,
        goal: "Acompanhamento",
        text: "Uso com alguns pacientes q têm dificuldade de registrar. Áudio ajudou demais a manter constância.",
        avatar: "/testimonials/avatar-11.svg",
    },
    {
        name: "Bruno Cesário",
        role: "Professor de inglês",
        age: 30,
        goal: "Rotina leve",
        text: "Não curto ficar digitando nada. Falo rapidinho o q comi e já recebo o balanço do dia. Muito mais no meu estilo.",
        avatar: "/testimonials/avatar-12.svg",
    },
];

export const Testimonials: React.FC = () => {
  const featured = useMemo(() => {
    return [...allReviews]
      .map(item => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 3)
      .map(({ sort, ...rest }) => rest);
  }, []);

  return (
    <section className="py-24 bg-dark-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">O que dizem os usuários</h2>
          <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((review, idx) => (
            <div key={idx} className="bg-dark-800 p-8 rounded-2xl border border-gray-800 relative group hover:border-brand-500/40 transition-colors">
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
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                    <span className="text-xs text-gray-400">{review.age} anos</span>
                  </div>
                  <p className="text-brand-300 text-xs">{review.role}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-brand-100 bg-brand-500/10 border border-brand-500/20 px-2 py-1 rounded-full">
                    <Target className="w-3 h-3" />
                    {review.goal}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">Rostos sintéticos gerados por IA. Depoimentos exibidos aleatoriamente a cada visita.</p>
      </div>
    </section>
  );
};
