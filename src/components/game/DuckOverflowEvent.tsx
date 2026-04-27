import { useEffect, useState } from 'react';

const ROWS = 60;
const ROW = '🦆'.repeat(120);

function _anim(i: number): string {
  const variants = ['_dr1', '_dr2', '_dr3', '_dr4'];
  const kf = variants[i % variants.length];
  const dur = (2.6 + ((i * 0.23) % 2.1)).toFixed(2);
  const delay = -((i * 1.37) % 3.8).toFixed(2);
  return `${kf} ${dur}s ease-in-out ${delay}s infinite`;
}

export function DuckOverflowEvent() {
  const [started, setStarted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [retreating, setRetreat] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ts = [
      setTimeout(() => setStarted(true), 50),
      setTimeout(() => setTextVisible(true), 3_500),
      setTimeout(() => setRetreat(true), 52_000),
      setTimeout(() => setDone(true), 73_000),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <>
      <style>{`
        @keyframes _dw  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes _dr1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes _dr2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes _dr3 { 0%,100%{transform:translateY(0)} 35%{transform:translateY(-7px)} 70%{transform:translateY(-2px)} }
        @keyframes _dr4 { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-4px)} 65%{transform:translateY(-8px)} }
        @keyframes _dt  { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {textVisible && (
        <div
          style={{
            position: 'fixed',
            top: '22%',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 9998,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
              color: '#f6c90e',
              whiteSpace: 'nowrap',
              textShadow:
                '0 0 40px rgba(246,201,14,0.9), 0 0 80px rgba(246,201,14,0.4), 0 4px 16px rgba(0,0,0,0.95)',
              animation: '_dt 0.7s cubic-bezier(0.2,0,0,1) both',
            }}
          >
            do not deceive the ducks
          </span>
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: retreating ? '0' : started ? '100vh' : '0',
          transition: retreating
            ? 'height 21s cubic-bezier(0.4,0,0.8,1)'
            : 'height 32s cubic-bezier(0.42,0,1,1)',
          zIndex: 9999,
          overflow: 'hidden',
          pointerEvents: 'auto',
          boxShadow: '0 -6px 32px rgba(246,201,14,0.3)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            fontSize: 28,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            animation: '_dw 1.7s ease-in-out infinite',
            userSelect: 'none',
          }}
        >
          {ROW}
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            paddingTop: 30,
            overflow: 'hidden',
          }}
        >
          {Array.from({ length: ROWS }, (_, i) => (
            <div
              key={i}
              style={{
                fontSize: 26,
                lineHeight: 1.22,
                letterSpacing: 3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                userSelect: 'none',
                animation: _anim(i),
              }}
            >
              {ROW}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
