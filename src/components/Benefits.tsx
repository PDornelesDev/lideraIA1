import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Aumente sua Eficiência',
    description: 'Automatize tarefas repetitivas e foque no que realmente importa: conectar-se com as pessoas.',
    stat: '+300%',
    statLabel: 'Produtividade'
  },
  {
    icon: Clock,
    title: 'Economize Tempo',
    description: 'Reduza horas de trabalho manual com automações inteligentes e processos otimizados.',
    stat: '15h',
    statLabel: 'Economizadas/Semana'
  },
  {
    icon: Target,
    title: 'Decisões Precisas',
    description: 'Tome decisões baseadas em dados concretos e análises preditivas avançadas.',
    stat: '95%',
    statLabel: 'Precisão'
  },
  {
    icon: Zap,
    title: 'Resultados Rápidos',
    description: 'Veja melhorias significativas nas suas métricas em poucas semanas de uso.',
    stat: '2 semanas',
    statLabel: 'Para Resultados'
  }
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Por que escolher o LideraAI?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Vantagens comprovadas que fazem a diferença no dia a dia da gestão política.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <benefit.icon size={24} />
              </div>
              <div className="text-3xl font-bold mb-1">{benefit.stat}</div>
              <div className="text-blue-100 text-sm mb-4">{benefit.statLabel}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
