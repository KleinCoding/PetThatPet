// Generate a config at https://vincentgarreau.com/particles.js/

// export default {
//     particles: {
//       number: {
//         value: 100,
//         density: {
//           enable: false,
//           value_area: 600
//         }
//       },
//       color: {
//         value: '#ffffff'
//       },
//       shape: {
//         type: 'circle',
//         stroke: {
//           width: 0,
//           color: '#000000'
//         }
//       },
//       opacity: {
//         value: 0.2,
//         random: false,
//         anim: {
//           enable: false,
//           speed: 1,
//           opacity_min: 0.1,
//           sync: false
//         }
//       },
//       size: {
//         value: 3,
//         random: true,
//         anim: {
//           enable: false,
//           speed: 40,
//           size_min: 0.1,
//           sync: false
//         }
//       },
//       line_linked: {
//         enable: false,
//         distance: 150,
//         color: '#ffffff',
//         opacity: 0.4,
//         width: 1
//       },
//       move: {
//         enable: true,
//         speed: 10,
//         direction: 'left',
//         random: true,
//         straight: true,
//         out_mode: 'out',
//         bounce: false,
//         attract: {
//           enable: false,
//           rotateX: 600,
//           rotateY: 1200
//         }
//       }
//     },
//     interactivity: {
//       detect_on: 'canvas',
//       events: {
//         onhover: {
//           enable: false,
//           mode: 'grab'
//         },
//         onclick: {
//           enable: true,
//           mode: 'repulse'
//         },
//         resize: true
//       },
//       modes: {
//         grab: {
//           distance: 200,
//           line_linked: {
//             opacity: 1
//           }
//         },
//         bubble: {
//           distance: 400,
//           size: 40,
//           duration: 2,
//           opacity: 8,
//           speed: 3
//         },
//         repulse: {
//           distance: 200,
//           duration: 0.4
//         },
//         push: {
//           particles_nb: 4
//         },
//         remove: {
//           particles_nb: 2
//         }
//       }
//     },
//     retina_detect: true
//   };
export default {
  "particles": {
    "number": {
      "value": 14,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#1b1e34"
    },
    "shape": {
      "type": "image",
      "stroke": {
        "width": 0,
        "color": "#e11e1e"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "https://i.pinimg.com/originals/76/77/64/767764ba96f2f7cb8cc549834b30e54d.png",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.21307827075145613,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 60.047076908296084,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 9.730702800009738,
        "size_min": 40,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#f0f0f0",
      "opacity": 1,
      "width": 1.441129845799106
    },
    "move": {
      "enable": true,
      "speed": 7,
      "direction": "bottom",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": false
}