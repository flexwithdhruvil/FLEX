/**
 * CursorSparkTrail
 *
 * Drop-in component that spawns gold particle sparks at the cursor position
 * within any parent element. On mobile / touch devices it's a no-op.
 *
 * Usage in Home.tsx hero section:
 *   import CursorSparkTrail from '../components/CursorSparkTrail';
 *
 *   // Inside the hero <section> (give it position: relative):
 *   <section className="... relative">
 *     <CursorSparkTrail />
 *     {... rest of hero ...}
 *   </section>
 */
import { useEffect, useRef } from 'react';

// ── Particle definition ────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  maxLife: number;
  radius: number;
  hue: number;        // 35–55 (gold range)
  active: boolean;
}

const POOL_SIZE    = 80;
const EMIT_COUNT   = 5;    // sparks per mousemove event
const EMIT_RATE    = 2;    // only emit every N frames
const GRAVITY      = 0.04; // px / frame²
const DRAG         = 0.97; // velocity decay per frame

// ── Pre-built particle pool (avoid GC pressure) ────────────────────────────────
function makePool(): Particle[] {
  return Array.from({ length: POOL_SIZE }, () => ({
    x: 0, y: 0, vx: 0, vy: 0,
    life: 0, maxLife: 1, radius: 2, hue: 45, active: false,
  }));
}

function emit(pool: Particle[], x: number, y: number) {
  let spawned = 0;
  for (let i = 0; i < pool.length && spawned < EMIT_COUNT; i++) {
    if (!pool[i].active) {
      const p      = pool[i];
      const angle  = Math.random() * Math.PI * 2;
      const speed  = 1.2 + Math.random() * 2.8;
      p.x          = x;
      p.y          = y;
      p.vx         = Math.cos(angle) * speed;
      p.vy         = Math.sin(angle) * speed - 1.5;  // bias upward
      p.maxLife    = 28 + Math.floor(Math.random() * 22);
      p.life       = p.maxLife;
      p.radius     = 1.5 + Math.random() * 2.5;
      p.hue        = 35 + Math.random() * 20;        // gold band
      p.active     = true;
      spawned++;
    }
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function CursorSparkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Touch-only devices: skip entirely
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const pool    = makePool();
    let   rafId   = 0;
    let   frameN  = 0;
    let   pending = false;
    let   pendX   = 0;
    let   pendY   = 0;

    // ── Size canvas to parent ─────────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr  = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    // ── Mouse handler ─────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      pendX   = e.clientX - rect.left;
      pendY   = e.clientY - rect.top;
      pending = true;
    };
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);

    // ── Loop ──────────────────────────────────────────────────────────────────
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      frameN++;

      // Emit
      if (pending && frameN % EMIT_RATE === 0) {
        emit(pool, pendX, pendY);
        pending = false;
      }

      // Clear
      const W = canvas.parentElement?.getBoundingClientRect().width  || canvas.width;
      const H = canvas.parentElement?.getBoundingClientRect().height || canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Update + draw
      let anyActive = false;
      for (const p of pool) {
        if (!p.active) continue;
        anyActive = true;

        p.vy   += GRAVITY;
        p.vx   *= DRAG;
        p.vy   *= DRAG;
        p.x    += p.vx;
        p.y    += p.vy;
        p.life--;

        if (p.life <= 0) { p.active = false; continue; }

        const t       = p.life / p.maxLife;          // 1→0 as particle dies
        const opacity = t * t;                        // ease-out fade
        const radius  = p.radius * (0.4 + t * 0.6);  // shrink slightly

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${opacity})`;
        ctx.fill();

        // Tiny glow ring on fresh particles
        if (t > 0.7) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${(t - 0.7) * 0.25})`;
          ctx.fill();
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 4 }}
      aria-hidden="true"
    />
  );
}
