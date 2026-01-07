import React from 'react';
import {
  LayoutDashboard,
  Zap,
  TrendingUp,
  Map,
  Calendar,
  Users,
  FolderOpen,
  MessageSquare,
  BarChart3,
  DollarSign,
  Search,
  Settings,
  X,
} from 'lucide-react';

interface SidebarMenuProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function SidebarMenu({ sidebarOpen, setSidebarOpen }: SidebarMenuProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Zap, label: 'Ações' },
    { icon: TrendingUp, label: 'Melhorias' },
    { icon: Map, label: 'Mapa' },
    { icon: Calendar, label: 'Agenda' },
    { icon: Users, label: 'Pessoas' },
    { icon: FolderOpen, label: 'Projetos' },
    { icon: MessageSquare, label: 'Gabinete Modelo' },
    { icon: BarChart3, label: 'Gestão' },
    { icon: FolderOpen, label: 'Documentos' },
    { icon: MessageSquare, label: 'Mensagens' },
    { icon: BarChart3, label: 'Redes Inteligentes' },
    { icon: Search, label: 'Gráficos' },
    { icon: DollarSign, label: 'Financeiro' },
    { icon: Search, label: 'Pesquisa Eleit.' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-blue-600">Política+</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href="#"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
