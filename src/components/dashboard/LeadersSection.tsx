import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, ChevronRight } from 'lucide-react';

interface LeadersSectionProps {
  campaign: any;
}

export function LeadersSection({ campaign }: LeadersSectionProps) {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data } = await supabase
        .from('leaders')
        .select('*')
        .eq('campaign_id', campaign.id)
        .order('votes_influenced', { ascending: false })
        .limit(5);

      setLeaders(data || []);
    };

    fetchLeaders();
  }, [campaign.id]);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Users size={20} />
          Top 5 Líderes
        </h3>
        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Ver Todos <ChevronRight size={16} />
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {leaders.length > 0 ? (
          leaders.map((leader) => (
            <div key={leader.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{leader.name}</p>
                  <p className="text-sm text-gray-600">{leader.role} - {leader.zone}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{leader.votes_influenced}</p>
                  <p className="text-xs text-gray-500">votos</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">Nenhum líder cadastrado</div>
        )}
      </div>
    </div>
  );
}
