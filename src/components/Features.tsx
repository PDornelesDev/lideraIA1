import { Brain, Users, BarChart3, MessageSquare, Calendar, Shield } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'IA Avançada',
    description: 'Análise preditiva e insights estratégicos para suas decisões políticas com tecnologia de ponta.'
  },
  {
    icon: Users,
    title: 'Gestão de Equipe',
    description: 'Organize sua equipe, delegue tarefas e acompanhe o progresso em tempo real.'
  },
  {
    icon: BarChart3,
    title: 'Análise de Dados',
    description: 'Dashboards intuitivos com métricas detalhadas sobre suas campanhas e ações.'
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Integrada',
    description: 'Gerencie todas as suas comunicações e interações em um único lugar.'
  },
  {
    icon: Calendar,
    title: 'Agenda Inteligente',
    description: 'Planejamento automático de eventos e otimização de cronogramas.'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Proteção de dados com criptografia de ponta a ponta e conformidade legal.'
  }
];

export default function Features() {
  return (
    <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Recursos Poderosos para
            <span className="text-blue-600"> Resultados Extraordinários</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar sua atuação política de forma eficiente e profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 bg-white group"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <feature.icon className="text-blue-600 group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
