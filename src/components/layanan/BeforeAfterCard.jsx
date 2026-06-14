import React, { useState, useRef } from 'react';
import useImageProtection from '../../hooks/useImageProtection';

const BeforeAfterCard = ({ beforeImage, afterImage, label }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  useImageProtection(containerRef);

  const handleSliderMove = (e) => {
    if (!isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 cursor-ew-resize"
        onMouseMove={handleSliderMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        data-protected-image
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 h-full w-full object-cover protected-image"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />

        {/* Before Image (Foreground with clip) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before"
            className="h-full w-full object-cover protected-image"
            style={{ width: containerRef.current?.width || '100%' }}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white">
          Sebelum
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-primary-500/90 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white">
          Sesudah
        </div>
      </div>

      {/* Service Label */}
      <div className="mt-4 text-center">
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterCard;
