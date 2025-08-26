import React, { useEffect, useRef, useState } from 'react';
import { Building2, Zap, Wrench, Settings } from 'lucide-react';

export const ProfessionalHangar = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const stages = [
    { icon: Settings, text: "Проектирование", desc: "Разработка чертежей" },
    { icon: Wrench, text: "Изготовление", desc: "Производство каркаса" },
    { icon: Zap, text: "Монтаж", desc: "Сборка конструкции" },
    { icon: Building2, text: "Готово", desc: "Завершенный объект" }
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

    const stageTimings = [0, 1500, 3000, 4500]; // Когда начинается каждый этап
    const totalDuration = 8000; // Общая длительность цикла
    
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
      {/* Professional starfield */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${0.5 + Math.random() * 1.5}px`,
              height: `${0.5 + Math.random() * 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-gray-800/70 to-transparent"></div>

      {/* Main hangar container */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px' }}>
        <div className="relative hangar-container" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* FOUNDATION - Stage 0 */}
          <div 
            className={`foundation absolute bottom-0 w-96 h-8 transition-all duration-1000 ease-out ${
              isVisible && stage >= 0 ? 'foundation-appear' : 'opacity-0'
            }`}
            style={{ 
              background: `
                linear-gradient(90deg, 
                  #6b7280 0%, 
                  #9ca3af 25%, 
                  #d1d5db 50%, 
                  #9ca3af 75%, 
                  #6b7280 100%
                )
              `,
              borderRadius: '4px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
              transform: 'rotateX(65deg) translateZ(-12px)',
              left: '50%',
              marginLeft: '-192px'
            }}
          >
            {/* Concrete texture */}
            <div className="absolute inset-0 opacity-40">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute w-px h-full bg-gray-500" style={{ left: `${i * 8.33}%` }} />
              ))}
            </div>
          </div>

          {/* WALLS - Stage 1 */}
          <div 
            className={`wall-left absolute bottom-8 w-3 h-32 transition-all duration-1200 ease-out ${
              isVisible && stage >= 1 ? 'wall-appear-left' : 'opacity-0'
            }`}
            style={{ 
              background: `
                linear-gradient(135deg, 
                  #fbbf24 0%, 
                  #f59e0b 30%, 
                  #d97706 70%, 
                  #f59e0b 100%
                )
              `,
              left: '32px',
              transform: 'skewY(-5deg) rotateY(-12deg)',
              boxShadow: '3px 0 12px rgba(0,0,0,0.4), inset 2px 0 4px rgba(255,255,255,0.3)',
              transformOrigin: 'bottom'
            }}
          >
            {/* Metal panels */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300/60" style={{ top: `${(i + 1) * 15}%` }} />
            ))}
            {/* Bolts */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-gray-400 rounded-full" style={{ right: '2px', top: `${20 + i * 20}%` }} />
            ))}
          </div>

          <div 
            className={`wall-right absolute bottom-8 w-3 h-32 transition-all duration-1200 ease-out ${
              isVisible && stage >= 1 ? 'wall-appear-right' : 'opacity-0'
            }`}
            style={{ 
              background: `
                linear-gradient(135deg, 
                  #fbbf24 0%, 
                  #f59e0b 30%, 
                  #d97706 70%, 
                  #f59e0b 100%
                )
              `,
              right: '32px',
              transform: 'skewY(5deg) rotateY(12deg)',
              boxShadow: '-3px 0 12px rgba(0,0,0,0.4), inset -2px 0 4px rgba(255,255,255,0.3)',
              transformOrigin: 'bottom'
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-yellow-300/60" style={{ top: `${(i + 1) * 15}%` }} />
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-gray-400 rounded-full" style={{ left: '2px', top: `${20 + i * 20}%` }} />
            ))}
          </div>

          {/* MAIN ARCH - Stage 2 */}
          <div 
            className={`main-arch relative w-96 h-32 transition-all duration-1500 ease-out ${
              isVisible && stage >= 2 ? 'arch-appear' : 'opacity-0'
            }`}
            style={{ 
              background: `
                radial-gradient(ellipse at center top,
                  rgba(248, 250, 252, 0.98) 0%,
                  rgba(241, 245, 249, 0.95) 20%,
                  rgba(226, 232, 240, 0.92) 40%,
                  rgba(203, 213, 225, 0.9) 60%,
                  rgba(148, 163, 184, 0.95) 100%
                )
              `,
              borderRadius: '192px 192px 0 0',
              border: '3px solid #f59e0b',
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.3),
                inset 0 3px 6px rgba(255,255,255,0.4),
                inset 0 -2px 6px rgba(0,0,0,0.1)
              `,
              left: '50%',
              marginLeft: '-192px',
              transformOrigin: 'center bottom'
            }}
          >
            
            {/* RIBS - Stage 2 with stagger */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`rib absolute top-0 w-0.5 h-full transition-all duration-300 ease-out ${
                  isVisible && stage >= 2 ? 'rib-appear' : 'opacity-0'
                }`}
                style={{
                  left: `${6 + i * 5.5}%`,
                  background: `
                    linear-gradient(180deg, 
                      #fbbf24 0%, 
                      #f59e0b 30%, 
                      #d97706 70%, 
                      #b45309 100%
                    )
                  `,
                  borderRadius: '1px',
                  boxShadow: '1px 0 3px rgba(0,0,0,0.3), inset 0 0 2px rgba(255,255,255,0.4)',
                  transformOrigin: 'top',
                  transitionDelay: `${0.5 + Math.abs(8 - i) * 0.05}s` // От центра
                }}
              >
                {/* Bolts on ribs */}
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="absolute w-0.5 h-0.5 bg-gray-300 rounded-full" style={{ left: '-0.5px', top: `${25 + j * 25}%` }} />
                ))}
              </div>
            ))}

            {/* DOOR - Stage 3 */}
            <div 
              className={`door absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 transition-all duration-800 ease-out ${
                isVisible && stage >= 3 ? 'door-appear' : 'opacity-0'
              }`}
              style={{ 
                background: `
                  linear-gradient(180deg, 
                    #475569 0%, 
                    #334155 40%, 
                    #1e293b 70%, 
                    #0f172a 100%
                  )
                `,
                borderRadius: '4px 4px 0 0',
                border: '2px solid #64748b',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              {/* Door panels */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute w-full h-px bg-slate-600/70" style={{ top: `${(i + 1) * 18}%` }} />
              ))}
              {/* Handle */}
              <div className="absolute top-10 right-2 w-2 h-3 bg-yellow-500 rounded-sm shadow-lg"></div>
              {/* Lock */}
              <div className="absolute top-12 right-3 w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* WINDOWS - Stage 3 */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`window absolute transition-all duration-400 ease-out ${
                  isVisible && stage >= 3 ? 'window-appear' : 'opacity-0'
                }`}
                style={{
                  width: '7px',
                  height: '5px',
                  top: '22px',
                  left: `${20 + i * 22}px`,
                  background: `
                    linear-gradient(135deg, 
                      rgba(59, 130, 246, 0.95) 0%, 
                      rgba(37, 99, 235, 1) 50%, 
                      rgba(29, 78, 216, 1) 100%
                    )
                  `,
                  borderRadius: '1px',
                  border: '1px solid #1e40af',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.3)',
                  transitionDelay: `${0.8 + i * 0.08}s`
                }}
              >
                <div className="absolute top-0 left-0 w-3 h-2 bg-white/40 rounded-tl-sm"></div>
              </div>
            ))}

            {/* SIGNAL LIGHTS - Stage 3 */}
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`signal-light absolute transition-all duration-400 ease-out ${
                  isVisible && stage >= 3 ? 'light-appear' : 'opacity-0'
                }`}
                style={{
                  width: '3px',
                  height: '3px',
                  top: '8px',
                  left: `${40 + i * 120}px`,
                  background: 'radial-gradient(circle, #ef4444 0%, #dc2626 100%)',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px rgba(239, 68, 68, 0.8), inset 0 1px 1px rgba(255,255,255,0.3)',
                  transitionDelay: `${1.2 + i * 0.2}s`
                }}
              />
            ))}
          </div>

          {/* CONSTRUCTION CRANE - Stage 1 */}
          <div 
            className={`crane absolute -top-18 left-1/4 transition-all duration-1000 ease-out ${
              isVisible && stage >= 1 ? 'crane-appear' : 'opacity-0'
            }`}
            style={{ transform: 'translateX(-50%)', transitionDelay: '0.8s' }}
          >
            <div className="w-1 h-18 bg-gradient-to-b from-yellow-400 to-yellow-600 relative shadow-lg">
              <div className="absolute top-3 -left-10 w-20 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
              <div className="absolute top-3 right-8 w-0.5 h-5 bg-gray-400"></div>
              <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-sm"></div>
              <div className="absolute top-1 left-1 w-2 h-1.5 bg-blue-600 rounded-sm"></div>
            </div>
          </div>

          {/* CONSTRUCTION VEHICLE - Stage 2 */}
          <div 
            className={`vehicle absolute -bottom-3 -right-18 transition-all duration-1000 ease-out ${
              isVisible && stage >= 2 ? 'vehicle-appear' : 'opacity-0'
            }`}
            style={{ transitionDelay: '1.5s' }}
          >
            <div className="w-14 h-7 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-sm relative shadow-lg">
              <div className="absolute -top-2 left-2 w-5 h-2.5 bg-gray-700 rounded-t-sm"></div>
              <div className="absolute -bottom-0.5 left-1.5 w-2.5 h-2.5 bg-gray-900 rounded-full shadow-inner">
                <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-0.5 right-1.5 w-2.5 h-2.5 bg-gray-900 rounded-full shadow-inner">
                <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAGE INDICATOR */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/50 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg animate-pulse">
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <div className="font-bold text-base">{stages[stage].text}</div>
              <div className="text-sm text-gray-300">{stages[stage].desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-80">
        <div className="w-full bg-black/30 rounded-full h-2 backdrop-blur-sm border border-white/10">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
            style={{ width: `${((stage + 1) / 4) * 100}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* FLOATING ELEMENTS */}
      <div className="absolute top-8 right-8 animate-float">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-xl flex items-center justify-center backdrop-blur-sm bg-white/10 border border-white/20">
          <Building2 className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="absolute top-20 left-8 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl backdrop-blur-sm bg-white/10 border border-white/20"></div>
      </div>

      {/* ATMOSPHERIC EFFECTS */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/8 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};