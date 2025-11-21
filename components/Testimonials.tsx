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
    text: "O fato de ser por áudio me tirou toda a preguiça. Falo rápido e já recebo o saldo do dia.",
    avatar: asset("avatar-01.svg"),
  },
  {
    name: "Lucas Faria",
    role: "Analista de dados",
    age: 33,
    goal: "Bem-estar",
    text: "Uso entre reuniões: gravo um áudio, a Mácia registra e me lembra de beber água.",
    avatar: asset("avatar-02.svg"),
  },
  {
    name: "Patrícia Nogueira",
    role: "Corredora amadora",
    age: 37,
    goal: "Performance",
    text: "Ela ajusta carbo de prova pra treino longo sem eu ter que abrir planilha.",
    avatar: asset("avatar-03.svg"),
  },
  {
    name: "Thiago Amado",
    role: "Dev mobile",
    age: 26,
    goal: "Ganho de Massa",
    text: "Acompanhar proteína virou simples: áudio do prato e pronto, já cargo tudo no dia.",
    avatar: asset("avatar-04.svg"),
  },
  {
    name: "Helena Barros",
    role: "Mãe de primeira viagem",
    age: 31,
    goal: "Reeducação",
    text: "Consigo registrar enquanto balanço o bebê. Sem app, sem stress.",
    avatar: asset("avatar-05.svg"),
  },
  {
    name: "João Victor",
    role: "Estudante de medicina",
    age: 24,
    goal: "Cutting",
    text: "Precisão de macros me ajudou a manter déficit sem loucura. Áudio é muito mais rápido.",
    avatar: asset("avatar-06.svg"),
  },
  {
    name: "Simone Ribeiro",
    role: "Gestora de projetos",
    age: 42,
    goal: "Bem-estar",
    text: "Feedback diário com gráficos resumidos no WhatsApp. Finalmente acompanho de verdade.",
    avatar: asset("avatar-07.svg"),
  },
  {
    name: "Caio Teles",
    role: "Fotógrafo",
    age: 35,
    goal: "Perda de Peso",
    text: "Ela lembra de registrar até o cafezinho. Já perdi 2kg só de ficar mais consciente.",
    avatar: asset("avatar-08.svg"),
  },
  {
    name: "Renata Valença",
    role: "UX Designer",
    age: 28,
    goal: "Metas de Proteína",
    text: "A Mácia monta o balanço diário e me sugere lanches ricos em proteína sem eu perguntar.",
    avatar: asset("avatar-09.svg"),
  },
  {
    name: "Guilherme Prado",
    role: "Trader",
    age: 39,
    goal: "Ganho de Massa",
    text: "Registro por áudio + lembrete de refeição me mantém no plano mesmo viajando.",
    avatar: asset("avatar-10.svg"),
  },
  {
    name: "Aline Martins",
    role: "Nutri esportiva",
    age: 34,
    goal: "Acompanhamento",
    text: "Uso com pacientes: a adesão subiu muito porque não exige app nenhum.",
    avatar: asset("avatar-11.svg"),
  },
  {
    name: "Bruno Cesário",
    role: "Professor de inglês",
    age: 30,
    goal: "Rotina leve",
    text: "Curti os lembretes de hidratação e o resumo semanal. Áudio é o formato natural pra mim.",
    avatar: asset("avatar-12.svg"),
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
          <p className="text-gray-400">12 depoimentos reais com rostos sintéticos gerados por IA.</p>
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
