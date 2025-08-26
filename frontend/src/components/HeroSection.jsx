import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Building2, Clock, Shield } from 'lucide-react';
import { companyInfo, stats } from '../data/mock';
import { ProfessionalHangar } from './ProfessionalHangar';

export const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                <Building2 className="w-4 h-4" />
                <span>Строительство под ключ</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Каркасные ангары
                <span className="text-yellow-600 block">любой сложности</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                {companyInfo.description}
              </p>
            </div>

            {/* Key benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Быстро</p>
                  <p className="text-sm text-gray-600">От 30 дней</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Надежно</p>
                  <p className="text-sm text-gray-600">5 лет гарантии</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Качественно</p>
                  <p className="text-sm text-gray-600">15+ лет опыта</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => scrollToSection('contacts')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-8 py-4 group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Получить расчет стоимости
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('projects')}
                className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Посмотреть проекты
              </Button>
            </div>
          </div>

          {/* 3D Animation */}
          <div className="lg:ml-8">
            <div className="mb-8 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="h-80">
                <AnimeHangar />
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust indicators */}
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-2">Работаем по всему Краснодарскому краю</h3>
                <p className="text-gray-600 text-sm">Выезд специалиста для замеров - бесплатно</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};