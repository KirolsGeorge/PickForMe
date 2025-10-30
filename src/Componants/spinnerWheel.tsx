import { useEffect, useRef, useState } from 'react';

type SpinnerWheelProps = {
  items: string[];
  size?: number;
  spinDuration?: number; // seconds
};

const TAU = Math.PI * 2;

// 🎯 Smooth acceleration & deceleration (ease-in-out cubic)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function SpinnerWheel({
  items,
  size = 400,
  spinDuration = 3,
}: SpinnerWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const arc = TAU / Math.max(items.length, 1);

  // 🧠 Draw the wheel every time rotation or items change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const radius = size / 2;
    const center = { x: radius, y: radius };

    // Retina setup
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    // Apply rotation
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    ctx.translate(-center.x, -center.y);

    // 🎨 Draw slices (two alternating colors + radial lines)
    items.forEach((item, i) => {
      const startAngle = i * arc;
      const endAngle = startAngle + arc;

      ctx.fillStyle = i % 2 === 0 ? '#1e2436' : '#000';
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, center.y, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();

      // Radial divider lines
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(
        center.x + Math.cos(startAngle) * radius,
        center.y + Math.sin(startAngle) * radius
      );
      ctx.strokeStyle = '#c126e6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 📝 Text
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(startAngle + arc / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px system-ui';
      ctx.fillText(item, radius - 14, 0);
      ctx.restore();
    });

    ctx.restore();

    // Center dot
    ctx.beginPath();
    ctx.arc(center.x, center.y, 12, 0, TAU);
    ctx.fillStyle = '#111';
    ctx.fill();
  }, [items, rotation, size, arc]);

  // 🎡 Spin logic
  const spin = () => {
    if (spinning || items.length === 0) return;
    setSpinning(true);

    const index = Math.floor(Math.random() * items.length);
    const sliceCenter = index * arc + arc / 2;
    const current = rotation % TAU;
    const targetBase = TAU - sliceCenter;
    const finalRotation =
      current + 6 * TAU + ((targetBase - current + TAU) % TAU);

    const duration = spinDuration * 1000;
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);
      const value = current + (finalRotation - current) * eased;
      setRotation(value);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const selected = items[index];
        setWinner(selected);

        // Open DaisyUI modal automatically
        const modal = document.getElementById(
          'my_modal_2'
        ) as HTMLDialogElement | null;
        modal?.showModal();
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Spinner Canvas */}
        <canvas
          ref={canvasRef}
          className="rounded-full shadow-[0_0_25px_rgba(0,0,0,0.7)]"
          style={{ width: size, height: size }}
        />

        {/* Center Spin Button */}
        <button
          onClick={spin}
          disabled={spinning}
          className="cursor-pointer absolute w-20 h-20 rounded-full flex items-center justify-center bg-linear-to-tr from-fuchsia-500 to-purple-800 border-none text-white font-bold text-lg shadow-lg border-4 border-white/30 active:scale-95 transition-all duration-150"
        >
          {spinning ? '...' : 'SPIN'}
        </button>
      </div>

      {/* 🧩 DaisyUI Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg mb-2">I Choosed:</h3>
          {winner ? (
            <p className="py-4 text-xl font-semibold text-fuchsia-500">
              {winner}
            </p>
          ) : (
            <p className="py-4">No result yet.</p>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
