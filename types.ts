import React from 'react';

export interface PreCadastroRequest {
  nome: string;
  telefone: string;
  email?: string;
  codigoConviteIndicador?: string;
  urlOrigem: string;
}

export interface PreCadastroResponse {
  status: boolean;
  message?: string;
  codigoConvite: string;
  linkConvite: string;
  usuario: {
    id: string;
    nome: string;
    telefone: string;
  };
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  image: string;
}

export type UsuarioStatus = 'PRE_CADASTRO' | 'ON_BOARD' | 'ATIVO' | 'INATIVO';

export type HistoricoEvento =
  | 'PESO_REGISTRADO'
  | 'PESO_ATUALIZADO'
  | 'PESO_REMOVIDO'
  | 'REFEICAO_CRIADA'
  | 'REFEICAO_REMOVIDA'
  | 'META_CRIADA'
  | 'META_ATUALIZADA'
  | 'META_REMOVIDA'
  | 'PERFIL_CRIADO'
  | 'CRIACAO'
  | 'ONBOARD_INICIADO'
  | 'ATIVACAO_ACESSO'
  | 'DESATIVACAO_ACESSO';

export interface HistoricoUsuarioDTO {
  id: string;
  evento: HistoricoEvento;
  descricao: string;
  detalhes?: string | null;
  dataEvento: string;
}

export interface UsuarioDTO {
  id: string;
  telefone: string;
  email?: string | null;
  nome: string;
  urlAvatar?: string | null;
  papeis: string[];
  status: UsuarioStatus;
  dataInicioAcesso?: string | null;
  dataFimAcesso?: string | null;
  codigoConvite?: string | null;
  indicadoPorId?: string | null;
  indicadoPorCodigo?: string | null;
  totalIndicacoes?: number;
  semanasBonusRecebidas?: number;
  dataPreCadastro?: string | null;
  historico?: HistoricoUsuarioDTO[];
}

export interface PaginaUsuarioDTO {
  total: number;
  pagina: number;
  tamanho: number;
  itens: UsuarioDTO[];
}
