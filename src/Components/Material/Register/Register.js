import React, { useState, useEffect } from "react";
import Color from "color";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Hidden from "@material-ui/core/Hidden";
import { registerUser } from "../../../reducks/reducers/authReducer";
import { useDispatch } from "react-redux";

function DashboardRegister(props) {
  const dispatch = useDispatch();
  const [registerState, setRegisterState] = useState({
    username: "",
    password: ""
  });
  const [attemptRegister, setAttemptRegister] = useState(null);

  function attemptToRegister() {
    setAttemptRegister(registerState);
    
    props.AnimReset("profile");
  }

  useEffect(() => {
    dispatch(registerUser(attemptRegister));
  }, [attemptRegister]);

  function setLogin() {
    props.setNewUser(false);
  }
  return (
    <Grid
      className={"DL01-root"}
      container
      justify={"center"}
      alignItems={"center"}
    >
      <Hidden smUp>
        <div className={"DL01-mobileCover"}>
          <div className={"DL01-cover"} />
        </div>
      </Hidden>
      <Grid
        container
        justify={"center"}
        alignItems={"center"}
        direction={"column"}
        item
        xs={12}
        sm={6}
        md={5}
        className={"DL01-GridItem -form"}
      >
        <form className={"DL01-form"} style={{ placeContent: "center" }}>
          {/* <img
          alt={"logo"}
          className={"DL01-logo"}
          src={
            "https://images.vexels.com/media/users/3/144356/isolated/preview/52fb168f1bd3abf7e97a8e9bfdac331d-speed-car-logo-by-vexels.png"
          }
        /> */}
          <Typography color={"textSecondary"}>
            First time here? Join up!
          </Typography>
          <TextField
            fullWidth
            label={"Username"}
            margin={"normal"}
            variant="filled"
            onChange={e =>
              setRegisterState({
                ...registerState,
                username: e.currentTarget.value
              })
            }
          />
          <TextField
            fullWidth
            label={"Password"}
            margin={"normal"}
            variant="filled"
            onChange={e =>
              setRegisterState({
                ...registerState,
                password: e.currentTarget.value
              })
            }
          />
          <FormControl fullWidth>
            <FormControlLabel
              control={<Checkbox value="checkedC" />}
              label="Remember Me"
            />
          </FormControl>
          <FormControl margin={"normal"} fullWidth>
            <Button
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={attemptToRegister}
            >
              Sign Up Now!
            </Button>
            {/* <button onClick = {() => console.log("result", result)}>log result</button> */}
          </FormControl>
          <Typography className={"DL01-signUp"}>
            Already have an account? 
            <br />
            <Link onClick={setLogin}>Come log in!</Link>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
}

DashboardRegister.getTheme = ({ palette, breakpoints }) => {
  const gradient = `linear-gradient(49deg, ${Color(palette.primary.main)
    .darken(0.7)
    .toString()} 0%, ${Color(palette.primary.main)
    .rotate(30)
    .lighten(0.5)
    .saturate(0.7)
    .fade(0.7)
    .toString()} 100%)`;
  const cover =
    "https://media.wired.com/photos/59273cc6cefba457b079c810/master/pass/FFZERO1_029.jpg";
  return {
    MuiGrid: {
      container: {
        "&.DL01-root": {
          // when you use it, change to 100vh
          // "100vh" is not perfect for all screen ex. iPhone X

          // 2 solutions
          // https://github.com/ulrichformann/react-div-100vh
          // https://github.com/mvasin/react-div-100vh
          minHeight: 700, // todo change to "100vh" or use react-div-100vh
          alignContent: "center",
          justifyContent: "center",
          [breakpoints.only("xs")]: {
            position: "relative",
            minHeight: 566
          },
          "& .DL01-mobileCover": {
            position: "absolute",
            zIndex: 0,
            height: 120,
            top: 0,
            width: "100%",
            background: `url(${cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          },
          "& .DL01-cover": {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: gradient,
            opacity: 0.7
          }
        }
      },
      item: {
        "&.DL01-GridItem.-banner": {
          textAlign: "left",
          background: `url(${cover})`,
          backgroundSize: "cover",
          position: "relative",
          "& *": {
            color: palette.common.white
          },
          "& .DL01-content": {
            position: "relative",
            zIndex: 1,
            paddingLeft: 40
          },
          "& .DL01-brand": {
            fontWeight: 900,
            letterSpacing: 1
          },
          "& .DL01-description": {
            color: "rgba(255, 255, 255, 0.45)",
            maxWidth: 240,
            fontWeight: 200
          }
        },
        "&.DL01-GridItem.-form": {
          textAlign: "center",
          [breakpoints.only("xs")]: {
            background: "#f5f5f5"
          },
          "& .DL01-form": {
            width: 343,
            [breakpoints.only("xs")]: {
              marginTop: 36,
              background: "#ffffff",
              padding: "20px 20px 32px",
              boxShadow: "0 2px 10px 0 rgba(0,0,0,0.12)",
              borderRadius: 4,
              zIndex: 1
            }
          },
          "& .DL01-logo": {
            width: 100,
            height: 100,
            objectFit: "cover",
            [breakpoints.only("xs")]: {
              width: 60,
              height: 60
            }
          },
          "& .DL01-signUp": {
            marginTop: 16
          }
        }
      }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "#f3f3f3",
        "&$focused": {
          backgroundColor: "#f0f0f0"
        }
      }
    },
    MuiButton: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
        background: gradient
      },
      label: {
        color: "#fff",
        textTransform: "none",
        fontSize: 15,
        fontWeight: 700
      },
      contained: {
        minHeight: 30,
        boxShadow: "none",
        "&$focusVisible": {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        "&$disabled": {
          boxShadow: "none"
        }
      }
    }
  };
};

export default DashboardRegister;
