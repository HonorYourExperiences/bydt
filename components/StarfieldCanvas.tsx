"use client";

import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

interface Floaty {
  x: number;
  y: number;
  size: number;
  type: 'plane' | 'proto' | 'card';
  rotation: number;
  alpha: number;
}

export default function StarfieldCanvas({ activeJourney }: { activeJourney?: string }) {
  // activeJourney can be 'constellations' | 'heroes' | 'nebula' to change the "current"
  // We modulate the "dream field" – density, connections, and "current" lines that feel like hand-drawn threads in space.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const floatiesRef = useRef<Floaty[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize stars (hand-drawn feel: soft, varied)
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 180; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.2 + 0.6,
          alpha: Math.random() * 0.6 + 0.4,
          speed: Math.random() * 0.04 + 0.01,
        });
      }
    };

    // Child's hand-drawn "floaties" (paper planes, small prototypes, wonder cards as simple shapes)
    const initFloaties = () => {
      floatiesRef.current = [];
      const count = activeJourney ? 12 : 7;
      for (let i = 0; i < count; i++) {
        floatiesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.85),
          size: Math.random() * 14 + 8,
          type: ['plane', 'proto', 'card'][Math.floor(Math.random() * 3)] as any,
          rotation: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.55 + 0.35,
        });
      }
    };

    initStars();
    initFloaties();

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle deep space gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(10, 22, 47, 0.65)');
      grad.addColorStop(1, 'rgba(5, 12, 28, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Twinkling stars (child's sketchy dots)
      ctx.fillStyle = '#C5BBAE';
      starsRef.current.forEach((star, i) => {
        ctx.globalAlpha = star.alpha * (0.7 + Math.sin(time * 2 + i) * 0.3);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Gentle drift
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        star.x += Math.sin(time * 0.3 + i) * 0.2;
      });

      // Floating hand-drawn elements (simple geometric "child drawings" in space)
      ctx.strokeStyle = '#BFA16B';
      ctx.fillStyle = '#7BA3C9';
      ctx.lineWidth = 1.2;

      floatiesRef.current.forEach((f, i) => {
        ctx.save();
        ctx.globalAlpha = f.alpha * (0.6 + Math.sin(time + i * 1.3) * 0.35);
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation + Math.sin(time * 0.6 + i) * 0.15);

        if (f.type === 'plane') {
          // Paper plane shape (child's drawing)
          ctx.beginPath();
          ctx.moveTo(-f.size * 0.7, 0);
          ctx.lineTo(f.size * 0.6, -f.size * 0.35);
          ctx.lineTo(0, 0);
          ctx.lineTo(f.size * 0.6, f.size * 0.35);
          ctx.closePath();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-f.size * 0.3, 0);
          ctx.stroke();
        } else if (f.type === 'proto') {
          // Small 3D-prototype / block (cube sketch)
          ctx.strokeRect(-f.size * 0.4, -f.size * 0.4, f.size * 0.8, f.size * 0.8);
          ctx.beginPath();
          ctx.moveTo(-f.size * 0.4, -f.size * 0.4);
          ctx.lineTo(-f.size * 0.6, -f.size * 0.6);
          ctx.lineTo(f.size * 0.2, -f.size * 0.6);
          ctx.lineTo(f.size * 0.4, -f.size * 0.4);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(f.size * 0.4, -f.size * 0.4);
          ctx.lineTo(f.size * 0.6, -f.size * 0.6);
          ctx.stroke();
        } else {
          // WonderCard rectangle with "scribble"
          ctx.strokeRect(-f.size * 0.55, -f.size * 0.4, f.size * 1.1, f.size * 0.8);
          ctx.beginPath();
          ctx.moveTo(-f.size * 0.3, -f.size * 0.15);
          ctx.lineTo(f.size * 0.25, -f.size * 0.15);
          ctx.moveTo(-f.size * 0.3, f.size * 0.1);
          ctx.lineTo(f.size * 0.1, f.size * 0.1);
          ctx.stroke();
        }

        ctx.restore();

        // Slow float + gentle "orbit"
        f.x += Math.cos(time * 0.4 + i) * 0.35;
        f.y += Math.sin(time * 0.25 + i * 0.7) * 0.25 + 0.08;
        f.rotation += 0.003;

        // Wrap around
        if (f.x < -20) f.x = canvas.width + 20;
        if (f.x > canvas.width + 20) f.x = -20;
        if (f.y > canvas.height * 0.92) f.y = 30;
      });

      // "Currents" - hand-drawn style connecting lines and enhanced particles when a journey is active
      // These feel like threads of imagination pulling the child through space
      if (activeJourney) {
        const cx = canvas.width / 2;
        const cy = canvas.height * 0.55;
        ctx.strokeStyle = '#BFA16B';
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = 0.4 + Math.sin(time * 1.8) * 0.2;

        let angle = 0;
        let density = 3;
        if (activeJourney === 'constellations') { angle = -0.9; density = 5; } // more connections for stars
        else if (activeJourney === 'heroes') { angle = 0.15; density = 3; } // motion lines
        else if (activeJourney === 'nebula') { angle = 1.2; density = 4; } // soft flows

        // Multiple sketchy hand-drawn current lines
        for (let k = 0; k < density; k++) {
          ctx.beginPath();
          const jitter = (k - Math.floor(density/2)) * 5;
          ctx.moveTo(cx + jitter * 0.6, cy);
          const tx = cx + Math.cos(angle) * 320 + jitter * 1.5;
          const ty = cy + Math.sin(angle) * 200 + (k % 2) * 20;
          ctx.quadraticCurveTo(
            cx + Math.cos(angle) * 140 + jitter,
            cy + Math.sin(angle) * 70,
            tx, ty
          );
          ctx.stroke();
        }

        // Small hand-drawn "child dreamer" at the center, being pulled into the current
        ctx.fillStyle = '#94E6FB';
        ctx.beginPath();
        ctx.arc(cx, cy, 5 + Math.sin(time * 4) * 1.2, 0, Math.PI * 2);
        ctx.fill();
        // tiny "hand" scribble
        ctx.strokeStyle = '#BFA16B';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx + 8, cy - 3, 3, 0, Math.PI * 1.5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      time += 0.016;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Gentle interaction: mouse moves "currents"
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      floatiesRef.current.forEach(f => {
        const dx = (mx - f.x) * 0.008;
        const dy = (my - f.y) * 0.008;
        f.x += dx;
        f.y += dy;
      });
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeJourney]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
