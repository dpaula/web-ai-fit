import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Check, Copy, Share2, Smartphone, User, Mail, Sparkles } from 'lucide-react';
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
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>();

  useEffect(() => {
    // Extract 'ref' parameter from URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, []);

  const formatPhone = (value: string) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    // Format as (XX) XXXXX-XXXX
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted);
  };

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const payload = {
        nome: data.name,
        telefone: data.phone, // Sending formatted, backend should handle or clean it
        email: data.email,
        codigoConviteIndicador: referralCode || undefined,
        urlOrigem: "lp-principal"
      };

      const response = await submitPreCadastro(payload);
      setResponseData(response);
      setIsSuccess(true);
    } catch (error: any) {
      setApiError(error.message || "Ocorreu um erro ao processar seu cadastro. Tente novamente.");
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

  const handleShareWhatsapp = () => {
    if (responseData?.linkConvite) {
      const text = `Oi! Estou usando o My AI Fit para controlar minha dieta pelo WhatsApp e ganhei 1 semana grátis. Cadastre-se pelo meu link e ganhe também: ${responseData.linkConvite}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  if (isSuccess && responseData) {
    return (
      <div id="cadastro" className="max-w-2xl mx-auto p-8 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border border-brand-500 shadow-2xl shadow-brand-500/10 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-500/40">
          <Check className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-2">Parabéns, {responseData.usuario.nome.split(' ')[0]}!</h3>
        <p className="text-brand-300 text-lg font-medium mb-6">Sua semana grátis foi ativada.</p>
        
        <div className="bg-slate-900/80 rounded-xl p-6 mb-8 border border-slate-700">
          <p className="text-slate-400 mb-4 text-sm">
            Convide amigos e ganhe <span className="text-white font-bold text-brand-400">+1 semana grátis</span> por cada indicação!
          </p>
          
          <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4">
             <input 
               readOnly 
               value={responseData.linkConvite} 
               className="bg-transparent text-slate-300 flex-1 outline-none text-sm font-mono truncate"
             />
             <button 
                onClick={handleCopyLink}
                className="p-2 hover:bg-slate-800 rounded-md transition-colors relative group"
             >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-slate-400 group-hover:text-white" />}
             </button>
          </div>

          <Button 
            onClick={handleShareWhatsapp}
            className="w-full bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-green-900/20"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Compartilhar no WhatsApp
          </Button>
        </div>

        <p className="text-xs text-slate-500">
          Em breve você receberá uma mensagem da nossa IA no número cadastrado.
        </p>
      </div>
    );
  }

  return (
    <section id="cadastro" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-slate-800/50 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-brand-400 font-semibold mb-2">
              <Sparkles className="w-5 h-5" />
              <span>Comece Agora</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Garanta seu acesso antecipado</h2>
            <p className="text-slate-400 text-sm">
              {referralCode ? (
                <span className="text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded">
                  Você foi indicado! Ganhe prioridade na fila.
                </span>
              ) : "Cadastre-se para liberar 1 semana totalmente grátis."}
            </p>
          </div>

          {apiError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Nome completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  {...register("name", { required: "Nome é obrigatório" })}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="Seu nome"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="tel"
                  {...register("phone", { 
                    required: "WhatsApp é obrigatório",
                    pattern: {
                      value: /^\(\d{2}\) \d{5}-\d{4}$/,
                      message: "Formato inválido. Use (99) 99999-9999"
                    }
                  })}
                  onChange={handlePhoneChange}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="(47) 99999-8888"
                  maxLength={15}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs ml-1">{errors.phone.message}</p>}
            </div>

            {/* Email Field (Optional) */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
                <span className="text-xs text-slate-500">Opcional</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading} className="mt-4">
              Liberar Acesso Grátis
            </Button>

            <p className="text-xs text-center text-slate-500 mt-4">
              Ao se cadastrar, você concorda com nossos Termos de Uso e Política de Privacidade.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};