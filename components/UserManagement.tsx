import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Loader2,
  Mail,
  Phone,
  RefreshCcw,
  UserCircle2,
} from 'lucide-react';
import { Button } from './Button';
import { fetchUsuariosPaginado, marcarOnBoard } from '../services/api';
import { PaginaUsuarioDTO, UsuarioDTO, UsuarioStatus } from '../types';
import { Logo } from './Logo';

type SortField = 'nome' | 'dataPreCadastro' | 'dataFimAcesso';
const APP_VERSION = 'v1.0.2';

const statusColors: Record<UsuarioStatus, string> = {
  PRE_CADASTRO: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
  ON_BOARD: 'bg-blue-500/15 text-blue-200 border-blue-500/40',
  ATIVO: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
  INATIVO: 'bg-gray-500/15 text-gray-300 border-gray-500/40',
};

const formatDateTime = (value?: string | null) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(new Date(value));
};

const initialsFromName = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

export const UserManagement: React.FC = () => {
  const [status, setStatus] = useState<UsuarioStatus | ''>('PRE_CADASTRO');
  const [dataFim, setDataFim] = useState('');
  const [ordenarPor, setOrdenarPor] = useState<SortField>('dataPreCadastro');
  const [direcao, setDirecao] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(0);

  const [paginaUsuarios, setPaginaUsuarios] = useState<PaginaUsuarioDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [onboardingPhone, setOnboardingPhone] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const dataFimParam = useMemo(
    () => (dataFim ? `${dataFim}T23:59:59Z` : undefined),
    [dataFim]
  );

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUsuariosPaginado({
        status: status || undefined,
        dataFimAcesso: dataFimParam,
        pagina: page,
        tamanho: pageSize,
        ordenarPor,
        direcao,
      });
      setPaginaUsuarios(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar usuários';
      setError(message || 'Erro ao carregar usuários. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [status, dataFimParam, page, pageSize, ordenarPor, direcao]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (!successMessage) return;
    const timeout = setTimeout(() => setSuccessMessage(null), 2800);
    return () => clearTimeout(timeout);
  }, [successMessage]);

  const totalPages = useMemo(() => {
    if (!paginaUsuarios || !paginaUsuarios.tamanho) return 1;
    return Math.max(1, Math.ceil(paginaUsuarios.total / paginaUsuarios.tamanho));
  }, [paginaUsuarios]);

  const canGoPrev = page > 0;
  const canGoNext = page + 1 < totalPages;

  const hasResults = (paginaUsuarios?.total ?? 0) > 0;
  const rangeStart =
    paginaUsuarios && hasResults ? page * paginaUsuarios.tamanho + 1 : 0;
  const rangeEnd =
    paginaUsuarios && hasResults
      ? Math.min(paginaUsuarios.total, (page + 1) * paginaUsuarios.tamanho)
      : 0;

  const handleOnboard = async (telefone: string) => {
    setOnboardingPhone(telefone);
    setError(null);
    setSuccessMessage(null);
    try {
      const updated = await marcarOnBoard(telefone);
      setPaginaUsuarios((prev) =>
        prev
          ? {
              ...prev,
              itens: prev.itens.map((item) =>
                item.id === updated.id ? { ...item, ...updated } : item
              ),
            }
          : prev
      );
      setSuccessMessage('Usuário marcado como ON BOARD');
    } catch (err) {
      const statusCode = (err as { status?: number })?.status;
      if (statusCode === 404) {
        setError('Usuário não encontrado para o telefone informado.');
      } else if (statusCode === 400) {
        setError('Telefone inválido. Envie no formato brasileiro.');
      } else {
        const message = err instanceof Error ? err.message : 'Erro ao marcar como ON BOARD.';
        setError(message);
      }
    } finally {
      setOnboardingPhone(null);
    }
  };

  const resetFilters = () => {
    setStatus('PRE_CADASTRO');
    setDataFim('');
    setOrdenarPor('dataPreCadastro');
    setDirecao('desc');
    setPageSize(20);
    setPage(0);
  };

  const emptyState =
    !loading && paginaUsuarios && paginaUsuarios.itens && paginaUsuarios.itens.length === 0;

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100">
      <header className="fixed top-0 inset-x-0 z-30 bg-dark-900/80 backdrop-blur border-b border-gray-800/70">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm text-gray-400">Painel interno</span>
              <span className="text-base font-semibold text-white">Gerenciar usuários</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-500 border border-gray-800 rounded-full px-2 py-1 hidden sm:inline-flex">
              {APP_VERSION}
            </span>
            <Button
              variant="primary"
              className="h-10 px-4 text-sm"
              onClick={loadUsers}
              isLoading={loading}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 space-y-8">
          <section className="bg-dark-900/70 border border-gray-800 rounded-3xl p-6 shadow-2xl shadow-black/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">Gerenciar usuários</h1>
                <p className="text-sm text-gray-500">Liste, filtre e marque pré-cadastros como ON BOARD.</p>
              </div>
              <div className="flex items-center gap-3">
                {paginaUsuarios && (
                  <div className="bg-dark-800/70 border border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-200 shadow-lg flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <UserCircle2 className="w-5 h-5 text-brand-400" />
                      <span className="font-semibold">
                        {paginaUsuarios.total.toLocaleString('pt-BR')} usuários
                      </span>
                    </div>
                    <span className="hidden md:inline text-gray-500">•</span>
                    <span className="text-gray-500">Página {page + 1} de {totalPages}</span>
                  </div>
                )}
                <span className="md:hidden text-[11px] text-gray-500 border border-gray-800 rounded-full px-2 py-1">
                  {APP_VERSION}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <Button
                variant="outline"
                className="h-10 px-4 text-sm"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </Button>
              <p className="text-xs text-gray-500 hidden md:block">
                Status padrão: PRE_CADASTRO • Ordenação: Data pré-cadastro desc
              </p>
            </div>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-12 mb-4">
              <div className="md:col-span-3">
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Filter className="w-4 h-4" />
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value as UsuarioStatus | '');
                    setPage(0);
                  }}
                  className="w-full bg-dark-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="PRE_CADASTRO">PRE_CADASTRO</option>
                  <option value="ON_BOARD">ON_BOARD</option>
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <CalendarClock className="w-4 h-4" />
                  Expira até (UTC)
                </label>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => {
                    setDataFim(e.target.value);
                    setPage(0);
                  }}
                  className="w-full bg-dark-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-gray-600"
                  placeholder="yyyy-mm-dd"
                />
              </div>

              <div className="md:col-span-3">
                <label className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  Ordenar por
                </label>
                <select
                  value={ordenarPor}
                  onChange={(e) => {
                    setOrdenarPor(e.target.value as SortField);
                    setPage(0);
                  }}
                  className="w-full bg-dark-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="nome">Nome</option>
                  <option value="dataPreCadastro">Data pré-cadastro</option>
                  <option value="dataFimAcesso">Data fim acesso</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm text-gray-400 mb-1">Direção</label>
                <div className="flex gap-2">
                  <Button
                    variant={direcao === 'asc' ? 'primary' : 'outline'}
                    className="flex-1 h-10 text-sm"
                    onClick={() => {
                      setDirecao('asc');
                      setPage(0);
                    }}
                  >
                    Asc
                  </Button>
                  <Button
                    variant={direcao === 'desc' ? 'primary' : 'outline'}
                    className="flex-1 h-10 text-sm"
                    onClick={() => {
                      setDirecao('desc');
                      setPage(0);
                    }}
                  >
                    Desc
                  </Button>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="text-sm text-gray-400 mb-1">Itens por página</label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                  className="w-full bg-dark-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  {[20, 50, 100].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 flex items-end gap-2">
                <Button variant="outline" className="w-full h-11" onClick={resetFilters}>
                  Limpar filtros
                </Button>
              </div>
            </div>
            )}

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                {successMessage}
              </div>
            )}

            <div className="relative overflow-hidden border border-gray-800 rounded-2xl bg-dark-900/70">
              {loading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="flex items-center gap-2 text-gray-200">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Carregando usuários...
                  </div>
                </div>
              )}

              {/* Mobile-first cards */}
              <div className="space-y-3 p-4 md:hidden">
                {paginaUsuarios?.itens?.map((user: UsuarioDTO) => {
                  const canOnboard = user.status === 'PRE_CADASTRO';
                  return (
                    <div
                      key={user.id}
                      className="rounded-2xl border border-gray-800 bg-dark-800/70 p-4 shadow-lg shadow-black/20"
                    >
                      <div className="flex items-start gap-3">
                        {user.urlAvatar ? (
                          <img
                            src={user.urlAvatar}
                            alt={user.nome}
                            className="w-11 h-11 rounded-full object-cover border border-gray-800 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-brand-500/20 text-brand-200 border border-brand-500/40 flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {initialsFromName(user.nome)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-semibold text-white leading-tight break-words">
                                {user.nome}
                              </p>
                              <p className="text-[11px] text-gray-500 break-words">
                                {user.codigoConvite || '—'}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap ${statusColors[user.status]}`}
                            >
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2 text-sm text-gray-200">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-[13px] leading-snug break-words">{user.telefone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="text-[13px] leading-snug break-words">
                            {user.email ?? '—'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[12px] text-gray-400">
                          <span>Pré-cad.: {formatDateTime(user.dataPreCadastro)}</span>
                          <span>Fim: {formatDateTime(user.dataFimAcesso)}</span>
                        </div>
                        <div className="text-[12px] text-gray-400 break-words">
                          Indicado por: {user.indicadoPorCodigo || '—'}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          variant="primary"
                          className="w-full h-10 text-sm"
                          disabled={!canOnboard || onboardingPhone === user.telefone}
                          isLoading={onboardingPhone === user.telefone}
                          onClick={() => handleOnboard(user.telefone)}
                        >
                          Marcar ON BOARD
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop table */}
              <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full text-sm">
                  <thead className="bg-dark-800/80 text-gray-300 uppercase tracking-wide text-xs">
                    <tr>
                      <th className="px-4 py-3 text-left">Nome</th>
                      <th className="px-4 py-3 text-left">Telefone</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Pré-cadastro</th>
                      <th className="px-4 py-3 text-left">Fim acesso</th>
                      <th className="px-4 py-3 text-left">Indicado por</th>
                      <th className="px-4 py-3 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaUsuarios?.itens?.map((user: UsuarioDTO) => {
                      const canOnboard = user.status === 'PRE_CADASTRO';
                      return (
                        <tr
                          key={user.id}
                          className="border-t border-gray-800 hover:bg-dark-800/40 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {user.urlAvatar ? (
                                <img
                                  src={user.urlAvatar}
                                  alt={user.nome}
                                  className="w-9 h-9 rounded-full object-cover border border-gray-800"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-brand-500/20 text-brand-200 border border-brand-500/40 flex items-center justify-center text-xs font-bold">
                                  {initialsFromName(user.nome)}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-white">{user.nome}</p>
                                <p className="text-xs text-gray-500">{user.codigoConvite}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 text-gray-200">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="font-mono text-xs sm:text-sm">{user.telefone}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 text-gray-200">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="truncate max-w-[180px]">{user.email ?? '—'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[user.status]}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-200">{formatDateTime(user.dataPreCadastro)}</td>
                          <td className="px-4 py-3 text-gray-200">{formatDateTime(user.dataFimAcesso)}</td>
                          <td className="px-4 py-3 text-gray-200 font-mono text-xs sm:text-sm">
                            {user.indicadoPorCodigo || '—'}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="primary"
                              className="h-9 text-xs px-4"
                              disabled={!canOnboard || onboardingPhone === user.telefone}
                              isLoading={onboardingPhone === user.telefone}
                              onClick={() => handleOnboard(user.telefone)}
                            >
                              Marcar ON BOARD
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {emptyState && (
                <div className="px-6 py-10 text-center text-gray-400">
                  Nenhum usuário encontrado para os filtros informados.
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-400">
              <div>
                {paginaUsuarios ? (
                  <>
                    Exibindo {rangeStart}-{rangeEnd} de {paginaUsuarios.total.toLocaleString('pt-BR')}
                    {' '}usuários
                  </>
                ) : (
                  'Buscando usuários...'
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-10 px-3"
                  disabled={!canGoPrev}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <span className="text-gray-300">
                  Página {page + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  className="h-10 px-3"
                  disabled={!canGoNext}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
