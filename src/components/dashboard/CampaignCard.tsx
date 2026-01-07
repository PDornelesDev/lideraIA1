import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface CampaignCardProps {
  campaign: any;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progressPercentage = campaign.target_votes > 0
    ? Math.round((campaign.current_votes / campaign.target_votes) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Alerts */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-900">Sugestões de Melhorias</h3>
            <p className="text-sm text-yellow-700">Veja as sugestões de melhorias para sua campanha</p>
          </div>
        </div>
      </div>

      {/* Campaign Info */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{campaign.name}</h2>
            <p className="text-blue-100 text-sm">{campaign.description}</p>
          </div>
          <TrendingUp className="flex-shrink-0" size={28} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-blue-100 text-sm">Votos/Meta</p>
            <p className="text-3xl font-bold">{campaign.current_votes.toLocaleString()}</p>
            <p className="text-blue-100 text-xs">Meta: {campaign.target_votes.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Centros</p>
            <p className="text-3xl font-bold">0</p>
            <p className="text-blue-100 text-xs">A visitar</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Progresso</p>
            <p className="text-3xl font-bold">{progressPercentage}%</p>
            <div className="w-full bg-blue-400 h-2 rounded-full mt-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
