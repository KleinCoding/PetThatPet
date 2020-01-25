import React, { useState, useEffect } from "react";
import "./Landing.scss";
import CatPaw3 from "../../Styles/SVG/Icons/catpaw3";
import {
  LogoFloatLarge,
  LogoFloatMed,
  LogoFloatSmall,
  LogoFloatTiny,
  LogoWelcomeBackLarge
} from "../../Styles/SVG/Logos/Logos";
import { Card } from "../Particles/Particles";
import { Card2 } from "../Particles/ParticlesEMPTY";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "../../Styles/transition.css";
import "../../Styles/loading.css";
import { useInterval, useInterval2 } from "../../Hooks/Hooks";

//Force Reflow
try {
  var forceReflowJS = (forceReflowJS = function(a) {
    "use strict";
    void a.offsetHeight;
  }).call.bind(
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight").get
  );
} catch (e) {} //anonyco

//Hooks used for animation states on GuestLanding
export default function GuestLanding(props) {
  const [iconPlayState, setIconPlayState] = useState("paused");
  const [landingPlayState, setLandingPlayState] = useState({
    card: "paused",
    exit: "paused",
    logo: "paused",
    icon: "paused"
  });
  const [profilePlayState, setProfilePlayState] = useState({
    card: "paused",
    exit: "paused",
    logo: "paused",
    icon: "paused"
  });

  //Hooks used for timer states used in useInterval
  const [delay, setDelay] = useState(500);
  const [delay2, setDelay2] = useState(null);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  //Hook used to set View for loading page based on needed view
  const [view, setView] = useState("landing");
  const [view2, setView2] = useState("");

  const enterCard = document.querySelector("#cardEnter");
  const exitCard = document.querySelector("#cardExit");
  const enterLogo = document.querySelector("#logoEnter");
  const exitLogo = document.querySelector("#logoExit");

  function reflowOne(cl) {
    cl.classList.remove("ld");
    forceReflowJS(cl);
    cl.classList.add("ld");
    console.log(count, count2, "reflowONEfinished", cl);
  }

  function AnimReset(e) {

    setLandingPlayState({ exit: "running" });
    setProfilePlayState({ exit: "running" });
    setCount2(0);
    setDelay2(500);
    setView2(e);
   
  }

  //useInterval hook sets an interval delay that is used to pause
  //loading/transition animations on page load
  useInterval(
    () => {
      if (count <= 10) {
        setCount(count + 0.5);
      }
      if (count <= 1) {
        setIconPlayState("running");
      }
      if (count === 1) {
        setLandingPlayState({ logo: "running" });
        setProfilePlayState({ logo: "running" });
      }
      if (count === 2) {
        setLandingPlayState({ exit: "paused" });
        setProfilePlayState({ exit: "paused" });
      }
      if (count <= 2) {
        setLandingPlayState({ card: "running" });
        setProfilePlayState({ card: "running" });
      }
      if (count >= 3) {
        setLandingPlayState({
          card: "paused",
          exit: "paused",
          logo: "paused"
        });
        setProfilePlayState({
          card: "paused",
          exit: "paused",
          logo: "paused"
        });
    
        setCount(0);
        setDelay(null);
        return;
      }
    },
    delay,
    count
  );
  useInterval2(
    () => {
      if (count2 <= 10) {
        setCount2(count2 + 0.5);
      }
      if (count2 <= 1) {
        reflowOne(enterCard);
        reflowOne(enterLogo);
      }
      if (count2 === 1.5) {
        setLandingPlayState({ exit: "paused" });
        setProfilePlayState({ exit: "paused" });
        reflowOne(exitCard);
        reflowOne(exitLogo);
     
      }
      if (count2 === 2 ){
        setLandingPlayState({ logo: "running", card: "running" });
        setProfilePlayState({ logo: "running", card: "running"  });
      }
      if (count2 === 3.0) {
        setLandingPlayState({
          card: "paused",
          exit: "paused",
          logo: "paused"
        });
        setProfilePlayState({
          card: "paused",
          exit: "paused",
          logo: "paused"
        })}
        if(count2 === 3.5 ){
        setCount2(0);
        setDelay2(null);
        return;
      }}
    ,
    delay2,
    count2
  );

  
  //Determines view to load for user based on view variable defined above
  //function called in GuestLanding return
  function GetView(view) {
    if (view === "landing") {
      return ViewLanding();
    } else if (view === "profile") {
      return ViewProfile();
    } else {
      return ViewLanding();
    }
  }

  //Default Return Value augmented by ReturnView function to display page
  return (
    <span id="svgbkg">
      <div style={{ width: "100vw" }}>
        <div
          id="iconHolder"
          className="landingIconHolder"
          class="ld ld-power-on paused"
          style={{
            textAlign: `-webkit-center`,
            animationPlayState: `${iconPlayState}`,
            animationDuration: `1.5s`
          }}
        >
          <div
            id="iconWiggle"
            className="landingIconWiggle"
            class="ld ld-beat paused"
            style={{
              width: `50vw`,
              animationPlayState: `${iconPlayState}`,
              animationDuration: `2.5s`
            }}
          >
            <br />
            <CatPaw3 height="10em" width="10em" />
          </div>
        </div>
        {GetView(view)}
      </div>
      {count}
      {count2}
      <button onClick={() => setLandingPlayState({ exit: "running" })}>
        Exit stage Right
      </button>
    </span>
  );

  function ViewPost() {
    return <div>PostsHere</div>;
  }

  function ViewProfile() {
    return (
      <main>
        <div className="WelcomeSVGHolders">
          <div
            id="logoExit"
            className="welcomeLogoExit"
            class="ld ld-power-off paused"
            style={{
              animationPlayState: `${profilePlayState.exit}`,
              animationDuration: `0.7s`
            }}
          >
            <h1
              id="logoEnter"
              className="welcomeLogoHolders"
              class="ld ld-float-btt-in paused"
              style={{
                animationPlayState: `${profilePlayState.logo}`,
                animationDuration: `1.5s`
              }}
            >
              <div className="welcomeBackLargeHolder">
                <LogoWelcomeBackLarge className="welcomeBackLarge" />
              </div>
            </h1>
          </div>
        </div>
        <div className="column">
          <div className="container">
            <div className="row">
              <div
                id="cardExit"
                className="welcomeCardExit"
                class="ld ld-power-off paused"
                style={{
                  animationPlayState: `${profilePlayState.exit}`,
                  animationDuration: `0.5s`
                }}
              >
                <div
                  id="cardEnter"
                  className="welcomeCardEnter"
                  class="ld ld-spring-ttb-in paused"
                  style={{
                    animationPlayState: `${profilePlayState.card}`,
                    animationDuration: `1s`
                  }}
                >
                  <Card2>
                    <Login />
                  </Card2>
                  <br />
                  <br />
                  <Card2>
                    <Register />
                  </Card2>
                  <button
                    onClick={() => {
                      AnimReset("landing");
                    }}
                  >
                    reset ALL ANIM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  function ViewLanding() {
    return (
      <main>
        <div className="SVGHolders">
          <h1
            id="logoExit"
            className="landingLogoExit"
            class="ld ld-power-off paused"
            style={{
              animationPlayState: `${landingPlayState.exit}`,
              animationDuration: `0.8s`
            }}
          >
            <div
              id="logoEnter"
              className="landingLogoEnter"
              class="ld ld-float-btt-in paused"
              style={{
                animationPlayState: `${landingPlayState.logo}`,
                animationDuration: `1.5s`
              }}
            >
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
          </h1>
        </div>
        <div className="column">
          <div className="container">
            <div className="row">
              <div
                id="cardExit"
                className="landingCardExit"
                class="ld ld-power-off paused"
                style={{
                  animationPlayState: `${landingPlayState.exit}`,
                  animationDuration: `0.5s`
                }}
              >
                <div
                  id="cardEnter"
                  className="landingCardEnter"
                  class="ld ld-power-on paused"
                  style={{
                    animationPlayState: `${landingPlayState.card}`,
                    animationDuration: `1s`
                  }}
                >
                  <Card>
                    <Login />
                  </Card>
                  <br />
                  <br />
                  <Card>
                    <Register />
                  </Card>
                  <button
                    onClick={() => {
                      AnimReset("profile");
                    }}
                  >
                    reset ALL ANIM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}



       {/* <div className="mediumLogoHolder">
          <LogoFloatMed className="logoFloatMed" />
        </div>

        <div className="smallLogoHolder">
          <LogoFloatSmall className="logoFloatSmall" />
        </div>

        <div className="tinyLogoHolder">
          <LogoFloatTiny className="logoFloatTiny" />
        </div> */}


// return (
//   <span id="svgbkg">
//     <div style={{ width: "100vw" }}>
//       <br />
//       <br />
//       <div className="SVGHolders">
//         <div
//           className="catPawHolder"
//           class="ld ld-power-on paused"
//           style={{
//             animationPlayState: `${iconPlayState}`,
//             animationDuration: `1.5s`
//           }}
//         >
//           <CatPaw3 height="10em" width="auto" />
//         </div>

//         <div
//           className="landingLogoHolders"
//           class="ld ld-float-btt-in paused"
//           style={{
//             animationPlayState: `${logoPlayState}`,
//             animationDuration: `2s`
//           }}
//         >
//           <div className="largeLogoHolder">
//             <LogoFloatLarge className="logoFloatLarge" />
//           </div>

//           <div className="mediumLogoHolder">
//             <LogoFloatMed className="logoFloatMed" />
//           </div>

//           <div className="smallLogoHolder">
//             <LogoFloatSmall className="logoFloatSmall" />
//           </div>

//           <div className="tinyLogoHolder">
//             <LogoFloatTiny className="logoFloatTiny" />
//           </div>
//         </div>
//       </div>
//       <div className="column">
//         <div className="container">
//           <div
//             className="row"
//             class="ld ld-spring-ttb-in paused"
//             style={{
//               animationPlayState: `${cardPlayState}`,
//               animationDuration: `3s`
//             }}
//           >
//             <div
//               className="cardExit"
//               class="ld ld-power-off paused"
//               style={{
//                 animationPlayState: `${cardExitState}`,
//                 animationDuration: `2s`
//               }}
//             >
//               <Card>
//                 <Login setCardExitState={setCardExitState()} />
//               </Card>
//               <br />
//               <br />
//               <Card>
//                 <Register setCardExitState={setCardExitState()} />
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </span>
// );

// function reflowArray(els){
//   var i;
//   for( i= 0; i< els.length-1; i++){
//   els[i].classList.remove('.ld')
//   forceReflowJS(els[i])
//   // void els[i].document.offsetHeight
//   els[i].classList.add('.ld')
//  }
// console.log("reflow loop finished", els, els.length)
// }
