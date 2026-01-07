import { ArrowRight, Check } from 'lucide-react';

const features = [
  'Teste grátis por 14 dias',
  'Sem necessidade de cartão de crédito',
  'Suporte completo incluído',
  'Cancele quando quiser'
];

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Pronto para Liderar com Inteligência?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Junte-se a milhares de líderes políticos que já transformaram sua gestão com o LideraAI.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Check size={18} className="text-green-400" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center gap-2 group">
            Começar Agora Gratuitamente
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold text-lg">
            Falar com Especialista
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          Mais de 10.000 usuários confiam no LideraAI para sua gestão política
        </p>
      </div>
    </section>
  );
}
