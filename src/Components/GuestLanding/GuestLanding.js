import React, { useState, useEffect } from "react";
import "./Landing.scss";
import {LandingLogo, WelcomeLogo, CatPaw3} from '../../Styles/SVG/Index'
import { Card2 } from "../Particles/ParticlesEMPTY";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "../../Styles/transition.css";
import "../../Styles/loading.css";
import { useInterval, useInterval2 } from "../../Hooks/Hooks";
// Material UI Tests
import DashboardLogin from "../Material/Login/Login"
import PostCard from "../Material/Card/Card"
import CarouselDisplay from "../Material/Carousel/Carousel"


//Force Reflow function
try {
  var forceReflowJS = (forceReflowJS = function(a) {
    "use strict";
    void a.offsetHeight;
  }).call.bind(
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight").get
  );
} catch (e) {} 

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
  //Hooks for calling classes for animation reflow functions
  const enterCard = document.querySelector("#cardEnter");
  const exitCard = document.querySelector("#cardExit");
  const enterLogo = document.querySelector("#logoEnter");
  const exitLogo = document.querySelector("#logoExit");

  
  //Sets exit animations to run,
  //activates interval2 (forces animation reflows and view change on a timer) 
  function AnimReset(e) {
    setLandingPlayState({ ...landingPlayState, exit: "running" });
    setProfilePlayState({ ...profilePlayState, exit: "running" });
    setCount2(0);
    setDelay2(500);
    setView2(e);
  }

  function reflowOne(cl) {
    cl.classList.remove("ld");
    forceReflowJS(cl);
    cl.classList.add("ld");
    console.log(count, count2, "reflowONEfinished", cl);
  }

  //useInterval hook sets an interval delay timer
  //useInterval1 sets starting values + engages animations on load
  //useInterval2 will be called on necessary view changes to reflow css animations
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
      if (count === 2.5) {
        setLandingPlayState({ exit: "paused" });
        setProfilePlayState({ exit: "paused" });
      }
      if (count <= 2.5) {
        setLandingPlayState({ card: "running" });
        setProfilePlayState({ card: "running" });
      }
      if (count >= 3.5) {
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
        if (count >= 4) {
        setCount(0);
        setDelay(null);
        return;
      }}
    },
    delay,
    count
  );
  useInterval2(
    () => {
      if (count2 <= 10) {
        setCount2(count2 + 0.5);
      }
      if (count2 === 1) {
        reflowOne(enterCard);
        reflowOne(enterLogo);
      }
      if (count2 === 1.5) {
        setLandingPlayState({ ...landingPlayState, exit: "paused" });
        setProfilePlayState({ ...profilePlayState, exit: "paused" });
      }
      if (count2 === 2 ){
        
        setView(view2)

      }
      if (count2 === 2.5) {
       
        setLandingPlayState({...landingPlayState, logo: "running", card: "running" });
        setProfilePlayState({...profilePlayState, logo: "running", card: "running"  });
      }
      if (count2 === 3.5) {
       
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
        if(count2 === 4 ){
            reflowOne(exitLogo)
        reflowOne(exitCard)
        setCount2(0);
        setDelay2(null);
        return;
      }}
    ,
    delay2,
    count2
  );

  

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
            <CatPaw3 />
          </div>
        </div>
        {GetView(view)}
      </div>
    </span>
  );

  //Determines view to load for user based on view variable defined above
  //function called in GuestLanding return
  //call animReset() and send the desired view in via a string EX: "landing"
  function GetView(view) {
    if (view === "landing") {
      return ViewLanding();
    } else if (view === "profile") {
      return ViewProfile();
    // } else if (view === "register") {
    //   return ViewRegister();
    // } else if (view === "newUser") {
    //   return ViewNewUser();
    // } else if (view === "posts") {
    //   return Viewposts();
    } else {
      return ViewLanding();
    }
  }

  //Each viewFunction() populates the default return with the necessary
  //elements to create the desired simulated "page"
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
              <div className="welcomeBackHolder">
                <WelcomeLogo  />
              </div>
            </h1>
          </div>
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
                    animationDuration: `1s`
                  }}
                > 
                <div
                id="cardExit"
                className="welcomeCardExit"
                class="ld ld-power-off paused"
                style={{
                  animationPlayState: `${profilePlayState.exit}`,
                  animationDuration: `0.5s`
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
                    reset ALL ANIM to LANDING
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
              }}>
              <LandingLogo />
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
                  <Card2>
                    <DashboardLogin AnimReset={AnimReset}/>
                  </Card2>
                  <button
                    onClick={() => {
                      AnimReset("profile");
                    }}
                  >
                    reset ALL ANIM to LANDING
                  </button>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  function ViewRegister(){
  }
  function ViewNewUser(){
  }
  function ViewPosts(){
  }
}



 