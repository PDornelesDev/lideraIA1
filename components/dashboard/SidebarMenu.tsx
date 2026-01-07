
import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  Map,
  Calendar,
  FileText,
  Search,
  Eye,
  UserPlus,
  Megaphone,
  ClipboardCheck,
  Bell,
  Building2,
  Users,
  UserCircle,
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
    { icon: BarChart3, label: 'Relatórios' },
    { icon: MessageCircle, label: 'WhatsApp' },
    { icon: Map, label: 'Mapa' },
    { icon: Calendar, label: 'Agenda' },
    { icon: FileText, label: 'Conteúdos' },
    { icon: Search, label: 'Pesquisas' },
    { icon: Eye, label: 'Assessor Detetive' },
    { icon: UserPlus, label: 'Convites' },
    { icon: Megaphone, label: 'Comunicados' },
    { icon: ClipboardCheck, label: 'Demandas' },
    { icon: Bell, label: 'Enviar Notificação' },
    { icon: Building2, label: 'Gabinete' },
    { icon: Users, label: 'Gestão de Pessoas' },
    { icon: UserCircle, label: 'Área do Líder' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-[220px] bg-white border-r border-gray-100 transition-transform duration-300 z-50 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold">L</div>
             <h2 className="text-base font-black text-gray-800 tracking-tighter">LideraAI</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-400">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 custom-scrollbar">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = item.label === 'Dashboard';
            return (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-bold' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-50 text-[10px] text-gray-400 font-medium">
           v 1.2.4
        </div>
      </aside>
    </>
  );
}
