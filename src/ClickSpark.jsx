import React, { useState, useEffect, useRef } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const [sparks, setSparks] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Filter out expired sparks
      const activeSparks = sparks.filter(spark => timestamp - spark.startTime < duration);
      
      if (activeSparks.length < sparks.length) {
        setSparks(activeSparks);
      }

      activeSparks.forEach(spark => {
        const progress = (timestamp - spark.startTime) / duration;
        const ease = 1 - Math.pow(1 - progress, 3); // cubic-out
        
        const currentRadius = sparkRadius * ease;
        const currentOpacity = 1 - progress;
        
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = sparkColor;
        
        for (let i = 0; i < sparkCount; i++) {
          const angle = (i / sparkCount) * Math.PI * 2 + spark.angleOffset;
          const x = spark.x + Math.cos(angle) * currentRadius;
          const y = spark.y + Math.sin(angle) * currentRadius;
          
          ctx.beginPath();
          ctx.arc(x, y, sparkSize * (1 - progress) * extraScale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (activeSparks.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    if (sparks.length > 0) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparks, sparkColor, sparkSize, sparkRadius, sparkCount, duration, extraScale]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSpark = {
      id: Date.now(),
      startTime: performance.now(),
      x,
      y,
      angleOffset: Math.random() * Math.PI * 2
    };
    
    setSparks(prev => [...prev, newSpark]);
  };

  // Handle canvas resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvasRef.current.width = canvasRef.current.parentElement.offsetWidth;
        canvasRef.current.height = canvasRef.current.parentElement.offsetHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[9999]"
        style={{ width: '100%', height: '100%' }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
