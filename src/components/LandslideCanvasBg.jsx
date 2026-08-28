import React, { useEffect, useRef } from 'react';

export default function LandslideCanvasBg({ riskLevel = 'HIGH', active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rain setup - natural water drops
    const rainCount = riskLevel === 'CRITICAL' ? 100 : riskLevel === 'HIGH' ? 60 : 25;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 15 + 8,
      speed: Math.random() * 6 + 4,
      opacity: Math.random() * 0.25 + 0.1
    }));

    // Natural Soil & Debris Particles
    const rockCount = riskLevel === 'CRITICAL' ? 15 : riskLevel === 'HIGH' ? 8 : 2;
    const rocks = Array.from({ length: rockCount }, () => ({
      x: Math.random() * (width * 0.5),
      y: Math.random() * (height * 0.5),
      size: Math.random() * 4 + 2,
      vx: Math.random() * 1.5 + 0.5,
      vy: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#78350f' : '#92400e'
    }));

    const render = () => {
      // Clear with soft mountain slate stone
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Render Mountain Contour Silhouette
      ctx.fillStyle = 'rgba(30, 41, 59, 0.3)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.7);
      ctx.quadraticCurveTo(width * 0.3, height * 0.5, width * 0.6, height * 0.75);
      ctx.quadraticCurveTo(width * 0.8, height * 0.85, width, height * 0.6);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Render Rain
      ctx.lineWidth = 1;
      rainDrops.forEach((d) => {
        ctx.strokeStyle = `rgba(148, 163, 184, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.speed * 0.1;
        if (d.y > height) {
          d.y = -15;
          d.x = Math.random() * width;
        }
      });

      // Render Natural Debris Particles
      rocks.forEach((r) => {
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.rect(r.x, r.y, r.size, r.size);
        ctx.fill();

        r.x += r.vx;
        r.y += r.vy;

        if (r.y > height || r.x > width) {
          r.x = Math.random() * (width * 0.3);
          r.y = -10;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [riskLevel, active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
