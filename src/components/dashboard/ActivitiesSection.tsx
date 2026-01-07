import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Activity, ChevronRight } from 'lucide-react';

interface ActivitySectionProps {
  campaign: any;
}

export function ActivitiesSection({ campaign }: ActivitySectionProps) {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('campaign_id', campaign.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setActivities(data || []);
    };

    fetchActivities();
  }, [campaign.id]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity size={20} />
          Atividades Recentes
        </h3>
        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Ver Todas <ChevronRight size={16} />
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
                <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">Nenhuma atividade registrada</div>
        )}
      </div>
    </div>
  );
}
