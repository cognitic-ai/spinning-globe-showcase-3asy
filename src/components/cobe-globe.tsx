"use dom";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface Props {
  dark?: boolean;
  dom?: import("expo/dom").DOMProps;
}

export default function CobeGlobe({ dark = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        widthRef.current = canvas.offsetWidth;
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: dark ? 6 : 1.5,
      baseColor: dark ? [0.3, 0.3, 0.3] : [1, 1, 1],
      markerColor: [0.4, 0.7, 1.0],
      glowColor: dark ? [0.08, 0.08, 0.2] : [1, 1, 1],
      markers: [
        { location: [37.7749, -122.4194], size: 0.06 },
        { location: [40.7128, -74.006], size: 0.06 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.06 },
        { location: [48.8566, 2.3522], size: 0.05 },
        { location: [-33.8688, 151.2093], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.04 },
        { location: [55.7558, 37.6173], size: 0.05 },
        { location: [-23.5505, -46.6333], size: 0.05 },
        { location: [19.4326, -99.1332], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phiRef.current;
        phiRef.current += 0.005;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [dark]);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        margin: 0,
        padding: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          animation: "fadeIn 1s ease forwards",
        }}
      />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: transparent; overflow: hidden; }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
