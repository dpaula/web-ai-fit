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

  if (isSuccess && responseData) {
    return (
      <div id="cadastro" className="py-20 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-dark-800 rounded-3xl border border-brand-500/30 p-8 shadow-2xl text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/20">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Cadastro Confirmado!</h3>
            <p className="text-gray-400 mb-6">
              Você está na fila. Ganhe <strong className="text-brand-400">1 semana grátis</strong> ao indicar um amigo.
            </p>
            
            <div className="bg-dark-950 p-4 rounded-xl border border-gray-800 mb-6">
               <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider text-left font-bold">Seu Link de Indicação</p>
               <div className="flex items-center gap-2">
                 <code className="flex-1 bg-transparent text-brand-400 text-sm truncate font-mono text-left">
                   {responseData.linkConvite}
                 </code>
                 <button onClick={handleCopyLink} className="text-gray-400 hover:text-white">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                 </button>
               </div>
               <div className="mt-3 text-left text-xs text-brand-200 bg-brand-500/10 border border-brand-500/20 rounded-lg px-3 py-2">
                 Ganhe 1 semana grátis quando o seu amigo concluir o cadastro pelo link.
               </div>
            </div>

            <Button className="w-full bg-[#25D366] hover:bg-[#128C7E]" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Olha essa IA de nutrição no WhatsApp: ${responseData.linkConvite}`)}`)}>
              <Share2 className="mr-2 w-5 h-5" />
              Enviar no WhatsApp
            </Button>
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
