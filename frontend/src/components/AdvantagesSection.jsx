import React from 'react';
import { Clock, Shield, Settings, Building2 } from 'lucide-react';
import { advantages } from '../data/mock';

const iconMap = {
  Clock: Clock,
  Shield: Shield,
  Settings: Settings,
  Building2: Building2
};

export const AdvantagesSection = () => {
  return (
    <section id="advantages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы предлагаем комплексный подход к строительству каркасных ангаров с гарантией качества и соблюдением сроков
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage) => {
            const IconComponent = iconMap[advantage.icon];
            return (
              <div 
                key={advantage.id}
                className="group bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-yellow-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {advantage.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional value proposition */}
        <div className="mt-16 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Полный цикл строительства
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
              От проектирования и изготовления металлоконструкций до заливки фундамента и возведения готового объекта. 
              Берем на себя все этапы работ и гарантируем результат.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                'Проектирование',
                'Изготовление МК',
                'Заливка фундамента', 
                'Монтаж конструкций',
                'Сдача объекта'
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};