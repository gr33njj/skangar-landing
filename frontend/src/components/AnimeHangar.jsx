import React, { useEffect, useRef, useState } from 'react';
import { animate, createTimeline, stagger, eases } from 'animejs';
import { Building2, Zap, Wrench, Settings } from 'lucide-react';

export const AnimeHangar = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const animationRef = useRef(null);

  const stages = [
    { icon: Settings, text: "Проектирование", desc: "Создание чертежей" },
    { icon: Wrench, text: "Изготовление", desc: "Производство элементов" },
    { icon: Zap, text: "Монтаж", desc: "Сборка каркаса" },
    { icon: Building2, text: "Готово", desc: "Завершенный объект" }
  ];

  // Intersection Observer для запуска анимации
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startAnimation();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const startAnimation = () => {
    if (!containerRef.current) return;

    // Сброс всех элементов
    const elements = containerRef.current.querySelectorAll('.anime-element');
    animate({
      targets: elements,
      opacity: 0,
      translateY: 20,
      translateX: 0,
      scale: 0.8,
      rotate: 0
    });

    // Главная timeline анимации
    const tl = createTimeline({
      easing: 'easeOutExpo',
      duration: 800,
      complete: () => {
        // После завершения анимации, запускаем цикл
        setTimeout(() => {
          restartAnimation();
        }, 3000);
      }
    });

    // Этап 1: Фундамент
    tl.add({
      targets: '.foundation',
      opacity: [0, 1],
      translateY: [30, 0],
      scaleX: [0.3, 1],
      duration: 1000,
      easing: 'easeOutCubic',
      begin: () => setCurrentStage(0)
    });

    // Этап 2: Стены появляются одновременно
    tl.add({
      targets: '.wall',
      opacity: [0, 1],
      translateY: [40, 0],
      scaleY: [0, 1],
      duration: 1200,
      delay: stagger(200),
      easing: 'easeOutBack',
      begin: () => setCurrentStage(1)
    }, '-=200');

    // Этап 3: Основная арка
    tl.add({
      targets: '.main-arch',
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .8)',
      begin: () => setCurrentStage(2)
    }, '-=400');

    // Этап 4: Ребра жесткости появляются волной
    tl.add({
      targets: '.rib',
      opacity: [0, 1],
      scaleY: [0, 1],
      duration: 600,
      delay: stagger(80, {from: 'center'}),
      easing: 'easeOutQuart'
    }, '-=800');

    // Этап 5: Детали (окна, дверь)
    tl.add({
      targets: '.detail',
      opacity: [0, 1],
      scale: [0, 1],
      duration: 800,
      delay: stagger(150),
      easing: 'easeOutBack',
      begin: () => setCurrentStage(3)
    }, '-=200');

    // Этап 6: Строительная техника
    tl.add({
      targets: '.construction',
      opacity: [0, 1],
      translateX: [60, 0],
      rotate: [10, 0],
      duration: 1000,
      easing: 'easeOutCubic'
    }, '-=600');

    // Этап 7: Финальные эффекты
    tl.add({
      targets: '.floating',
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0, 1],
      duration: 1000,
      delay: stagger(200),
      easing: 'easeOutElastic(1, .6)'
    }, '-=400');

    animationRef.current = tl;
  };

  const restartAnimation = () => {
    // Fade out всех элементов
    anime({
      targets: '.anime-element',
      opacity: 0,
      scale: 0.9,
      duration: 1000,
      easing: 'easeInCubic',
      complete: () => {
        setCurrentStage(0);
        setTimeout(startAnimation, 500);
      }
    });
  };

  const CurrentIcon = stages[currentStage].icon;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden"
    >
      {/* Профессиональная сетка звёзд */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${0.5 + Math.random() * 1.5}px`,
              height: `${0.5 + Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: 0.2 + Math.random() * 0.6,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Главный контейнер ангара */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1500px' }}>
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* ФУНДАМЕНТ - идеально ровный */}
          <div 
            className="foundation anime-element absolute bottom-0 w-80 h-6"
            style={{ 
              background: `
                linear-gradient(90deg, 
                  #6b7280 0%, 
                  #9ca3af 30%, 
                  #d1d5db 50%, 
                  #9ca3af 70%, 
                  #6b7280 100%
                )
              `,
              borderRadius: '3px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)',
              transform: 'rotateX(70deg) translateZ(-8px)',
              left: '50%',
              marginLeft: '-160px'
            }}
          >
            {/* Текстура бетона */}
            <div className="absolute inset-0 opacity-40">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute w-px h-full bg-gray-500" style={{ left: `${i * 10}%` }} />
              ))}
            </div>
          </div>

          {/* ЛЕВАЯ СТЕНА - точная геометрия */}
          <div 
            className="wall anime-element absolute bottom-6 w-2 h-28"
            style={{ 
              background: `
                linear-gradient(135deg, 
                  #fbbf24 0%, 
                  #f59e0b 40%, 
                  #d97706 60%, 
                  #f59e0b 100%
                )
              `,
              left: '30px',
              transform: 'skewY(-4deg) rotateY(-10deg)',
              boxShadow: '2px 0 8px rgba(0,0,0,0.3), inset 1px 0 2px rgba(255,255,255,0.3)',
              transformOrigin: 'bottom'
            }}
          >
            {/* Панели стены */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300/50" style={{ top: `${(i + 1) * 18}%` }} />
            ))}
          </div>

          {/* ПРАВАЯ СТЕНА - зеркальная */}
          <div 
            className="wall anime-element absolute bottom-6 w-2 h-28"
            style={{ 
              background: `
                linear-gradient(135deg, 
                  #fbbf24 0%, 
                  #f59e0b 40%, 
                  #d97706 60%, 
                  #f59e0b 100%
                )
              `,
              right: '30px',
              transform: 'skewY(4deg) rotateY(10deg)',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.3), inset -1px 0 2px rgba(255,255,255,0.3)',
              transformOrigin: 'bottom'
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full h-full bg-yellow-300/50" style={{ top: `${(i + 1) * 18}%` }} />
            ))}
          </div>

          {/* ГЛАВНАЯ АРКА - математически точная */}
          <div 
            className="main-arch anime-element relative w-80 h-28"
            style={{ 
              background: `
                radial-gradient(ellipse at center top,
                  rgba(248, 250, 252, 0.98) 0%,
                  rgba(241, 245, 249, 0.95) 25%,
                  rgba(226, 232, 240, 0.9) 50%,
                  rgba(203, 213, 225, 0.9) 75%,
                  rgba(148, 163, 184, 0.95) 100%
                )
              `,
              borderRadius: '140px 140px 0 0',
              border: '2px solid #f59e0b',
              boxShadow: `
                0 15px 35px rgba(0,0,0,0.25),
                inset 0 2px 4px rgba(255,255,255,0.4),
                inset 0 -1px 3px rgba(0,0,0,0.1)
              `,
              left: '50%',
              marginLeft: '-160px',
              transformOrigin: 'center bottom'
            }}
          >
            
            {/* РЕБРА ЖЕСТКОСТИ - идеально ровные */}
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="rib anime-element absolute top-0 w-0.5 h-full"
                style={{
                  left: `${7 + i * 6.2}%`,
                  background: `
                    linear-gradient(180deg, 
                      #fbbf24 0%, 
                      #f59e0b 30%, 
                      #d97706 70%, 
                      #b45309 100%
                    )
                  `,
                  borderRadius: '0.5px',
                  boxShadow: '1px 0 2px rgba(0,0,0,0.2), inset 0 0 1px rgba(255,255,255,0.3)',
                  transformOrigin: 'top'
                }}
              />
            ))}

            {/* ПРОМЫШЛЕННЫЕ ВОРОТА */}
            <div 
              className="detail anime-element absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20"
              style={{ 
                background: `
                  linear-gradient(180deg, 
                    #475569 0%, 
                    #334155 40%, 
                    #1e293b 70%, 
                    #0f172a 100%
                  )
                `,
                borderRadius: '3px 3px 0 0',
                border: '1px solid #64748b',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              {/* Панели ворот */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-slate-600/70" style={{ top: `${(i + 1) * 22}%` }} />
              ))}
              {/* Ручка */}
              <div className="absolute top-8 right-1 w-1.5 h-2 bg-yellow-500 rounded-sm shadow-sm"></div>
            </div>

            {/* ОКНА - точные пропорции */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="detail anime-element absolute"
                style={{
                  width: '6px',
                  height: '4px',
                  top: '18px',
                  left: `${25 + i * 20}px`,
                  background: `
                    linear-gradient(135deg, 
                      rgba(59, 130, 246, 0.95) 0%, 
                      rgba(37, 99, 235, 1) 50%, 
                      rgba(29, 78, 216, 1) 100%
                    )
                  `,
                  borderRadius: '1px',
                  border: '0.5px solid #1e40af',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                <div className="absolute top-0 left-0 w-2 h-1 bg-white/40 rounded-tl-sm"></div>
              </div>
            ))}
          </div>

          {/* СТРОИТЕЛЬНЫЙ КРАН - точная модель */}
          <div 
            className="construction anime-element absolute -top-16 left-1/4"
            style={{ transform: 'translateX(-50%)' }}
          >
            <div className="w-0.5 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 relative shadow-sm">
              <div className="absolute top-2 -left-8 w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-sm"></div>
              <div className="absolute top-2 right-6 w-0.5 h-4 bg-gray-400"></div>
              <div className="absolute top-6 right-6 w-1 h-1 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
              <div className="absolute top-1 left-0.5 w-1.5 h-1 bg-blue-600 rounded-sm shadow-sm"></div>
            </div>
          </div>

          {/* СТРОИТЕЛЬНАЯ ТЕХНИКА */}
          <div 
            className="construction anime-element absolute -bottom-2 -right-16"
          >
            <div className="w-12 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm relative shadow-lg">
              <div className="absolute -top-1.5 left-1.5 w-4 h-2 bg-gray-700 rounded-t-sm shadow-sm"></div>
              <div className="absolute -bottom-0.5 left-1 w-2 h-2 bg-gray-900 rounded-full shadow-inner">
                <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-0.5 right-1 w-2 h-2 bg-gray-900 rounded-full shadow-inner">
                <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ПРОФЕССИОНАЛЬНЫЙ ИНДИКАТОР ЭТАПОВ */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
              <CurrentIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-white">
              <div className="font-bold text-sm">{stages[currentStage].text}</div>
              <div className="text-xs text-gray-300">{stages[currentStage].desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* СОВРЕМЕННЫЙ ПРОГРЕСС-БАР */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-64">
        <div className="w-full bg-black/30 rounded-full h-1.5 backdrop-blur-sm border border-white/10">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${((currentStage + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ */}
      <div className="floating anime-element absolute top-6 right-6 animate-float">
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm bg-white/10 border border-white/20">
          <Building2 className="w-3 h-3 text-white" />
        </div>
      </div>

      <div className="floating anime-element absolute top-14 left-6 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg backdrop-blur-sm bg-white/10 border border-white/20"></div>
      </div>

      {/* АТМОСФЕРНЫЕ ЭФФЕКТЫ */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/8 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};