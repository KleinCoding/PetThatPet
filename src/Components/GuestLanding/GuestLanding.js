import React from "react";
import "./Landing.scss";
import CatPaw3 from "../../Styles/SVG/Icons/catpaw3";
import {
  LogoFloatLarge,
  LogoFloatMed,
  LogoFloatSmall,
  LogoFloatTiny
} from "../../Styles/SVG/Logos/Logos";
import { Card } from "../Particles/Particles";
import Login from "../Login/Login"
import Register from "../Register/Register"

export default function GuestLanding(props) {
  return (
    <span id="svgbkg">
      <div style={{ width: "100vw" }}>
        <br />
       <br />
        <div className="SVGHolder">
          <CatPaw3 height="10em" width="auto" className="catPawSVG" />
          
          <div className="largeLogoHolder">
            <LogoFloatLarge className="logoFloatLarge" />
          </div>
          <div className="mediumLogoHolder">
            <LogoFloatMed className="logoFloatMed" />
          </div>
          <div className="smallLogoHolder">
            <LogoFloatSmall className="logoFloatSmall" />
          </div>
          <div className="tinyLogoHolder">
            <LogoFloatTiny className="logoFloatTiny" />
          </div>
       
      </div>
      <div className="column">
          <div className="container">
            <div className="row">
      <Card>
        <Login />
        </Card>
        <br/>
        <br/>
        <Card>
        <Register />
        </Card>
    </div>
    </div>
    </div> </div>
    </span>
  );
}
