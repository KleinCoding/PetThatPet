import React, { useState, useRef} from "react";
import { useSpring, animated } from "react-spring";
import ReactParticles from "react-particles-js";
import particlesConfig from "./particles-config.js";
import "./stylesDisplay.scss";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";
import styled from "styled-components";



export default function ParticleBox() {

  const [show, changeShow] = useState(false);
  const [inProp, setInProp] = useState(false);
  const onClick = () => {
    changeShow(prev => {
      return !prev;
    });
  };
  
  return (
    <div className="main">
        <Particles>
          <Hero>
          </Hero>
        </Particles>
    </div>
  );


}



export function  Card2 ({ children }) {

  const ref = useRef();
  const [isHovered, setHovered] = useState(false);

  return (
    <animated.div
      ref={ref}
      className="card"
    >
      {children}
    </animated.div>
  );
}

function Particles({ children, props }) {
  return (
    <div className="actualParticles" style={{ position: "relative" }}>
      <ReactParticles
       
        
      />
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

function Hero2({ children }) {
  return (
    <div className="hero2">
      <div className="hero-body2">{children}</div>
    </div>
  );
}
