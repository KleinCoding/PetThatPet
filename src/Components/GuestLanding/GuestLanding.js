import React, { useState, useEffect } from "react";
import "./Landing.scss";
import { LandingLogo, WelcomeLogo, NewUserLogo, CatPaw3 } from "../../Styles/SVG/Index";
import { Card2 } from "../Particles/ParticlesEMPTY";
import AddPost from "../UserProfile/AddPost/AddPost"
// import EditPost from "../UserProfile/EditPost/EditPost"
import "../../Styles/transition.css";
import "../../Styles/loading.css";
import { useInterval, useInterval2 } from "../../Hooks/Hooks";
// Material UI 
import DashboardLogin from "../Material/Login/Login";
import DashboardRegister from "../Material/Register/Register"



try {//Force Reflow function
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

  //Hook used for image upload status in Add Post passed as prop
  // const [submitReady, setSubmitReady] = useState(false)

  //Hook used to set View for loading page based on needed view
  const [view, setView] = useState("landing");
  const [view2, setView2] = useState("");

  //Hook used to set view for Login or Register fields
  const [isNewUser, setNewUser] = useState(false)

  //Hooks for calling classes for animation reflow functions
  const enterCard = document.querySelector("#cardEnter");
  const exitCard = document.querySelector("#cardExit");
  const enterLogo = document.querySelector("#logoEnter");
  const exitLogo = document.querySelector("#logoExit");
  const bkg = document.querySelector("#wallpaper")
  //Sets exit animations to run +
  //activates interval2 
  //(forces animation reflows and view change on a timer)
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
    console.log(count, count2, "reflowONE finished");
  }

  function reflowBKG(cl) {
    cl.classList.remove("bkg1");
    forceReflowJS(cl);
    cl.classList.add("bkg2");
    console.log(count, count2, "reflowBKG Finished");
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
        }
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
      if (count2 === 1) {
        reflowBKG(bkg)
        reflowOne(enterCard);
        reflowOne(enterLogo);
      }
      if (count2 === 1.5) {
        setLandingPlayState({ ...landingPlayState, exit: "paused" });
        setProfilePlayState({ ...profilePlayState, exit: "paused" });
      }
      if (count2 === 2) {
        setView(view2);
      }
      if (count2 === 2.5) {
        setLandingPlayState({
          ...landingPlayState,
          logo: "running",
          card: "running"
        });
        setProfilePlayState({
          ...profilePlayState,
          logo: "running",
          card: "running"
        });
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
        });
      }
      if (count2 === 4) {
        reflowOne(exitLogo);
        reflowOne(exitCard);
        setCount2(0);
        setDelay2(null);
        return;
      }
    },
    delay2,
    count2
  );

 //Determines view to load for user based on view variable defined above
  //function called in GuestLanding return
  //call animReset() and send the desired view in via a string EX: "landing"
  
function GetView(view) {// Functional. Needs completion of ViewPosts
    if (view === "landing") {
      return ViewLanding();
    } else if (view === "profile") {
      return ViewProfile();
      // } else if (view === "posts") {
      //   return ViewPosts();
    } else {
      return ViewLanding();
    }
  }

  
  return (//Default Return Value augmented by ReturnView function
    <span id="wallpaper" class= "bkg1 svgbkg" 
    style={{
      animationPlayState: `${iconPlayState}`,
      animationDuration: `2.5s`
    }}
  >
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
            <CatPaw3 />
          </div>
        </div>
        {GetView(view)}
      </div>
    </span>
  )

 

  //Each viewFunction() populates the default return with the necessary
  //elements to create the desired simulated "page"

  function ViewProfile() { // 30% Needs: UserPosts, EditPosts
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
              {isNewUser ? (
                <NewUserLogo />
              ) : (
              <WelcomeLogo />
              )}
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
                    <AddPost AnimReset={AnimReset} />
                  </Card2>
                  <br />
                  <br />
                  <Card2>
                    
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
  } /// Function closure



  function ViewLanding() {// 100% - Includes: Landing, Login, Register. 
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
              
              <LandingLogo />
            </div>
          </h1>
        </div>

        {isNewUser ? (
          
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
                      <DashboardRegister AnimReset={AnimReset} setNewUser = {setNewUser} />
                    </Card2>
                    {/* <button
                      onClick={() => {
                        AnimReset("profile");
                      }}
                    >
                      reset ALL ANIM to LANDING
                    </button> */}
                 
                  </div>
                </div>
              </div>
            </div>
          </div> //Ternary closure
        ) : (
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
                      <DashboardLogin AnimReset={AnimReset} setNewUser = {setNewUser} />
                    </Card2>
                    {/* <button
                      onClick={() => {
                        AnimReset("profile");
                      }}
                    >
                      reset ALL ANIM to LANDING
                    </button> */}
                
                  </div>
                </div>
              </div>
            </div>
          </div>
          //Ternary Closure
        )}  
        
      </main> //Body closure
    ); //Return closure
  } //Function closure

  
 
  function ViewPosts() {}// 0% -- Needs all
}

