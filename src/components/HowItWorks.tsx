import { UserPlus, Settings, Rocket, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crie sua Conta',
    description: 'Cadastre-se em minutos e configure seu perfil político personalizado.'
  },
  {
    icon: Settings,
    title: 'Configure seu Sistema',
    description: 'Personalize a plataforma de acordo com suas necessidades e objetivos.'
  },
  {
    icon: Rocket,
    title: 'Comece a Usar',
    description: 'Acesse todos os recursos e comece a otimizar sua gestão imediatamente.'
  },
  {
    icon: CheckCircle,
    title: 'Veja os Resultados',
    description: 'Acompanhe métricas em tempo real e alcance seus objetivos mais rápido.'
  }
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Como Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece a usar o LideraAI em 4 passos simples e transforme sua gestão política.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 font-bold text-xl">
                  {index + 1}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/3 -right-4 w-8 h-0.5 bg-blue-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
