
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, Menu, X, Bell, MapPin, ChevronRight, User, LayoutDashboard, Settings } from 'lucide-react';
import { CampaignCard } from '../components/dashboard/CampaignCard';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { LeadersSection } from '../components/dashboard/LeadersSection';
import { ActivitiesSection } from '../components/dashboard/ActivitiesSection';
import { SidebarMenu } from '../components/dashboard/SidebarMenu';

export function Dashboard() {
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<any>(null);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [zonesData, setZonesData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    leaderPotential: 0,
    campaignPotential: 0,
    totalLeaders: 0,
    capturedSupporters: 0
  });
  
  const [alerts, setAlerts] = useState({
    notifications: true,
    location: true
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // 1. Buscar Campanha Ativa
      const { data: campaignData } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const activeCampaign = campaignData || {
        id: 'default',
        name: 'Minha Campanha Eleitoral',
        target_votes: 1000,
        current_votes: 0,
        description: 'Gestão de base e apoiadores'
      };
      
      setCampaign(activeCampaign);

      // 2. Buscar Líderes e Calcular Agregados
      const { data: leadersData } = await supabase
        .from('leaders')
        .select('*')
        .eq('campaign_id', activeCampaign.id)
        .order('votes_influenced', { ascending: false });

      const leaderList = leadersData || [];
      setLeaders(leaderList);

      // Cálculos de Metas
      const sumLeaderMeta = leaderList.reduce((acc, curr) => acc + (curr.target_votes || 0), 0);
      const sumLeaderCaptured = leaderList.reduce((acc, curr) => acc + (curr.votes_influenced || 0), 0);
      
      // Agregação por Bairros (Zonas)
      const zonesMap: Record<string, number> = {};
      leaderList.forEach(l => {
        const zone = l.zone || 'Outros';
        zonesMap[zone] = (zonesMap[zone] || 0) + (l.votes_influenced || 0);
      });
      
      const zonesChart = Object.entries(zonesMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

      setZonesData(zonesChart);
      
      setMetrics({
        leaderPotential: sumLeaderMeta,
        campaignPotential: activeCampaign.target_votes,
        totalLeaders: leaderList.length,
        capturedSupporters: sumLeaderCaptured || activeCampaign.current_votes
      });

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        setAlerts(prev => ({ ...prev, location: false }));
        alert("Localização permitida com sucesso!");
      });
    }
  };

  const requestNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          setAlerts(prev => ({ ...prev, notifications: false }));
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">Sincronizando dados inteligentes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <SidebarMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 overflow-auto custom-scrollbar">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-gray-500">
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                <LayoutDashboard size={14} />
                <span>Painel de Controle</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user?.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Admin Master</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-md">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6 max-w-[1600px] mx-auto pb-20">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard Geral</h1>
               <p className="text-xs text-gray-500 font-medium">Bem-vindo de volta! Aqui está o resumo da sua campanha hoje.</p>
            </div>
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-[11px] font-bold text-gray-700">Visão Geral</button>
              <button className="px-4 py-1.5 hover:bg-white/50 rounded-md text-[11px] font-bold text-gray-500 transition-all">Lideranças</button>
              <button className="px-4 py-1.5 hover:bg-white/50 rounded-md text-[11px] font-bold text-gray-500 transition-all">Mapa</button>
            </div>
          </div>

          {/* Test Period Banner */}
          <div className="bg-[#eff6ff] border border-blue-100 p-3 rounded-xl flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                   <Settings size={16} className="animate-spin-slow" />
                </div>
                <span className="text-xs text-blue-800"><strong>Teste gratuito ativo</strong> — Você tem acesso total a todas as ferramentas de inteligência por mais 7 dias.</span>
             </div>
             <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider">Upgrade Agora</button>
          </div>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.notifications && (
              <div className="bg-[#fffbeb] border border-[#fef3c7] p-4 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Bell size={18} /></div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">Notificações desativadas</h4>
                  <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">Não perca atualizações importantes sobre suas metas e novos apoiadores captados pela equipe.</p>
                  <button onClick={requestNotifications} className="mt-3 text-[10px] font-black text-amber-800 underline uppercase hover:text-amber-900">Ativar agora</button>
                </div>
                <button onClick={() => setAlerts(a => ({...a, notifications: false}))} className="text-amber-400 hover:text-amber-600"><X size={14}/></button>
              </div>
            )}
            
            {alerts.location && (
              <div className="bg-[#f0fdf4] border border-[#dcfce7] p-4 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="p-2 bg-green-100 rounded-lg text-green-600"><MapPin size={18} /></div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-green-900 uppercase tracking-wider">Localização necessária</h4>
                  <p className="text-[11px] text-green-700 mt-1 leading-relaxed">Precisamos validar sua atuação nas zonas eleitorais para gerar mapas de calor e densidade de votos precisos.</p>
                  <button onClick={requestLocation} className="mt-3 text-[10px] font-black text-green-800 underline uppercase hover:text-green-900">Permitir acesso</button>
                </div>
                <button onClick={() => setAlerts(a => ({...a, location: false}))} className="text-green-400 hover:text-green-600"><X size={14}/></button>
              </div>
            )}
          </div>

          {/* Core Dashboard UI */}
          <CampaignCard campaign={campaign} />

          <MetricsOverview 
            campaign={campaign} 
            totalLeaders={metrics.totalLeaders}
            leaderPotential={metrics.leaderPotential}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Comparação Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Análise de Comparação</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-bold text-gray-600">Potencial dos Líderes</span>
                    <span className="text-xs font-black text-blue-600">{metrics.leaderPotential.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-50 h-2.5 rounded-full overflow-hidden border border-gray-100">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-1000 ease-out shadow-inner" 
                      style={{ width: `${Math.min((metrics.leaderPotential / (campaign?.target_votes || 1)) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[11px] font-bold text-gray-600">Apoiadores Captados</span>
                    <span className="text-xs font-black text-green-600">{metrics.capturedSupporters.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-50 h-2.5 rounded-full overflow-hidden border border-gray-100">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-1000 ease-out shadow-inner" 
                      style={{ width: `${Math.min((metrics.capturedSupporters / (campaign?.target_votes || 1)) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                       <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">Meta Principal</span>
                       <span className="text-xl font-black text-gray-900">{campaign?.target_votes?.toLocaleString() || 0} Votos</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-black text-blue-600 uppercase block mb-1">Objetivo Final</span>
                       <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full italic">100% da Meta</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <LeadersSection campaign={campaign} />
          </div>

          {/* Análise de Lideranças & Gráficos */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Inteligência Geográfica</h3>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Bairros */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
                   <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                      <span className="text-xs font-black text-gray-800 uppercase">Top Bairros por Apoiadores</span>
                      <select className="text-[10px] font-bold border-gray-200 rounded-lg px-3 py-1.5 focus:ring-0">
                        <option>Todas as Zonas</option>
                      </select>
                   </div>
                   <div className="flex-1 space-y-4">
                     {zonesData.length > 0 ? zonesData.map((z, idx) => (
                       <div key={z.name} className="space-y-1.5">
                         <div className="flex justify-between text-[10px] font-bold">
                           <span className="text-gray-600">{z.name}</span>
                           <span className="text-gray-900">{z.value}</span>
                         </div>
                         <div className="h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                           <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(z.value / (zonesData[0].value || 1)) * 100}%` }}></div>
                         </div>
                       </div>
                     )) : (
                       <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center">
                          <MapPin size={32} className="text-gray-300 mb-3" />
                          <p className="text-[11px] font-medium text-gray-500 italic max-w-[200px]">Aguardando dados de geolocalização dos líderes para gerar o gráfico.</p>
                       </div>
                     )}
                   </div>
                </div>

                {/* Desempenho Chart */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
                   <div className="mb-8 border-b border-gray-50 pb-4">
                      <span className="text-xs font-black text-gray-800 uppercase">Eficiência das Lideranças</span>
                   </div>
                   <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
                     <div className="w-24 h-24 border-8 border-gray-50 border-t-blue-600 rounded-full mb-6 relative flex items-center justify-center">
                        <span className="text-lg font-black text-gray-900">{Math.round((metrics.capturedSupporters / (metrics.leaderPotential || 1)) * 100)}%</span>
                     </div>
                     <h4 className="text-xs font-black text-gray-900 mb-2 uppercase tracking-wide">Conversão de Meta</h4>
                     <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Sua equipe converteu {Math.round((metrics.capturedSupporters / (metrics.leaderPotential || 1)) * 100)}% do potencial total prometido pelos líderes cadastrados.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Ranking & Tabela Principal */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
               <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Ranking de Desempenho</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[9px] font-black text-gray-400 uppercase">Meta Batida</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-[9px] font-black text-gray-400 uppercase">Em Progresso</span>
                  </div>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-[11px]">
                  <thead className="bg-white text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
                     <tr>
                        <th className="px-6 py-4">Posição</th>
                        <th className="px-6 py-4">Nome do Líder</th>
                        <th className="px-6 py-4">Apoiadores</th>
                        <th className="px-6 py-4">Meta Pessoal</th>
                        <th className="px-6 py-4">Atingimento</th>
                        <th className="px-6 py-4">Status Atual</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leaders.length > 0 ? leaders.map((leader, index) => {
                      const percentage = Math.round(((leader.votes_influenced || 0) / (leader.target_votes || 1)) * 100);
                      const isComplete = (leader.votes_influenced || 0) >= (leader.target_votes || 0);
                      
                      return (
                        <tr key={leader.id} className="hover:bg-blue-50/20 transition-all group">
                          <td className="px-6 py-5 font-black text-blue-600">
                             <div className={`w-6 h-6 rounded flex items-center justify-center ${index < 3 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                                {index + 1}
                             </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                {leader.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-gray-900 group-hover:text-blue-700">{leader.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 font-black text-gray-900">{leader.votes_influenced || 0}</td>
                          <td className="px-6 py-5 text-gray-500 font-bold">{leader.target_votes || 0}</td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <span className={`font-black w-8 ${isComplete ? 'text-green-600' : 'text-amber-600'}`}>{percentage}%</span>
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full w-20 overflow-hidden shadow-inner">
                                <div 
                                  className={`h-full rounded-full transition-all duration-700 ${isComplete ? 'bg-green-500' : 'bg-amber-500'}`} 
                                  style={{ width: `${Math.min(percentage, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter shadow-sm border ${isComplete ? 'bg-green-50 border-green-100 text-green-700' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                              {isComplete ? 'Meta Alcançada' : 'Monitorando'}
                            </span>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic font-medium">Nenhum líder cadastrado no sistema para esta campanha.</td>
                      </tr>
                    )}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-gray-50/30 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
               <span>Página 1 de 1</span>
               <div className="flex gap-2">
                  <button className="p-1.5 border border-gray-200 rounded-lg bg-white opacity-50 cursor-not-allowed"><ChevronRight className="rotate-180" size={14} /></button>
                  <button className="p-1.5 border border-gray-200 rounded-lg bg-white opacity-50 cursor-not-allowed"><ChevronRight size={14} /></button>
               </div>
            </div>
          </div>

          <ActivitiesSection campaign={campaign} />
        </main>
      </div>
    </div>
  );
}

function LayoutDashboardIcon({ size }: { size: number }) {
  return <LayoutDashboard size={size} />;
}
