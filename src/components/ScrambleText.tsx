import { useEffect, useState, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}

export default function ScrambleText({ text, className = '', delay = 0, trigger = true }: ScrambleTextProps) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [trigger, delay]);

  useEffect(() => {
    if (!started) return;
    let iteration = 0;
    const totalFrames = text.length * 6;

    intervalRef.current = setInterval(() => {
      const result = text.split('').map((char, idx) => {
        if (idx < Math.floor(iteration / 6)) return char;
        if (char === ' ') return ' ';
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      setDisplay(result);
      iteration++;
      if (iteration > totalFrames) {
        setDisplay(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, text]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {display || text.replace(/./g, '\u00A0')}
    </span>
  );
}
