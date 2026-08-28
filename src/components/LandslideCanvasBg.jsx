import React, { useEffect, useRef } from 'react';

export default function LandslideCanvasBg({ riskLevel = 'HIGH', active = true, speed = 1 }) {
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

    // Particle setup
    const rainCount = riskLevel === 'CRITICAL' ? 140 : riskLevel === 'HIGH' ? 80 : 35;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 10,
      speed: (Math.random() * 8 + 6) * speed,
      opacity: Math.random() * 0.4 + 0.1
    }));

    // Debris & Rocks
    const rockCount = riskLevel === 'CRITICAL' ? 25 : riskLevel === 'HIGH' ? 12 : 4;
    const rocks = Array.from({ length: rockCount }, () => ({
      x: Math.random() * (width * 0.6),
      y: Math.random() * (height * 0.5),
      size: Math.random() * 6 + 2,
      vx: (Math.random() * 2 + 1) * speed,
      vy: (Math.random() * 3 + 2) * speed,
      rot: Math.random() * Math.PI,
      vRot: (Math.random() - 0.5) * 0.1,
      color: Math.random() > 0.5 ? '#e11d48' : '#d97706'
    }));

    let lightningTimer = 0;

    const render = () => {
      // Clear with subtle dark trail
      ctx.fillStyle = 'rgba(10, 15, 29, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Render Mountain Silhouette Background
      ctx.fillStyle = 'rgba(18, 27, 45, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.65);
      ctx.quadraticCurveTo(width * 0.25, height * 0.45, width * 0.5, height * 0.7);
      ctx.quadraticCurveTo(width * 0.75, height * 0.85, width, height * 0.55);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Render Rain
      ctx.lineWidth = 1.2;
      rainDrops.forEach((d) => {
        ctx.strokeStyle = `rgba(0, 240, 255, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.speed * 0.15;
        if (d.y > height) {
          d.y = -20;
          d.x = Math.random() * width;
        }
      });

      // Render Falling Rocks & Debris Particles (Landslide Simulation)
      rocks.forEach((r) => {
        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rot);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.rect(-r.size / 2, -r.size / 2, r.size, r.size);
        ctx.fill();
        ctx.restore();

        r.x += r.vx;
        r.y += r.vy;
        r.rot += r.vRot;

        if (r.y > height || r.x > width) {
          r.x = Math.random() * (width * 0.4);
          r.y = -10;
        }
      });

      // Flash Lightning effect if CRITICAL risk
      if (riskLevel === 'CRITICAL') {
        lightningTimer++;
        if (lightningTimer % 180 === 0 && Math.random() > 0.5) {
          ctx.fillStyle = 'rgba(255, 42, 95, 0.12)';
          ctx.fillRect(0, 0, width, height);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [riskLevel, active, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
}
