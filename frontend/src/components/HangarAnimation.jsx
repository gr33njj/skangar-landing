import React, { useEffect, useRef, useState } from 'react';
import { Building2, Zap, Wrench } from 'lucide-react';

export const HangarAnimation = () => {
  const containerRef = useRef(null);
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

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* 3D Hangar Structure */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <div className="relative transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Main Hangar Body with 3D effect */}
          <div className="relative">
            {/* Foundation */}
            <div className="absolute bottom-0 w-80 h-6 bg-gradient-to-r from-gray-600 to-gray-700 rounded-md shadow-2xl transform rotate-x-60 animate-fade-in-up" 
                 style={{ animationDelay: '0.5s' }}>
            </div>

            {/* Left Wall */}
            <div className="absolute bottom-6 left-0 w-2 h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 transform -skew-y-12 animate-fade-in-up shadow-lg"
                 style={{ animationDelay: '1s' }}>
            </div>

            {/* Right Wall */}
            <div className="absolute bottom-6 right-0 w-2 h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 transform skew-y-12 animate-fade-in-up shadow-lg"
                 style={{ animationDelay: '1.2s' }}>
            </div>

            {/* Main Structure */}
            <div className="relative w-80 h-32 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100 rounded-t-full border-4 border-yellow-500 shadow-2xl animate-fade-in-up"
                 style={{ 
                   animationDelay: '1.5s',
                   background: 'linear-gradient(135deg, rgba(250,181,21,0.2) 0%, rgba(255,255,255,0.8) 50%, rgba(250,181,21,0.2) 100%)'
                 }}>
              
              {/* Roof Ribs */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-1 h-full bg-yellow-500 opacity-80 animate-fade-in-up"
                  style={{
                    left: `${12.5 * (i + 1)}%`,
                    animationDelay: `${2 + i * 0.1}s`,
                    transform: 'rotateZ(0deg)',
                    borderRadius: '2px'
                  }}
                />
              ))}

              {/* Door */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg animate-fade-in-up shadow-inner"
                   style={{ animationDelay: '3s' }}>
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>

              {/* Windows */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-4 bg-gradient-to-br from-blue-300 to-blue-500 rounded animate-fade-in-up shadow-lg"
                  style={{
                    top: '20px',
                    left: `${20 + i * 35}px`,
                    animationDelay: `${3.2 + i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* Crane Animation */}
            <div className="absolute -top-16 left-1/4 transform -translate-x-1/2 animate-fade-in-up"
                 style={{ animationDelay: '2.5s' }}>
              <div className="w-1 h-16 bg-yellow-600 relative">
                <div className="absolute top-0 -left-8 w-16 h-1 bg-yellow-600"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Construction Vehicles */}
            <div className="absolute -bottom-2 -right-16 animate-fade-in-up"
                 style={{ animationDelay: '3.5s' }}>
              <div className="w-12 h-6 bg-yellow-500 rounded-sm relative">
                <div className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/20">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stages[animationStage].color} flex items-center justify-center animate-pulse`}>
              <CurrentIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">
              {stages[animationStage].text}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-64">
        <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-700 shadow-lg"
            style={{ width: `${((animationStage + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 animate-float">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg flex items-center justify-center">
          <Building2 className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="absolute top-16 left-4 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent"></div>
    </div>
  );
};