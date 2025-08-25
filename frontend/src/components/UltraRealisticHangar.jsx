import React, { useEffect, useState, useRef } from 'react';
import { Building2, Zap, Wrench, Settings } from 'lucide-react';

export const UltraRealisticHangar = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const containerRef = useRef(null);

  // Intersection Observer для запуска анимации только при видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setAnimationStage(0);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Управление циклами анимации
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setAnimationStage(prev => {
        if (prev === 3) {
          // На последнем этапе ждём, затем начинаем fade out
          setTimeout(() => {
            setAnimationCycle(cycle => cycle + 1);
            return 0;
          }, 1500);
          return 3;
        }
        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isVisible, animationCycle]);

  const stages = [
    { icon: Settings, text: "Проектирование", color: "from-blue-500 to-blue-600" },
    { icon: Wrench, text: "Изготовление МК", color: "from-orange-500 to-orange-600" },
    { icon: Zap, text: "Монтаж каркаса", color: "from-green-500 to-green-600" },
    { icon: Building2, text: "Готовый ангар!", color: "from-yellow-500 to-yellow-600" }
  ];

  const CurrentIcon = stages[animationStage].icon;
  const currentStage = stages[animationStage];
  
  // Fade out эффект для зацикливания
  const shouldFadeOut = animationStage === 3 && animationCycle > 0;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden transition-opacity duration-1000 ${shouldFadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Реалистичное звёздное небо */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Реалистичная земля с текстурой */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-800 via-gray-700 to-transparent opacity-80">
        <div className="absolute bottom-0 w-full h-8 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 opacity-60"></div>
      </div>

      {/* СВЕРХРЕАЛИСТИЧНЫЙ АНГАР */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* УСИЛЕННЫЙ БЕТОННЫЙ ФУНДАМЕНТ */}
          <div 
            className={`absolute bottom-0 w-[420px] h-12 rounded-sm shadow-2xl transition-all duration-1000 ${isVisible && animationStage >= 0 ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.3s',
              background: `
                linear-gradient(90deg, 
                  #4b5563 0%, 
                  #6b7280 15%, 
                  #9ca3af 30%, 
                  #6b7280 45%, 
                  #4b5563 60%, 
                  #6b7280 75%, 
                  #9ca3af 90%, 
                  #6b7280 100%
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  rgba(156, 163, 175, 0.3) 1px,
                  rgba(156, 163, 175, 0.3) 2px,
                  transparent 3px,
                  transparent 8px
                )
              `,
              boxShadow: `
                0 15px 35px rgba(0,0,0,0.6),
                inset 0 2px 4px rgba(255,255,255,0.1),
                inset 0 -2px 6px rgba(0,0,0,0.2)
              `,
              transform: 'rotateX(75deg) translateZ(-20px)'
            }}
          >
            {/* Арматура в бетоне */}
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="absolute top-1 w-px h-8 bg-gray-400 opacity-50"
                style={{ left: `${(i + 1) * 8}%` }}
              />
            ))}
            {/* Швы расширения */}
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 w-1 h-full bg-gray-800 opacity-40"
                style={{ left: `${(i + 1) * 25}%` }}
              />
            ))}
          </div>

          {/* ЛЕВАЯ СТЕНА - РЕАЛИСТИЧНЫЕ МЕТАЛЛИЧЕСКИЕ ПАНЕЛИ */}
          <div 
            className={`absolute bottom-12 left-8 w-4 h-40 transition-all duration-1200 ${isVisible && animationStage >= 1 ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '0.8s',
              background: `
                linear-gradient(135deg, 
                  #fbbf24 0%, 
                  #f59e0b 20%, 
                  #d97706 40%, 
                  #b45309 60%, 
                  #f59e0b 80%, 
                  #fbbf24 100%
                )
              `,
              transform: 'skewY(-6deg) rotateY(-15deg)',
              boxShadow: `
                4px 0 12px rgba(0,0,0,0.4),
                inset 2px 0 4px rgba(255,255,255,0.2),
                inset -1px 0 3px rgba(0,0,0,0.3)
              `
            }}
          >
            {/* Вертикальные металлические рёбра */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute left-0 w-full h-px bg-yellow-300 opacity-50 shadow-sm"
                style={{ top: `${i * 12}%` }}
              />
            ))}
            {/* Болты крепления */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full shadow-inner"
                style={{ 
                  right: '2px', 
                  top: `${10 + i * 15}%`,
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
                }}
              />
            ))}
          </div>

          {/* ПРАВАЯ СТЕНА - ЗЕРКАЛЬНАЯ ЛЕВОЙ */}
          <div 
            className={`absolute bottom-12 right-8 w-4 h-40 transition-all duration-1200 ${isVisible && animationStage >= 1 ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '1s',
              background: `
                linear-gradient(135deg, 
                  #fbbf24 0%, 
                  #f59e0b 20%, 
                  #d97706 40%, 
                  #b45309 60%, 
                  #f59e0b 80%, 
                  #fbbf24 100%
                )
              `,
              transform: 'skewY(6deg) rotateY(15deg)',
              boxShadow: `
                -4px 0 12px rgba(0,0,0,0.4),
                inset -2px 0 4px rgba(255,255,255,0.2),
                inset 1px 0 3px rgba(0,0,0,0.3)
              `
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute left-0 w-full h-px bg-yellow-300 opacity-50 shadow-sm"
                style={{ top: `${i * 12}%` }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-gray-400 rounded-full shadow-inner"
                style={{ 
                  left: '2px', 
                  top: `${10 + i * 15}%`,
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
                }}
              />
            ))}
          </div>

          {/* ГЛАВНАЯ АРОЧНАЯ КОНСТРУКЦИЯ - МАКСИМАЛЬНЫЙ РЕАЛИЗМ */}
          <div 
            className={`relative w-[420px] h-40 transition-all duration-1500 ${isVisible && animationStage >= 2 ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ 
              animationDelay: '1.3s',
              background: `
                radial-gradient(ellipse at center top,
                  rgba(249, 250, 251, 0.95) 0%,
                  rgba(243, 244, 246, 0.9) 20%,
                  rgba(229, 231, 235, 0.85) 40%,
                  rgba(209, 213, 219, 0.8) 60%,
                  rgba(156, 163, 175, 0.85) 80%,
                  rgba(107, 114, 128, 0.9) 100%
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(250, 181, 21, 0.15) 2px,
                  rgba(250, 181, 21, 0.15) 4px,
                  transparent 6px,
                  transparent 20px
                )
              `,
              borderRadius: '210px 210px 0 0',
              border: '4px solid #f59e0b',
              boxShadow: `
                0 25px 50px rgba(0,0,0,0.5),
                inset 0 4px 8px rgba(255,255,255,0.2),
                inset 0 -4px 12px rgba(0,0,0,0.15),
                0 0 40px rgba(250, 181, 21, 0.2)
              `,
              transform: 'rotateX(5deg)'
            }}
          >
            
            {/* МЕТАЛЛИЧЕСКИЕ РЁБРА ЖЁСТКОСТИ - СУПЕРРЕАЛИСТИЧНО */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-0 w-1 h-full transition-all duration-300 ${isVisible && animationStage >= 2 ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  left: `${6 * (i + 1)}%`,
                  animationDelay: `${1.5 + i * 0.05}s`,
                  background: `
                    linear-gradient(180deg, 
                      #fbbf24 0%, 
                      #f59e0b 25%, 
                      #d97706 50%, 
                      #b45309 75%, 
                      #d97706 100%
                    )
                  `,
                  borderRadius: '1px',
                  boxShadow: `
                    2px 0 4px rgba(0,0,0,0.3),
                    inset 0 0 2px rgba(255,255,255,0.3),
                    inset 0 0 1px rgba(0,0,0,0.2)
                  `,
                  transform: 'rotateZ(0deg) translateZ(2px)'
                }}
              >
                {/* Болты на рёбрах */}
                {[...Array(3)].map((_, j) => (
                  <div 
                    key={j}
                    className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-80"
                    style={{ 
                      left: '-1px', 
                      top: `${25 + j * 25}%`,
                      boxShadow: 'inset 0 0 1px rgba(0,0,0,0.8)'
                    }}
                  />
                ))}
              </div>
            ))}

            {/* ПРОМЫШЛЕННЫЕ ВОРОТА - ДЕТАЛИЗИРОВАННЫЕ */}
            <div 
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-28 transition-all duration-800 ${isVisible && animationStage >= 3 ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                animationDelay: '2.8s',
                background: `
                  linear-gradient(180deg, 
                    #374151 0%, 
                    #1f2937 30%, 
                    #111827 60%, 
                    #0f172a 100%
                  )
                `,
                borderRadius: '6px 6px 0 0',
                border: '2px solid #4b5563',
                boxShadow: `
                  inset 0 4px 8px rgba(0,0,0,0.4),
                  0 0 15px rgba(0,0,0,0.6),
                  inset 0 0 2px rgba(255,255,255,0.1)
                `
              }}
            >
              {/* Панели ворот */}
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-full h-px bg-gray-600 opacity-70"
                  style={{ top: `${(i + 1) * 18}%` }}
                />
              ))}
              {/* Ручка и замок */}
              <div className="absolute top-14 right-3 w-3 h-4 bg-yellow-500 rounded-sm shadow-lg"
                   style={{ 
                     boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)'
                   }}></div>
              <div className="absolute top-16 right-4 w-1 h-1 bg-gray-200 rounded-full shadow-inner"></div>
              
              {/* Направляющие ворот */}
              <div className="absolute -left-1 top-0 w-1 h-full bg-gray-500 shadow-lg"></div>
              <div className="absolute -right-1 top-0 w-1 h-full bg-gray-500 shadow-lg"></div>
            </div>

            {/* РЕАЛИСТИЧНЫЕ ОКНА С ОТРАЖЕНИЯМИ */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-500 ${isVisible && animationStage >= 3 ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  width: '10px',
                  height: '8px',
                  top: '30px',
                  left: `${20 + i * 25}px`,
                  animationDelay: `${3 + i * 0.06}s`,
                  background: `
                    linear-gradient(135deg, 
                      rgba(96, 165, 250, 0.9) 0%,
                      rgba(59, 130, 246, 1) 30%,
                      rgba(37, 99, 235, 1) 70%,
                      rgba(29, 78, 216, 1) 100%
                    )
                  `,
                  borderRadius: '2px',
                  border: '1px solid #1e40af',
                  boxShadow: `
                    inset 0 2px 4px rgba(255,255,255,0.4),
                    0 2px 6px rgba(0,0,0,0.3),
                    inset 0 0 2px rgba(255,255,255,0.2)
                  `
                }}
              >
                {/* Отражение в окне */}
                <div className="absolute top-0 left-0 w-4 h-3 bg-white opacity-30 rounded-tl-sm transform rotate-12"></div>
                {/* Рама окна */}
                <div className="absolute inset-0 border border-blue-800 rounded-sm"></div>
              </div>
            ))}

            {/* МЕТАЛЛИЧЕСКИЕ СОЕДИНИТЕЛЬНЫЕ УЗЛЫ */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 bg-gray-400 rounded-full transition-all duration-400 ${isVisible && animationStage >= 3 ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  bottom: '15px',
                  left: `${25 + i * 50}px`,
                  animationDelay: `${3.3 + i * 0.08}s`,
                  background: `
                    radial-gradient(circle at 30% 30%,
                      #d1d5db 0%,
                      #9ca3af 50%,
                      #6b7280 100%
                    )
                  `,
                  boxShadow: `
                    inset 0 2px 3px rgba(0,0,0,0.4),
                    0 2px 4px rgba(0,0,0,0.2),
                    inset 0 0 1px rgba(255,255,255,0.4)
                  `
                }}
              >
                {/* Центральный болт */}
                <div className="absolute inset-1 bg-gray-600 rounded-full"
                     style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }}></div>
              </div>
            ))}

            {/* СИСТЕМА ВЕНТИЛЯЦИИ */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gray-500 rounded-full transition-all duration-300 ${isVisible && animationStage >= 3 ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{
                  top: '20px',
                  left: `${60 + i * 40}px`,
                  animationDelay: `${3.6 + i * 0.1}s`,
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)'
                }}
              />
            ))}
          </div>

          {/* СТРОИТЕЛЬНЫЙ КРАН - СУПЕРДЕТАЛИЗИРОВАННЫЙ */}
          <div className={`absolute -top-24 left-1/3 transform -translate-x-1/2 transition-all duration-1000 ${isVisible && animationStage >= 1 ? 'animate-fade-in-up' : 'opacity-0'}`}
               style={{ animationDelay: '2s' }}>
            {/* Мачта крана */}
            <div className="w-2 h-24 relative shadow-xl"
                 style={{ 
                   background: `
                     linear-gradient(90deg, 
                       #d97706 0%, 
                       #f59e0b 30%, 
                       #fbbf24 50%, 
                       #f59e0b 70%, 
                       #d97706 100%
                     )
                   `,
                   boxShadow: '2px 0 6px rgba(0,0,0,0.4), inset 0 0 2px rgba(255,255,255,0.2)'
                 }}>
              {/* Стрела крана */}
              <div className="absolute top-4 -left-12 w-24 h-1 shadow-lg"
                   style={{ 
                     background: 'linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%)',
                     boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                   }}></div>
              {/* Противовес */}
              <div className="absolute top-4 -right-4 w-3 h-2 bg-gray-700 shadow-lg"></div>
              {/* Трос */}
              <div className="absolute top-4 right-10 w-px h-6 bg-gray-400"></div>
              {/* Крюк */}
              <div className="absolute top-10 right-10 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"
                   style={{ boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }}></div>
              {/* Кабина крана */}
              <div className="absolute top-2 left-2 w-3 h-2 bg-blue-600 rounded-sm shadow-md"></div>
            </div>
          </div>

          {/* СТРОИТЕЛЬНАЯ ТЕХНИКА - ДЕТАЛИЗИРОВАННАЯ */}
          <div className={`absolute -bottom-6 -right-24 transition-all duration-1000 ${isVisible && animationStage >= 2 ? 'animate-fade-in-up' : 'opacity-0'}`}
               style={{ animationDelay: '3.2s' }}>
            <div className="w-20 h-10 relative"
                 style={{ 
                   background: `
                     linear-gradient(135deg, 
                       #fbbf24 0%, 
                       #f59e0b 30%, 
                       #d97706 70%, 
                       #b45309 100%
                     )
                   `,
                   borderRadius: '4px',
                   boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)'
                 }}>
              {/* Кабина экскаватора */}
              <div className="absolute -top-3 left-3 w-8 h-4 bg-gray-800 rounded-t-md shadow-lg"
                   style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)' }}>
                <div className="absolute top-1 left-1 w-2 h-1 bg-blue-400 opacity-80"></div>
              </div>
              {/* Стрела экскаватора */}
              <div className="absolute -top-1 left-8 w-8 h-1 bg-gray-600 shadow-md transform rotate-12"></div>
              <div className="absolute top-2 left-14 w-6 h-1 bg-gray-600 shadow-md transform rotate-45"></div>
              {/* Ковш */}
              <div className="absolute top-5 left-18 w-3 h-2 bg-gray-700 rounded-sm shadow-lg"></div>
              
              {/* Гусеницы */}
              <div className="absolute -bottom-1 left-3 w-6 h-2 bg-gray-900 rounded-sm"
                   style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)' }}>
                <div className="absolute inset-0 flex justify-between items-center px-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-1 right-3 w-6 h-2 bg-gray-900 rounded-sm"
                   style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)' }}>
                <div className="absolute inset-0 flex justify-between items-center px-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* УЛУЧШЕННЫЙ ИНДИКАТОР ЭТАПОВ */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="glass-dark px-8 py-4 rounded-full shadow-2xl border border-white/30 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentStage.color} flex items-center justify-center animate-pulse shadow-xl`}
                 style={{ boxShadow: `0 0 20px rgba(250, 181, 21, 0.4)` }}>
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <span className="font-bold text-base">{currentStage.text}</span>
              <div className="text-xs text-gray-300 mt-1">
                Этап {animationStage + 1} из 4
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* РАСШИРЕННЫЙ ПРОГРЕСС-БАР */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-80">
        <div className="w-full bg-black/40 rounded-full h-3 backdrop-blur-sm shadow-inner border border-white/20">
          <div 
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-700 shadow-lg animate-glow relative overflow-hidden"
            style={{ width: `${((animationStage + 1) / 4) * 100}%` }}
          >
            {/* Анимированный блик */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        {/* Метки этапов */}
        <div className="flex justify-between mt-2 px-1">
          {stages.map((stage, index) => (
            <div key={index} className={`text-xs transition-colors duration-300 ${
              index <= animationStage ? 'text-yellow-400' : 'text-gray-500'
            }`}>
              {stage.text}
            </div>
          ))}
        </div>
      </div>

      {/* УЛУЧШЕННЫЕ ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ */}
      <div className="absolute top-6 right-6 animate-float">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-2xl flex items-center justify-center glass border border-white/20">
          <Building2 className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="absolute top-20 left-6 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl glass border border-white/20"></div>
      </div>

      <div className="absolute top-12 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl glass border border-white/20"></div>
      </div>

      {/* АТМОСФЕРНЫЕ ЭФФЕКТЫ */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/15 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};