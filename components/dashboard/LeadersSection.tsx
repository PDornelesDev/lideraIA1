
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, TrendingUp } from 'lucide-react';

export function LeadersSection({ campaign }: any) {
  const [topLeaders, setTopLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLeaders = async () => {
      if (!campaign?.id) return;
      
      const { data } = await supabase
        .from('leaders')
        .select('*')
        .eq('campaign_id', campaign.id)
        .order('votes_influenced', { ascending: false })
        .limit(5);

      setTopLeaders(data || []);
      setLoading(false);
    };

    fetchTopLeaders();
  }, [campaign]);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <h3 className="text-sm font-bold text-gray-800 mb-6 border-b pb-3 flex items-center justify-between">
        Top 5 Líderes
        {topLeaders.length > 0 && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Destaques</span>}
      </h3>
      
      <div className="flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-100 h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                <div className="h-2 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ) : topLeaders.length > 0 ? (
          <div className="space-y-4">
            {topLeaders.map((leader, idx) => (
              <div key={leader.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{leader.name}</p>
                    <p className="text-[10px] text-gray-500">{leader.zone || 'Sem Zona'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-gray-900">{leader.votes_influenced || 0}</p>
                  <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Apoiadores</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 h-full opacity-60">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
               <Users size={24} />
            </div>
            <p className="text-[11px] text-gray-400 italic">Nenhum líder encontrado para esta campanha</p>
          </div>
        )}
      </div>
    </div>
  );
}
