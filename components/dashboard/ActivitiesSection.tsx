
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function ActivitiesSection({ campaign }: any) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!campaign?.id) return;

      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('campaign_id', campaign.id)
        .order('created_at', { ascending: false })
        .limit(10);

      setActivities(data || []);
      setLoading(false);
    };

    fetchActivities();
  }, [campaign]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
         <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Atividades Recentes</h3>
         <Clock size={14} className="text-gray-400" />
      </div>
      <div className="p-0">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-xs italic animate-pulse">
             Carregando logs da campanha...
          </div>
        ) : activities.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-blue-50/30 transition-colors flex gap-4">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} />
                <div>
                  <p className="text-xs font-bold text-gray-800">{activity.title}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{activity.description}</p>
                  <p className="text-[9px] text-gray-400 mt-2 font-medium">
                    {new Date(activity.created_at).toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center gap-2">
             <AlertCircle size={20} className="text-gray-300" />
             <p className="text-gray-400 text-xs italic">Nenhuma atividade registrada nas últimas 24 horas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
