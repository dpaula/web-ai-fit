import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Check, Copy, Share2, Smartphone, User, Send } from 'lucide-react';
import { Button } from './Button';
import { submitPreCadastro } from '../services/api';
import { PreCadastroResponse } from '../types';

interface FormInputs {
  name: string;
  phone: string;
  email?: string;
}

export const PreRegisterForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [responseData, setResponseData] = useState<PreCadastroResponse | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [phoneConflict, setPhoneConflict] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setReferralCode(ref);
  }, []);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    setPhoneConflict(null);
    try {
      const response = await submitPreCadastro({
        nome: data.name,
        telefone: data.phone,
        email: data.email,
        codigoConviteIndicador: referralCode || undefined,
        urlOrigem: "lp-principal"
      });
      setResponseData(response);
      setIsSuccess(true);
    } catch (error) {
      const message = String(error);
      if (message.includes('409') && message.toLowerCase().includes('já existe')) {
        setPhoneConflict("Este telefone já está na lista de cadastrados. Você já garantiu seu lugar!");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } else {
        setPhoneConflict("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (responseData?.linkConvite) {
      navigator.clipboard.writeText(responseData.linkConvite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!(isSuccess && responseData)) return;

    const styleId = 'ai-fit-confetti';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes ai-confetti-fall {
          0% { transform: translate3d(var(--x), -10%, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(var(--x), 110vh, 0) rotate(360deg); opacity: 0; }
        }
        @keyframes ai-confetti-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }
      `;
      document.head.appendChild(style);
    }

    const container = document.createElement('div');
    container.className = 'fixed inset-0 pointer-events-none z-[120] overflow-hidden';
    document.body.appendChild(container);

    const colors = ['#25D366', '#4ade80', '#a8d5ca', '#ffffff', '#128C7E'];
    const totalPieces = 36;

    for (let i = 0; i < totalPieces; i++) {
      const piece = document.createElement('span');
      const size = 6 + Math.random() * 6;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * 2}px`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.position = 'absolute';
      piece.style.top = '-12px';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.transformOrigin = 'center';
      piece.style.borderRadius = '2px';
      piece.style.opacity = '0.95';
      piece.style.setProperty('--x', `${(Math.random() - 0.5) * 40}px`);
      const fallDuration = 800 + Math.random() * 500;
      const spinDuration = 500 + Math.random() * 400;
      piece.style.animation = `ai-confetti-fall ${fallDuration}ms ease-out forwards, ai-confetti-spin ${spinDuration}ms linear`;
      container.appendChild(piece);
    }

    const timeout = setTimeout(() => {
      container.remove();
    }, 1400);

    return () => {
      clearTimeout(timeout);
      container.remove();
    };
  }, [isSuccess, responseData]);

  if (isSuccess && responseData) {
    return (
      <div id="cadastro" className="py-20 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-dark-800 rounded-3xl border border-brand-500/30 p-8 shadow-2xl text-center animate-fade-in-up relative overflow-hidden">
            <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20 ring-8 ring-brand-500/10">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Parabéns! Cadastro confirmado 🎉</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Você já está na fila. Ainda esta semana a Mácia vai te enviar uma mensagem no WhatsApp para começar seu onboarding e liberar sua 1ª semana grátis.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Liberamos novos acessos ao AI Fit semanalmente. Fique de olho no seu WhatsApp — o convite chega por lá 😉
            </p>

            <div className="bg-dark-950 p-4 rounded-xl border border-gray-800 mb-6 text-left">
               <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Seu link de indicação</p>
               <div className="flex items-center gap-2">
                 <code className="flex-1 bg-transparent text-brand-400 text-sm truncate font-mono">
                   {responseData.linkConvite}
                 </code>
                 <button onClick={handleCopyLink} className="text-gray-400 hover:text-white">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                 </button>
               </div>
               <div className="mt-3 text-sm text-brand-200 bg-brand-500/10 border border-brand-500/20 rounded-lg px-3 py-2 leading-relaxed">
                 Ganhe +1 semana grátis cada vez que um amigo concluir o cadastro usando esse link. As semanas são acumulativas e o link é só seu.
               </div>
            </div>

            <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Olha essa IA de nutrição no WhatsApp: ${responseData.linkConvite}`)}`)}>
              <Share2 className="mr-2 w-5 h-5" />
              Compartilhar no WhatsApp
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              Dica: envie para amigos que também querem melhorar a alimentação. Cada amigo ativado vira +1 semana grátis pra você.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="cadastro" className="py-24 relative bg-dark-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/20 via-dark-900 to-dark-900 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto">
         <div className="text-center mb-10">
             <h2 className="text-3xl font-bold text-white mb-4">Entre na Lista de Espera</h2>
             <p className="text-gray-400">Cadastre-se para garantir seu lugar. <span className="text-brand-400 font-bold">Ganhe 1 semana grátis ao indicar um amigo</span> quando lançarmos.</p>
         </div>

          <div className="bg-dark-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                  <input
                    {...register("name", { required: true })}
                    className="w-full bg-dark-900 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                    placeholder="Digite seu nome"
                  />
                </div>
                {errors.name && <span className="text-red-500 text-xs mt-1 ml-1">Nome obrigatório</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Seu WhatsApp</label>
              <div className="relative">
                <Smartphone className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                <input
                  {...register("phone", { required: true, pattern: /^\(\d{2}\) \d{5}-\d{4}$/ })}
                  onChange={(e) => setValue('phone', formatPhone(e.target.value))}
                  className={`w-full bg-dark-900 border ${phoneConflict ? 'border-red-500 ring-2 ring-red-500/40' : 'border-gray-700 focus:ring-brand-500 focus:border-transparent'} rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 outline-none transition-all ${shake ? 'animate-[shake_0.2s_ease-in-out_2]' : ''}`}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>
              {errors.phone && <span className="text-red-500 text-xs mt-1 ml-1">WhatsApp inválido</span>}
              {phoneConflict && (
                <p className="text-red-400 text-xs mt-2 ml-1 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {phoneConflict}
                </p>
              )}
            </div>

              <Button type="submit" fullWidth isLoading={isLoading} className="h-12 text-lg shadow-lg shadow-brand-500/20">
                <Send className="w-4 h-4 mr-2" />
                Quero Participar
              </Button>
            </form>
            <p className="text-center text-xs text-gray-600 mt-6">
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
