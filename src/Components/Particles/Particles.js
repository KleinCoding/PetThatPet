import React, { useState, useRef, Fragment, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import ReactParticles from "react-particles-js";
import particlesConfig from "./particles-config.js";
import "./stylesDisplay.scss";
// import PostCard from "../PostCard/PostCardStateless";
import { useSelector, useDispatch } from "react-redux";
import { getAllRatingsByUserId } from "../../reducks/reducers/ratingsReducer";
import Ellipsis from "../Loading/Loading";
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = {
  suspense: true
};

export default function ParticleBox() {
  //Defines variables for Randomizer function for post display
  const [variables, setVariables] = useState({ a: 3, b: 4, c: 5 });

  //Defines the dispatch function
  const dispatch = useDispatch();

  //Summons isLoading, currentUser_id, and Posts Array into listed variables
  const isLoading = useSelector(state => state.postsReducer.loading);
  const currentUser_id = useSelector(state => state.authReducer.currentUser_id);
  const posts = useSelector(state => state.postsReducer.posts);

  //Axios Call to get all ratings by logged in user
  useEffect(() => {
    const ratingsByUserId = dispatch(getAllRatingsByUserId(currentUser_id));
  }, []);


  return (
    <div className="main">
      <main>
        <Particles>
          <Hero>
            <div className="container">
              <div className="row">{usePostProps({ variables })}</div>
            </div>
          </Hero>
        </Particles>
      </main>
    </div>
  );

  function useRandomize() {
    setVariables({
      a: Math.floor(Math.random() * posts.length),
      b: Math.floor(Math.random() * posts.length),
      c: Math.floor(Math.random() * posts.length)
    });
  }

  function usePostProps() {
    return (
      <div className="column">
        <Card>
          <div className="postCard">
            <h1>Give some pets to {posts[variables.a].pet_name}!</h1>
            <h2>
              {posts[variables.a].pet_name}'s Human goes by{" "}
              {posts[variables.a].username}{" "}
            </h2>
            <h3>{posts[variables.a].pet_name} has been petted X times</h3>
          </div>
          <button onClick={useRandomize}>Clicketh Me!</button>
          {/* <PostCard i={variables.a} posts ={posts}/> */}
        </Card>
        <Hero2 />
        <Card>
          <Fragment>
            <ReactQueryConfigProvider config={queryConfig}>
              <React.Suspense
                fallback={
                  <div>
                    <Ellipsis />
                  </div>
                }
              >
                {isLoading ? (
                  <div>
                    <Ellipsis />
                  </div>
                ) : (
                  <img
                    className="postcardimg"
                    src={posts[variables.a].img_url}
                    alt="pet"
                  ></img>
                )}
              </React.Suspense>
            </ReactQueryConfigProvider>
          </Fragment>
        </Card>
      </div>
    );
  }
}

function Card({ children }) {
  // We add this ref to card element and use in onMouseMove event ...
  // ... to get element's offset and dimensions.
  const ref = useRef();

  // Keep track of whether card is hovered so we can increment ...
  // ... zIndex to ensure it shows up above other cards when animation causes overlap.
  const [isHovered, setHovered] = useState(false);

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      // Array containing [rotateX, rotateY, and scale] values.
      // We store under a single key (xys) instead of separate keys ...
      // ... so that we can use animatedProps.xys.interpolate() to ...
      // ... easily generate the css transform value below.
      xys: [0, 0, 1],
      // Setup physics
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 }
    };
  });

  return (
    <animated.div
      ref={ref}
      className="card"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        // Get mouse x position within card
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));

        // Get mouse y position within card
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));

        // Set animated values based on mouse position and card dimensions
        const dampen = 50; // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07 // Scale
        ];

        // Update values to animate to
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setHovered(false);
        // Set xys back to original
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        // If hovered we want it to overlap other cards when it scales up
        zIndex: isHovered ? 2 : 1,
        // Interpolate function to handle css changes
        transform: animatedProps.xys.interpolate(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        )
      }}
    >
      {children}
    </animated.div>
  );
}

function Particles({ children, props }) {
  return (
    <div className="actualParticles" style={{ position: "relative" }}>
      <ReactParticles
        params={particlesConfig}
        style={{
          position: "absolute",
          zIndex: 1,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }}
      />
      {children && <div style={{ position: "relative" }}>{children}</div>}
    </div>
  );
}

function Hero({ children }) {
  return (
    <div className="hero">
      <div className="hero-body">{children}</div>
    </div>
  );
}

function Hero2({ children }) {
  return (
    <div className="hero2">
      <div className="hero-body2">{children}</div>
    </div>
  );
}
// function Image({ ratio, src }) {
//   return (
//     <div className="image-container">
//       <div className="image-inner-container">
//         <div
//           className="ratio"
//           style={{
//             paddingTop: ratio * 100 + "%"
//           }}
//         >
//           <div className="ratio-inner">
//             <img src={src} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Info() {
//   return (
//     <div className="info">
//       Springy cards from{" "}
//       <a target="_blank" href="https://bit.ly/382KSdo">
//         divjoy.com
//       </a>
//       <div className="notice">(best viewed at larger screen width)</div>
//     </div>
//   );
// }

// const cards = [
//   {
//     title: "Build faster ⚡️",
//     description:
//       "Create a React web app in the fraction of the time using our library of themes and building blocks. We have everything from navbars and content grids to authentication flows and commenting systems. New blocks are added every week.",
//     image: "https://6jlvz1j5q3.csb.app/undraw_collection.svg",
//     imageRatio: 784 / 1016
//   },
//   {
//     title: "Tweak anything 👩‍🎨",
//     description:
//       "Built with developers in mind. Change element structure, edit CSS, create components, add props and state. We give you access to the underlying React code so you can do what you need right in our tool.",
//     image: "https://6jlvz1j5q3.csb.app/undraw_upload.svg",
//     imageRatio: 839 / 1133
//   },
//   {
//     title: "Export your code 🚀",
//     description:
//       "Export your project as a high-quality React codebase. We're lazer focused on helping you build and iterate quickly, but expect that you'll eventually want to export and wrap things up in your favorite code editor.",
//     image: "https://6jlvz1j5q3.csb.app/undraw_static_assets.svg",
//     imageRatio: 730 / 1030
//   }
// ];

// const rootElement = document.getElementById('root');
// ReactDOM.render(<ParticleBox />, rootElement);
