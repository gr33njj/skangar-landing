import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '../data/mock';

export const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">А</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{companyInfo.name}</h3>
                <p className="text-gray-400 text-sm">Строительство ангаров</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Профессиональное строительство каркасных ангаров под ключ с гарантией качества и соблюдением сроков.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <nav className="space-y-2">
              {[
                { name: 'Главная', href: 'hero' },
                { name: 'Услуги', href: 'services' },
                { name: 'Преимущества', href: 'advantages' },
                { name: 'Проекты', href: 'projects' },
                { name: 'Контакты', href: 'contacts' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Наши услуги</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Промышленные здания</p>
              <p className="text-gray-300">Складские комплексы</p>
              <p className="text-gray-300">Спортивные сооружения</p>
              <p className="text-gray-300">Сельскохозяйственные объекты</p>
              <p className="text-gray-300">Торговые павильоны</p>
              <p className="text-gray-300">Авиационные ангары</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">{companyInfo.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">{companyInfo.email}</span>
              </div>
              
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{companyInfo.address}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-gray-300">{companyInfo.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 {companyInfo.name}. Все права защищены.
            </div>
            
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};