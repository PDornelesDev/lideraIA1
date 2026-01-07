
import React from 'react';
import { Flame, Target, Trophy, TrendingUp } from 'lucide-react';

interface MetricsOverviewProps {
  campaign: any;
  totalLeaders?: number;
  leaderPotential?: number;
}

export function MetricsOverview({ campaign, totalLeaders = 0, leaderPotential = 0 }: MetricsOverviewProps) {
  const metrics = [
    { label: 'Potencial dos Líderes', value: leaderPotential, icon: Flame, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Potencial da Campanha', value: campaign?.target_votes || 0, icon: Target, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Total de Líderes', value: totalLeaders, icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Apoiadores Captados', value: campaign?.current_votes || 0, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:border-blue-200 transition-colors cursor-default group">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors">{metric.label}</p>
              <p className="text-2xl font-black text-gray-900">{metric.value.toLocaleString()}</p>
              <p className="text-[9px] text-gray-400 italic">Total acumulado em tempo real</p>
            </div>
            <div className={`p-3 rounded-full ${metric.bg} ${metric.color} group-hover:scale-110 transition-transform`}>
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
