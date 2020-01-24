import React from 'react';
import Swimming from './Swimming.svg';
import FloatOut from './FloatOut.svg';
import PowerOn from './PowerOn.svg';


export function  LogoSwimming(props) {
  return (
    <svg version ={1} type="image/svg+xml"  data={Swimming} viewBox="0 0 50 50" {...props}>svg-animation</svg>
  );
}

export function  LogoFloatOut() {
  return (
    <object type="image/svg+xml" data={FloatOut}>svg-animation</object>
  );
}
export function  LogoPowerOn() {
  return (
    <object type="image/svg+xml" data={PowerOn}>svg-animation</object>
  );
}