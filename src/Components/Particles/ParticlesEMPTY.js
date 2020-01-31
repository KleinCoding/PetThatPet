import React, { useRef } from "react";
import { animated } from "react-spring";
import ReactParticles from "react-particles-js";

export default function ParticleBox() {
  return (
    <div className="main">
      <Particles>
        <Hero></Hero>
      </Particles>
    </div>
  );
}

export function Card2({ children }) {
  const ref = useRef();

  return (
    <animated.div ref={ref} className="card">
      {children}
    </animated.div>
  );
}

function Particles({ children, props }) {
  return (
    <div className="actualParticles" style={{ position: "relative" }}>
      <ReactParticles />
      {children && <div style={{ position: "relative" }}>{children}</div>}
    </div>
  );
}

export function Hero({ children }) {
  return (
    <div className="hero">
      <div className="hero-body">{children}</div>
    </div>
  );
}
