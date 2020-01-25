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
import Login from "../Login/Login";
import Register from "../Register/Register";
import "../../Styles/transition.css";
import "../../Styles/loading.css";
import { useInterval } from "../../Hooks/Hooks";

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
  const [delay, setDelay] = useState(1000);
  const [count, setCount] = useState(0);
  //Hook used to set View for loading page based on needed view
  const [view, setView] = useState("landing");

  // buildArrays = (e) => {

  const idsList = document.querySelectorAll(
    "#iconHolder, #iconWiggle, #logoEnter, #logoExit, #cardEnter, #cardExit"
  );

  const cardEnterList = document.querySelectorAll("#cardEnter");
  const cardExitList = document.querySelectorAll("#cardExit");
  const logoEnterList = document.querySelectorAll("#logoEnter");
  const logoExitList = document.querySelectorAll("#logoExit");
  const idsArray = [...idsList];
  const cardEnterArray = [...cardEnterList];
  const cardExitArray = [...cardExitList];
  const logoEnterArray = [...logoEnterList];
  const logoExitArray = [...logoExitList];

  function cardEnterReset(e) {
    e.classList.remove("ld", "spring-ttb-in", "paused");
    void e.offsetHeight;
    e.classList.add("ld", "spring-ttb-in", "paused");
  }
  function logoEnterReset(e) {
    e.classList.remove("ld", "ld-float-btt-in", "paused");
    void e.offsetWidth;
    e.classList.add("ld", "ld-float-btt-in", "paused");
  }
  function cardExitReset(e) {
    e.classList.remove("ld", "power-off", "paused");
    void e.offsetHeight;
    e.classList.add("ld", "power-off", "paused");
  }
  function logoExitReset(e) {
    e.classList.remove("ld", "power-off", "paused");
    void e.offsetWidth;
    e.classList.add("ld", "power-off", "paused");
  }

  function animReset() {
    cardEnterArray.forEach(e => {
      cardEnterReset(e);
    });
    cardExitArray.forEach(e => {
      cardExitReset(e);
    });
    logoEnterArray.forEach(e => {
      logoEnterReset(e);
    });
    logoExitArray.forEach(e => {
      logoExitReset(e);
    });
    console.log(
      "anime reset fired",
      cardEnterArray,
      cardExitArray,
      logoEnterArray,
      logoExitArray
    );
  }

  function changeView(view) {
    animReset();
    setCount(0);
    setDelay(1000);
    setView(view);
  }

  //useInterval hook sets an interval delay that is used to pause
  //loading/transition animations on page load
  useInterval(
    () => {
      if (count <= 10) {
        setCount(count + 1);
      }
      if (count <= 1) {
        setIconPlayState("running");
      }
      if (count === 1) {
        setLandingPlayState({ logo: "running" });
        setProfilePlayState({ logo: "running" });
      }
      if (count === 2) {
        setLandingPlayState({ card: "running" });
        setProfilePlayState({ card: "running" });
      }
      if (count >= 6) {
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

  function StateReset(view) {
    setCount(0);
    setDelay(1000);
    setView(view);
  }

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
          <h1
            id="logoEnter"
            className="welcomeLogoHolders"
            class="ld ld-float-btt-in paused"
            style={{
              animationPlayState: `${profilePlayState.logo}`,
              animationDuration: `2s`
            }}
          >
            <div
              id="logoExit"
              className="welcomeLogoExit"
              class="ld ld-power-off paused"
              style={{
                animationPlayState: `${profilePlayState.exit}`,
                animationDuration: `2s`
              }}
            >
              <div className="welcomeBackLargeHolder">
                <LogoWelcomeBackLarge className="welcomeBackLarge" />
              </div>

              {/* <div className="mediumLogoHolder">
          <LogoFloatMed className="logoFloatMed" />
        </div>

        <div className="smallLogoHolder">
          <LogoFloatSmall className="logoFloatSmall" />
        </div>

        <div className="tinyLogoHolder">
          <LogoFloatTiny className="logoFloatTiny" />
        </div> */}
            </div>
          </h1>
        </div>
        <div className="column">
          <div className="container">
            <div className="row">
              <div
                id="cardEnter"
                className="welcomeCardEnter"
                class="ld ld-spring-ttb-in paused"
                style={{
                  animationPlayState: `${profilePlayState.card}`,
                  animationDuration: `3s`
                }}
              >
                <div
                  id="cardExit"
                  className="welcomeCardExit"
                  class="ld ld-power-off paused"
                  style={{
                    animationPlayState: `${profilePlayState.exit}`,
                    animationDuration: `2s`
                  }}
                >
                  <Card></Card>
                  <br />
                  <br />
                  <Card></Card>
                  <button onClick={() => {changeView("landing")}}>
                View to Landing
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
          <div
            id="logoEnter"
            className="landingLogoEnter"
            class="ld ld-float-btt-in paused"
            style={{
              animationPlayState: `${landingPlayState.logo}`,
              animationDuration: `2s`
            }}
          >
            <h1
              id="logoExit"
              className="landingLogoExit"
              class="ld ld-power-off paused"
              style={{
                animationPlayState: `${landingPlayState.exit}`,
                animationDuration: `2s`
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
            </h1>
          </div>
        </div>
        <div className="column">
          <div className="container">
            <div className="row">
              <div
                id="cardEnter"
                className="landingCardEnter"
                class="ld ld-spring-ttb-in paused"
                style={{
                  animationPlayState: `${landingPlayState.card}`,
                  animationDuration: `3s`
                }}
              >
                <div
                  id="cardExit"
                  className="landingCardExit"
                  class="ld ld-power-off paused"
                  style={{
                    animationPlayState: `${landingPlayState.exit}`,
                    animationDuration: `3.5s`
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
        onClick={() => {changeView("profile")}}
      >
        View to Profile
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
