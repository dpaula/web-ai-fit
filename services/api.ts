import {
  PaginaUsuarioDTO,
  PreCadastroRequest,
  PreCadastroResponse,
  UsuarioDTO,
  UsuarioStatus,
} from '../types';

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  'https://iafit.autevia.com.br/my-ia-fitness';

const USUARIOS_BASE = `${API_BASE_URL}/api/usuarios`;
const PRE_CADASTRO_URL = `${USUARIOS_BASE}/pre-cadastro`;

type ApiError = Error & { status?: number };

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  const errorText = await response.text();
  const err: ApiError = new Error(errorText || `Erro ${response.status}`);
  err.status = response.status;
  throw err;
};

export const submitPreCadastro = async (data: PreCadastroRequest): Promise<PreCadastroResponse> => {
  const response = await fetch(PRE_CADASTRO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return parseResponse<PreCadastroResponse>(response);
};

export interface UsuariosQueryParams {
  status?: UsuarioStatus;
  dataFimAcesso?: string;
  pagina?: number;
  tamanho?: number;
  ordenarPor?: string;
  direcao?: 'asc' | 'desc';
}

export const fetchUsuariosPaginado = async (
  params: UsuariosQueryParams = {}
): Promise<PaginaUsuarioDTO> => {
  const searchParams = new URLSearchParams();

  if (params.status) searchParams.set('status', params.status);
  if (params.dataFimAcesso) searchParams.set('dataFimAcesso', params.dataFimAcesso);
  if (typeof params.pagina === 'number') searchParams.set('pagina', String(params.pagina));
  if (typeof params.tamanho === 'number') searchParams.set('tamanho', String(params.tamanho));
  if (params.ordenarPor) searchParams.set('ordenarPor', params.ordenarPor);
  if (params.direcao) searchParams.set('direcao', params.direcao);

  const query = searchParams.toString();
  const response = await fetch(`${USUARIOS_BASE}/paginado${query ? `?${query}` : ''}`);
  return parseResponse<PaginaUsuarioDTO>(response);
};

export const marcarOnBoard = async (telefone: string): Promise<UsuarioDTO> => {
  const encodedPhone = encodeURIComponent(telefone.trim());
  const response = await fetch(`${USUARIOS_BASE}/${encodedPhone}/onboard`, {
    method: 'POST',
  });

  return parseResponse<UsuarioDTO>(response);
};
