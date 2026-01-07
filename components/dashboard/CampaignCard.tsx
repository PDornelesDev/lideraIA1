
import React from 'react';
import { Settings, Zap } from 'lucide-react';

interface CampaignCardProps {
  campaign: any;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const current = campaign?.current_votes || 0;
  const target = campaign?.target_votes || 1000;
  const progressPercentage = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="relative bg-[#1e40af] text-white rounded-2xl shadow-xl overflow-hidden p-8 border-b-8 border-blue-900 group">
      {/* Background Decor */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-700"></div>
      
      <div className="absolute top-6 right-6 flex gap-2">
        <button className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all">
          <Zap size={18} />
        </button>
        <button className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all">
          <Settings size={18} />
        </button>
      </div>
      
      <div className="space-y-8 relative z-10">
        <div>
          <h2 className="text-xl font-black tracking-tight uppercase mb-1">Meta de Votos da Campanha</h2>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <p className="text-blue-200 text-[11px] font-bold uppercase tracking-widest">Sincronização em tempo real ativa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <div className="space-y-1.5">
            <p className="text-[10px] text-blue-300 font-black uppercase tracking-[0.2em]">Votos Necessários</p>
            <p className="text-4xl font-black">{target.toLocaleString()}</p>
            <p className="text-[10px] text-blue-200 font-medium italic">Baseado no planejamento estratégico</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] text-blue-300 font-black uppercase tracking-[0.2em]">Apoiadores Reais</p>
            <p className="text-4xl font-black text-blue-50">{current.toLocaleString()}</p>
            <p className="text-[10px] text-blue-200 font-medium">Contagem de fichas validadas</p>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] text-blue-300 font-black uppercase tracking-[0.2em] text-right">Atingimento</p>
            <div className="flex items-baseline justify-end gap-1">
               <p className="text-4xl font-black text-right">{progressPercentage}</p>
               <span className="text-xl font-black text-blue-300">%</span>
            </div>
            <p className="text-[10px] text-blue-200 font-medium text-right uppercase tracking-tighter">{(target - current).toLocaleString()} votos restantes</p>
          </div>
        </div>

        <div className="pt-4">
          <div className="w-full bg-blue-900/50 h-3 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <div 
              className="bg-gradient-to-r from-blue-300 via-blue-100 to-white h-full transition-all duration-[1500ms] ease-out shadow-[0_0_15px_rgba(255,255,255,0.6)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
