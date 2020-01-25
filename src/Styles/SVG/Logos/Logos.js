import React from 'react';
import { useMediaQuery } from 'react-responsive'
//Landing Logos
import Swimming from './Swimming.svg';
import FloatSmall from './FloatSmall.svg'
import SwimmingMedium from './SwimmingMedium.svg'
import SwimmingTiny from './SwimmingTiny.svg'
//User Profile Logos
import WelcomeBackLarge from '../Welcome/WelcomeBackLarge.svg'


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



const Large = ({ children }) => {
  const isLarge = useMediaQuery({ minWidth: 800 })
  return isLarge ? children : null
}
const Medium = ({ children }) => {
  const isMedium = useMediaQuery({ minWidth: 551, maxWidth: 799 })
  return isMedium ? children : null
}
const Small = ({ children }) => {
  const isSmall = useMediaQuery({ minWidth: 375, maxWidth: 550 })
  return isSmall ? children : null
}
const Tiny = ({ children }) => {
  const isTiny = useMediaQuery({ minWidth: 100, maxWidth: 374 })
  return isTiny ? children : null
}

export const LandingLogo = () => (
  <div>
    <Large><LogoFloatLarge /></Large>
    <Medium><LogoFloatMed /></Medium>
    <Small><LogoFloatSmall /></Small>
    <Tiny><LogoFloatTiny /></Tiny>
  </div>
)
































// const Logos = props => {
//   switch(props.name) {
//     case "floatLarge":
//       return <Phone {...props} />;
//     case "floatMed":
//       return <Messages {...props} />;
//     default:
//       return <div />;
//   }
// }
// export default Icon;

// const size = {
//   mobileS: '320px',
//   mobileM: '375px',
//   mobileL: '425px',
//   tablet: '768px',
//   laptop: '1024px',
//   laptopL: '1440px',
//   desktop: '2560px'
// }

// export const device = {
//   mobileS: `(min-width: ${size.mobileS})`,
//   mobileM: `(min-width: ${size.mobileM})`,
//   mobileL: `(min-width: ${size.mobileL})`,
//   tablet: `(min-width: ${size.tablet})`,
//   laptop: `(min-width: ${size.laptop})`,
//   laptopL: `(min-width: ${size.laptopL})`,
//   desktop: `(min-width: ${size.desktop})`,
//   desktopL: `(min-width: ${size.desktop})`
// };