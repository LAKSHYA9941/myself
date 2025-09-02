import { useState } from "react";

export default function HoverEffect({ children, color1 = "#000", color2 = "#f00", src }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0 });

  function handleMouseMove(e) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const relativeX = e.clientX - bounds.left;
    setPos({ x: relativeX });
  }

  return (
    <span
      className="relative inline-block"
      style={{
        color: hover ? color2 : color1,
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {hover && (
        <img
          src={src}
          alt="tooltip"
          style={{
            position: "absolute",
            bottom: "110%", // keep it a bit higher
            left: `${pos.x}px`,
            transform: "translateX(-50%)",
            minWidth: "150px", // FORCE minimum size
            maxWidth: "250px", // prevent shrinking
            minHeight: "none",
            maxHeight: "200px",
            pointerEvents: "none",
            borderRadius: "1rem",
            zIndex: 50,
            transition: "transform 0.1s ease-out, opacity 0.15s ease-in-out",
            opacity: hover ? 1 : 0,
          }}
        />
      )}
    </span>
  );
}
