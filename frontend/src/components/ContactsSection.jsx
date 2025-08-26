import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { submitContactForm } from '../services/api';

// Static company info (will be replaced with API call later if needed)
const companyInfo = {
  name: "ООО «Ангастр»",
  address: "352240 г. Краснодар, ул. Восточно-кругликовская, 60",
  workingHours: "Пн-Пт: 8:00 - 18:00",
  phone: "+7 (918) 633-32-21",
  fax: "8(861) 953-40-77",
  email: "angastr@inbox.ru"
};

export const ContactsSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    buildingType: '',
    area: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Basic validation
    if (!formData.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ваше имя",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.phone.trim()) {
      toast({
        title: "Ошибка", 
        description: "Пожалуйста, введите номер телефона",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        toast({
          title: "Заявка отправлена!",
          description: result.data.message || "Мы свяжемся с вами в ближайшее время.",
        });
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          buildingType: '',
          area: '',
          message: ''
        });
      } else {
        toast({
          title: "Ошибка отправки",
          description: result.error || "Произошла ошибка при отправке формы. Попробуйте позже.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Ошибка отправки",
        description: "Произошла ошибка при отправке формы. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Получить расчет стоимости
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Оставьте заявку, и наш специалист рассчитает стоимость строительства ангара под ваши требования
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Форма расчета стоимости
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Ваше имя *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Введите ваше имя"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.ru"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="buildingType">Тип здания</Label>
                      <Select value={formData.buildingType} onValueChange={(value) => handleInputChange('buildingType', value)} disabled={isSubmitting}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warehouse">Складское здание</SelectItem>
                          <SelectItem value="production">Производственный цех</SelectItem>
                          <SelectItem value="sports">Спортивное сооружение</SelectItem>
                          <SelectItem value="agricultural">Сельскохозяйственное здание</SelectItem>
                          <SelectItem value="commercial">Торговое здание</SelectItem>
                          <SelectItem value="aviation">Авиационный ангар</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="area">Площадь (м²)</Label>
                      <Input
                        id="area"
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        placeholder="Например: 1000"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Дополнительные требования</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Опишите ваши требования к проекту..."
                      rows={4}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white group disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Получить расчет стоимости
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Контактная информация
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Телефон</p>
                    <p className="text-gray-600">{companyInfo.phone}</p>
                    <p className="text-sm text-gray-500">Звонки принимаем круглосуточно</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">{companyInfo.email}</p>
                    <p className="text-sm text-gray-500">Ответим в течение часа</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Адрес</p>
                    <p className="text-gray-600">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Время работы</p>
                    <p className="text-gray-600">{companyInfo.workingHours}</p>
                    <p className="text-sm text-gray-500">Суббота и воскресенье - выходные</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick facts */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Быстрые факты</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Выезд на замеры:</span>
                    <span className="font-semibold text-gray-900">Бесплатно</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Расчет стоимости:</span>
                    <span className="font-semibold text-gray-900">30 минут</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Срок строительства:</span>
                    <span className="font-semibold text-gray-900">От 30 дней</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Гарантия:</span>
                    <span className="font-semibold text-gray-900">До 5 лет</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};