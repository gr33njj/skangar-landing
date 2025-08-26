import React, { useEffect, useState, useRef } from 'react';
import { Building2, Zap, Wrench, Settings } from 'lucide-react';

export const CinematicHangar = () => {
  const [stage, setStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setStage(0);
          setFadeOut(false);
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation cycle
  useEffect(() => {
    if (!isVisible) return;

    const cycle = async () => {
      // Stage progression
      for (let i = 0; i < 4; i++) {
        setStage(i);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      // Hold final stage
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fade out
      setFadeOut(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset and restart
      setFadeOut(false);
      setStage(0);
    };

    if (isVisible) {
      cycle();
      const interval = setInterval(cycle, 14000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const stages = [
    { icon: Settings, text: "Проектирование", desc: "Разработка чертежей" },
    { icon: Wrench, text: "Изготовление", desc: "Производство каркаса" },
    { icon: Zap, text: "Монтаж", desc: "Сборка конструкции" },
    { icon: Building2, text: "Завершение", desc: "Готовый объект" }
  ];

  const currentStage = stages[stage];
  const CurrentIcon = currentStage.icon;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Professional starfield */}
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
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Ground plane */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-800/80 to-transparent"></div>

      {/* Main hangar construction */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Foundation - Clean and professional */}
          <div 
            className={`absolute bottom-0 w-96 h-8 transition-all duration-1000 ease-out ${
              isVisible && stage >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              background: 'linear-gradient(90deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)',
              borderRadius: '4px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.1)',
              transform: 'rotateX(60deg) translateZ(-10px)',
              transitionDelay: '0.5s'
            }}
          >
            {/* Concrete texture */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute w-px h-full bg-gray-400" style={{ left: `${i * 12.5}%` }} />
              ))}
            </div>
          </div>

          {/* Side walls - Proper proportions */}
          <div 
            className={`absolute bottom-8 left-12 w-3 h-32 transition-all duration-1200 ease-out ${
              isVisible && stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
              transform: 'skewY(-3deg) rotateY(-8deg)',
              boxShadow: '3px 0 12px rgba(0,0,0,0.3), inset 1px 0 2px rgba(255,255,255,0.2)',
              transitionDelay: '1s'
            }}
          >
            {/* Metal panel lines */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300/40" style={{ top: `${(i + 1) * 16}%` }} />
            ))}
          </div>

          <div 
            className={`absolute bottom-8 right-12 w-3 h-32 transition-all duration-1200 ease-out ${
              isVisible && stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
              transform: 'skewY(3deg) rotateY(8deg)',
              boxShadow: '-3px 0 12px rgba(0,0,0,0.3), inset -1px 0 2px rgba(255,255,255,0.2)',
              transitionDelay: '1.2s'
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300/40" style={{ top: `${(i + 1) * 16}%` }} />
            ))}
          </div>

          {/* Main arch structure - Clean geometry */}
          <div 
            className={`relative w-96 h-32 transition-all duration-1500 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-98'
            }`}
            style={{ 
              background: `
                radial-gradient(ellipse at center top,
                  rgba(248, 250, 252, 0.95) 0%,
                  rgba(241, 245, 249, 0.9) 30%,
                  rgba(226, 232, 240, 0.85) 60%,
                  rgba(148, 163, 184, 0.9) 100%
                )
              `,
              borderRadius: '192px 192px 0 0',
              border: '3px solid #f59e0b',
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.3),
                inset 0 2px 4px rgba(255,255,255,0.3),
                inset 0 -2px 8px rgba(0,0,0,0.1)
              `,
              transform: 'rotateX(2deg)',
              transitionDelay: '1.8s'
            }}
          >
            
            {/* Structural ribs - Clean lines */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-0 w-0.5 h-full transition-all duration-300 ease-out ${
                  isVisible && stage >= 2 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                }`}
                style={{
                  left: `${8 + i * 6.5}%`,
                  background: 'linear-gradient(180deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
                  borderRadius: '0.5px',
                  boxShadow: '1px 0 2px rgba(0,0,0,0.2)',
                  transformOrigin: 'top',
                  transitionDelay: `${2 + i * 0.05}s`
                }}
              />
            ))}

            {/* Clean industrial door */}
            <div 
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 transition-all duration-800 ease-out ${
                isVisible && stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ 
                background: 'linear-gradient(180deg, #475569 0%, #334155 50%, #1e293b 100%)',
                borderRadius: '4px 4px 0 0',
                border: '1px solid #64748b',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.3)',
                transitionDelay: '3s'
              }}
            >
              {/* Door panels */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-slate-600/60" style={{ top: `${(i + 1) * 20}%` }} />
              ))}
              {/* Handle */}
              <div className="absolute top-12 right-2 w-2 h-3 bg-yellow-500 rounded-sm"></div>
            </div>

            {/* Professional windows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-400 ease-out ${
                  isVisible && stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  width: '8px',
                  height: '6px',
                  top: '24px',
                  left: `${30 + i * 22}px`,
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 1) 100%)',
                  borderRadius: '1px',
                  border: '1px solid #1e40af',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.2)',
                  transitionDelay: `${3.2 + i * 0.1}s`
                }}
              >
                <div className="absolute top-0 left-0 w-3 h-2 bg-white/30 rounded-tl-sm"></div>
              </div>
            ))}
          </div>

          {/* Professional crane */}
          <div 
            className={`absolute -top-20 left-1/4 transition-all duration-1000 ease-out ${
              isVisible && stage >= 1 ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-4 -rotate-12'
            }`}
            style={{ transitionDelay: '2.2s' }}
          >
            <div className="w-1 h-20 bg-gradient-to-b from-yellow-500 to-yellow-600 relative shadow-lg">
              <div className="absolute top-3 -left-10 w-20 h-0.5 bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-sm"></div>
              <div className="absolute top-3 right-8 w-0.5 h-6 bg-gray-400"></div>
              <div className="absolute top-9 right-8 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
              <div className="absolute top-1 left-1 w-2 h-1.5 bg-blue-600 rounded-sm"></div>
            </div>
          </div>

          {/* Professional construction vehicle */}
          <div 
            className={`absolute -bottom-3 -right-20 transition-all duration-1000 ease-out ${
              isVisible && stage >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '3.5s' }}
          >
            <div className="w-16 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-sm relative shadow-lg">
              <div className="absolute -top-2 left-2 w-6 h-3 bg-gray-700 rounded-t-sm"></div>
              <div className="absolute -bottom-0.5 left-2 w-3 h-3 bg-gray-900 rounded-full shadow-inner">
                <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-0.5 right-2 w-3 h-3 bg-gray-900 rounded-full shadow-inner">
                <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional stage indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <div className="font-bold text-base">{currentStage.text}</div>
              <div className="text-sm text-gray-300">{currentStage.desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional progress bar */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-80">
        <div className="w-full bg-black/30 rounded-full h-2 backdrop-blur-sm border border-white/10">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
            style={{ width: `${((stage + 1) / 4) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-6 right-6 animate-float">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm bg-white/10 border border-white/20">
          <Building2 className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="absolute top-16 left-6 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg backdrop-blur-sm bg-white/10 border border-white/20"></div>
      </div>

      {/* Atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};