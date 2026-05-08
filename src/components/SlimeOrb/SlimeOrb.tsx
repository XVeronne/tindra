import * as React from 'react';
import { cn } from '@/lib/cn';

const TAU = Math.PI * 2;

export type SlimeEyeState = 'idle' | 'curious' | 'surprised' | 'playful' | 'sleepy' | 'happy';

const EYE_SHAPES: Record<SlimeEyeState, { w: number; h: number; br: number }> = {
  idle: { w: 34, h: 50, br: 17 },
  curious: { w: 32, h: 54, br: 16 },
  surprised: { w: 48, h: 62, br: 24 },
  playful: { w: 36, h: 46, br: 18 },
  sleepy: { w: 36, h: 14, br: 7 },
  happy: { w: 40, h: 22, br: 20 }
};

export interface SlimeOrbProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  size?: number;
  baseRatio?: number;
  amp?: number;
  orbit?: number;
  repelRadius?: number;
  repelForce?: number;
  eyeGap?: number;
  eyeScale?: number;
  showEyes?: boolean;
  interactive?: boolean;
  paused?: boolean;
}

export const SlimeOrb = React.forwardRef<HTMLDivElement, SlimeOrbProps>(
  (
    {
      size = 620,
      baseRatio = 0.27,
      amp = 0.055,
      orbit = 0.7,
      repelRadius = 0.75,
      repelForce = 1.0,
      eyeGap = 14,
      eyeScale = 1,
      showEyes = true,
      interactive = true,
      paused = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const eyesRef = React.useRef<HTMLDivElement>(null);
    const eyeLRef = React.useRef<HTMLSpanElement>(null);
    const eyeRRef = React.useRef<HTMLSpanElement>(null);

    const cfgRef = React.useRef({
      baseRatio,
      amp,
      orbit,
      repelRadius,
      repelForce,
      paused,
      interactive
    });
    cfgRef.current = { baseRatio, amp, orbit, repelRadius, repelForce, paused, interactive };

    React.useEffect(() => {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      let W = size;
      let H = size;
      let CX = W / 2;
      let CY = H / 2;

      const resize = () => {
        W = wrap.offsetWidth || size;
        H = wrap.offsetHeight || size;
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        CX = W / 2;
        CY = H / 2;
      };
      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      const N = 80;
      const r_d = new Float32Array(N);
      const v_d = new Float32Array(N);

      const mouse = {
        x: -1e6,
        y: -1e6,
        px: -1e6,
        py: -1e6,
        active: false,
        inside: false,
        wasInside: false,
        speed: 0
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!cfgRef.current.interactive) return;
        const r = wrap.getBoundingClientRect();
        const sx = r.width === 0 ? 1 : wrap.offsetWidth / r.width;
        const sy = r.height === 0 ? 1 : wrap.offsetHeight / r.height;
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        mouse.x = (e.clientX - r.left) * sx;
        mouse.y = (e.clientY - r.top) * sy;
        mouse.active = true;
      };
      const onPointerLeave = () => {
        mouse.active = false;
        mouse.inside = false;
      };
      wrap.addEventListener('pointermove', onPointerMove);
      wrap.addEventListener('pointerleave', onPointerLeave);

      const distToCenter = (x: number, y: number) => Math.hypot(x - CX, y - CY);

      const buildPath = (pts: { x: number; y: number }[], inset = 0) => {
        const p =
          inset === 0
            ? pts
            : pts.map((q) => ({
                x: CX + (q.x - CX) * (1 - inset),
                y: CY + (q.y - CY) * (1 - inset)
              }));
        const n = p.length;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const p0 = p[(i - 1 + n) % n];
          const p1 = p[i];
          const p2 = p[(i + 1) % n];
          const p3 = p[(i + 2) % n];
          if (i === 0) ctx.moveTo(p1.x, p1.y);
          const c1x = p1.x + (p2.x - p0.x) / 6;
          const c1y = p1.y + (p2.y - p0.y) / 6;
          const c2x = p2.x - (p3.x - p1.x) / 6;
          const c2y = p2.y - (p3.y - p1.y) / 6;
          ctx.bezierCurveTo(c1x, c1y, c2x, c2y, p2.x, p2.y);
        }
        ctx.closePath();
      };

      const physicsStep = (baseR: number) => {
        const kAnchor = 0.06;
        const kNeigh = 0.22;
        const damp = 0.82;
        const a = new Float32Array(N);

        for (let i = 0; i < N; i++) {
          const l = r_d[(i - 1 + N) % N];
          const c = r_d[i];
          const rr = r_d[(i + 1) % N];
          a[i] = -kAnchor * c + kNeigh * (l + rr - 2 * c);
        }

        if (mouse.active) {
          const repelR = baseR * cfgRef.current.repelRadius;
          for (let i = 0; i < N; i++) {
            const ang = (i / N) * TAU;
            const px = CX + Math.cos(ang) * (baseR + r_d[i]);
            const py = CY + Math.sin(ang) * (baseR + r_d[i]);
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < repelR && d > 0.001) {
              const nx = Math.cos(ang);
              const ny = Math.sin(ang);
              const ux = dx / d;
              const uy = dy / d;
              const radial = ux * nx + uy * ny;
              const falloff = 1 - d / repelR;
              const force =
                cfgRef.current.repelForce * baseR * 0.12 * falloff * falloff * radial;
              a[i] += force;
            }
          }
        }

        for (let i = 0; i < N; i++) {
          v_d[i] = (v_d[i] + a[i]) * damp;
          r_d[i] += v_d[i];
        }
      };

      const EYE = {
        gx: 0,
        gy: 0,
        wx: 0,
        wy: 0,
        wT: 0,
        wSeq: 0,
        blinkTarget: 0,
        blink: 0,
        nextBlink: 1.8,
        name: 'idle' as SlimeEyeState,
        stateUntil: 0,
        pokes: 0,
        lastPokeT: -10,
        idleSince: 0
      };

      const setEyeState = (name: SlimeEyeState, now: number, holdFor = 0) => {
        if (EYE.name === name && holdFor === 0) return;
        EYE.name = name;
        EYE.stateUntil = holdFor > 0 ? now + holdFor : 0;
        const shape = EYE_SHAPES[name];
        const sw = shape.w * eyeScale;
        const sh = shape.h * eyeScale;
        const sbr = shape.br * eyeScale;
        if (eyeLRef.current && eyeRRef.current) {
          eyeLRef.current.style.width = `${sw}px`;
          eyeLRef.current.style.height = `${sh}px`;
          eyeLRef.current.style.borderRadius = `${sbr}px`;
          eyeRRef.current.style.width = `${sw}px`;
          eyeRRef.current.style.height = `${sh}px`;
          eyeRRef.current.style.borderRadius = `${sbr}px`;
        }
      };
      setEyeState('idle', 0);

      const updateEyes = (t: number, baseR: number) => {
        if (!showEyes || !eyeLRef.current || !eyeRRef.current || !eyesRef.current) return;
        const dt = 1 / 60;
        const maxReach = baseR * 0.16;
        let tx = 0;
        let ty = 0;

        if (mouse.active) {
          const dx = mouse.x - CX;
          const dy = mouse.y - CY;
          const d = Math.hypot(dx, dy) || 1;
          const reach = Math.min(d, maxReach) / d;
          tx = dx * reach;
          ty = dy * reach;
        } else {
          if (t > EYE.wT) {
            const maxX = maxReach * 0.85;
            const maxY = maxReach * 0.5;
            const seq = EYE.wSeq;
            let dur = 1.2;
            if (seq === 0) {
              EYE.wx = 0;
              EYE.wy = 0;
              dur = 0.9;
            } else if (seq === 1) {
              EYE.wx = -maxX * (0.7 + Math.random() * 0.3);
              EYE.wy = (Math.random() - 0.5) * maxY;
              dur = 1.4;
            } else if (seq === 2) {
              EYE.wx = 0;
              EYE.wy = 0;
              dur = 0.7;
            } else if (seq === 3) {
              EYE.wx = maxX * (0.7 + Math.random() * 0.3);
              EYE.wy = (Math.random() - 0.5) * maxY;
              dur = 1.4;
            } else if (seq === 4) {
              EYE.wx = 0;
              EYE.wy = 0;
              dur = 0.9;
            } else {
              EYE.wx = (Math.random() - 0.5) * maxX * 0.5;
              EYE.wy = (Math.random() - 0.5) * maxY;
              dur = 1.1;
            }
            EYE.wT = t + dur;
            EYE.wSeq = (seq + 1) % 6;
          }
          tx = EYE.wx;
          ty = EYE.wy;
        }

        const k = EYE.name === 'surprised' ? 0.18 : 0.08;
        EYE.gx += (tx - EYE.gx) * k;
        EYE.gy += (ty - EYE.gy) * k;

        const mouseInside = mouse.active && distToCenter(mouse.x, mouse.y) < baseR * 0.9;
        mouse.inside = mouseInside;

        if (EYE.stateUntil > 0 && t > EYE.stateUntil) EYE.stateUntil = 0;
        if (EYE.stateUntil === 0) {
          if (mouseInside && t - EYE.lastPokeT < 2.5 && EYE.pokes >= 3) {
            setEyeState('playful', t);
          } else if (mouseInside) {
            setEyeState('curious', t);
          } else if (mouse.active) {
            setEyeState('idle', t);
          } else if (t - EYE.idleSince > 7) {
            setEyeState('sleepy', t);
          } else {
            setEyeState('idle', t);
          }
        }
        if (!mouse.active) {
          if (EYE.idleSince === 0) EYE.idleSince = t;
        } else {
          EYE.idleSince = 0;
        }

        EYE.nextBlink -= dt;
        if (EYE.nextBlink <= 0 && EYE.name !== 'sleepy' && EYE.name !== 'happy') {
          EYE.blinkTarget = 1;
          window.setTimeout(() => {
            EYE.blinkTarget = 0;
          }, 90);
          EYE.nextBlink = 2.5 + Math.random() * 4.5;
        }
        const bTarget = EYE.name === 'sleepy' ? 0.85 : EYE.blinkTarget;
        EYE.blink += (bTarget - EYE.blink) * 0.35;
        const openY = 1 - EYE.blink * 0.95;

        const bob = Math.sin(t * 0.9) * (EYE.name === 'sleepy' ? 0.4 : 1.4);
        eyesRef.current.style.transform = `translate3d(${EYE.gx.toFixed(2)}px, ${(EYE.gy + bob).toFixed(2)}px, 0)`;

        let poolDisp = 0;
        for (let i = 0; i < N; i++) poolDisp += Math.abs(r_d[i]);
        poolDisp /= N;
        const poolFactor = Math.min(1, poolDisp / (baseR * 0.05));

        const wL = EYE.name === 'playful' ? Math.sin(t * 5.1) * 0.05 : 0;
        const wR = EYE.name === 'playful' ? Math.sin(t * 5.1 + 1.3) * 0.05 : 0;
        const sL = openY * (1 - poolFactor * 0.08) + wL;
        const sR = openY * (1 - poolFactor * 0.08) + wR;
        const cxL = 1 + poolFactor * 0.05 - wL;
        const cxR = 1 + poolFactor * 0.05 - wR;
        eyeLRef.current.style.transform = `scaleY(${sL.toFixed(3)}) scaleX(${cxL.toFixed(3)})`;
        eyeRRef.current.style.transform = `scaleY(${sR.toFixed(3)}) scaleX(${cxR.toFixed(3)})`;
      };

      const updateEntryEvent = (t: number, baseR: number) => {
        if (!mouse.active) {
          mouse.wasInside = false;
          return;
        }
        const inside = distToCenter(mouse.x, mouse.y) < baseR * 1.05;
        if (inside && !mouse.wasInside) {
          setEyeState('surprised', t, 0.6);
          EYE.pokes += 1;
          EYE.lastPokeT = t;
        }
        mouse.wasInside = inside;

        const dx = mouse.x - mouse.px;
        const dy = mouse.y - mouse.py;
        const mv = Math.hypot(dx, dy);
        mouse.speed = mouse.speed * 0.7 + mv * 0.3;
        if (inside && mouse.speed > 10 && t - EYE.lastPokeT > 0.25) {
          EYE.pokes += 1;
          EYE.lastPokeT = t;
        }
        if (t - EYE.lastPokeT > 3) EYE.pokes = Math.max(0, EYE.pokes - 1);
      };

      let raf = 0;
      const tick = (tMs: number) => {
        if (cfgRef.current.paused) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const t = tMs * 0.001;
        const baseR = Math.min(W, H) * cfgRef.current.baseRatio;

        updateEntryEvent(t, baseR);
        physicsStep(baseR);

        const orbitC = cfgRef.current.orbit;
        const ampF = cfgRef.current.amp;
        const pts: { x: number; y: number }[] = new Array(N);
        for (let i = 0; i < N; i++) {
          const ang = (i / N) * TAU;
          const w1 = Math.sin(orbitC * t + 2 * ang);
          const w2 = Math.sin(orbitC * t * 1.37 + 3 * ang + 1.2);
          const w3 = Math.sin(orbitC * t * 0.73 + 5 * ang - 0.7);
          const swirl = (w1 * 0.55 + w2 * 0.3 + w3 * 0.2) * baseR * ampF;
          const rr = baseR + swirl + r_d[i];
          pts[i] = { x: CX + Math.cos(ang) * rr, y: CY + Math.sin(ang) * rr };
        }

        ctx.clearRect(0, 0, W, H);

        const haloR = baseR * 1.55;
        const halo = ctx.createRadialGradient(CX, CY, baseR * 0.85, CX, CY, haloR);
        halo.addColorStop(0, 'rgba(232,188,145,0.30)');
        halo.addColorStop(0.55, 'rgba(232,188,145,0.10)');
        halo.addColorStop(1, 'rgba(232,188,145,0)');
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        buildPath(pts, 0);
        const gA = ctx.createRadialGradient(
          CX,
          CY - baseR * 0.15,
          baseR * 0.1,
          CX,
          CY,
          baseR * 1.05
        );
        gA.addColorStop(0, 'rgba(240,204,162,0.85)');
        gA.addColorStop(0.7, 'rgba(232,190,142,0.80)');
        gA.addColorStop(1, 'rgba(221,174,120,0.78)');
        ctx.shadowColor = 'rgba(224,185,140,0.55)';
        ctx.shadowBlur = baseR * 0.18;
        ctx.fillStyle = gA;
        ctx.fill();
        ctx.restore();

        buildPath(pts, 0.18);
        const gB = ctx.createRadialGradient(
          CX,
          CY - baseR * 0.1,
          baseR * 0.05,
          CX,
          CY,
          baseR * 0.8
        );
        gB.addColorStop(0, 'rgba(224,178,130,0.58)');
        gB.addColorStop(1, 'rgba(210,162,112,0.58)');
        ctx.fillStyle = gB;
        ctx.fill();

        buildPath(pts, 0.38);
        const gC = ctx.createRadialGradient(
          CX,
          CY - baseR * 0.05,
          baseR * 0.02,
          CX,
          CY,
          baseR * 0.55
        );
        gC.addColorStop(0, 'rgba(205,158,105,0.55)');
        gC.addColorStop(1, 'rgba(195,148,95,0.55)');
        ctx.fillStyle = gC;
        ctx.fill();

        updateEyes(t, baseR);

        ctx.save();
        buildPath(pts, 0.05);
        ctx.clip();
        const sheen = ctx.createRadialGradient(
          CX - baseR * 0.32,
          CY - baseR * 0.42,
          2,
          CX - baseR * 0.32,
          CY - baseR * 0.42,
          baseR * 0.55
        );
        sheen.addColorStop(0, 'rgba(255,243,222,0.38)');
        sheen.addColorStop(1, 'rgba(255,243,222,0)');
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();

        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        wrap.removeEventListener('pointermove', onPointerMove);
        wrap.removeEventListener('pointerleave', onPointerLeave);
      };
    }, [size, eyeScale, showEyes]);

    return (
      <div
        ref={(node) => {
          wrapRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn('relative grid place-items-center', className)}
        style={{ width: size, height: size, ...style }}
        {...rest}
      >
        <canvas ref={canvasRef} className="absolute inset-0 block" />
        {showEyes && (
          <div
            ref={eyesRef}
            className="relative z-10 flex pointer-events-none will-change-transform"
            style={{ gap: eyeGap }}
          >
            <span
              ref={eyeLRef}
              className="block bg-paper-raised will-change-transform"
              style={{
                width: 34 * eyeScale,
                height: 50 * eyeScale,
                borderRadius: 17 * eyeScale,
                transformOrigin: 'center',
                transition:
                  'width 320ms cubic-bezier(.25,.1,.25,1), height 320ms cubic-bezier(.25,.1,.25,1), border-radius 320ms cubic-bezier(.25,.1,.25,1)',
                boxShadow:
                  '0 0 0 1px rgba(200,160,120,0.08), 0 4px 12px rgba(200,150,100,0.18), inset 0 -4px 7px rgba(230,190,140,0.18)'
              }}
            />
            <span
              ref={eyeRRef}
              className="block bg-paper-raised will-change-transform"
              style={{
                width: 34 * eyeScale,
                height: 50 * eyeScale,
                borderRadius: 17 * eyeScale,
                transformOrigin: 'center',
                transition:
                  'width 320ms cubic-bezier(.25,.1,.25,1), height 320ms cubic-bezier(.25,.1,.25,1), border-radius 320ms cubic-bezier(.25,.1,.25,1)',
                boxShadow:
                  '0 0 0 1px rgba(200,160,120,0.08), 0 4px 12px rgba(200,150,100,0.18), inset 0 -4px 7px rgba(230,190,140,0.18)'
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
SlimeOrb.displayName = 'SlimeOrb';
