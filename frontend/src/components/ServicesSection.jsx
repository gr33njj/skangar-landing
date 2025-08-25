import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Factory, Store, Dumbbell, Wheat, Plane } from 'lucide-react';
import { services } from '../data/mock';

const categoryIcons = {
  'Промышленные объекты': Factory,
  'Коммерческие объекты': Store,
  'Спортивные сооружения': Dumbbell,
  'Сельскохозяйственные объекты': Wheat,
  'Специализированные ангары': Plane
};

const categoryColors = {
  'Промышленные объекты': 'from-blue-500 to-blue-600',
  'Коммерческие объекты': 'from-green-500 to-green-600',
  'Спортивные сооружения': 'from-purple-500 to-purple-600',
  'Сельскохозяйственные объекты': 'from-yellow-500 to-yellow-600',
  'Специализированные ангары': 'from-red-500 to-red-600'
};

export const ServicesSection = () => {
  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Строим каркасные ангары различного назначения от складских и производственных до спортивных и сельскохозяйственных объектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = categoryIcons[service.category];
            const gradientClass = categoryColors[service.category];
            
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.category}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {service.items.map((item, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="mr-2 mb-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Не нашли нужный тип ангара?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Мы работаем с индивидуальными проектами любой сложности. Расскажите о ваших требованиях, и мы найдем оптимальное решение.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={scrollToContacts}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4"
              >
                Получить консультацию
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={scrollToContacts}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4"
              >
                Заказать расчет
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};