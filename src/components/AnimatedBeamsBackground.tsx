import { useEffect, useRef } from 'react';

const BEAM_COUNT = 28;
const MIN_WIDTH = 28;
const MAX_WIDTH = 85;
const BASE_SPEED = 70;
const MIN_OPACITY = 0.12;
const MAX_OPACITY = 0.3;
const MIN_HUE = 35;
const MAX_HUE = 55;
const ANGLE_MIN = -35;
const ANGLE_MAX = -25;
const RESET_OFFSET = 100;
const ATTRACT_STRENGTH = 0.018;

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speedFactor: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function readCssNumber(name: string, fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

function syncBeamStyle(): {
  minOp: number;
  maxOp: number;
  speedMult: number;
  attract: number;
} {
  return {
    minOp: readCssNumber('--beam-opacity-min', MIN_OPACITY),
    maxOp: readCssNumber('--beam-opacity-max', MAX_OPACITY),
    speedMult: readCssNumber('--beam-speed', 1),
    attract: readCssNumber('--beam-attract', ATTRACT_STRENGTH),
  };
}

export default function AnimatedBeamsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const runningRef = useRef(true);
  const beamStyleRef = useRef(syncBeamStyle());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      const style = syncBeamStyle();
      const beams = Array.from({ length: BEAM_COUNT }, (_, i) =>
        generateBeam(i, true, style.minOp, style.maxOp)
      );
      drawFrame(ctx, beams);
      return;
    }

    let beams: Beam[] = [];
    let rafId: number;
    let lastTime = performance.now();
    let frame = 0;

    const resize = () => {
      beamStyleRef.current = syncBeamStyle();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const s = beamStyleRef.current;
      beams = Array.from({ length: BEAM_COUNT }, (_, i) => generateBeam(i, true, s.minOp, s.maxOp));
    };

    const tick = (now: number) => {
      if (!runningRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (frame++ % 20 === 0) {
        beamStyleRef.current = syncBeamStyle();
      }
      const style = beamStyleRef.current;

      const W = window.innerWidth;
      const H = window.innerHeight;
      const { x: mx } = mouseRef.current;

      ctx.clearRect(0, 0, W, H);

      beams.forEach((beam, idx) => {
        const dx = mx - beam.x;
        beam.x += dx * style.attract * dt * 60;

        beam.y -= BASE_SPEED * beam.speedFactor * dt * style.speedMult;
        beam.pulse += beam.pulseSpeed * dt;

        if (beam.y + beam.length * Math.cos(Math.abs(beam.angle)) < -RESET_OFFSET) {
          Object.assign(beam, generateBeam(idx, false, style.minOp, style.maxOp));
        }

        const pulsing = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        const g = ctx.createLinearGradient(0, 0, 0, beam.length);
        const c = (a: number) => `hsla(${beam.hue}, 85%, 65%, ${a})`;
        g.addColorStop(0.0, c(0));
        g.addColorStop(0.1, c(pulsing * 0.5));
        g.addColorStop(0.4, c(pulsing));
        g.addColorStop(0.6, c(pulsing));
        g.addColorStop(0.9, c(pulsing * 0.5));
        g.addColorStop(1.0, c(0));

        ctx.fillStyle = g;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        runningRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

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
      style={{ filter: 'blur(28px)', background: '#0a0a0a' }}
    />
  );
}

function generateBeam(index: number, initial: boolean, minOp: number, maxOp: number): Beam {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const col = Math.floor(Math.random() * 3);
  const colW = W / 3;
  const baseX = colW * (col + 0.5);
  const xOffset = (Math.random() - 0.5) * colW * 0.55;
  const hue = MIN_HUE + (index / BEAM_COUNT) * (MAX_HUE - MIN_HUE);

  return {
    x: initial ? Math.random() * W : baseX + xOffset,
    y: initial ? Math.random() * H * 1.5 - H * 0.5 : H + RESET_OFFSET,
    width: MIN_WIDTH + Math.random() * (MAX_WIDTH - MIN_WIDTH),
    length: H * 2.5,
    angle: (ANGLE_MIN + Math.random() * (ANGLE_MAX - ANGLE_MIN)) * (Math.PI / 180),
    speedFactor: 0.6 + Math.random() * 0.8,
    opacity: minOp + Math.random() * (maxOp - minOp),
    hue,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.8 + Math.random() * 1.2,
  };
}

function drawFrame(ctx: CanvasRenderingContext2D, beams: Beam[]) {
  beams.forEach((beam) => {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate(beam.angle);
    const g = ctx.createLinearGradient(0, 0, 0, beam.length);
    const c = (a: number) => `hsla(${beam.hue}, 85%, 65%, ${a})`;
    g.addColorStop(0, c(0));
    g.addColorStop(0.4, c(beam.opacity));
    g.addColorStop(0.6, c(beam.opacity));
    g.addColorStop(1, c(0));
    ctx.fillStyle = g;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  });
}
