import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Ruler } from 'lucide-react';
import { projects } from '../data/mock';

export const ProjectsSection = () => {
  const scrollToContacts = () => {
    const element = document.getElementById('contacts');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Наши проекты
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Примеры успешно реализованных проектов строительства каркасных ангаров различного назначения
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-yellow-600 text-white">
                    {project.type}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {project.title}
                </CardTitle>
                <p className="text-gray-600">
                  {project.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Ruler className="w-4 h-4" />
                    <span>Площадь: {project.area}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Срок строительства: {project.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process timeline */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Как мы работаем
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Отработанный процесс строительства позволяет нам гарантировать качество и соблюдение сроков
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Консультация',
                description: 'Обсуждаем ваши требования и выезжаем на объект для замеров'
              },
              {
                step: '2', 
                title: 'Проектирование',
                description: 'Разрабатываем проект с учетом всех технических требований'
              },
              {
                step: '3',
                title: 'Производство',
                description: 'Изготавливаем металлоконструкции на собственном производстве'
              },
              {
                step: '4',
                title: 'Строительство',
                description: 'Возводим объект под ключ с соблюдением всех технологий'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={scrollToContacts}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4"
            >
              Начать проект
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};