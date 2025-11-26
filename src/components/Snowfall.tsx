import React, { useEffect, useRef } from 'react';

export const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const COUNT = 300;

    interface SnowflakeData {
      x: number;
      y: number;
      vy: number;
      vx: number;
      r: number;
      o: number;
      reset: () => void;
    }

    const snowflakes: SnowflakeData[] = [];

    class Snowflake {
      x = 0;
      y = 0;
      vy = 0;
      vx = 0;
      r = 0;
      o = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 1 + Math.random() * 3;
        this.vx = 0.5 - Math.random();
        this.r = 1 + Math.random() * 2;
        this.o = 0.5 + Math.random() * 0.5;
      }
    }

    // Initialize flakes
    for (let i = 0; i < COUNT; i++) {
      snowflakes.push(new Snowflake());
    }

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#FFF';

      // Batch drawing operations for better performance
      // Group by opacity to reduce context state changes
      const opacityGroups = new Map<number, Array<{ x: number; y: number; r: number }>>();

      for (let i = 0; i < COUNT; i++) {
        const snowflake = snowflakes[i];
        if (!snowflake) continue;

        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;

        // Group by opacity (rounded to reduce state changes)
        const opacityKey = Math.round(snowflake.o * 10) / 10;
        if (!opacityGroups.has(opacityKey)) {
          opacityGroups.set(opacityKey, []);
        }
        opacityGroups.get(opacityKey)!.push({ x: snowflake.x, y: snowflake.y, r: snowflake.r });

        if (snowflake.y > height) {
          snowflake.reset();
        }
      }

      // Draw grouped by opacity to minimize context state changes
      opacityGroups.forEach((flakes, opacity) => {
        ctx.globalAlpha = opacity;
        flakes.forEach((flake) => {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, false);
          ctx.fill();
        });
      });

      animationFrameId = requestAnimationFrame(update);
    };

    // Setup
    onResize();
    window.addEventListener('resize', onResize);
    update();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 flex w-full h-full pointer-events-none" aria-hidden="true">
      {/* Festive Color Columns */}
      <div className="absolute inset-0 flex w-full h-full opacity-100">
        <div style={{ backgroundColor: '#F5624D' }} className="flex-1 h-full" />
        <div style={{ backgroundColor: '#CC231E' }} className="flex-1 h-full" />
        <div style={{ backgroundColor: '#34A65F' }} className="flex-1 h-full" />
        <div style={{ backgroundColor: '#0F8A5F' }} className="flex-1 h-full" />
        <div style={{ backgroundColor: '#235E6F' }} className="flex-1 h-full" />
      </div>

      {/* Snow Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
