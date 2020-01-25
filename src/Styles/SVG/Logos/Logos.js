import React from 'react';

//Landing Logos
import Swimming from './Swimming.svg';
import FloatOut from './FloatOut.svg';
import PowerOn from './PowerOn.svg';
import FloatSmall from './FloatSmall.svg'
import SwimmingMedium from './SwimmingMedium.svg'
import SwimmingTiny from './SwimmingTiny.svg'

//User Profile Logos
import WelcomeBackLarge from '../Welcome/WelcomeBackLarge.svg'


//Landing Logos Below
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


export function  LogoFloatLarge(props) {
  return (
    <object type="image/svg+xml"  data={Swimming}>svg-animation</object>
  );
}

export function  LogoFloatMed() {
  return (
    <object type="image/svg+xml" data={SwimmingMedium}>svg-animation</object>
  );
}

export function  LogoFloatSmall() {
  return (
    <object type="image/svg+xml" data={FloatSmall}>svg-animation</object>
  );
}
export function  LogoFloatTiny() {
  return (
    <object type="image/svg+xml" data={SwimmingTiny}>svg-animation</object>
  );
}


//User Profile Logos Below
export function  LogoWelcomeBackLarge() {
  return (
    <object type="image/svg+xml" data={WelcomeBackLarge}>svg</object>
  );
}
