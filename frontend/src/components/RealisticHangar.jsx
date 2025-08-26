import React, { useEffect, useRef, useState } from 'react';
import { Building2, Zap, Wrench, Settings } from 'lucide-react';

export const RealisticHangar = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const stages = [
    { icon: Settings, text: "Проектирование", desc: "Создание проекта" },
    { icon: Wrench, text: "Фундамент", desc: "Заливка основания" },
    { icon: Zap, text: "Каркас", desc: "Монтаж конструкции" },
    { icon: Building2, text: "Готово", desc: "Завершенный ангар" }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setStage(0);
          setAnimationKey(prev => prev + 1);
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animation stages
  useEffect(() => {
    if (!isVisible) return;

    const stageTimings = [0, 1200, 2400, 3600]; 
    const totalDuration = 7000;
    
    stageTimings.forEach((timing, index) => {
      setTimeout(() => {
        setStage(index);
      }, timing);
    });

    // Restart cycle
    const cycleTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
        setAnimationKey(prev => prev + 1);
      }, 1000);
    }, totalDuration);

    return () => clearTimeout(cycleTimeout);
  }, [isVisible, animationKey]);

  const CurrentIcon = stages[stage].icon;

  return (
    <div 
      ref={containerRef}
      key={animationKey}
      className="relative w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden"
    >
      {/* Звёзды */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${1 + Math.random()}px`,
              height: `${1 + Math.random()}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: 0.4 + Math.random() * 0.6,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Земля */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-800 to-transparent opacity-60"></div>

      {/* ОСНОВНОЙ АНГАР */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          
          {/* ФУНДАМЕНТ - Stage 1 */}
          <div 
            className={`absolute bottom-0 w-80 h-6 transition-all duration-1000 ease-out ${
              isVisible && stage >= 1 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'
            }`}
            style={{ 
              background: 'linear-gradient(90deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)',
              borderRadius: '2px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              left: '50%',
              marginLeft: '-160px'
            }}
          >
            {/* Текстура бетона */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute w-px h-full bg-gray-500 opacity-30" style={{ left: `${i * 12.5}%` }} />
            ))}
          </div>

          {/* ЛЕВАЯ СТЕНА - Stage 2 */}
          <div 
            className={`absolute bottom-6 left-6 w-2 h-24 transition-all duration-800 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            }`}
            style={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
              transformOrigin: 'bottom',
              boxShadow: '2px 0 6px rgba(0,0,0,0.3)'
            }}
          >
            {/* Металлические панели */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300 opacity-40" style={{ top: `${(i + 1) * 20}%` }} />
            ))}
          </div>

          {/* ПРАВАЯ СТЕНА - Stage 2 */}
          <div 
            className={`absolute bottom-6 right-6 w-2 h-24 transition-all duration-800 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            }`}
            style={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
              transformOrigin: 'bottom',
              boxShadow: '-2px 0 6px rgba(0,0,0,0.3)'
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300 opacity-40" style={{ top: `${(i + 1) * 20}%` }} />
            ))}
          </div>

          {/* ГЛАВНАЯ АРОЧНАЯ КРЫША - Stage 2 */}
          <div 
            className={`relative w-80 h-24 transition-all duration-1000 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ 
              background: `
                radial-gradient(ellipse at center top,
                  rgba(248, 250, 252, 0.95) 0%,
                  rgba(226, 232, 240, 0.9) 50%,
                  rgba(148, 163, 184, 0.95) 100%
                )
              `,
              borderRadius: '160px 160px 0 0',
              border: '3px solid #f59e0b',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
              left: '50%',
              marginLeft: '-160px',
              bottom: '30px'
            }}
          >
            
            {/* РЁБРА ЖЁСТКОСТИ СТРОГО ВНУТРИ АРКИ - Stage 3 */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-2 w-0.5 transition-all duration-400 ease-out ${
                  isVisible && stage >= 3 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
                style={{
                  left: `${20 + i * 7.5}%`,
                  height: 'calc(100% - 16px)', // Рёбра НЕ доходят до краёв
                  background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                  transformOrigin: 'top',
                  transitionDelay: `${0.3 + Math.abs(4 - i) * 0.08}s`
                }}
              />
            ))}

            {/* ДВЕРЬ НОРМАЛЬНОГО РАЗМЕРА - Stage 3 */}
            <div 
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-18 transition-all duration-600 ease-out ${
                isVisible && stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ 
                background: 'linear-gradient(180deg, #475569 0%, #334155 50%, #1e293b 100%)',
                borderRadius: '2px 2px 0 0',
                border: '1px solid #64748b',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                transitionDelay: '0.8s'
              }}
            >
              {/* Панели двери */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-slate-600 opacity-60" style={{ top: `${(i + 1) * 25}%` }} />
              ))}
              {/* Ручка */}
              <div className="absolute top-8 right-1 w-1 h-2 bg-yellow-500 rounded-sm"></div>
            </div>

            {/* ОКНА НА АРКЕ - Stage 3 */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-300 ease-out ${
                  isVisible && stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{
                  width: '3px',
                  height: '2px',
                  top: '12px',
                  left: `${30 + i * 20}px`, // Только 3 окна по центру
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 1) 100%)',
                  borderRadius: '1px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  transitionDelay: `${1 + i * 0.15}s`
                }}
              />
            ))}
          </div>

          {/* ПРОСТОЙ КРАН - Stage 2 */}
          <div 
            className={`absolute -top-12 left-1/4 transition-all duration-800 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1.2s' }}
          >
            <div className="w-0.5 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 relative">
              <div className="absolute top-2 -left-6 w-12 h-0.5 bg-yellow-500"></div>
              <div className="absolute top-2 right-4 w-0.5 h-3 bg-gray-400"></div>
              <div className="absolute top-5 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* ПРОСТАЯ ТЕХНИКА - Stage 2 */}
          <div 
            className={`absolute -bottom-2 -right-12 transition-all duration-800 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
            style={{ transitionDelay: '1.5s' }}
          >
            <div className="w-10 h-5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm relative">
              <div className="absolute -top-1 left-1 w-3 h-2 bg-gray-700 rounded-t-sm"></div>
              <div className="absolute -bottom-0.5 left-1 w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="absolute -bottom-0.5 right-1 w-2 h-2 bg-gray-900 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ИНДИКАТОР ЭТАПОВ */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <CurrentIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">{stages[stage].text}</div>
              <div className="text-xs text-gray-300">{stages[stage].desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ПРОГРЕСС-БАР */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-60">
        <div className="w-full bg-black/30 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((stage + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ */}
      <div className="absolute top-6 right-6 animate-float">
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center">
          <Building2 className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="absolute top-16 left-6 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};