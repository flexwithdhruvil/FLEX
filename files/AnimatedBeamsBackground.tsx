/**
 * AnimatedBeamsBackground — Optimised
 *
 * Key changes from the original:
 * 1. ctx.filter REMOVED from animation loop — GPU blur via CSS instead
 * 2. IntersectionObserver pauses animation when off-screen
 * 3. Mouse attraction pulls beams gently toward cursor
 * 4. Respects prefers-reduced-motion
 * 5. 120Hz-safe: speed driven by elapsed ms, not frame count
 */
import { useEffect, useRef } from 'react';

const BEAM_COUNT   = 28;
const MIN_WIDTH    = 28;
const MAX_WIDTH    = 85;
const BASE_SPEED   = 70;   // px per second (frame-rate independent)
const MIN_OPACITY  = 0.12;
const MAX_OPACITY  = 0.30;
const MIN_HUE      = 35;
const MAX_HUE      = 55;
const ANGLE_MIN    = -35;
const ANGLE_MAX    = -25;
const RESET_OFFSET = 100;
const ATTRACT_STRENGTH = 0.018; // mouse pull (0 = off, 0.05 = strong)

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speedFactor: number;   // multiplier on BASE_SPEED
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;    // radians per second
}

export default function AnimatedBeamsBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const runningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Reduced-motion: draw one static frame and bail ────────────────────────
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      const beams = Array.from({ length: BEAM_COUNT }, (_, i) => generateBeam(i, true));
      drawFrame(ctx, beams, 0);
      return;
    }

    let beams: Beam[] = [];
    let rafId: number;
    let lastTime = performance.now();

    // ── Canvas sizing ─────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      beams = Array.from({ length: BEAM_COUNT }, (_, i) => generateBeam(i, true));
    };

    // ── Animation loop ────────────────────────────────────────────────────────
    const tick = (now: number) => {
      if (!runningRef.current) { rafId = requestAnimationFrame(tick); return; }

      const dt = Math.min((now - lastTime) / 1000, 0.05); // seconds, capped at 50ms
      lastTime = now;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, W, H);

      beams.forEach((beam, idx) => {
        // ── Mouse attraction ─────────────────────────────────────────────────
        const dx = mx - beam.x;
        beam.x  += dx * ATTRACT_STRENGTH * dt * 60;

        // ── Move ─────────────────────────────────────────────────────────────
        beam.y    -= BASE_SPEED * beam.speedFactor * dt;
        beam.pulse += beam.pulseSpeed * dt;

        // ── Reset when fully above viewport ──────────────────────────────────
        if (beam.y + beam.length * Math.cos(Math.abs(beam.angle)) < -RESET_OFFSET) {
          Object.assign(beam, generateBeam(idx, false));
        }

        // ── Draw ─────────────────────────────────────────────────────────────
        const pulsing = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        const g = ctx.createLinearGradient(0, 0, 0, beam.length);
        const c = (a: number) => `hsla(${beam.hue}, 85%, 65%, ${a})`;
        g.addColorStop(0.0,  c(0));
        g.addColorStop(0.1,  c(pulsing * 0.5));
        g.addColorStop(0.4,  c(pulsing));
        g.addColorStop(0.6,  c(pulsing));
        g.addColorStop(0.9,  c(pulsing * 0.5));
        g.addColorStop(1.0,  c(0));

        ctx.fillStyle = g;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });

      rafId = requestAnimationFrame(tick);
    };

    // ── IntersectionObserver: pause when off-screen ───────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => { runningRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    resize();
    rafId = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      // ↓ GPU compositor blur — one pass, not per-frame CPU blur
      style={{ filter: 'blur(28px)', background: '#0a0a0a' }}
    />
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function generateBeam(index: number, initial: boolean): Beam {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const col      = Math.floor(Math.random() * 3);
  const colW     = W / 3;
  const baseX    = colW * (col + 0.5);
  const xOffset  = (Math.random() - 0.5) * colW * 0.55;
  const hue      = MIN_HUE + (index / BEAM_COUNT) * (MAX_HUE - MIN_HUE);

  return {
    x:           initial ? Math.random() * W : baseX + xOffset,
    y:           initial ? Math.random() * H * 1.5 - H * 0.5 : H + RESET_OFFSET,
    width:       MIN_WIDTH + Math.random() * (MAX_WIDTH - MIN_WIDTH),
    length:      H * 2.5,
    angle:       (ANGLE_MIN + Math.random() * (ANGLE_MAX - ANGLE_MIN)) * (Math.PI / 180),
    speedFactor: 0.6 + Math.random() * 0.8,
    opacity:     MIN_OPACITY + Math.random() * (MAX_OPACITY - MIN_OPACITY),
    hue,
    pulse:       Math.random() * Math.PI * 2,
    pulseSpeed:  0.8 + Math.random() * 1.2,  // rad/s
  };
}

function drawFrame(ctx: CanvasRenderingContext2D, beams: Beam[], _dt: number) {
  beams.forEach(beam => {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate(beam.angle);
    const g = ctx.createLinearGradient(0, 0, 0, beam.length);
    const c = (a: number) => `hsla(${beam.hue}, 85%, 65%, ${a})`;
    g.addColorStop(0, c(0)); g.addColorStop(0.4, c(beam.opacity));
    g.addColorStop(0.6, c(beam.opacity)); g.addColorStop(1, c(0));
    ctx.fillStyle = g;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  });
}
