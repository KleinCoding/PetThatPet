import { useState, useEffect, useRef, useCallback } from "react";
import Axios from "axios";

//CUSTOM HOOKS
//
//useTimeout is used inside useDelayNextChildren to delay rendering
const useTimeout = (callback, delay) => {
  // save id in a ref
  const timeoutId = useRef("");
  // save callback as a ref so we can update the timeout callback without resetting the clock
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // clear the timeout and start a new one, updating the timeoutId ref
  const reset = useCallback(() => {
    clearTimeout(timeoutId.current);

    const id = setTimeout(savedCallback.current, delay);
    timeoutId.current = id;
  }, [delay]);
  useEffect(() => {
    if (delay !== null) {
      reset();

      return () => clearTimeout(timeoutId.current);
    }
  }, [delay, reset]);

  return { reset };
};

//Hook for delaying rendering of a component
export const useDelayNextChildren = (children, delay) => {
  const [finalChildren, setFinalChildren] = useState(null);

  const { reset } = useTimeout(() => {
    setFinalChildren(children);
  }, delay);

  useEffect(() => {
    reset();
  }, [reset, children]);

  return finalChildren || null;
};

//Hook for creating an interval timer. call with
// useInterval({function here}, delayWantedHere)
// set delay to null in order to stop the timer.

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useInterval2(callback, delay2) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay2 !== null) {
      let id = setInterval(tick, delay2);
      return () => clearInterval(id);
    }
  }, [delay2]);
}

export function useAsyncLogin(user) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    async function fetchLogin() {
      console.log("useAsyncLogin attempting fetch with", user);
      try {
        setLoading("true");
        const response = await Axios.post("/auth/login", user).then(
          response => {
            setResult(response);
          }
        );
        return response.catch(error => {
          setLoading("null");
          console.log(error, "error in useAsyncLogin hook");
          setResult(error);
          alert("unable to login, check your username and password");
        });
      } catch (error) {
      } finally {
      }
    }
    if (user !== null) {
      fetchLogin();
    }
  }, [user]);

  return [result, loading];
}

export function useAsyncLoad(props) {
  //function expects a destructurable object containing object.url object.body and object.method
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState("false");
  const url = props.url;
  const body = props.body;
  const style = props.method;

  
  useEffect(() => {
    console.log("initiating useAsyncLoad")
    async function fetchData() {
      console.log("useAsyncLogin attempting fetch with props", props, props.url, props.body, props.method);
      try {
        setLoading("true");
        console.log("loading set true")
        const response = await style("/api/ratings").then(
          console.log("waiting for response"),
          response => {
            console.log(response)
            setResult(response);
          }
        )
        return response
        
      } catch (error) {
        setLoading("null");
        console.log(error, "error in useAsyncLoad hook");
        setResult(error);
      }
    }
    if (props.url && props.method !== null) {
      fetchData();
    }
  }, [props]);

  return [result, loading];
}

// export const useFetching = (user) => {
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState("false");
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(loginUser(user));
//   }, [])
// }

//   // Check if username exists
//   const foundUser = await db.auth.checkForUsername(username)

//   // If the user is not found, then send a msg back stating incorrect username/password
//   if (!foundUser[0]) {
//     res.status(400).json("Username or Password is Incorrect.")
//     console.log(res)

//     // Otherwise, authenticate the hashed pw first, and then login the user
//   } else {
//     const isAuthenticated = bcrypt.compareSync(password, foundUser[0].hash)
//     // If the password does not match, send a msg stating so
//     if (!isAuthenticated) {
//       res.status(403).json("Password is incorrect.")
//        console.log(res)
//       // Otherwise, store the found user on session
//     } else {
//       req.session.user = {
//         user_id: foundUser[0].user_id,
//         username: foundUser[0].username
//       }
//     }
//     console.log("Logged in", req.session.user);
//     // Send back an ok with the user on session
//     res.status(200).json(req.session.user)
//     console.log(res)
//   }

// }
