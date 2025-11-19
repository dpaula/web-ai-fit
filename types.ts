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