import React, { useEffect, useState } from 'react';
import { Building2, Zap, Wrench } from 'lucide-react';

export const HangarAnimationFixed = () => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStage(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stages = [
    { icon: Building2, text: "Проектирование", color: "from-blue-500 to-blue-600" },
    { icon: Wrench, text: "Изготовление", color: "from-orange-500 to-orange-600" },
    { icon: Zap, text: "Монтаж", color: "from-green-500 to-green-600" },
    { icon: Building2, text: "Готово!", color: "from-yellow-500 to-yellow-600" }
  ];

  const CurrentIcon = stages[animationStage].icon;
  const currentStage = stages[animationStage];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-400 rounded-full opacity-60 animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Ground with perspective */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>

      {/* 3D Realistic Hangar Structure */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          
          {/* Enhanced Foundation */}
          <div 
            className="absolute bottom-0 w-96 h-8 rounded-sm shadow-2xl animate-fade-in-up" 
            style={{ 
              animationDelay: '0.5s',
              background: 'linear-gradient(90deg, #6b7280 0%, #4b5563 50%, #6b7280 100%)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)'
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 w-px h-full bg-gray-400 opacity-30"
                style={{ left: `${(i + 1) * 12}%` }}
              />
            ))}
          </div>

          {/* Left Wall */}
          <div 
            className="absolute bottom-8 left-4 w-3 h-36 animate-fade-in-up shadow-xl"
            style={{ 
              animationDelay: '1s',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #fbbf24 100%)',
              transform: 'skewY(-8deg)',
              boxShadow: '2px 0 8px rgba(0,0,0,0.3), inset 1px 0 2px rgba(255,255,255,0.2)'
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute left-0 w-full h-px bg-yellow-300 opacity-40"
                style={{ top: `${i * 16}%` }}
              />
            ))}
          </div>

          {/* Right Wall */}
          <div 
            className="absolute bottom-8 right-4 w-3 h-36 animate-fade-in-up shadow-xl"
            style={{ 
              animationDelay: '1.2s',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 70%, #fbbf24 100%)',
              transform: 'skewY(8deg)',
              boxShadow: '-2px 0 8px rgba(0,0,0,0.3), inset -1px 0 2px rgba(255,255,255,0.2)'
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute left-0 w-full h-px bg-yellow-300 opacity-40"
                style={{ top: `${i * 16}%` }}
              />
            ))}
          </div>

          {/* Main Realistic Hangar Structure */}
          <div 
            className="relative w-96 h-36 rounded-t-full animate-fade-in-up shadow-2xl"
            style={{ 
              animationDelay: '1.5s',
              background: `
                linear-gradient(180deg, 
                  rgba(243, 244, 246, 0.9) 0%,
                  rgba(229, 231, 235, 0.8) 25%,
                  rgba(209, 213, 219, 0.7) 50%,
                  rgba(156, 163, 175, 0.8) 75%,
                  rgba(107, 114, 128, 0.9) 100%
                )
              `,
              border: '3px solid #fbbf24',
              boxShadow: `
                0 20px 40px rgba(0,0,0,0.4),
                inset 0 2px 4px rgba(255,255,255,0.2),
                inset 0 -2px 4px rgba(0,0,0,0.1)
              `
            }}
          >
            
            {/* Metal ribs */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 w-1 h-full animate-fade-in-up"
                style={{
                  left: `${8 * (i + 1)}%`,
                  animationDelay: `${2 + i * 0.08}s`,
                  background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                  borderRadius: '1px',
                  boxShadow: '1px 0 2px rgba(0,0,0,0.3), inset 0 0 1px rgba(255,255,255,0.3)'
                }}
              />
            ))}

            {/* Industrial Door */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 animate-fade-in-up"
              style={{ 
                animationDelay: '3s',
                background: 'linear-gradient(180deg, #374151 0%, #1f2937 50%, #111827 100%)',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 0 8px rgba(0,0,0,0.5)'
              }}
            >
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-full h-px bg-gray-600 opacity-60"
                  style={{ top: `${(i + 1) * 20}%` }}
                />
              ))}
              <div className="absolute top-12 right-2 w-2 h-3 bg-yellow-500 rounded-sm shadow-sm"></div>
              <div className="absolute top-14 right-3 w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Windows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-fade-in-up"
                style={{
                  width: '8px',
                  height: '6px',
                  top: '24px',
                  left: `${15 + i * 30}px`,
                  animationDelay: `${3.2 + i * 0.08}s`,
                  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(37, 99, 235, 1) 100%)',
                  borderRadius: '1px',
                  border: '1px solid #1e40af',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.3)'
                }}
              >
                <div className="absolute top-0 left-0 w-3 h-2 bg-white opacity-20 rounded-tl-sm" />
              </div>
            ))}

            {/* Metal joints */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gray-400 rounded-full animate-fade-in-up"
                style={{
                  bottom: '10px',
                  left: `${20 + i * 40}px`,
                  animationDelay: `${3.5 + i * 0.1}s`,
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)'
                }}
              />
            ))}
          </div>

          {/* Construction Crane */}
          <div className="absolute -top-20 left-1/3 transform -translate-x-1/2 animate-fade-in-up"
               style={{ animationDelay: '2.5s' }}>
            <div className="w-1 h-20 relative shadow-lg"
                 style={{ 
                   background: 'linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%)',
                   boxShadow: '1px 0 3px rgba(0,0,0,0.3)'
                 }}>
              <div className="absolute top-2 -left-10 w-20 h-1"
                   style={{ 
                     background: 'linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%)',
                     boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                   }}></div>
              <div className="absolute top-2 right-8 w-1 h-4 bg-gray-400"></div>
              <div className="absolute top-6 right-8 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>

          {/* Construction Vehicle */}
          <div className="absolute -bottom-4 -right-20 animate-fade-in-up"
               style={{ animationDelay: '3.5s' }}>
            <div className="w-16 h-8 relative"
                 style={{ 
                   background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                   borderRadius: '2px',
                   boxShadow: '0 3px 6px rgba(0,0,0,0.3)'
                 }}>
              <div className="absolute -top-2 left-2 w-6 h-3 bg-gray-700 rounded-t-sm"></div>
              <div className="absolute -bottom-1 left-2 w-4 h-4 bg-gray-900 rounded-full"
                   style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)' }}>
                <div className="absolute inset-1 border border-gray-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-1 right-2 w-4 h-4 bg-gray-900 rounded-full"
                   style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)' }}>
                <div className="absolute inset-1 border border-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="glass-dark px-6 py-3 rounded-full shadow-xl border border-white/20">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentStage.color} flex items-center justify-center animate-pulse shadow-lg`}>
              <CurrentIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">
              {currentStage.text}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-64">
        <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm shadow-inner">
          <div 
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-700 shadow-lg animate-glow"
            style={{ width: `${((animationStage + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 animate-float">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-xl flex items-center justify-center glass">
          <Building2 className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="absolute top-16 left-4 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl glass"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};