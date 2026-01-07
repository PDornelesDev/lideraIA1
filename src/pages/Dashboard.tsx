import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, Menu, X } from 'lucide-react';
import { CampaignCard } from '../components/dashboard/CampaignCard';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { LeadersSection } from '../components/dashboard/LeadersSection';
import { ActivitiesSection } from '../components/dashboard/ActivitiesSection';
import { SidebarMenu } from '../components/dashboard/SidebarMenu';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [campaign, setCampaign] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data) {
        setCampaign(data);
      }
      setLoading(false);
    };

    fetchCampaign();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {campaign ? (
            <div className="space-y-6">
              <CampaignCard campaign={campaign} />
              <MetricsOverview campaign={campaign} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LeadersSection campaign={campaign} />
                <ActivitiesSection campaign={campaign} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Nenhuma campanha criada ainda</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                Criar Nova Campanha
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
