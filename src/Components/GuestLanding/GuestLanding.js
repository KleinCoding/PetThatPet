import React from 'react';
import './Landing.scss'
import CatPaw3 from "../../Styles/SVG/Icons/catpaw3"
import {LogoSwimming, LogoPowerOn, LogoFloatOut} from "../../Styles/SVG/Logos/Logos"


 
export default function GuestLanding(props) {
 
    return (
       <span id="svgbkg">
         <div>
     
  
      <div>
      <h1>Welcome to PawVotes!</h1> 
      <div>
       
     <CatPaw3 height= "10em" width ="auto" />
     <div className ="SwimmingLogo">
     <LogoSwimming width={1000} height={200} />
     </div>

     <LogoPowerOn />
     <LogoFloatOut />
     </div>
     <div>
    
    </div>
     <div>
    
    </div>
      </div>
       </div>
    </span>
    )

}

