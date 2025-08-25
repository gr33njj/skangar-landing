import React, { useEffect, useRef } from 'react';

export const HangarAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let progress = 0;
    const animationSpeed = 0.02;
    
    const drawFrame = (ctx, progress, width, height) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const maxWidth = Math.min(width * 0.8, 400);
      const maxHeight = Math.min(height * 0.6, 200);
      
      // Calculate current dimensions based on progress
      const currentWidth = maxWidth * Math.min(progress * 2, 1);
      const currentHeight = maxHeight * Math.min(progress * 2, 1);
      
      // Foundation (appears first)
      if (progress > 0.05) {
        const foundationProgress = Math.min((progress - 0.05) / 0.15, 1);
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(
          centerX - currentWidth/2, 
          centerY + currentHeight/2 - 8, 
          currentWidth * foundationProgress, 
          8
        );
      }
      
      // Side walls
      if (progress > 0.2) {
        const wallProgress = Math.min((progress - 0.2) / 0.3, 1);
        ctx.strokeStyle = '#fab515';
        ctx.lineWidth = 3;
        ctx.fillStyle = 'rgba(250, 181, 21, 0.1)';
        
        // Left wall
        const leftWallHeight = currentHeight * wallProgress;
        ctx.beginPath();
        ctx.moveTo(centerX - currentWidth/2, centerY + currentHeight/2);
        ctx.lineTo(centerX - currentWidth/2, centerY + currentHeight/2 - leftWallHeight);
        ctx.stroke();
        
        // Right wall  
        ctx.beginPath();
        ctx.moveTo(centerX + currentWidth/2, centerY + currentHeight/2);
        ctx.lineTo(centerX + currentWidth/2, centerY + currentHeight/2 - leftWallHeight);
        ctx.stroke();
      }
      
      // Roof structure (arched)
      if (progress > 0.5) {
        const roofProgress = Math.min((progress - 0.5) / 0.4, 1);
        ctx.strokeStyle = '#fab515';
        ctx.lineWidth = 4;
        
        // Arch segments
        const segments = 8;
        for (let i = 0; i < segments * roofProgress; i++) {
          const angle = (Math.PI * i) / (segments - 1);
          const startX = centerX - currentWidth/2 + (currentWidth * i) / (segments - 1);
          const startY = centerY + currentHeight/2 - currentHeight;
          const endX = startX;
          const endY = startY - Math.sin(angle) * (currentHeight * 0.5);
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
        
        // Main arch outline
        if (roofProgress > 0.7) {
          ctx.beginPath();
          ctx.arc(centerX, centerY + currentHeight/2 - currentHeight, currentWidth/2, 0, Math.PI);
          ctx.stroke();
        }
      }
      
      // Details and finishing touches
      if (progress > 0.9) {
        const detailProgress = (progress - 0.9) / 0.1;
        
        // Door
        ctx.fillStyle = '#374151';
        const doorWidth = 40 * detailProgress;
        const doorHeight = 60 * detailProgress;
        ctx.fillRect(
          centerX - doorWidth/2,
          centerY + currentHeight/2 - doorHeight,
          doorWidth,
          doorHeight
        );
        
        // Windows
        ctx.fillStyle = '#60a5fa';
        const windowSize = 8 * detailProgress;
        // Left windows
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            centerX - currentWidth/2 + 20,
            centerY + currentHeight/2 - currentHeight + 20 + (i * 25),
            windowSize,
            windowSize
          );
        }
        // Right windows  
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(
            centerX + currentWidth/2 - 28,
            centerY + currentHeight/2 - currentHeight + 20 + (i * 25),
            windowSize,
            windowSize
          );
        }
      }
      
      // Sparkle effect when complete
      if (progress >= 1) {
        const sparkles = 8;
        for (let i = 0; i < sparkles; i++) {
          const sparkleX = centerX + (Math.cos(Date.now() * 0.002 + i) * currentWidth * 0.6);
          const sparkleY = centerY + (Math.sin(Date.now() * 0.003 + i) * currentHeight * 0.4);
          
          ctx.fillStyle = `rgba(250, 181, 21, ${0.5 + 0.5 * Math.sin(Date.now() * 0.01 + i)})`;
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      progress += animationSpeed;
      if (progress > 1.2) {
        progress = 0; // Loop animation
      }
      
      drawFrame(ctx, progress, canvas.width, canvas.height);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ maxWidth: '500px', maxHeight: '300px' }}
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm font-medium text-gray-700">Строительство вашего ангара</p>
        </div>
      </div>
    </div>
  );
};