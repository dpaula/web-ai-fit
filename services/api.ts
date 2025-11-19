import { PreCadastroRequest, PreCadastroResponse } from '../types';

const API_URL = 'https://iafit.autevia.com.br/my-ia-fitness/api/usuarios/pre-cadastro';

export const submitPreCadastro = async (data: PreCadastroRequest): Promise<PreCadastroResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorBody = await response.text();
      throw new Error(`Erro na requisição: ${response.status} - ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};