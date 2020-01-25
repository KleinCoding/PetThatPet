import React from 'react';
import { useMediaQuery } from 'react-responsive'
//Landing Logos
import Swimming from '../SVG/Logos/Landing/Swimming.svg';
import FloatSmall from '../SVG/Logos/Landing/FloatSmall.svg'
import SwimmingMedium from '../SVG/Logos/Landing/SwimmingMedium.svg'
import SwimmingTiny from '../SVG/Logos/Landing/SwimmingTiny.svg'
//User Profile Logos
import WelcomeBackLarge from '../SVG/Logos/Welcome/WelcomeBackLarge.svg'
import WelcomeBackMed from '../SVG/Logos/Welcome/WelcomeBackMed.svg'
import WelcomeBackSmall from '../SVG/Logos/Welcome/WelcomeBackSmall.svg'
import WelcomeBackTiny from '../SVG/Logos/Welcome/WelcomeBackTiny.svg'

//Icons
import CatPaw3Large from '../SVG/Icons/catpaw3large.svg'
import CatPaw3Med from '../SVG/Icons/catpaw3med.svg'
import CatPaw3Small from '../SVG/Icons/catpaw3small.svg'
import CatPaw3Tiny from '../SVG/Icons/catpaw3tiny.svg'


//Landing Logos Below
export function  LogoFloatLarge() {
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
export function  LogoWelcomeBackMed() {
  return (
    <object type="image/svg+xml" data={WelcomeBackMed}>svg</object>
  );
}
export function  LogoWelcomeBackSmall() {
  return (
    <object type="image/svg+xml" data={WelcomeBackSmall}>svg</object>
  );
}
export function  LogoWelcomeBackTiny() {
  return (
    <object type="image/svg+xml" data={WelcomeBackTiny}>svg</object>
  );
}

//Icons Below
export function  IconCatPaw3Large() {
    return (
      <object type="image/svg+xml" data={CatPaw3Large}>svg</object>
    );
  }
  export function  IconCatPaw3Med() {
    return (
      <object type="image/svg+xml" data={CatPaw3Med}>svg</object>
    );
  }
  export function  IconCatPaw3Small() {
    return (
      <object type="image/svg+xml" data={CatPaw3Small}>svg</object>
    );
  }
  export function  IconCatPaw3Tiny() {
    return (
      <object type="image/svg+xml" data={CatPaw3Tiny}>svg</object>
    );
  }
  






// Media Query Constraints Below
const Large = ({ children }) => {
  const isLarge = useMediaQuery({ minWidth: 800 })
  return isLarge ? children : null
}
const Medium = ({ children }) => {
  const isMedium = useMediaQuery({ minWidth: 551, maxWidth: 799 })
  return isMedium ? children : null
}
const Small = ({ children }) => {
  const isSmall = useMediaQuery({ minWidth: 401, maxWidth: 550 })
  return isSmall ? children : null
}
const Tiny = ({ children }) => {
  const isTiny = useMediaQuery({ minWidth: 100, maxWidth: 400 })
  return isTiny ? children : null
}


//Logos Exported with constraints
export const LandingLogo = () => (
  <div>
    <Large><LogoFloatLarge /></Large>
    <Medium><LogoFloatMed /></Medium>
    <Small><LogoFloatSmall /></Small>
    <Tiny><LogoFloatTiny /></Tiny>
  </div>
)
export const WelcomeLogo = () => (
    <div>
      <Large><LogoWelcomeBackLarge /></Large>
      <Medium><LogoWelcomeBackMed /></Medium>
      <Small><LogoWelcomeBackSmall /></Small>
      <Tiny><LogoWelcomeBackTiny /></Tiny>
    </div>
  )
  
export const CatPaw3 = () => (
    <div>
      <Large><IconCatPaw3Large /></Large>
      <Medium><IconCatPaw3Med /></Medium>
      <Small><IconCatPaw3Small /></Small>
      <Tiny><IconCatPaw3Tiny /></Tiny>
    </div>
  )
  

