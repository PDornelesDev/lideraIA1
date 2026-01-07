import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, ActivitySquare, BarChart3, CheckCircle } from 'lucide-react';

interface MetricsOverviewProps {
  campaign: any;
}

export function MetricsOverview({ campaign }: MetricsOverviewProps) {
  const [leaders, setLeaders] = useState(0);
  const [activities, setActivities] = useState(0);
  const [surveys, setSurveys] = useState(0);
  const [actions, setActions] = useState(0);

  useEffect(() => {
    const fetchMetrics = async () => {
      const [leadersRes, activitiesRes, surveysRes, actionsRes] = await Promise.all([
        supabase.from('leaders').select('count', { count: 'exact' }).eq('campaign_id', campaign.id),
        supabase.from('activities').select('count', { count: 'exact' }).eq('campaign_id', campaign.id),
        supabase.from('electoral_surveys').select('count', { count: 'exact' }).eq('campaign_id', campaign.id),
        supabase.from('actions').select('count', { count: 'exact' }).eq('campaign_id', campaign.id),
      ]);

      setLeaders(leadersRes.count || 0);
      setActivities(activitiesRes.count || 0);
      setSurveys(surveysRes.count || 0);
      setActions(actionsRes.count || 0);
    };

    fetchMetrics();
  }, [campaign.id]);

  const metrics = [
    { icon: Users, label: 'Líderes', value: leaders, color: 'blue' },
    { icon: ActivitySquare, label: 'Atividades Eleitorais', value: activities, color: 'green' },
    { icon: BarChart3, label: 'Pesquisas Pendentes', value: surveys, color: 'yellow' },
    { icon: CheckCircle, label: 'Demandas Pendentes', value: actions, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const colorClass = {
          blue: 'bg-blue-50 text-blue-600',
          green: 'bg-green-50 text-green-600',
          yellow: 'bg-yellow-50 text-yellow-600',
          purple: 'bg-purple-50 text-purple-600',
        }[metric.color];

        return (
          <div key={metric.label} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${colorClass}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
