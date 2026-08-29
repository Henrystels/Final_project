import { useRef, useEffect } from 'react';

export default function Waveform({ waveform, currentTime, duration, onSeek }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !waveform) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const barWidth = width / waveform.length;
    const progress = duration > 0 ? currentTime / duration : 0;
    const progressX = progress * width;

    // Draw played portion
    waveform.forEach((value, index) => {
      const x = index * barWidth;
      const barHeight = (value / 100) * height;
      const y = (height - barHeight) / 2;

      ctx.fillStyle = x < progressX ? '#9333ea' : '#4a5568';
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });

  }, [waveform, currentTime, duration]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !onSeek) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / canvas.width;
    onSeek(progress * duration);
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={80}
      className="waveform-canvas"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    />
  );
}
