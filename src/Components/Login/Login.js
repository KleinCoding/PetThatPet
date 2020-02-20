import React, { useState } from "react";
import { loginUser } from "../../reducks/reducers/authReducer";
import {  useDispatch } from "react-redux";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  
  const handleLogin = evt => {
    console.log("Logging in", username);
    dispatch(loginUser({ username, password }));
  };

  return (
    <form onSubmit={handleLogin}>
      
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
